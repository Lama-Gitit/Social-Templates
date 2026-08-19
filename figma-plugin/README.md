# Social Frames — Figma Plugin

Inserts perfectly sized social media frames (Instagram Story, YouTube Thumbnail, etc.) directly onto the Figma canvas. The format catalog is generated from the site's single source of truth, `src/data/platforms.ts`.

## Development

1. Regenerate the UI after any change to `src/data/platforms.ts` or `ui.template.html`:

   ```bash
   npm run build:figma
   ```

2. In the Figma desktop app: **Plugins → Development → Import plugin from manifest…** and select `figma-plugin/manifest.json`.

3. Run it from **Plugins → Development → Social Frames**.

## Files

- `manifest.json` — plugin manifest (no network access)
- `code.js` — main thread: creates the frame at viewport center
- `ui.template.html` — UI source; `/*__CATALOG__*/` is the injection marker
- `ui.html` — **generated** by `npm run build:figma`; do not edit by hand (committed so the plugin works straight from a checkout)
