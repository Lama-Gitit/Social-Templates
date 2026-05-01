import { Link } from 'react-router-dom';
import { LayoutGrid, Shuffle } from 'lucide-react';
import { cn } from '../lib/utils';
import { PLATFORMS } from '../data/platforms';
import { SocialFramesLogo } from './SocialFramesLogo';

interface SidebarProps {
    className?: string;
    activePlatformId: string | null;
    onOpenRandomGenerator: () => void;
    aiEnabled: boolean;
}

export function Sidebar({ className, activePlatformId, onOpenRandomGenerator, aiEnabled }: SidebarProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background text-foreground w-64 p-4 border-r border-border/40", className)}>
            <div className="mb-12 p-3">
                <Link to="/" aria-label="Go to homepage" className="block">
                    <SocialFramesLogo />
                </Link>
                <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black mt-3">SVG Templates for Social Content</p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
                <Link
                    to="/"
                    className={cn(
                        "flex items-center w-full p-2.5 rounded transition-all duration-200 group text-[10px] font-black uppercase tracking-widest",
                        activePlatformId === null
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                >
                    <LayoutGrid className="w-4 h-4 mr-3" />
                    Studio
                </Link>

                <div className="pt-8 pb-2 px-3">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Platforms</p>
                </div>

                {PLATFORMS.map((platform) => (
                    <Link
                        key={platform.id}
                        to={`/${platform.slug}`}
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
                    </Link>
                ))}

                <div className="pt-8 pb-2 px-3">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Tools</p>
                </div>

                <button
                    onClick={aiEnabled ? onOpenRandomGenerator : undefined}
                    className={cn(
                        "flex items-center w-full p-2.5 rounded transition-all duration-200 group text-[10px] font-black uppercase tracking-widest",
                        aiEnabled
                            ? "text-muted-foreground hover:text-foreground hover:bg-white/5 cursor-pointer"
                            : "text-muted-foreground/30 cursor-default"
                    )}
                >
                    <Shuffle className="w-4 h-4 mr-3" />
                    AI Generator
                    {!aiEnabled && <span className="ml-auto text-[7px] tracking-[0.2em] text-primary/50 border border-primary/20 px-1.5 py-0.5 rounded-sm">SOON</span>}
                </button>
            </nav>

        </div>
    );
}
