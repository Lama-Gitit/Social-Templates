# Changelog — Social Frames / Neural Template Generator

All notable changes to this project are documented here.
Add your own entries under the relevant version when you make changes manually.

---

## [2.0.0] — 2026-04-14

### Files changed
- `src/components/RandomGeneratorModalV2.tsx` ← new active version
- `api/_provider.ts` ← model config updated
- `src/App.tsx` ← import switched to V2

### Bug fixes
- **Rate limiting was broken** (`updateUsage`, line 83)
  `slice(-1)` only kept 1 timestamp, so the "2 per minute" cooldown never triggered.
  Fixed to `slice(-2)` so both recent timestamps are retained for the check.

- **Double sanitization of history SVGs** (`sanitizedHistory` memo)
  History SVGs were already sanitized on `localStorage` load. The `useMemo` was
  running `sanitizeSVG()` a second time on every render — wasted CPU.
  V2 skips the redundant pass in the memo.

- **Deprecated `substr()`** (history ID generation)
  `Math.random().toString(36).substr(2, 9)` replaced with `substring(2, 9)`.

### Performance
- **Prompt history context trimmed** — was passing all 20 history labels into
  every prompt. Now sends only the last 3. Same deduplication effect, fewer tokens.

- **SVG element cap added to prompt** — added "max 15 SVG elements per template"
  rule. Reduces output verbosity without affecting visual quality of layout frames.

### Cost
- **Switched layout model to Haiku** (`api/_provider.ts`)
  `generateJSON` (layout generation) now uses `claude-haiku-4-5-20251001` instead
  of `claude-sonnet-4-6`. Estimated cost per 3-template generation:
  - Before: ~$0.05 (361 input + 3904 output tokens @ Sonnet rates)
  - After:  ~$0.016 (same tokens @ Haiku rates)
  Override via `LAYOUT_MODEL` env var if you want to bump back to Sonnet.

- **Content model also set to Haiku** — short social media copy doesn't need Sonnet.
  Override via `CONTENT_MODEL` env var.

### Notes
- V1 file (`RandomGeneratorModalV2.tsx` previous: `RandomGeneratorModal.tsx`) kept
  intact as reference. Do not delete it.
- To roll back to Sonnet for layout, set `LAYOUT_MODEL=claude-sonnet-4-6` in your
  Vercel environment variables — no code change needed.

---

## [1.0.0] — 2026-04-14

### Initial release
- `src/components/RandomGeneratorModal.tsx`
- `api/_provider.ts` — Anthropic (Sonnet) + Gemini Flash fallback
- 3-step modal: platform → format → generate
- Generates 3 SVG templates (Minimalist, Geometric, Editorial) per call
- localStorage history (max 20 items) + usage rate limiting
- Static offline fallback via `generateCreativeSVG()`
- SVG sanitization via `sanitizeSVG()` to prevent stored XSS

---

<!-- Template for your own entries:

## [X.Y.Z] — YYYY-MM-DD

### Files changed
- `path/to/file.tsx`

### What changed & why
- Short description of the change and the reason behind it

-->
