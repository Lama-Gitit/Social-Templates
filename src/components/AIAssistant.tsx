import { useState } from 'react';
import { Send, X, Bot, Copy, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { generateSocialContent } from '../lib/gemini';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    platformName: string;
}

export function AIAssistant({ isOpen, onClose, platformName }: AIAssistantProps) {
    const [topic, setTopic] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setError('');
        setResponse('');

        try {
            // We're passing the topic as the "prompt" and platform as context
            const result = await generateSocialContent(topic, platformName);
            setResponse(result);
        } catch (err) {
            console.error(err);
            setError('Failed to generate content. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-background border border-border/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 rounded-sm">

                {/* Modal Header */}
                <div className="p-8 border-b border-border/20 flex justify-between items-center bg-card/30">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm text-primary">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">AI Content Assistant</h3>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">SVG Templates for Social Content · <span className="text-primary font-black">{platformName}</span></p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto flex-grow space-y-8">
                    {!response && !isLoading && (
                        <div className="text-center py-16 px-4">
                            <div className="w-20 h-20 bg-card border border-border/40 text-primary/40 rounded-sm flex items-center justify-center mx-auto mb-6 relative group">
                                <Wand2 size={36} className="group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-3">Neural Environment Synthesis</h4>
                            <p className="text-[10px] text-white/40 max-w-md mx-auto uppercase tracking-widest leading-relaxed">
                                Deploy a targeted brainstorming sequence. Generated data is optimized for {platformName} architecture standards.
                            </p>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Target Objective</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="E.G. SUMMER SALE, BRAND LAUNCH, PRODUCT DEMO..."
                                className="flex-grow px-5 py-5 bg-card/50 border border-border/20 rounded-sm text-[10px] font-black tracking-[0.3em] text-foreground placeholder-white/5 focus:outline-none focus:border-primary/40 focus:bg-card/80 transition-all uppercase"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading || !topic.trim()}
                                className="px-8 py-5 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-sm transition-all duration-300 flex items-center gap-3 min-w-[160px] justify-center shadow-[0_0_30px_hsla(var(--primary),0.3)] hover:shadow-[0_0_50px_hsla(var(--primary),0.5)] active:scale-95 disabled:opacity-30 disabled:shadow-none"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> Deploy</>}
                            </button>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="bg-primary/5 text-primary p-5 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-4 border border-primary/20 animate-in fade-in slide-in-from-top-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            {error}
                        </div>
                    )}

                    {/* Results Area */}
                    {response && (
                        <div className="bg-card/30 rounded-sm p-8 border border-border/20 animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">Synthetic Output / Gemini-1.5-Pro</h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleGenerate}
                                        className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                                        title="Regenerate"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none text-white/80 text-[11px] font-medium whitespace-pre-wrap leading-relaxed selection:bg-primary selection:text-white">
                                {response}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                {response && (
                    <div className="p-6 border-t border-border/10 bg-card/20 flex justify-end">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(response);
                            }}
                            className="text-[9px] text-primary font-black uppercase tracking-[0.4em] flex items-center gap-3 px-6 py-3 hover:bg-primary/10 border border-primary/20 rounded-sm transition-all duration-300"
                        >
                            <Copy size={14} /> Copy Text
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
