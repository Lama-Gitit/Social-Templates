# Web / Open Graph Templates — Design

**Date:** 2026-06-17
**Status:** Implemented
**Branch:** `claude/festive-liskov-c4fb0d`

## Problem

SocialFrames provides correctly-sized, copy-ready SVG frames for social media
platforms. It has no entry for a website's own sharing and branding images —
the Open Graph card that renders when a link is shared (iMessage, Slack,
WhatsApp, Discord, LinkedIn, Facebook, X), plus favicons and the Apple touch
icon. These are high-intent search targets ("og image size", "favicon size")
and a natural fit for the existing "pick a size, copy the frame" model.

The closest existing templates are the per-platform `'ad'` link-preview cards
(X Card 800×418, LinkedIn Link Post 1200×627), but those are platform-scoped.
The Open Graph image is the generic one that powers previews everywhere from a
single `og:image` meta tag.

## Goal

Add a single new platform tile, **"Web"** (Open Graph), covering the four
website-metadata images people actually paste into `<head>`.

## Non-goals

- No PWA / maskable / multi-resolution favicon export sets (out of scope —
  stretches the "frame" metaphor and adds little search value).
- No changes to `generateCreativeSVG` (already handles arbitrary dimensions).
- No new components or routing wiring (routing is fully dynamic on `slug`).

## Design

### New platform entry — `src/data/platforms.ts`

A new `PlatformData` appended to `PLATFORMS`:

| Field | Value |
|---|---|
| `id` | `web` |
| `slug` | `og-image-templates` (targets the highest-volume query) |
| `name` | `Web` |
| `icon` | `Globe` (lucide-react) |
| `color` / `brandColor` | `#6366F1` (indigo — distinct from the Facebook / LinkedIn / Bluesky blues) |
| `bg` | `bg-indigo-50` |

Templates:

| Label | Size | Ratio | category |
|---|---|---|---|
| Open Graph Image | 1200 × 630 | 1.91:1 | web |
| X Summary Card | 1200 × 628 | 1.91:1 | web |
| Favicon | 48 × 48 | 1:1 | web |
| Apple Touch Icon | 180 × 180 | 1:1 | web |

Plus the standard prose fields (`intro`, `metaTitle`, `metaDescription`,
`tips`, `geoCopy`, `faqs`) written to target OG / favicon / Apple-touch-icon
size queries.

### New `TemplateCategory`: `'web'`

`TemplateCategory` gains `'web'`. Rationale: `category` only drives a text
badge and the search keyword, with **one** special case — `'profile'` forces a
**circular** thumbnail. Tagging the favicon/icon templates `'profile'` would
wrongly round them, so a dedicated `'web'` category keeps them square with no
UI special-casing.

### Aspect-ratio rendering fix — `src/components/TemplateCard.tsx`

Discovered during verification, but **site-wide** (affects every 1:1 format —
profile pictures on all platforms, square posts, plus the new icons): the card
preview frame pinned a fixed `height: 150px` with `width: auto` for square/tall
ratios. When a card is narrower than 150px, `maxWidth: 100%` shrank the width
while the height stayed pinned, stretching squares into tall rectangles
(measured: a 1:1 frame rendered 112×150).

Fix: drive sizing off `width` for every ratio and let `height: auto` follow via
`aspect-ratio`, so proportions hold under any clamp.

- `width: aspectRatio >= 1 ? '150px' : '${150 * aspectRatio}px'`
- `height: 'auto'`

Verified after fix: 1:1 frames render 112×112; wide (1.91) and tall (0.80)
formats keep their ratios.

### SEO — `public/sitemap.xml`

Add `<url>` for `https://socialframes.app/og-image-templates` (priority 0.8),
matching the other platform pages. (Routing, sidebar, "Browse by platform"
grid, "More platforms", and footer all map over `PLATFORMS` and pick up the new
tile automatically.)

### Homepage size guide — `src/App.tsx`

Add one row to the hardcoded "Full Size Guide" table:
`['Web', 'og-image-templates', 'Open Graph', '1200 × 630', '1.91:1']`.

## Verification

- New page renders at `/og-image-templates` with correct `<title>`, four cards,
  geoCopy, and FAQ. No console or build errors.
- Favicon / Apple Touch Icon frames render as squares (112×112).
- Aspect-ratio fix confirmed on Bluesky (Profile Picture, Post Square) as well.
