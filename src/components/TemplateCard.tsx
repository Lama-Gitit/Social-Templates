import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { generateSVG, type Template } from '../data/platforms';

interface TemplateCardProps {
    template: Template;
    platformColor: string;
}

export function TemplateCard({ template, platformColor }: TemplateCardProps) {
    const [copied, setCopied] = useState(false);
    const aspectRatio = template.width / template.height;

    const handleCopy = async () => {
        const svgCode = generateSVG(template, platformColor);
        try {
            await navigator.clipboard.writeText(svgCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy API', err);
        }
    };

    return (
        <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-purple-500/5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-slate-200 text-sm">{template.label}</h3>
                    <p className="text-xs text-slate-500">{template.width} x {template.height} px</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                    {template.category}
                </span>
            </div>

            {/* Preview Area */}
            <div className="flex-grow bg-slate-950/50 rounded-lg flex items-center justify-center p-4 mb-4 relative overflow-hidden border border-dashed border-slate-800 group-hover:border-slate-700 transition-colors">
                <div
                    className="border-2 rounded flex items-center justify-center text-[10px] text-center p-2 relative shadow-sm transition-transform group-hover:scale-105"
                    style={{
                        borderColor: platformColor,
                        backgroundColor: `${platformColor}10`, // 10% opacity hex
                        aspectRatio: `${aspectRatio}`,
                        height: aspectRatio > 1 ? 'auto' : '100px',
                        width: aspectRatio > 1 ? '100px' : 'auto',
                        maxHeight: '100%',
                        maxWidth: '100%',
                    }}
                >
                    <span style={{ color: platformColor }} className="font-bold opacity-80">
                        {aspectRatio.toFixed(2)}:1
                    </span>
                </div>
            </div>

            <div className="group/tooltip relative">
                <p className="text-xs text-slate-400 mb-4 h-8 leading-4 overflow-hidden line-clamp-2">
                    {template.desc}
                </p>
                {/* Tooltip for full description */}
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block w-full bg-slate-800 text-xs text-slate-200 p-2 rounded-lg border border-slate-700 shadow-xl z-10 pointer-events-none">
                    {template.desc}
                </div>
            </div>

            <button
                onClick={handleCopy}
                className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95"
                style={{
                    backgroundColor: copied ? '#22c55e20' : `${platformColor}15`,
                    color: copied ? '#4ade80' : platformColor
                }}
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied SVG' : 'Copy Template'}
            </button>
        </div>
    );
}
