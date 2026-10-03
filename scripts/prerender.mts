// Prerender: turn the Vite SPA shell into one real HTML file per route.
//
// Why this exists: the site used to serve the same 8.9 KB shell for every URL
// through a catch-all rewrite, so crawlers and link previews saw homepage
// content on all 12 routes, and unknown paths returned a 200.
//
// This script renders each route to HTML in Node, writes dist/<slug>/index.html
// and dist/404.html, and rewrites the head to match the route.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// --- 1. Browser globals, because the app is written for the browser -----
const win = {
  location: {
    search: '',
    pathname: '/',
    href: 'https://socialframes.app/',
    origin: 'https://socialframes.app',
    protocol: 'https:',
    host: 'socialframes.app',
    hostname: 'socialframes.app',
  },
  innerWidth: 1280,
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  addEventListener() {},
  removeEventListener() {},
  history: { pushState() {}, replaceState() {}, state: null, length: 1, go() {}, back() {}, forward() {} },
};
const g = globalThis as unknown as Record<string, unknown>;
g.window = win;
// Node 22 ships a read-only global `navigator`, so assign around it.
Object.defineProperty(globalThis, 'navigator', {
  value: { userAgent: 'prerender', language: 'en' },
  configurable: true,
  writable: true,
});
g.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  title: '',
  defaultView: win,
  documentElement: { style: {}, classList: { add() {}, remove() {} } },
  body: { classList: { add() {}, remove() {} }, style: {} },
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  head: { appendChild() {} },
};

const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');
const { StaticRouter } = await import('react-router-dom');
const { AppRoutes } = await import('../src/App.tsx');
const { PLATFORMS } = await import('../src/data/platforms.ts');

// --- 2. Routes ------------------------------------------------------------
const ORIGIN = 'https://socialframes.app';

const HOME = {
  path: '/',
  title: 'Social Frames | Free SVG Templates for Every Social Media Platform',
  description:
    'Free library of copy-ready SVG templates for 10+ social media platforms. Instantly grab perfectly sized frames for Instagram Stories, YouTube Thumbnails, LinkedIn Banners, TikTok, and 45+ more formats.',
};

type RouteSpec = { path: string; title: string; description: string };

const routes: RouteSpec[] = [
  HOME,
  ...PLATFORMS.map((p) => ({
    path: `/${p.slug}`,
    title: p.metaTitle,
    description: p.metaDescription,
  })),
];

// --- 3. Head rewriting ---------------------------------------------------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHead(html: string, route: RouteSpec, opts: { canonical?: boolean } = {}): string {
  const url = `${ORIGIN}${route.path}`;
  const title = escapeHtml(route.title);
  const desc = escapeHtml(route.description);

  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${desc}" />`
  );
  if (opts.canonical === false) {
    // A 404 has nothing to canonicalise to.
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\n?\s*/, '');
  } else {
    out = out.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`
    );
  }
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${desc}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${desc}" />`
  );

  return out;
}

// --- 4. Render ----------------------------------------------------------
function renderRoute(path: string): string {
  return renderToString(
    React.createElement(StaticRouter, { location: path }, React.createElement(AppRoutes))
  );
}

async function main() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    throw new Error(`dist/index.html not found. Run "vite build" first.`);
  }
  const shell = await readFile(indexPath, 'utf8');

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to fill.');
  }

  let written = 0;
  for (const route of routes) {
    const appHtml = renderRoute(route.path);
    if (appHtml.length < 500) {
      throw new Error(`Route ${route.path} rendered ${appHtml.length} chars; refusing to ship a near-empty page.`);
    }

    let html = buildHead(shell, route);
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Flat files (instagram-templates.html) rather than folders with an
    // index.html: combined with cleanUrls in vercel.json this serves exactly
    // /instagram-templates, matching the canonical and sitemap. A folder
    // would make Vercel redirect /instagram-templates to /instagram-templates/
    // and leave a slash mismatch against the canonical.
    const outPath = route.path === '/' ? indexPath : join(DIST, `${route.path}.html`);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    written++;
  }

  // --- 404 ---------------------------------------------------------------
  // Vercel serves dist/404.html for unknown URLs, so it needs the real page.
  const notFoundApp = renderRoute('/this-path-does-not-exist');
  let notFoundHtml = buildHead(shell, {
    path: '/404',
    title: 'Page not found | Social Frames',
    description: 'That page does not exist. Browse free SVG templates for every social media platform instead.',
  }, { canonical: false });
  notFoundHtml = notFoundHtml.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, follow" />'
  );
  notFoundHtml = notFoundHtml.replace('<div id="root"></div>', `<div id="root">${notFoundApp}</div>`);
  await writeFile(join(DIST, '404.html'), notFoundHtml, 'utf8');

  console.log(`prerendered ${written} routes + 404.html`);
  for (const r of routes) console.log(`  ${r.path}`);
}

await main();
