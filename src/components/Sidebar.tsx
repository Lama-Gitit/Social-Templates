import { LayoutGrid, Shuffle } from 'lucide-react';
import { cn } from '../lib/utils';
import { PLATFORMS } from '../data/platforms';

interface SidebarProps {
    className?: string;
    activePlatformId: string | null;
    onSelectPlatform: (id: string | null) => void;
    onOpenRandomGenerator: () => void;
}

export function Sidebar({ className, activePlatformId, onSelectPlatform, onOpenRandomGenerator }: SidebarProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background text-foreground w-64 p-4 border-r border-border/40", className)}>
            <div className="mb-12 p-3">
                <h1 className="text-xl font-black tracking-tighter text-foreground uppercase leading-none">
                    SOCIAL<br />FRAMES
                </h1>
                <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black mt-3">SVG Templates for Social Content</p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
                <button
                    onClick={() => onSelectPlatform(null)}
                    className={cn(
                        "flex items-center w-full p-2.5 rounded transition-all duration-200 group text-[10px] font-black uppercase tracking-widest",
                        activePlatformId === null
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                >
                    <LayoutGrid className="w-4 h-4 mr-3" />
                    Studio
                </button>

                <div className="pt-8 pb-2 px-3">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Tools</p>
                </div>

                <button
                    onClick={onOpenRandomGenerator}
                    className="flex items-center w-full p-2.5 rounded transition-all duration-200 group text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                    <Shuffle className="w-4 h-4 mr-3" />
                    AI Generator
                </button>

                <div className="pt-8 pb-2 px-3">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Platform</p>
                </div>

                {PLATFORMS.map((platform) => (
                    <button
                        key={platform.id}
                        onClick={() => onSelectPlatform(platform.id)}
                        className={cn(
                            "flex items-center w-full p-3 rounded-sm transition-all duration-300 group text-[9px] font-black uppercase tracking-[0.2em] mb-1",
                            activePlatformId === platform.id
                                ? "bg-primary/10 border border-primary/20 text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                        )}
                    >
                        <platform.icon
                            className={cn(
                                "w-3.5 h-3.5 mr-3 transition-all duration-300",
                                activePlatformId === platform.id ? "text-primary scale-110" : "text-white/40 group-hover:text-primary"
                            )}
                        />
                        {platform.name}
                    </button>
                ))}
            </nav>

            <div className="p-4 bg-card rounded border border-border mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Premium System</p>
                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                </div>
                <div className="w-full bg-background h-1 rounded-full overflow-hidden border border-border/10">
                    <div className="bg-foreground/40 h-full w-3/4" />
                </div>
            </div>
        </div>
    );
}
