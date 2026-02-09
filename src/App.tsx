import { useState } from 'react';
import { Layout } from './components/Layout';
import { TemplateCard } from './components/TemplateCard';
import { AIAssistant } from './components/AIAssistant';
import { RandomGeneratorModal } from './components/RandomGeneratorModal';
import { PLATFORMS } from './data/platforms';
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
  let h = 0, s = 0, l = (max + min) / 2;
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

function App() {
  const [activePlatformId, setActivePlatformId] = useState<string | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRandomGeneratorOpen, setIsRandomGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activePlatform = PLATFORMS.find(p => p.id === activePlatformId);
  const themeHSL = activePlatform ? hexToHSL(activePlatform.brandColor || activePlatform.color) : '5 74% 47%';

  // Filter essential formats specifically
  const filteredMostUsed = MOST_USED.filter(size =>
    size.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Platform list remains static for navigation
  const filteredPlatforms = PLATFORMS;

  return (
    <div style={{ '--primary': themeHSL } as React.CSSProperties}>
      <Layout
        activePlatformId={activePlatformId}
        onSelectPlatform={setActivePlatformId}
        onOpenRandomGenerator={() => setIsRandomGeneratorOpen(true)}
      >
        <div className="flex flex-col gap-12">
          {activePlatform ? (
            // --- Platform View ---
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 pb-8 md:pb-12 border-b border-border/40">
                <div className="flex items-center gap-6 md:gap-10">
                  <div className="p-4 md:p-8 bg-card border border-border/40 rounded-sm">
                    <activePlatform.icon size={32} className="md:w-14 md:h-14" style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div>
                    <h1 className="text-us md:text-uxl font-black tracking-tighter text-foreground uppercase leading-none">{activePlatform.name}</h1>
                    <p className="text-[9px] md:text-[11px] font-black mt-2 md:mt-4 tracking-[0.3em] uppercase opacity-40">SVG Templates for Social Content · 2026</p>
                  </div>
                </div>
              </header>

              <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-3">
                  <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--primary))' }}>Environment Strategy</h3>
                  <p className="text-foreground text-3xl leading-tight font-black tracking-tighter uppercase">{activePlatform.intro}</p>
                </div>
                <div className="bg-card/50 p-8 border border-border/40 rounded">
                  <h4 className="text-[9px] font-black text-muted-foreground mb-6 flex items-center gap-2 uppercase tracking-[0.3em] opacity-40">
                    System Logic
                  </h4>
                  <ul className="space-y-4">
                    {activePlatform.tips.map((tip, idx) => (
                      <li key={idx} className="text-[10px] text-foreground flex items-start gap-4 font-black uppercase tracking-wider leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activePlatform.templates.map((template, idx) => (
                  <TemplateCard
                    key={idx}
                    template={template}
                    platformColor={activePlatform.color}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-1000">
              {/* --- Dashboard View --- */}
              <header className="mb-8 md:mb-32">
                <div className="mb-4 md:mb-8 opacity-40">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em]">Social Templates Library · 2026</p>
                </div>
                <h1 className="text-[48px] sm:text-[64px] md:text-[90px] lg:text-[120px] font-black text-foreground mb-4 md:mb-8 tracking-tighter uppercase leading-[0.9] md:leading-[0.8] block overflow-visible">
                  Copy‑ready<br />Social SVG<br /><span className="text-primary"> Templates</span>
                </h1>
                <div className="max-w-xl">
                  <p className="text-white/60 font-medium text-base md:text-lg uppercase tracking-[0.1em] leading-relaxed">
                    Pick a platform, choose a format, and copy the perfect SVG frame into your design tool.
                  </p>
                </div>
              </header>

              {/* Essential Formats Section */}
              <section className="mb-20 md:mb-40">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-16 pb-8 border-b border-border/10">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Essential Formats</h2>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Quick Deployment Kit</p>
                  </div>

                  <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="SEARCH ENVIRONMENTS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-card/30 border border-border/20 rounded-sm py-5 pl-12 pr-4 text-[9px] font-black tracking-[0.4em] text-foreground placeholder-white/10 focus:outline-none focus:border-primary/40 focus:bg-card/50 transition-all uppercase"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredMostUsed.map((size) => {
                    const platform = PLATFORMS.find(p => p.id === size.platformId)!;
                    return (
                      <button
                        key={size.label}
                        onClick={() => setActivePlatformId(platform.id)}
                        className="group bg-card p-6 md:p-8 border border-border/40 hover:bg-white/5 hover:border-foreground/20 transition-all text-left flex flex-col gap-4 md:gap-6 active:scale-[0.98]"
                      >
                        <div className="flex justify-between items-start">
                          <platform.icon size={18} className="text-white/80 group-hover:text-white transition-colors" />
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{size.width}x{size.height}</span>
                        </div>
                        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{size.label}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Studio System Section */}
              <section className="mb-24">
                <header className="mb-16 pb-6 border-b border-border/20">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Social Platforms</h2>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setActivePlatformId(platform.id)}
                      className="group bg-card p-8 border border-border/40 transition-all text-left flex flex-col items-center justify-center gap-6 hover:bg-white/5 hover:border-foreground/20 active:scale-95"
                    >
                      <platform.icon size={28} className="text-white/60 group-hover:text-white transition-all duration-500" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-all">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {filteredPlatforms.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">No matching environments</p>
                </div>
              )}
            </div>
          )}
        </div>

        <AIAssistant
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          platformName={activePlatform?.name || ''}
        />

        <RandomGeneratorModal
          isOpen={isRandomGeneratorOpen}
          onClose={() => setIsRandomGeneratorOpen(false)}
        />
      </Layout >
    </div >
  )
}

export default App
