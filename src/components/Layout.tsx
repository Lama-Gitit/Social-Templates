import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';

interface LayoutProps {
    children: React.ReactNode;
    activePlatformId: string | null;
    onSelectPlatform: (id: string | null) => void;
    onOpenRandomGenerator: () => void;
    aiEnabled: boolean;
}

export function Layout({ children, activePlatformId, onSelectPlatform, onOpenRandomGenerator, aiEnabled }: LayoutProps) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 selection:text-white">
            <Sidebar
                className="hidden md:flex"
                activePlatformId={activePlatformId}
                onSelectPlatform={onSelectPlatform}
                onOpenRandomGenerator={onOpenRandomGenerator}
                aiEnabled={aiEnabled}
            />
            <main className="flex-1 overflow-y-auto w-full p-6 md:p-12 pb-32 md:pb-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            <MobileMenu
                activePlatformId={activePlatformId}
                onSelectPlatform={onSelectPlatform}
                onOpenRandomGenerator={onOpenRandomGenerator}
                aiEnabled={aiEnabled}
            />
        </div>
    );
}
