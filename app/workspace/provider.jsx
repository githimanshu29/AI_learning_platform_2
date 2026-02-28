"use client"; 

import React from 'react';
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"; 
import AppSidebar from './_components/AppSidebar';
import AppHeader from './_components/AppHeader';
import AnimatedBackground from '../AnimatedBackground';

const WorkspaceProvider = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="relative min-h-screen w-full bg-slate-950">
                <AnimatedBackground />
                <AppSidebar />
                <MainContentWithChildren>{children}</MainContentWithChildren>
            </div>
        </SidebarProvider>
    )
}

const MainContentWithChildren = ({ children }) => {
    const { state } = useSidebar();

    return (
        <div 
            className={`
                min-h-screen flex flex-col transition-all duration-300 ease-in-out
                ${state === 'expanded' ? 'ml-0 md:ml-64' : 'ml-0 md:ml-12'}
            `}
        >
            <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
                <AppHeader />
            </header>
            
            <main className='flex-1 p-4 md:p-6 lg:p-10 relative z-10'>
                {children}
            </main>
        </div>
    );
}

export default WorkspaceProvider;