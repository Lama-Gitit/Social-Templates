import { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TemplateCard } from './components/TemplateCard';
import { AIAssistant } from './components/AIAssistant';
import { RandomGeneratorModal } from './components/RandomGeneratorModalV2'; // v2
import { PLATFORMS } from './data/platforms';
import { usePageMeta } from './hooks/usePageMeta';
import { setAIToken } from './lib/anthropic';
import { hexToHSL } from './lib/utils';
import { Lightbulb, ChevronDown, Search } from 'lucide-react';

// Flat list of all templates across all platforms for the "What are you making?" section
const ALL_TEMPLATES = PLATFORMS.flatMap(p =>
  p.templates.map(t => ({
    ...t,
    platformId: p.id,
    platformName: p.name,
    platformSlug: p.slug,
    platformIcon: p.icon,
    platformColor: p.color,
    platformBrandColor: p.brandColor,
  }))
);

const MORPH_FORMATS = [
  { w: 120, h: 213, ratio: '9:16', name: 'Instagram Story' },
  { w: 213, h: 120, ratio: '16:9', name: 'YouTube Thumbnail' },
  { w: 150, h: 150, ratio: '1:1', name: 'Square Post' },
  { w: 120, h: 150, ratio: '4:5', name: 'Feed Post' },
  { w: 220, h: 55, ratio: '4:1', name: 'LinkedIn Banner' },
  { w: 120, h: 213, ratio: '9:16', name: 'TikTok Video' },
  { w: 120, h: 180, ratio: '2:3', name: 'Pinterest Pin' },
  { w: 200, h: 104, ratio: '~2:1', name: 'Facebook Cover' },
];

// Top 5 popular templates shown by default (before any search)
const POPULAR_TEMPLATE_KEYS = [
  'instagram:Stories & Reels',
  'youtube:Video Thumbnail',
  'instagram:Square Post',
  'linkedin:Personal Cover',
  'tiktok:Video / Story',
];

const aiParams = new URLSearchParams(window.location.search);
const aiToken = aiParams.get('ai') || '';
const aiEnabled = aiToken.length > 0;

// Register the token so all API calls include it
if (aiToken) {
  setAIToken(aiToken);
}

