import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    activePlatformId: string | null;
    onSelectPlatform: (id: string | null) => void;
    onOpenRandomGenerator: () => void;
}

export function Layout({ children, activePlatformId, onSelectPlatform, onOpenRandomGenerator }: LayoutProps) {
    return (
        <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
            <Sidebar
                className="hidden md:flex border-r border-slate-800"
                activePlatformId={activePlatformId}
                onSelectPlatform={onSelectPlatform}
                onOpenRandomGenerator={onOpenRandomGenerator}
            />
            <main className="flex-1 overflow-y-auto w-full p-6 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
