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
        <div className={cn("flex flex-col h-full bg-slate-900 text-white w-64 p-4", className)}>
            <div className="mb-8 p-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    SocialSizes
                </h1>
                <p className="text-xs text-slate-500 font-medium">2025 Edition</p>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
                <button
                    onClick={() => onSelectPlatform(null)}
                    className={cn(
                        "flex items-center w-full p-3 rounded-xl transition-all duration-200 group hover:bg-slate-800",
                        activePlatformId === null ? "bg-slate-800 text-pink-400 font-medium" : "text-slate-400"
                    )}
                >
                    <LayoutGrid className={cn("w-5 h-5 mr-3 group-hover:scale-110 transition-transform", activePlatformId === null && "text-pink-400")} />
                    Dashboard
                </button>

                <div className="pt-4 pb-2 px-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tools</p>
                </div>

                <button
                    onClick={onOpenRandomGenerator}
                    className="flex items-center w-full p-3 rounded-xl transition-all duration-200 group hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                    <Shuffle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform text-indigo-400" />
                    Random Generator
                </button>

                <div className="pt-4 pb-2 px-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platforms</p>
                </div>

                {PLATFORMS.map((platform) => (
                    <button
                        key={platform.id}
                        onClick={() => onSelectPlatform(platform.id)}
                        className={cn(
                            "flex items-center w-full p-3 rounded-xl transition-all duration-200 group hover:bg-slate-800",
                            activePlatformId === platform.id ? "bg-slate-800 text-slate-100 font-medium" : "text-slate-400"
                        )}
                    >
                        <platform.icon
                            className={cn("w-5 h-5 mr-3 group-hover:scale-110 transition-transform")}
                            style={{ color: activePlatformId === platform.id ? platform.color : undefined }}
                        />
                        {platform.name}
                    </button>
                ))}
            </nav>

            <div className="p-4 bg-slate-800/50 rounded-xl mt-auto">
                <p className="text-xs text-slate-400">Pro Plan</p>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-3/4" />
                </div>
            </div>
        </div>
    );
}
