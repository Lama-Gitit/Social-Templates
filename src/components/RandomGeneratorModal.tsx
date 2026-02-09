import { useState, useEffect } from 'react';
import { Shuffle, X, ArrowLeft, Loader2, Sparkles, Check, Copy } from 'lucide-react';
import { generateLayoutJSON } from '../lib/gemini';
import { PLATFORMS, generateCreativeSVG, type PlatformData } from '../data/platforms';

interface RandomGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RandomGeneratorModal({ isOpen, onClose }: RandomGeneratorModalProps) {
    const [step, setStep] = useState(1);
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformData | null>(null);
    const [selectedType, setSelectedType] = useState<'square' | 'vertical' | 'landscape' | null>(null);
    const [generatedResults, setGeneratedResults] = useState<{ svg: string, label: string }[]>([]);
    const [toast, setToast] = useState<{ show: boolean, msg: string }>({ show: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');
    const [history, setHistory] = useState<{ id: string, label: string, svg: string, platform: string, date: string }[]>([]);
    const [usage, setUsage] = useState({
        lastTimes: [] as number[],
        dailyCount: 0,
        today: new Date().toDateString()
    });

    useEffect(() => {
        // Load Usage
        const savedUsage = localStorage.getItem('generator_usage');
        if (savedUsage) {
            try {
                const parsed = JSON.parse(savedUsage);
                const today = new Date().toDateString();
                if (parsed.today === today) {
                    const lastTimes = Array.isArray(parsed.lastTimes)
                        ? parsed.lastTimes
                        : (parsed.lastTime ? [parsed.lastTime] : []);
                    setUsage({
                        lastTimes,
                        dailyCount: parsed.dailyCount || 0,
                        today: parsed.today
                    });
                } else {
                    setUsage({ lastTimes: [], dailyCount: 0, today });
                }
            } catch (e) {
                console.error("Failed to parse usage data", e);
            }
        }

        // Load History
        const savedHistory = localStorage.getItem('generator_history');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse history data", e);
            }
        }
    }, []);

    const saveHistory = (newHistory: typeof history) => {
        setHistory(newHistory);
        localStorage.setItem('generator_history', JSON.stringify(newHistory));
    };

