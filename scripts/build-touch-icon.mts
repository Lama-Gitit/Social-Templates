// Renders the SVG touch icon to the 180x180 PNG iOS actually uses.
// iOS ignores SVG for apple-touch-icon, so the PNG has to exist as a real file.
//
//   npx tsx scripts/build-touch-icon.mts
//
// Uses the Chromium that is already on the machine (Playwright's), so the repo
// does not take on a screenshot dependency for one 7 KB file.

import { readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SVG = join(ROOT, 'public', 'apple-touch-icon.svg');
const OUT = join(ROOT, 'public', 'apple-touch-icon.png');

const candidates = [
  process.env.CHROME_PATH,
  '/home/lauw/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
  '/home/lauw/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
].filter(Boolean) as string[];

const chrome = candidates.find((c) => existsSync(c));
if (!chrome) {
  throw new Error(
    `No Chromium found. Tried:\n  ${candidates.join('\n  ')}\nSet CHROME_PATH to one.`
  );
}

if (!existsSync(SVG)) {
  throw new Error(`${SVG} not found`);
}

// Chrome screenshots at the window size, so render the SVG at exactly 180x180.
const tmp = join(ROOT, '.touch-icon-tmp.html');
const svg = await readFile(SVG, 'utf8');
await writeFile(
  tmp,
  `<html><head><style>
     html, body { margin: 0; padding: 0; background: #0a0a0a; }
     svg { display: block; }
   </style></head><body>${svg.replace(
     '<svg',
     '<svg width="180" height="180" preserveAspectRatio="xMidYMid meet"'
   )}</body></html>`
);

try {
  await run(chrome, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--screenshot=${OUT}`,
    '--window-size=180,180',
    `file://${tmp}`,
  ]);
} finally {
  await rm(tmp, { force: true });
}

const buf = await readFile(OUT);
console.log(`wrote ${OUT} (${buf.length} bytes) using ${chrome}`);
