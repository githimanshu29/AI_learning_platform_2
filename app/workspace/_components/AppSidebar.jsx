"use client";
import Image from 'next/image';
import logo from "../../../public/logo.svg";
import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    Book,
    Compass,
    LayoutDashboard,
    PencilRulerIcon,
    UserCheck2Icon,
    WalletCards,
    Plus,
    Sparkles
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/workspace",
    },
    {
        title: "My Learning",
        icon: Book,
        path: "/workspace/my-courses",
    },
    {
        title: "Explore",
        icon: Compass,
        path: "/workspace/explore",
    },
    {
        title: "AI Tools",
        icon: PencilRulerIcon,
        path: "/workspace/ai-tools",
    },
    {
        title: "Billing",
        icon: WalletCards,
        path: "/workspace/billing",
    },
    {
        title: "Profile",
        icon: UserCheck2Icon,
        path: "/workspace/profile",
    },
];

const AppSidebar = () => {
    const path = usePathname();
    const { state } = useSidebar();

    return (
        <Sidebar className="h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 flex flex-col">
            {/* Header */}
            <SidebarHeader className="p-6 border-b border-slate-800/50">
                <Link href={'/workspace'} className='cursor-pointer block'>
                    <Image src={logo} alt="logo" width={140} height={140} className="brightness-110" />
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-4 py-6">
                {/* Create Course Button */}
                <SidebarGroup className="mb-6">
                    <AddNewCourseDialog>
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105">
                            <Plus className="w-5 h-5 mr-2" />
                            {state === 'expanded' && 'New Course'}
                        </Button>
                    </AddNewCourseDialog>
                </SidebarGroup>

                {/* Navigation Menu */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {SideBarOptions.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.path}
                                            className={`
                                                group relative flex items-center gap-3 px-4 py-3 rounded-xl
                                                transition-all duration-300
                                                ${path === item.path
                                                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                                }
                                            `}
                                        >
                                            {/* Active indicator */}
                                            {path === item.path && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r-full" />
                                            )}
                                            
                                            <item.icon className={`w-5 h-5 flex-shrink-0 ${path === item.path ? 'text-teal-400' : ''}`} />
                                            {state === 'expanded' && (
                                                <span className="font-medium">{item.title}</span>
                                            )}
                                            
                                            {/* Hover effect */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-300 -z-10" />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-4 border-t border-slate-800/50">
                {state === 'expanded' && (
                    <div className="p-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-teal-400" />
                            <span className="text-sm font-semibold text-white">AI Powered</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Create unlimited courses with AI
                        </p>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;