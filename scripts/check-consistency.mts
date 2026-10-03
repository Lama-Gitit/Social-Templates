// Consistency check for the content that the audit flagged as drifting:
// meta descriptions, FAQ schema, page copy and structured data must agree.
//
//   npx tsx --tsconfig tsconfig.app.json scripts/check-consistency.mts
//
// Runs against dist/ after a build. Exit 1 on any mismatch.

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const { PLATFORMS } = await import('../src/data/platforms.ts');

let failures = 0;
const ok = (m: string) => console.log(`  ok    ${m}`);
const bad = (m: string) => { console.log(`  FAIL  ${m}`); failures++; };

const read = async (p: string) => readFile(p, 'utf8');

function jsonLdBlocks(html: string): any[] {
  const out: any[] = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try { out.push(JSON.parse(m[1])); } catch { bad('a JSON-LD block does not parse'); }
  }
  return out;
}

function visibleText(html: string): string {
  const start = html.indexOf('<div id="root">');
  let body = start >= 0 ? html.slice(start) : html;
  body = body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  return body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
}

function faqQuestions(block: any): string[] {
  return (block?.mainEntity ?? []).map((q: any) => q.name);
}

console.log('1. One FAQPage per page, built from that page\'s own FAQ');
for (const p of [{ slug: 'index', route: '/' }, ...PLATFORMS.map((x) => ({ slug: `${x.slug}`, route: `/${x.slug}` }))]) {
  const file = join(DIST, `${p.slug}.html`);
  if (!existsSync(file)) { bad(`${p.slug}.html missing`); continue; }
  const html = await read(file);
  const blocks = jsonLdBlocks(html);
  const faq = blocks.find((b) => b['@type'] === 'FAQPage');

  if (!faq) { bad(`${p.slug}: no FAQPage`); continue; }

  // The schema questions must all be visible on the page.
  const text = visibleText(html);
  const questions = faqQuestions(faq);
  const invisible = questions.filter((q) => !text.includes(q));
  if (invisible.length) bad(`${p.slug}: schema questions not visible: ${invisible.join(' | ')}`);

  const expected = p.slug === 'index'
    ? null
    : PLATFORMS.find((x) => x.slug === p.slug)!.faqs.length;
  if (expected !== null && questions.length !== expected) {
    bad(`${p.slug}: FAQPage has ${questions.length} questions, data has ${expected}`);
  } else {
    ok(`${p.slug}: FAQPage matches the visible FAQ (${questions.length} questions)`);
  }

  // No homepage-only schema on subpages.
  const wa = blocks.find((b) => b['@type'] === 'WebApplication');
  if (p.slug !== 'index' && wa) bad(`${p.slug}: carries the WebApplication block (homepage-only)`);
}

console.log('2. Dimension claims inside meta descriptions exist in the page data');
for (const p of PLATFORMS) {
  const dims = [...p.metaDescription.matchAll(/(\d{2,4})\s*x\s*(\d{2,4})/g)]
    .map((m) => `${m[1]}x${m[2]}`);
  const valid = new Set(p.templates.map((t) => `${t.width}x${t.height}`));
  const invalid = dims.filter((d) => !valid.has(d));
  if (invalid.length) bad(`${p.slug}: meta description cites ${invalid.join(', ')} which is not a listed format`);
  else ok(`${p.slug}: meta description dimensions all listed`);
}

console.log('3. Counts in copy match the data');
const platformCount = PLATFORMS.length;
const formatCount = PLATFORMS.reduce((n, p) => n + p.templates.length, 0);
for (const f of ['index.html', ...PLATFORMS.map((p) => `${p.slug}.html`)]) {
  const html = await read(join(DIST, f));
  const stale = ['10+ social', '45+ format', '45+ social', '851x315'].filter((s) => html.includes(s));
  if (stale.length) bad(`${f}: stale copy: ${stale.join(', ')}`);
}
const home = await read(join(DIST, 'index.html'));
if (!home.includes(`${platformCount} social platforms`)) bad(`index: platform count not stated as ${platformCount}`);
else ok(`index: states ${platformCount} platforms`);
if (!home.includes(`${formatCount} formats`)) bad(`index: format count not stated as ${formatCount}`);
else ok(`index: states ${formatCount} formats`);

console.log('4. Per-route head fields are unique and self-referencing');
const titles = new Map<string, string>();
for (const p of [{ slug: 'index', route: '/' }, ...PLATFORMS.map((x) => ({ slug: `${x.slug}`, route: `/${x.slug}` }))]) {
  const html = await read(join(DIST, `${p.slug}.html`));
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/)?.[1] ?? '';
  const want = `https://socialframes.app${p.route}`;

  if (titles.has(title)) bad(`${p.slug}: duplicate title with ${titles.get(title)}`);
  titles.set(title, p.slug);

  if (canonical !== want) bad(`${p.slug}: canonical=${canonical} want ${want}`);
  if (ogUrl !== want) bad(`${p.slug}: og:url=${ogUrl} want ${want}`);
  ok(`${p.slug}: title/canonical/og:url`);
}

console.log('5. The 404 carries no schema and no canonical, and is noindex');
{
  const html = await read(join(DIST, '404.html'));
  if (/application\/ld\+json/.test(html)) bad('404: has structured data');
  else ok('404: no structured data');
  if (/rel="canonical"/.test(html)) bad('404: has a canonical');
  else ok('404: no canonical');
  if (!/noindex/.test(html)) bad('404: not noindex');
  else ok('404: noindex');
}

console.log('6. llms.txt and the touch icon exist');
for (const f of ['llms.txt', 'apple-touch-icon.png']) {
  if (existsSync(join(ROOT, 'public', f))) ok(`public/${f}`);
  else bad(`public/${f} missing`);
}

console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${failures} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
