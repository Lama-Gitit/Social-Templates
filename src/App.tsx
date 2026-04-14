import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TemplateCard } from './components/TemplateCard';
import { AIAssistant } from './components/AIAssistant';
import { RandomGeneratorModal } from './components/RandomGeneratorModalV2'; // v2
import { PLATFORMS } from './data/platforms';
import { usePageMeta } from './hooks/usePageMeta';
import { setAIToken } from './lib/anthropic';
import { Search } from 'lucide-react';

function hexToHSL(hex: string): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const MOST_USED = [
  { platformId: 'instagram', label: 'Instagram Stories', width: 1080, height: 1920 },
  { platformId: 'instagram', label: 'Instagram Feed (4:5)', width: 1080, height: 1350 },
  { platformId: 'youtube', label: 'YouTube Thumbnail', width: 1280, height: 720 },
  { platformId: 'tiktok', label: 'TikTok Video', width: 1080, height: 1920 },
  { platformId: 'x', label: 'X Header', width: 1500, height: 500 },
  { platformId: 'x', label: 'X Post (Vertical)', width: 1080, height: 1350 },
  { platformId: 'linkedin', label: 'LinkedIn Cover', width: 1584, height: 396 },
  { platformId: 'linkedin', label: 'LinkedIn Feed', width: 1080, height: 1350 },
  { platformId: 'facebook', label: 'Facebook Cover', width: 1640, height: 856 },
  { platformId: 'pinterest', label: 'Pinterest Pin', width: 1000, height: 1500 },
  { platformId: 'threads', label: 'Threads Post', width: 1080, height: 1920 },
  { platformId: 'snapchat', label: 'Snapchat Story', width: 1080, height: 1920 },
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
  const themeHSL = platform ? hexToHSL(platform.brandColor || platform.color) : '5 74% 47%';

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
                  {platform.tips.map((tip, idx) => (
                    <li key={idx} className="text-[10px] text-foreground flex items-start gap-4 font-black uppercase tracking-wider leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platform.templates.map((template, idx) => (
                <TemplateCard
                  key={idx}
                  template={template}
                  platformColor={platform.color}
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

// --- Home Page ---
function HomePage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRandomGeneratorOpen, setIsRandomGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const themeHSL = '5 74% 47%';

  usePageMeta({
    title: 'Social Frames | Free SVG Templates for Every Social Media Platform',
    description: 'Free library of copy-ready SVG templates for 10+ social media platforms. Instantly grab perfectly sized frames for Instagram Stories, YouTube Thumbnails, LinkedIn Banners, TikTok, and 45+ more formats.',
    canonicalPath: '/',
  });

  const filteredMostUsed = MOST_USED.filter(size =>
    size.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <header className="mb-8 md:mb-32">
              <div className="mb-4 md:mb-8 opacity-40">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em]">Social Frames Library</p>
              </div>
              <h1 className="text-[48px] sm:text-[64px] md:text-[90px] lg:text-[120px] font-black text-foreground mb-4 md:mb-8 tracking-tighter uppercase leading-[0.9] md:leading-[0.8] block overflow-visible">
                Copy&#x2011;ready<br />Social SVG<br /><span className="text-primary"> Templates</span>
              </h1>
              <div className="max-w-xl">
                <p className="text-white/60 font-medium text-base md:text-lg uppercase tracking-[0.1em] leading-relaxed">
                  Pick a platform, choose a format, and copy the perfect SVG frame into your design tool.
                </p>
              </div>
              <p className="max-w-2xl mt-6 md:mt-10 text-white/30 text-sm md:text-base leading-relaxed">
                A free library of copy-ready SVG frames for 10+ social media platforms, covering 45+ format sizes. From Instagram Stories (1080x1920) to YouTube Thumbnails (1280x720). Grab the exact dimensions you need and paste directly into Figma, Sketch, or any design tool.
              </p>
            </header>

            {/* Essential Formats Section */}
            <section className="mb-20 md:mb-40">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-16 pb-8 border-b border-border/10">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Essential Formats</h2>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Quick Deployment Kit</p>
                </div>

                <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="SEARCH FORMATS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-card/60 border border-white/20 rounded-sm py-5 pl-12 pr-4 text-[10px] font-black tracking-[0.4em] text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:bg-card/80 transition-all uppercase"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMostUsed.map((size) => {
                  const platform = PLATFORMS.find(p => p.id === size.platformId)!;
                  return (
                    <Link
                      key={size.label}
                      to={`/${platform.slug}`}
                      className="group bg-card p-6 md:p-8 border border-border/40 hover:bg-white/5 hover:border-foreground/20 transition-all text-left flex flex-col gap-4 md:gap-6 active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start">
                        <platform.icon size={18} className="text-white/80 group-hover:text-white transition-colors" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{size.width}x{size.height}</span>
                      </div>
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{size.label}</p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Social Platforms Section */}
            <section className="mb-24">
              <header className="mb-16 pb-6 border-b border-border/20">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Social Platforms</h2>
              </header>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {PLATFORMS.map((platform) => (
                  <Link
                    key={platform.id}
                    to={`/${platform.slug}`}
                    className="group bg-card p-8 border border-border/40 transition-all text-left flex flex-col items-center justify-center gap-6 hover:bg-white/5 hover:border-foreground/20 active:scale-95"
                  >
                    <platform.icon size={28} className="text-white/60 group-hover:text-white transition-all duration-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-all">{platform.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Social Media Size Guide */}
            <section className="mb-24">
              <header className="mb-12 pb-6 border-b border-border/20">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Social Media Size Guide</h2>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Every dimension you need, all in one place</p>
              </header>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="pb-4 pr-6 text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Platform</th>
                      <th className="pb-4 pr-6 text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Format</th>
                      <th className="pb-4 pr-6 text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Dimensions</th>
                      <th className="pb-4 text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Ratio</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] font-bold text-white/70">
                    {[
                      ['Instagram', 'instagram-templates', 'Story / Reel', '1080 x 1920', '9:16'],
                      ['Instagram', 'instagram-templates', 'Feed Post', '1080 x 1350', '4:5'],
                      ['Instagram', 'instagram-templates', 'Square Post', '1080 x 1080', '1:1'],
                      ['YouTube', 'youtube-templates', 'Thumbnail', '1280 x 720', '16:9'],
                      ['YouTube', 'youtube-templates', 'Channel Banner', '2560 x 1440', '16:9'],
                      ['TikTok', 'tiktok-templates', 'Video', '1080 x 1920', '9:16'],
                      ['LinkedIn', 'linkedin-templates', 'Profile Banner', '1584 x 396', '4:1'],
                      ['LinkedIn', 'linkedin-templates', 'Post', '1080 x 1350', '4:5'],
                      ['Facebook', 'facebook-templates', 'Cover Photo', '1640 x 856', '~2:1'],
                      ['Facebook', 'facebook-templates', 'Shared Image', '1200 x 630', '~2:1'],
                      ['X (Twitter)', 'x-templates', 'Post', '1080 x 1350', '4:5'],
                      ['X (Twitter)', 'x-templates', 'Header', '1500 x 500', '3:1'],
                      ['Pinterest', 'pinterest-templates', 'Pin', '1000 x 1500', '2:3'],
                      ['Snapchat', 'snapchat-templates', 'Story / Ad', '1080 x 1920', '9:16'],
                      ['Threads', 'threads-templates', 'Post', '1080 x 1920', '9:16'],
                      ['Bluesky', 'bluesky-templates', 'Post', '1080 x 1080', '1:1'],
                    ].map(([platform, slug, format, dimensions, ratio], i) => (
                      <tr key={i} className="border-b border-border/10 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 pr-6 uppercase tracking-wider"><Link to={`/${slug}`} className="text-white/50 hover:text-primary transition-colors">{platform}</Link></td>
                        <td className="py-3 pr-6 uppercase tracking-wider">{format}</td>
                        <td className="py-3 pr-6 uppercase tracking-widest text-primary/70 font-black">{dimensions}</td>
                        <td className="py-3 uppercase tracking-wider text-white/40">{ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-white/20 text-xs leading-relaxed max-w-2xl">
                All dimensions are in pixels. These are the recommended sizes for optimal quality across each platform. Sizes may vary as platforms update their specifications.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mb-24">
              <header className="mb-12 pb-6 border-b border-border/20">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Frequently Asked Questions</h2>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Common questions about social media sizes & templates</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { q: 'What size is an Instagram Story?', a: 'Instagram Stories are 1080 x 1920 pixels with a 9:16 aspect ratio. This same vertical format is used for Instagram Reels and other full-screen mobile content.', link: '/instagram-templates' },
                  { q: 'What size is a YouTube Thumbnail?', a: 'YouTube Thumbnails are 1280 x 720 pixels (16:9 aspect ratio). This is the recommended size for clear, high-quality thumbnails that display well on all devices.', link: '/youtube-templates' },
                  { q: 'What size is a LinkedIn Banner?', a: 'LinkedIn personal profile banners are 1584 x 396 pixels. LinkedIn company page covers are 1128 x 191 pixels. For LinkedIn feed posts, 1080 x 1350 pixels (4:5 ratio) gets the most screen real estate.', link: '/linkedin-templates' },
                  { q: 'What size is a TikTok video?', a: 'TikTok videos are 1080 x 1920 pixels with a 9:16 aspect ratio. This full-screen vertical format is the standard for all TikTok content including videos, ads, and stories.', link: '/tiktok-templates' },
                  { q: 'What size is a Facebook Cover Photo?', a: 'Facebook Cover Photos are 1640 x 856 pixels on desktop. Shared images in the feed perform best at 1200 x 630 pixels. Facebook Stories use the same 1080 x 1920 format as Instagram.', link: '/facebook-templates' },
                  { q: 'What are the standard social media image sizes?', a: 'The most common sizes are: Instagram Post 1080x1350, Instagram Story 1080x1920, YouTube Thumbnail 1280x720, Facebook Cover 1640x856, LinkedIn Banner 1584x396, TikTok Video 1080x1920, Pinterest Pin 1000x1500, and X/Twitter Post 1080x1350.' },
                  { q: 'What is Social Frames?', a: 'Social Frames is a free library of copy-ready SVG frames for 10+ social media platforms, covering 45+ format sizes. Pick a platform, choose a format, and instantly copy the perfect SVG frame into Figma, Sketch, or any design tool. It also includes an AI-powered template generator.' },
                ].map(({ q, a, link }, i) => (
                  <details key={i} className="group border border-border/20 rounded-sm bg-card/20 hover:bg-card/30 transition-colors">
                    <summary className="cursor-pointer px-6 py-5 text-[11px] font-black text-white uppercase tracking-wider list-none flex justify-between items-center">
                      {q}
                      <span className="text-white/20 group-open:rotate-45 transition-transform text-lg font-bold">+</span>
                    </summary>
                    <p className="px-6 pb-5 text-sm text-white/50 leading-relaxed">
                      {a}
                      {link && <Link to={link} className="block mt-2 text-primary/70 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">Browse templates →</Link>}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>

        <AIAssistant
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          platformName=""
        />

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