// --- Platform Page ---
function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRandomGeneratorOpen, setIsRandomGeneratorOpen] = useState(false);

  const platform = PLATFORMS.find(p => p.slug === slug);
  const themeHSL = useMemo(
    () => platform ? hexToHSL(platform.brandColor || platform.color) : '5 74% 47%',
    [platform]
  );

  usePageMeta({
    title: platform?.metaTitle || 'Social Frames',
    description: platform?.metaDescription || '',
    canonicalPath: platform ? `/${platform.slug}` : '/',
  });

  if (!platform) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      style={{
        '--primary': themeHSL,
        '--color-primary': `hsl(${themeHSL})`,
        '--color-ring': `hsl(${themeHSL})`,
      } as React.CSSProperties}
    >
      <Layout
        activePlatformId={platform.id}
        onOpenRandomGenerator={() => setIsRandomGeneratorOpen(true)}
        aiEnabled={aiEnabled}
      >
        <div className="flex flex-col gap-12">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 pb-8 md:pb-12 border-b border-border/40">
              <div className="flex items-center gap-6 md:gap-10">
                <div className="p-4 md:p-8 bg-card border border-border/40 rounded-sm">
                  <platform.icon size={32} className="md:w-14 md:h-14" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div>
                  <h1 className="text-us md:text-uxl font-black tracking-tighter text-foreground uppercase leading-none">{platform.name}</h1>
                  <p className="text-[9px] md:text-[11px] font-black mt-2 md:mt-4 tracking-[0.3em] uppercase opacity-40">Free SVG Templates | Copy-Ready Frames</p>
                </div>
              </div>
            </header>

            {/* Design tip callout */}
            {platform.tips.length > 0 && (
              <div className="mb-12 p-5 md:p-6 border rounded-sm flex items-start gap-4 animate-in fade-in slide-in-from-bottom-1 duration-700" style={{ borderColor: `hsla(var(--primary), 0.2)`, backgroundColor: `hsla(var(--primary), 0.03)` }}>
                <Lightbulb size={16} className="flex-shrink-0 mt-0.5 opacity-60" style={{ color: 'hsl(var(--primary))' }} />
                <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider leading-relaxed">
                  {platform.tips[Math.floor(Math.random() * platform.tips.length)]}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-3">
                <h2 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--primary))' }}>Platform Guide</h2>
                <p className="text-foreground text-3xl leading-tight font-black tracking-tighter uppercase">{platform.intro}</p>
              </div>
              <div className="bg-card/50 p-8 border border-border/40 rounded">
                <h3 className="text-[9px] font-black text-muted-foreground mb-6 flex items-center gap-2 uppercase tracking-[0.3em] opacity-40">
                  Design Tips
                </h3>
                <ul className="space-y-4">
                  {platform.tips.map((tip) => (
                    <li key={tip} className="text-[10px] text-foreground flex items-start gap-4 font-black uppercase tracking-wider leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platform.templates.map((template) => (
                <TemplateCard
                  key={`${template.width}x${template.height}-${template.label}`}
                  template={template}
                  platformColor={platform.color}
                  platformId={platform.id}
                />
              ))}
            </div>

            {platform.geoCopy && (
              <section className="mt-16 pt-12 border-t border-border/20">
                <h2 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-white/30">{platform.name} Image Sizes & Dimensions</h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-3xl">
                  {platform.geoCopy}
                </p>
              </section>
            )}

            {platform.faqs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border/20">
                <h2 className="text-lg font-black text-white uppercase tracking-tighter mb-8">{platform.name} FAQ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platform.faqs.map(({ q, a }, i) => (
                    <details key={i} className="group border border-border/20 rounded-sm bg-card/20 hover:bg-card/30 transition-colors">
                      <summary className="cursor-pointer px-6 py-5 text-[11px] font-black text-white uppercase tracking-wider list-none flex justify-between items-center">
                        {q}
                        <span className="text-white/20 group-open:rotate-45 transition-transform text-lg font-bold">+</span>
                      </summary>
                      <p className="px-6 pb-5 text-sm text-white/50 leading-relaxed">{a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <nav className="mt-16 pt-12 border-t border-border/20">
              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">More Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.filter(p => p.id !== platform.id).map(p => (
                  <Link
                    key={p.id}
                    to={`/${p.slug}`}
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white px-4 py-2 border border-border/20 hover:border-border/40 rounded-sm transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <AIAssistant
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          platformName={platform.name}
        />

        <RandomGeneratorModal
          isOpen={isRandomGeneratorOpen}
          onClose={() => setIsRandomGeneratorOpen(false)}
        />
      </Layout>
    </div>
  );
}

// --- Morphing Frame Component ---
function MorphingFrame() {
  const [morphIdx, setMorphIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(MORPH_FORMATS.length - 1);
  const [prev2Idx, setPrev2Idx] = useState(MORPH_FORMATS.length - 2);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMorphIdx(prev => {
        const next = (prev + 1) % MORPH_FORMATS.length;
        setPrevIdx(prev);
        setPrev2Idx((prev - 1 + MORPH_FORMATS.length) % MORPH_FORMATS.length);
        return next;
      });
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const f = MORPH_FORMATS[morphIdx];
  const g1 = MORPH_FORMATS[prevIdx];
  const g2 = MORPH_FORMATS[prev2Idx];

  // Scale up on desktop
  const scale = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 1.35 : 1;
  const fw = Math.round(f.w * scale);
  const fh = Math.round(f.h * scale);
  const g1w = Math.round(g1.w * scale);
  const g1h = Math.round(g1.h * scale);
  const g2w = Math.round(g2.w * scale);
  const g2h = Math.round(g2.h * scale);

  return (
    <div className="flex-shrink-0 w-full lg:w-[380px] h-[260px] lg:h-[460px] flex items-center justify-center relative">
      {/* Ghost frames */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.03] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: g2w, height: g2h }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.04] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: g1w, height: g1h }}
      />
      {/* Main frame */}
      <div
        className="relative flex items-center justify-center border-2 border-primary transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: fw,
          height: fh,
          boxShadow: '0 0 80px -20px rgba(255,59,45,0.25)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }}
        />
        {/* Centered label inside frame */}
        <div className="z-10 flex flex-col items-center gap-1 transition-opacity duration-300">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{f.ratio}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">{f.name}</span>
        </div>
      </div>
    </div>
  );
}

