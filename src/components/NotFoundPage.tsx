import { Link } from 'react-router-dom';
import { PLATFORMS } from '../data/platforms';

// Rendered by the router for unknown paths, and prerendered into 404.html so
// the static 404 Vercel serves for unknown URLs shows this page instead of a
// blank shell.
export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center flex flex-col gap-6">
        <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">404</p>
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
          This frame does not exist
        </h1>
        <p className="text-sm text-white/70 leading-relaxed">
          The page you are looking for is not here. Every template is one click away though.
          Pick a platform and grab the sizes you need.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {PLATFORMS.map(p => (
            <Link
              key={p.id}
              to={`/${p.slug}`}
              className="text-[9px] font-black uppercase tracking-[0.15em] text-white/60 hover:text-white px-3.5 py-2.5 border border-white/[0.12] hover:border-white/30 transition-all"
            >
              {p.name}
            </Link>
          ))}
        </div>
        <div>
          <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-white underline underline-offset-4 hover:text-white/70 transition-colors">
            Back to all platforms
          </Link>
        </div>
      </div>
    </div>
  );
}
