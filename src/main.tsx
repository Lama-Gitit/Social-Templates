import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { Analytics } from '@vercel/analytics/react'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
    </ErrorBoundary>
  </StrictMode>
)

// The build prerenders each route, so the container arrives with markup in
// it. Hydrate that instead of throwing it away with createRoot, which would
// undo the prerender on first paint. Empty container means dev server, or a
// route the prerender does not know, so fall back to a normal render.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
