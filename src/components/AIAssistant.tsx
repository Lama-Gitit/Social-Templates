import { useState } from 'react';
import { Send, X, Bot, Copy, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { generateSocialContent } from '../lib/gemini';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    platformName: string;
    platformColor: string;
}

export function AIAssistant({ isOpen, onClose, platformName, platformColor }: AIAssistantProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">AI Content Assistant</h3>
                            <p className="text-sm text-slate-400">Generating for <span className="font-semibold" style={{ color: platformColor }}>{platformName}</span></p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-grow space-y-6">
                    {!response && !isLoading && (
                        <div className="text-center py-12 px-4">
                            <div className="w-16 h-16 bg-slate-800 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wand2 size={32} />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-200 mb-2">Brainstorming made easy</h4>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Enter a topic, brand, or idea below. We'll generate captions and visual concepts perfectly tailored for {platformName}.
                            </p>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-400">What are you posting about?</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="e.g., Summer Sale, New Coffee Blend, Motivational Monday..."
                                className="flex-grow px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading || !topic.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2 min-w-[120px] justify-center shadow-lg shadow-purple-500/20"
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <><Send size={18} /> Generate</>}
                            </button>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3 border border-red-500/20">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            {error}
                        </div>
                    )}

                    {/* Results Area */}
                    {response && (
                        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 animate-fade-in-up">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Gemini Suggestions</h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleGenerate}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                        title="Regenerate"
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {response}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                {response && (
                    <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(response);
                            }}
                            className="text-sm text-purple-400 font-medium hover:text-purple-300 flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Copy size={16} /> Copy All Text
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
