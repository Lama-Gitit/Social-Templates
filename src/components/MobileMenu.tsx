import { useState } from 'react';
import { Menu, X, LayoutGrid, Shuffle } from 'lucide-react';
import { cn } from '../lib/utils';
import { PLATFORMS } from '../data/platforms';

interface MobileMenuProps {
    activePlatformId: string | null;
    onSelectPlatform: (id: string | null) => void;
    onOpenRandomGenerator: () => void;
    aiEnabled: boolean;
}

export function MobileMenu({ activePlatformId, onSelectPlatform, onOpenRandomGenerator, aiEnabled }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSelect = (id: string | null) => {
        onSelectPlatform(id);
        setIsOpen(false);
    };

    const handleGenerator = () => {
        onOpenRandomGenerator();
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Hamburger Button */}
            <button
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-full shadow-2xl md:hidden active:scale-95 transition-transform"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isOpen ? 'Close' : 'Menu'}</span>
            </button>

            {/* Full Screen Menu */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col p-8 pt-8",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
                )}
            >

                <nav className="flex-1 space-y-2 overflow-y-auto pb-32">


                    <p className="text-sm font-black text-white uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-4">Platforms</p>
                    <div className="grid grid-cols-2 gap-2">
                        {PLATFORMS.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => handleSelect(platform.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-6 rounded-sm transition-all duration-300 gap-4 border",
                                    activePlatformId === platform.id
                                        ? "bg-primary/10 border-primary/40 text-foreground"
                                        : "bg-white/5 border-transparent text-muted-foreground"
                                )}
                            >
                                <platform.icon
                                    className={cn(
                                        "w-5 h-5 transition-all duration-300",
                                        activePlatformId === platform.id ? "text-primary" : "text-white/40"
                                    )}
                                />
                                <span className="text-[9px] font-black uppercase tracking-[0.1em]">{platform.name}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Footer Navigation (Studio, Platform, AI Generator at bottom as requested) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <button
                            onClick={() => handleSelect(null)}
                            className="flex-1 bg-white/5 border border-white/5 py-4 rounded-sm flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all active:scale-95"
                        >
                            <LayoutGrid size={16} />
                            Studio
                        </button>

                        {/* Gap for the floating toggle button */}
                        <div className="w-20" />

                        <button
                            onClick={aiEnabled ? handleGenerator : undefined}
                            className={cn(
                                "flex-1 bg-white/5 border border-white/5 py-4 rounded-sm flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                aiEnabled
                                    ? "text-white/40 hover:text-white active:scale-95 cursor-pointer"
                                    : "text-white/20 cursor-default"
                            )}
                        >
                            <Shuffle size={16} />
                            {aiEnabled ? 'AI Generator' : 'AI / Soon'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
