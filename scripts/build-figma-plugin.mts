// Generates figma-plugin/ui.html from ui.template.html, injecting the
// platform/template catalog from src/data/platforms.ts so the plugin can
// never drift from the site's data.
//
// Run: npm run build:figma

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PLATFORMS } from '../src/data/platforms.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const catalog = PLATFORMS.map(p => ({
  id: p.id,
  name: p.name,
  brandColor: p.brandColor,
  templates: p.templates.map(({ label, width, height, category }) => ({ label, width, height, category })),
}));

const template = readFileSync(join(root, 'figma-plugin/ui.template.html'), 'utf8');
const marker = '/*__CATALOG__*/[]';
if (!template.includes(marker)) {
  throw new Error('Catalog marker not found in ui.template.html');
}
const out = template.replace(marker, JSON.stringify(catalog));

writeFileSync(join(root, 'figma-plugin/ui.html'), out);
console.log(`figma-plugin/ui.html written — ${catalog.length} platforms, ${catalog.reduce((n, p) => n + p.templates.length, 0)} formats.`);