    const updateUsage = () => {
        const now = Date.now();
        const newUsage = {
            lastTimes: [...usage.lastTimes.slice(-1), now],
            dailyCount: usage.dailyCount + 1,
            today: usage.today
        };
        setUsage(newUsage);
        localStorage.setItem('generator_usage', JSON.stringify(newUsage));
    };

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelectedPlatform(null);
            setSelectedType(null);
            setGeneratedResults([]);
            setLoading(false);
        }
    }, [isOpen]);

    const handleGenerate = async () => {
        if (!selectedPlatform || !selectedType) return;

        // Rate Limits
        const now = Date.now();

        // 5 Per Day
        if (usage.dailyCount >= 5) {
            setToast({ show: true, msg: "Daily limit reached (5/day). Try again tomorrow!" });
            return;
        }

        // 2 Per Minute
        const minuteAgo = now - 60000;
        const recentGens = usage.lastTimes.filter(t => t > minuteAgo);
        if (recentGens.length >= 2) {
            setToast({ show: true, msg: "Slow down! Max 2 generations per minute." });
            return;
        }

        // Determine Dimensions
        let w = 1080;
        let h = 1080;
        if (selectedType === 'vertical') {
            h = 1350; // 4:5 Standard
        } else if (selectedType === 'landscape') {
            w = 1200; h = 675; // 16:9 Standard
        }

        setLoading(true);

        try {
            const prompt = `Generate 3 distinct, modern, geometric social media layout templates for ${selectedPlatform.name} (${selectedType} format, ${w}x${h}). 
      Primary brand color is '${selectedPlatform.color}'.
      
      1. **Minimalist**: Clean lines, whitespace, simple text placeholders.
      2. **Geometric**: Bold shapes using the brand color, diagonal splits or circles.
      3. **Editorial**: Magazine style, elegant borders, designated photo zones.
      
      Return a JSON object with this EXACT structure:
      {
        "templates": [
          { "label": "Minimalist", "svg_inner": "..." },
          { "label": "Geometric", "svg_inner": "..." },
          { "label": "Editorial", "svg_inner": "..." }
        ]
      }
      
      IMPORTANT RULES:
      - 'svg_inner' must contain ONLY valid SVG elements (rect, circle, path, text, line, polygon) to go INSIDE an <svg> tag. 
      - Do NOT include the <svg> wrapper tag itself.
      - Use the provided width (${w}) and height (${h}) for all coordinates.
      - Ensure text is visible and elements are within bounds.
      - Use opacity for background fills (e.g. fill-opacity="0.1").
      - Response must be raw JSON, no markdown formatting.
      
      PREVIOUS STYLES (DO NOT REPEAT): ${history.length > 0 ? history.map(h => h.label).join(", ") : "None yet"}.
      Make these 3 layouts fundamentally different from the previous ones.`;

            // Call the real API
            const data = await generateLayoutJSON(prompt);

            if (data && data.templates) {
                const results = data.templates.map((t: { label: string; svg_inner: string }) => ({
                    label: t.label,
                    svg: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="#0f172a"/>${t.svg_inner}</svg>`
                }));
                setGeneratedResults(results);

                // Update persistent history (Max 20 items)
                const newHistoryItems = results.map((r: { label: string; svg: string }) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    label: r.label,
                    svg: r.svg,
                    platform: selectedPlatform.name,
                    date: new Date().toLocaleString()
                }));
                saveHistory([...newHistoryItems, ...history].slice(0, 20));

                updateUsage();
                setStep(3);
            } else {
                throw new Error("Invalid API response structure");
            }

        } catch (err) {
            console.error("AI Generation failed, using static fallback", err);
            // Fallback to static generator
            const results = [
                { svg: generateCreativeSVG(w, h, selectedPlatform.brandColor, 0, selectedPlatform.name), label: 'Diagonal Split (Offline)' },
                { svg: generateCreativeSVG(w, h, selectedPlatform.brandColor, 1, selectedPlatform.name), label: 'Modern Grid (Offline)' },
                { svg: generateCreativeSVG(w, h, selectedPlatform.brandColor, 2, selectedPlatform.name), label: 'Editorial Frame (Offline)' },
            ];
            setGeneratedResults(results);
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (svg: string, label: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = svg;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setToast({ show: true, msg: `Copied ${label}!` });
                setTimeout(() => setToast({ show: false, msg: '' }), 2000);
            }
        } catch (err) {
            console.error('Copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-background border border-border/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 rounded-sm">

                {/* Header */}
                <div className="px-8 py-6 border-b border-border/20 bg-card/30">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-6">
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary">
                                <Shuffle size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">Neural Template Generator</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] px-2 py-0.5 rounded-sm bg-primary/20 border border-primary/30 text-primary uppercase font-black tracking-widest">
                                        {Math.max(0, 5 - usage.dailyCount)} CYCLES REMAINING
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 text-white/40 hover:bg-white/5 hover:text-white rounded-full transition-all duration-300"><X size={24} /></button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('generate')}
                            className={`pb-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === 'generate' ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                        >
                            Generation Core
                            {activeTab === 'generate' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`pb-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === 'history' ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                        >
                            Archive {history.length > 0 && `[${history.length}]`}
                            {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_hsla(var(--primary),0.5)]" />}
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto flex-grow relative bg-background/50">
                    {activeTab === 'history' ? (
                        <div className="space-y-8">
                            {history.length === 0 ? (
                                <div className="text-center py-32">
                                    <div className="w-24 h-24 bg-card border border-border/40 rounded-sm flex items-center justify-center mx-auto mb-6 text-white/10">
                                        <Shuffle size={48} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-tight mb-2">Archive Empty</h4>
                                    <p className="text-white/30 text-[10px] uppercase tracking-widest">Execute a generation cycle to populate the archive.</p>
                                    <button
                                        onClick={() => setActiveTab('generate')}
                                        className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                    >
                                        Return to Core
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {history.map((res) => (
                                        <div key={res.id} className="bg-card/30 p-5 rounded-sm border border-border/20 hover:border-primary/40 transition-all duration-500 group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-black text-white text-[11px] uppercase tracking-tight truncate pr-2 group-hover:text-primary transition-colors">{res.label}</h4>
                                                    <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mt-1">{res.platform}</p>
                                                </div>
                                            </div>
                                            <div className="bg-background border border-border/40 rounded-sm mb-5 overflow-hidden flex items-center justify-center p-6 relative aspect-[4/3] group-hover:border-primary/20 transition-all duration-700">
                                                <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"
                                                    style={{
                                                        backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
                                                        backgroundSize: '10px 10px'
                                                    }}
                                                />
                                                <div
                                                    className="w-full max-h-full flex justify-center scale-90 transition-transform duration-700 group-hover:scale-105"
                                                    dangerouslySetInnerHTML={{ __html: res.svg.replace('<svg', '<svg style="max-width:100%; height:auto;"') }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(res.svg, res.label)}
                                                className="w-full py-4 bg-primary/5 hover:bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.4em] rounded-sm border border-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                                            >
                                                <Copy size={12} /> Copy SVG Frame
                                            </button>
                                            <div className="mt-4 text-[8px] text-white/20 border-t border-border/10 pt-4 flex justify-between uppercase tracking-[0.2em] font-black">
                                                <span>{res.date.split(',')[0]}</span>
                                                <span>{res.date.split(',')[1]}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* STEP 1: Platform */}
                            {step === 1 && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">01. Choose Platform</h2>
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Select target system environment</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                        {PLATFORMS.map(p => (
                                            <button
                                                key={p.id}
                                                onClick={() => { setSelectedPlatform(p); setStep(2); }}
                                                className="flex flex-col items-center gap-4 p-8 rounded-sm border border-border/20 bg-card/20 hover:border-primary/50 hover:bg-card/40 hover:shadow-[0_0_40px_-10px_hsla(var(--primary),0.3)] transition-all duration-500 group"
                                            >
                                                <p.icon size={32} style={{ color: p.color }} className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Format */}
                            {step === 2 && selectedPlatform && (
                                <div className="space-y-12 max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <button onClick={() => setStep(1)} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-all duration-300">
                                        <ArrowLeft size={14} /> Back to Systems
                                    </button>

                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-sm bg-card/50 flex items-center justify-center border border-border/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                            <selectedPlatform.icon size={32} style={{ color: selectedPlatform.color }} />
                                        </div>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">02. Geometric Format</h2>
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Optimizing for {selectedPlatform.name} logic</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <button
                                            onClick={() => setSelectedType('vertical')}
                                            className={`p-10 border rounded-sm flex flex-col items-center gap-8 transition-all duration-500 group ${selectedType === 'vertical' ? 'border-primary bg-primary/5 shadow-[0_0_40px_-5px_hsla(var(--primary),0.2)]' : 'border-border/20 bg-card/10 hover:border-border/60 hover:bg-card/20'}`}
                                        >
                                            <div className={`w-12 h-16 rounded-sm border transition-all duration-500 ${selectedType === 'vertical' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}></div>
                                            <div className="text-center">
                                                <span className={`block font-black uppercase tracking-[0.3em] text-[11px] mb-2 ${selectedType === 'vertical' ? 'text-primary' : 'text-white/60'}`}>Vertical</span>
                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">4:5 Portrait</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedType('square')}
                                            className={`p-10 border rounded-sm flex flex-col items-center gap-8 transition-all duration-500 group ${selectedType === 'square' ? 'border-primary bg-primary/5 shadow-[0_0_40px_-5px_hsla(var(--primary),0.2)]' : 'border-border/20 bg-card/10 hover:border-border/60 hover:bg-card/20'}`}
                                        >
                                            <div className={`w-14 h-14 rounded-sm border transition-all duration-500 ${selectedType === 'square' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}></div>
                                            <div className="text-center">
                                                <span className={`block font-black uppercase tracking-[0.3em] text-[11px] mb-2 ${selectedType === 'square' ? 'text-primary' : 'text-white/60'}`}>Square</span>
                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">1:1 Classic</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setSelectedType('landscape')}
                                            className={`p-10 border rounded-sm flex flex-col items-center gap-8 transition-all duration-500 group ${selectedType === 'landscape' ? 'border-primary bg-primary/5 shadow-[0_0_40px_-5px_hsla(var(--primary),0.2)]' : 'border-border/20 bg-card/10 hover:border-border/60 hover:bg-card/20'}`}
                                        >
                                            <div className={`w-20 h-10 rounded-sm border transition-all duration-500 ${selectedType === 'landscape' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}></div>
                                            <div className="text-center">
                                                <span className={`block font-black uppercase tracking-[0.3em] text-[11px] mb-2 ${selectedType === 'landscape' ? 'text-primary' : 'text-white/60'}`}>Landscape</span>
                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">16:9 Cinematic</span>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex justify-center mt-12 pb-8">
                                        <button
                                            onClick={handleGenerate}
                                            disabled={!selectedType || loading}
                                            className="px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-sm shadow-[0_0_50px_-5px_hsla(var(--primary),0.4)] hover:shadow-[0_0_70px_hsla(var(--primary),0.6)] transition-all duration-500 flex items-center gap-4 transform active:scale-95 disabled:opacity-30 disabled:shadow-none"
                                        >
                                            <Sparkles size={18} /> Execute Cycle
                                        </button>
                                    </div>

                                    {loading && (
                                        <div className="absolute inset-0 bg-background/80 z-20 flex flex-col items-center justify-center rounded-sm backdrop-blur-md animate-in fade-in duration-500">
                                            <div className="relative mb-8">
                                                <Loader2 size={64} className="animate-spin text-primary" />
                                                <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse" />
                                            </div>
                                            <p className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Architecting Layouts</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] animate-pulse">Running Neural Simulation...</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 3: Results */}
                            {step === 3 && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex justify-between items-center pb-6 border-b border-border/20">
                                        <button onClick={() => setStep(2)} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-all duration-300">
                                            <ArrowLeft size={14} /> Back
                                        </button>
                                        <div className="flex items-center gap-3 text-primary bg-primary/5 border border-primary/20 px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.3em]">
                                            <Check size={16} /> Synthesis Complete
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {generatedResults.map((res, i) => (
                                            <div key={i} className="bg-card/30 p-6 rounded-sm border border-border/20 hover:border-primary/40 transition-all duration-700 group">
                                                <h4 className="font-black text-white text-[11px] uppercase tracking-[0.3em] mb-4 group-hover:text-primary transition-colors">{res.label}</h4>
                                                <div className="bg-background border border-border/40 rounded-sm mb-6 overflow-hidden flex items-center justify-center p-8 relative transition-all duration-700 group-hover:border-primary/20 shadow-inner">
                                                    <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity"
                                                        style={{
                                                            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
                                                            backgroundSize: '10px 10px'
                                                        }}
                                                    />
                                                    <div
                                                        className="w-full max-h-[250px] flex justify-center scale-95 transition-transform duration-700 group-hover:scale-110"
                                                        dangerouslySetInnerHTML={{ __html: res.svg.replace('<svg', '<svg style="max-width:100%; height:auto;"') }}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(res.svg, res.label)}
                                                    className="w-full py-4 bg-primary text-white text-[9px] font-black uppercase tracking-[0.5em] rounded-sm transition-all duration-300 shadow-[0_0_30px_hsla(var(--primary),0.3)] hover:shadow-[0_0_50px_hsla(var(--primary),0.5)] active:scale-95 border border-primary/20"
                                                >
                                                    <Copy size={12} className="inline mr-2" /> Copy SVG Frame
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Toast Notification */}
                                    {toast.show && (
                                        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-background border border-primary/40 text-primary px-8 py-4 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[110] animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                            {toast.msg}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
