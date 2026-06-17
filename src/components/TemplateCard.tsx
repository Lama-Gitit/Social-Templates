import { Copy, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn, trackCopy } from '../lib/utils';
import { generateSVG, type Template } from '../data/platforms';

interface TemplateCardProps {
    template: Template;
    platformColor: string;
    platformId?: string;
}

export function TemplateCard({ template, platformColor, platformId }: TemplateCardProps) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const aspectRatio = template.width / template.height;

    const handleCopy = async () => {
        const svgCode = generateSVG(template, platformColor);
        try {
            await navigator.clipboard.writeText(svgCode);
            if (platformId) trackCopy(platformId, template.label);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setCopied(true);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy SVG', err);
        }
    };

    return (
        <div className="group relative bg-card border border-border/40 rounded p-5 transition-all hover:bg-white/5 hover:border-primary/50 flex flex-col h-full active:scale-[0.99]">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="font-black text-foreground text-[11px] uppercase tracking-tight">{template.label}</h3>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{template.width} x {template.height} px</p>
                </div>
                <span
                    className="text-[8px] uppercase font-black tracking-widest border px-2 py-1 rounded"
                    style={{
                        color: 'hsl(var(--primary))',
                        borderColor: 'hsla(var(--primary), 0.3)'
                    }}
                >
                    {template.category}
                </span>
            </div>

            {/* Preview Area */}
            <div className="flex-grow bg-background rounded-sm flex items-center justify-center p-8 mb-6 relative overflow-hidden border border-border/20 group-hover:border-primary/30 transition-all duration-500">
                <div
                    className="flex items-center justify-center text-center p-4 relative transition-all duration-700 ease-in-out group-hover:scale-110"
                    style={{
                        borderColor: 'hsl(var(--primary))',
                        borderWidth: '1px',
                        backgroundColor: 'hsla(var(--primary), 0.03)',
                        aspectRatio: `${aspectRatio}`,
                        // Drive sizing off width for every ratio and let height follow via
                        // aspect-ratio. This keeps the frame's true proportions even when the
                        // card is narrower than the target — a square stays square instead of
                        // being stretched into a rectangle by maxWidth clamping.
                        width: aspectRatio >= 1 ? '150px' : `${Math.round(150 * aspectRatio)}px`,
                        height: 'auto',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        boxShadow: `0 0 40px -10px hsla(var(--primary), 0.2)`,
                    }}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
                            backgroundSize: '10px 10px'
                        }}
                    />
                    <span
                        className="font-black text-[10px] tracking-[0.2em] uppercase z-10"
                        style={{ color: 'hsl(var(--primary))' }}
                    >
                        {aspectRatio.toFixed(2)}:1
                    </span>
                </div>
            </div>

            <div className="group/tooltip relative mb-6">
                <p className="text-[10px] text-muted-foreground leading-relaxed font-bold uppercase tracking-wide h-8 overflow-hidden line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {template.desc}
                </p>
                <div className="absolute bottom-full left-0 mb-4 hidden group-hover/tooltip:block w-full bg-[#0B0B0D] text-foreground text-[9px] p-4 rounded-sm border border-border/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 pointer-events-none uppercase tracking-[0.2em] font-black animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-primary mb-2 opacity-50">Description</div>
                    {template.desc}
                </div>
            </div>

            <button
                onClick={handleCopy}
                className={cn(
                    "w-full mt-auto flex items-center justify-center gap-3 py-4 rounded-sm text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-300 active:scale-[0.97] border",
                    copied
                        ? "bg-primary text-white border-primary shadow-[0_0_20px_hsla(var(--primary),0.4)]"
                        : "bg-transparent text-primary border-primary/30 hover:bg-primary/5 hover:border-primary/60"
                )}
            >
                {copied ? <Check size={12} className="animate-in zoom-in duration-300" /> : <Copy size={12} />}
                {copied ? 'Success' : 'Copy SVG Frame'}
            </button>
        </div>
    );
}
