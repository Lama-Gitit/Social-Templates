// Local stand-in for Vercel's cleanUrls behaviour, so the phase 1 checks test
// what production will actually do. Vite preview falls back to the SPA shell
// for every path, which hides exactly the bugs this phase is about.
//
//   node scripts/serve-static.mts [port] [root]
//
// Rules mirrored from vercel.json:
//   - /foo        -> foo.html (200), or 404.html (404) when missing
//   - /foo/       -> 308 to /foo (trailingSlash: false)
//   - /assets/... -> served as-is, immutable
//   - /api/...    -> 404 here; those are Vercel functions and not part of this test

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.argv[2] || 5199);
const root = normalize(process.argv[3] || 'dist');

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

async function exists(p: string): Promise<boolean> {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);
  const pathname = decodeURIComponent(url.pathname);

  const send = (status: number, body: Buffer | string, type = 'text/html; charset=utf-8', extra: Record<string, string> = {}) => {
    res.writeHead(status, { 'Content-Type': type, ...extra });
    res.end(body);
  };

  // Trailing slash (except root) redirects away, like trailingSlash: false.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return send(308, '', 'text/plain', { Location: pathname.replace(/\/+$/, '') || '/' });
  }

  const candidates: string[] = [];
  if (pathname === '/') {
    candidates.push(join(root, 'index.html'));
  } else if (extname(pathname)) {
    candidates.push(join(root, pathname));
  } else {
    candidates.push(join(root, `${pathname}.html`));
    candidates.push(join(root, pathname, 'index.html'));
    candidates.push(join(root, pathname));
  }

  for (const file of candidates) {
    if (file.startsWith(root) && (await exists(file))) {
      const body = await readFile(file);
      const type = TYPES[extname(file)] || 'application/octet-stream';
      const headers: Record<string, string> = {};
      if (pathname.startsWith('/assets/')) {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      }
      return send(200, body, type, headers);
    }
  }

  // Anything unknown gets the real 404 page, with a real 404 status.
  const notFound = join(root, '404.html');
  if (await exists(notFound)) {
    return send(404, await readFile(notFound));
  }
  return send(404, 'not found', 'text/plain');
});

server.listen(port, '127.0.0.1', () => {
  console.log(`serving ${root} on http://127.0.0.1:${port}`);
});
