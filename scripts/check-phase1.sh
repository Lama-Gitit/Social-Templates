#!/usr/bin/env bash
# Phase 1 acceptance check. Run against scripts/serve-static.mts, which mirrors
# vercel.json (cleanUrls, trailingSlash: false, /assets immutable).
#
#   node scripts/serve-static.mts 8115 dist &
#   bash scripts/check-phase1.sh [base-url]
#
# Exit 0 means every route serves its own HTML with the right head.

set -u
BASE="${1:-http://127.0.0.1:8115}"
pass=0
fail=0

ok()   { printf '  ok    %s\n' "$1"; pass=$((pass+1)); }
bad()  { printf '  FAIL  %s\n' "$1"; fail=$((fail+1)); }

# --- 1. Every route: unique title, matching canonical, status 200 ---------
echo "1. Route heads in raw HTML (no JS)"
routes="instagram-templates youtube-templates x-templates facebook-templates threads-templates linkedin-templates bluesky-templates tiktok-templates pinterest-templates snapchat-templates og-image-templates"
declare -A titles
for slug in $routes; do
  body="$(curl -sS --max-time 10 "$BASE/$slug")"
  status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$BASE/$slug")"
  title="$(printf '%s' "$body" | grep -oP '(?<=<title>).*?(?=</title>)' | head -1)"
  canonical="$(printf '%s' "$body" | grep -oP '(?<=<link rel="canonical" href=")[^"]*' | head -1)"
  h1="$(printf '%s' "$body" | grep -o '<h1' | wc -l)"

  [ "$status" = "200" ] || bad "$slug status=$status (want 200)"
  [ -n "$title" ] || bad "$slug has no title"
  [ "$canonical" = "https://socialframes.app/$slug" ] || bad "$slug canonical=$canonical"
  [ "$h1" = "1" ] || bad "$slug h1 count=$h1 (want 1)"

  if [ -n "${titles[$title]:-}" ]; then
    bad "$slug duplicates the title of ${titles[$title]}"
  fi
  titles[$title]="$slug"

  # The prerendered content must be in the HTML, not fetched later.
  if printf '%s' "$body" | grep -q '<div id="root"></div>'; then
    bad "$slug root div is empty (not prerendered)"
  fi
  ok "$slug: title, canonical, h1, content"
done
echo "   unique titles: $(printf '%s\n' "${!titles[@]}" | wc -l) of 11"
[ "$(printf '%s\n' "${!titles[@]}" | wc -l)" = "11" ] || bad "titles are not unique across all 11 platform routes"

# --- 2. Home ---------------------------------------------------------------
echo "2. Home"
home_status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$BASE/")"
home_canon="$(curl -sS --max-time 10 "$BASE/" | grep -oP '(?<=<link rel="canonical" href=")[^"]*' | head -1)"
[ "$home_status" = "200" ] || bad "home status=$home_status"
[ "$home_canon" = "https://socialframes.app/" ] || bad "home canonical=$home_canon"
ok "home: status and canonical"

# --- 3. Unknown paths: real 404 --------------------------------------------
echo "3. Unknown paths return 404"
for p in "/nonexistent-xyz" "/a/deep/path" "/instagram-templates-typo"; do
  s="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$BASE$p")"
  [ "$s" = "404" ] || bad "$p status=$s (want 404)"
  body="$(curl -sS --max-time 10 "$BASE$p")"
  printf '%s' "$body" | grep -q 'noindex' || bad "$p 404 page is not noindex"
  printf '%s' "$body" | grep -q 'This frame does not exist' || bad "$p 404 page lacks the not-found copy"
  ok "$p -> 404 with the real page"
done

# --- 4. Trailing slash -----------------------------------------------------
echo "4. Trailing slash normalises"
for p in "/instagram-templates" "/youtube-templates"; do
  loc="$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' --max-time 10 "$BASE$p/")"
  case "$loc" in
    "308 $BASE$p"|"301 $BASE$p") ok "$p/ redirects to $p" ;;
    *) bad "$p/ -> $loc" ;;
  esac
done

# --- 5. Assets -------------------------------------------------------------
echo "5. Asset caching"
asset="$(find dist/assets -name '*.js' | head -1 | sed 's|^dist||')"
cc="$(curl -sSI --max-time 10 "$BASE$asset" | grep -i '^cache-control' | tr -d '\r')"
case "$cc" in
  *immutable*) ok "$asset: $cc" ;;
  *) bad "$asset cache-control=$cc (want immutable)" ;;
esac

echo
echo "passed: $pass   failed: $fail"
[ "$fail" = "0" ] || exit 1