// --- Home Page ---
function HomePage() {
  const [isRandomGeneratorOpen, setIsRandomGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const makingSectionRef = useRef<HTMLElement>(null);

  const themeHSL = '5 74% 47%';

  usePageMeta({
    title: 'Social Frames | Free SVG Templates for Every Social Media Platform',
    description: 'Free library of copy-ready SVG templates for 10+ social media platforms. Instantly grab perfectly sized frames for Instagram Stories, YouTube Thumbnails, LinkedIn Banners, TikTok, and 45+ more formats.',
    canonicalPath: '/',
  });

  const isSearching = searchQuery.trim().length > 0;

  // Default top 5 popular templates
  const popularTemplates = useMemo(() => {
    return POPULAR_TEMPLATE_KEYS.map(key => {
      const [platformId, label] = key.split(':');
      return ALL_TEMPLATES.find(t => t.platformId === platformId && t.label === label);
    }).filter(Boolean) as typeof ALL_TEMPLATES;
  }, []);

  // Search results — filter by template label, platform name, or dimensions
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.trim().toLowerCase();
    return ALL_TEMPLATES.filter(t =>
      t.label.toLowerCase().includes(q) ||
      t.platformName.toLowerCase().includes(q) ||
      `${t.width}x${t.height}`.includes(q) ||
      `${t.width}×${t.height}`.includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }, [searchQuery, isSearching]);

  const displayedTemplates = isSearching ? searchResults : popularTemplates;

  return (
    <div
      style={{
        '--primary': themeHSL,
        '--color-primary': `hsl(${themeHSL})`,
        '--color-ring': `hsl(${themeHSL})`,
      } as React.CSSProperties}
    >
      <Layout
        activePlatformId={null}
        onOpenRandomGenerator={() => setIsRandomGeneratorOpen(true)}
        aiEnabled={aiEnabled}
      >
        <div className="flex flex-col gap-12">
          <div className="animate-in fade-in duration-1000">

            {/* ── Hero with Morphing Frame ── */}
            <header className="flex flex-col-reverse lg:flex-row items-center min-h-0 lg:min-h-[500px] mb-16 lg:mb-20 gap-8 lg:gap-12">
              <div className="flex-1 max-w-full lg:max-w-[540px] text-center lg:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-4">Social Frames</p>
                <h1 className="text-[clamp(40px,5.5vw,72px)] font-black text-foreground mb-5 tracking-[-0.03em] uppercase leading-[0.88]">
                  Every social<br />media <span className="text-primary">frame</span><br />you need.
                </h1>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/50 leading-relaxed mb-8">
                  Pick a format. Copy the SVG. Paste into Figma, Sketch, or any design tool. Sized perfectly for every platform.
                </p>
                <button
                  onClick={() => makingSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/15 text-foreground text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 mx-auto lg:mx-0"
                >
                  Browse Formats <ChevronDown size={14} />
                </button>
              </div>
              <MorphingFrame />
            </header>

            {/* ── What Are You Making? (Search + Top 5) ── */}
            <section
              className="mb-20 md:mb-24"
              ref={makingSectionRef}
              id="making"
            >
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-8">What are you making?</h2>

              {/* Search input */}
              <div className="relative mb-6 max-w-xl">
                <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formats... (e.g. instagram story, youtube thumbnail)"
                  className="w-full pl-12 pr-5 py-4 bg-card border border-border/40 text-foreground text-[13px] font-bold tracking-[0.03em] outline-none transition-all focus:border-primary/50 placeholder:text-white/20 placeholder:text-[10px] placeholder:font-extrabold placeholder:uppercase placeholder:tracking-[0.15em]"
                />
                {isSearching && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-wider transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Label */}
              <p className="text-[9px] font-extrabold text-white/25 uppercase tracking-[0.25em] mb-4">
                {isSearching
                  ? searchResults.length > 0
                    ? `${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`
                    : 'No results'
                  : 'Popular formats'
                }
              </p>

              {/* Results list */}
              {displayedTemplates.length > 0 ? (
                <div className="border border-border/30 overflow-hidden animate-in fade-in duration-200">
                  {displayedTemplates.map((t, idx) => {
                    const platform = PLATFORMS.find(p => p.id === t.platformId)!;
                    const aspectRatio = t.width / t.height;
                    return (
                      <Link
                        key={`${t.platformId}:${t.label}`}
                        to={`/${platform.slug}`}
                        className="group flex items-center gap-6 md:gap-8 px-5 md:px-6 py-4 md:py-5 transition-all hover:bg-white/[0.02] active:scale-[0.995]"
                        style={{
                          borderBottom: idx < displayedTemplates.length - 1 ? '1px solid rgba(255,255,255,0.03)' : undefined,
                        }}
                      >
                        {/* Aspect ratio shape */}
                        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                          <div
                            className="border transition-colors duration-300"
                            style={{
                              borderColor: `${t.platformBrandColor}35`,
                              aspectRatio: `${aspectRatio}`,
                              height: aspectRatio > 1 ? 'auto' : '28px',
                              width: aspectRatio > 1 ? '28px' : 'auto',
                              backgroundColor: `${t.platformBrandColor}08`,
                              borderRadius: t.category === 'profile' ? '50%' : undefined,
                            }}
                          />
                        </div>

                        {/* Platform name */}
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.15em] w-24 md:w-28 flex-shrink-0">{t.platformName}</span>

                        {/* Template label */}
                        <span className="text-[11px] font-black text-white/80 uppercase tracking-[-0.01em] flex-grow group-hover:text-white transition-colors">
                          {t.label}
                        </span>

                        {/* Dimensions */}
                        <span className="text-[9px] font-bold text-white/20 tracking-[0.1em] flex-shrink-0 hidden sm:block">
                          {t.width}×{t.height}
                        </span>

                        {/* Arrow */}
                        <span className="text-white/12 group-hover:text-primary group-hover:translate-x-0.5 transition-all text-sm flex-shrink-0">→</span>
                      </Link>
                    );
                  })}
                </div>
              ) : isSearching ? (
                <div className="border border-border/30 px-6 py-10 text-center">
                  <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider">No templates match "{searchQuery}"</p>
                  <p className="text-[10px] text-white/15 mt-2">Try a different term — like a platform name, format, or size</p>
                </div>
              ) : null}
            </section>

            {/* ── Browse by Platform ── */}
            <section className="mb-24">
              <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-border/20">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Browse by Platform</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {PLATFORMS.map((platform) => (
                  <Link
                    key={platform.id}
                    to={`/${platform.slug}`}
                    className="group bg-card p-8 border border-border/40 transition-all duration-300 text-left flex flex-col items-center justify-center gap-4 active:scale-95 hover:scale-[1.02]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${platform.brandColor}50`;
                      e.currentTarget.style.backgroundColor = `${platform.brandColor}08`;
                      e.currentTarget.style.boxShadow = `0 0 40px -15px ${platform.brandColor}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <platform.icon
                      size={28}
                      className="text-white/40 group-hover:text-white transition-all duration-300"
                    />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-all">{platform.name}</span>
                    <span className="text-[9px] font-bold text-white/15 uppercase tracking-[0.15em]">
                      {platform.templates.length} templates
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── FAQ Section ── */}
            <section className="mb-24">
              <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-border/20">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-2">Frequently Asked Questions</h2>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Common questions about sizes & templates</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { q: 'What size is an Instagram Story?', a: 'Instagram Stories are 1080 x 1920 pixels with a 9:16 aspect ratio. This same vertical format is used for Instagram Reels and other full-screen mobile content.', link: '/instagram-templates' },
                  { q: 'What size is a YouTube Thumbnail?', a: 'YouTube Thumbnails are 1280 x 720 pixels (16:9 aspect ratio). This is the recommended size for clear, high-quality thumbnails that display well on all devices.', link: '/youtube-templates' },
                  { q: 'What size is a LinkedIn Banner?', a: 'LinkedIn personal profile banners are 1584 x 396 pixels. LinkedIn company page covers are 1128 x 191 pixels. For LinkedIn feed posts, 1080 x 1350 pixels (4:5 ratio) gets the most screen real estate.', link: '/linkedin-templates' },
                  { q: 'What size is a TikTok video?', a: 'TikTok videos are 1080 x 1920 pixels with a 9:16 aspect ratio. This full-screen vertical format is the standard for all TikTok content including videos, ads, and stories.', link: '/tiktok-templates' },
                  { q: 'What size is a Facebook Cover Photo?', a: 'Facebook Cover Photos are 1640 x 856 pixels on desktop. Shared images in the feed perform best at 1200 x 630 pixels. Facebook Stories use the same 1080 x 1920 format as Instagram.', link: '/facebook-templates' },
                  { q: 'What is Social Frames?', a: 'Social Frames is a free library of copy-ready SVG frames for 10+ social media platforms, covering 45+ format sizes. Pick a platform, choose a format, and instantly copy the perfect SVG frame into Figma, Sketch, or any design tool.', link: undefined },
                ].map(({ q, a, link }, i) => (
                  <details key={i} className="group border border-border/20 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                    <summary className="cursor-pointer px-6 py-5 text-[11px] font-black text-white uppercase tracking-[0.05em] list-none flex justify-between items-center">
                      {q}
                      <span className="text-white/20 group-open:rotate-45 transition-transform text-lg font-bold">+</span>
                    </summary>
                    <p className="px-6 pb-5 text-[13px] text-white/50 leading-[1.7]">
                      {a}
                      {link && <Link to={link} className="block mt-2 text-primary/60 hover:text-primary text-[10px] font-black uppercase tracking-[0.15em] transition-colors">Browse templates →</Link>}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* ── Size Guide (collapsible) ── */}
            <section className="mb-20">
              <button
                onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                className={`w-full flex items-center justify-between px-6 py-5 border border-border/20 transition-all hover:bg-white/[0.02] cursor-pointer bg-transparent text-left ${sizeGuideOpen ? 'border-b-0' : ''}`}
              >
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.15em]">Full Size Guide — All Platforms</h3>
                <span className={`text-white/20 text-lg font-bold transition-transform duration-200 ${sizeGuideOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
              {sizeGuideOpen && (
                <div className="border border-border/20 border-t-0 p-6 animate-in fade-in duration-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/20">
                          <th className="pb-3 pr-4 text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Platform</th>
                          <th className="pb-3 pr-4 text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Format</th>
                          <th className="pb-3 pr-4 text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Dimensions</th>
                          <th className="pb-3 text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Ratio</th>
                        </tr>
                      </thead>
                      <tbody className="text-[10px] font-bold text-white/60">
                        {[
                          ['Instagram', 'instagram-templates', 'Story / Reel', '1080 × 1920', '9:16'],
                          ['Instagram', 'instagram-templates', 'Feed Post', '1080 × 1350', '4:5'],
                          ['Instagram', 'instagram-templates', 'Square Post', '1080 × 1080', '1:1'],
                          ['YouTube', 'youtube-templates', 'Thumbnail', '1280 × 720', '16:9'],
                          ['YouTube', 'youtube-templates', 'Channel Banner', '2560 × 1440', '16:9'],
                          ['TikTok', 'tiktok-templates', 'Video', '1080 × 1920', '9:16'],
                          ['LinkedIn', 'linkedin-templates', 'Profile Banner', '1584 × 396', '4:1'],
                          ['LinkedIn', 'linkedin-templates', 'Post', '1080 × 1350', '4:5'],
                          ['Facebook', 'facebook-templates', 'Cover Photo', '1640 × 856', '~2:1'],
                          ['Facebook', 'facebook-templates', 'Shared Image', '1200 × 630', '~2:1'],
                          ['X (Twitter)', 'x-templates', 'Post', '1080 × 1350', '4:5'],
                          ['X (Twitter)', 'x-templates', 'Header', '1500 × 500', '3:1'],
                          ['Pinterest', 'pinterest-templates', 'Pin', '1000 × 1500', '2:3'],
                          ['Snapchat', 'snapchat-templates', 'Story / Ad', '1080 × 1920', '9:16'],
                          ['Threads', 'threads-templates', 'Post', '1080 × 1920', '9:16'],
                          ['Bluesky', 'bluesky-templates', 'Post', '1080 × 1080', '1:1'],
                        ].map(([platform, slug, format, dimensions, ratio], i) => (
                          <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 pr-4"><Link to={`/${slug}`} className="text-white/50 hover:text-primary transition-colors uppercase tracking-wider">{platform}</Link></td>
                            <td className="py-2.5 pr-4 uppercase tracking-wider">{format}</td>
                            <td className="py-2.5 pr-4 text-primary/70 font-black tracking-[0.05em]">{dimensions}</td>
                            <td className="py-2.5 uppercase tracking-wider text-white/40">{ratio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* ── Footer Nav ── */}
            <nav className="pt-8 border-t border-border/20">
              <p className="text-[9px] font-black text-white/15 uppercase tracking-[0.2em] mb-4">All Platforms</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <Link
                    key={p.id}
                    to={`/${p.slug}`}
                    className="text-[9px] font-black uppercase tracking-[0.15em] text-white/30 hover:text-white px-3.5 py-2 border border-white/[0.06] hover:border-white/15 transition-all"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </nav>

          </div>
        </div>

        <RandomGeneratorModal
          isOpen={isRandomGeneratorOpen}
          onClose={() => setIsRandomGeneratorOpen(false)}
        />
      </Layout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<PlatformPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
