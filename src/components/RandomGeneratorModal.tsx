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
      - Response must be raw JSON, no markdown formatting.`;

            // Call the real API
            const data = await generateLayoutJSON(prompt);

            if (data && data.templates) {
                const results = data.templates.map((t: { label: string; svg_inner: string }) => ({
                    label: t.label,
                    svg: `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="#0f172a"/>${t.svg_inner}</svg>`
                }));
                // Note: Changed background fill to slate-900 (#0f172a) for dark mode consistency
                setGeneratedResults(results);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Shuffle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Random Template Generator</h3>
                            <p className="text-sm text-slate-400">AI-Powered Unique Layouts</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full transition-colors"><X size={24} /></button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto flex-grow relative">

                    {/* STEP 1: Platform */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-center text-slate-200 mb-6">Step 1: Choose a Platform</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {PLATFORMS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => { setSelectedPlatform(p); setStep(2); }}
                                        className="flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-indigo-500 hover:bg-slate-900/80 transition-all group"
                                    >
                                        <p.icon size={32} style={{ color: p.color }} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium text-slate-300 group-hover:text-white">{p.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Format */}
                    {step === 2 && selectedPlatform && (
                        <div className="space-y-6 max-w-2xl mx-auto relative">
                            {loading && (
                                <div className="absolute inset-0 bg-slate-900/80 z-10 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                                    <Loader2 size={48} className="animate-spin text-indigo-500 mb-4" />
                                    <p className="text-lg font-semibold text-white">Designing Layouts...</p>
                                    <p className="text-sm text-slate-400">This usually takes 2-3 seconds</p>
                                </div>
                            )}

                            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
                                <ArrowLeft size={16} /> Back to Platforms
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <selectedPlatform.icon size={24} style={{ color: selectedPlatform.color }} />
                                </div>
                                <h2 className="text-lg font-bold text-white">Step 2: Choose Format for {selectedPlatform.name}</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setSelectedType('vertical')}
                                    className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${selectedType === 'vertical' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-600'}`}
                                >
                                    <div className="w-16 h-20 bg-slate-800 rounded border border-slate-700"></div>
                                    <div className="text-center">
                                        <span className="block font-bold text-slate-200">Vertical</span>
                                        <span className="text-xs text-slate-500">4:5 (Portrait)</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedType('square')}
                                    className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${selectedType === 'square' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-600'}`}
                                >
                                    <div className="w-16 h-16 bg-slate-800 rounded border border-slate-700"></div>
                                    <div className="text-center">
                                        <span className="block font-bold text-slate-200">Square</span>
                                        <span className="text-xs text-slate-500">1:1 (Classic)</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedType('landscape')}
                                    className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${selectedType === 'landscape' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-600'}`}
                                >
                                    <div className="w-20 h-12 bg-slate-800 rounded border border-slate-700 mt-4"></div>
                                    <div className="text-center mt-auto">
                                        <span className="block font-bold text-slate-200">Landscape</span>
                                        <span className="text-xs text-slate-500">16:9 (Wide)</span>
                                    </div>
                                </button>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!selectedType || loading}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2 transform active:scale-95"
                                >
                                    <Sparkles size={20} /> Generate with Gemini
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Results */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-6">
                                <button onClick={() => setStep(2)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-sm font-medium">
                                    <Check size={16} /> Generated 3 unique layouts
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {generatedResults.map((res, i) => (
                                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                                        <h4 className="font-bold text-slate-200 mb-2">{res.label}</h4>
                                        <div className="bg-slate-900 border border-slate-800 rounded mb-4 overflow-hidden flex items-center justify-center p-2">
                                            {/* SVG Preview (Injected) */}
                                            <div
                                                className="w-full max-h-[200px] flex justify-center"
                                                dangerouslySetInnerHTML={{ __html: res.svg.replace('<svg', '<svg style="max-width:100%; height:auto;"') }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(res.svg, res.label)}
                                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Copy size={16} /> Copy SVG
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Toast Notification */}
                            {toast.show && (
                                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-full shadow-xl shadow-black/50 z-[110] animate-fade-in-up flex items-center gap-2">
                                    <Check size={16} className="text-green-400" /> {toast.msg}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
