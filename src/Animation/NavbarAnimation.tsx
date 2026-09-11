"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Cloud, Settings, Database, Code, Smartphone, Globe, RefreshCw, GraduationCap, LayoutGrid } from "lucide-react";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Salesforce": return <Cloud size={24} />;
        case "Zoho": return <Settings size={24} />;
        case "Cloud": return <Database size={24} />;
        case "Web": return <Code size={24} />;
        case "App": return <Smartphone size={24} />;
        case "Marketing": return <Globe size={24} />;
        case "Migration": return <RefreshCw size={24} />;
        case "Consulting": return <GraduationCap size={24} />;
        default: return <LayoutGrid size={24} />;
    }
};

type NavItem = { name: string; href: string; hasDropdown?: boolean; subItems?: { name: string; href: string, icon?: string, description?: string }[] };
interface NavProps { items: NavItem[]; className?: string; textLight?: boolean; }

// ============================================================================
// 4. THE "SWIPE MASK" NAV
// Physics: Diagonal color fill mask + Glassmorphic Dropdown.
// ============================================================================
export const SwipeMaskNav = ({ items, className, textLight }: NavProps) => {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {items.map((item) => (
                <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <Link 
                        href={item.href} 
                        className="relative px-4 py-2 overflow-hidden rounded-full flex items-center gap-2 transition-all duration-300"
                    >
                        <span className={`relative z-10 transition-colors duration-500 font-medium flex items-center gap-1.5 ${
                            textLight
                              ? 'text-white/90 group-hover:text-white'
                              : 'text-slate-600 group-hover:text-blue-700'
                          }`}>
                            {item.name}
                            {item.hasDropdown && (
                                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 group-hover:rotate-180 ${
                                    textLight ? 'text-white/70 group-hover:text-white' : 'text-slate-400 group-hover:text-blue-700'
                                }`} />
                            )}
                        </span>
                        <span className={`absolute inset-0 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) rounded-full ${
                            textLight ? 'bg-white/20' : 'bg-blue-50'
                        }`} />
                    </Link>

                    {/* Premium Mega Dropdown */}
                    <AnimatePresence>
                        {item.subItems && hoveredItem === item.name && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-1 bg-white/98 backdrop-blur-3xl border border-white/40 rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] z-50 overflow-hidden w-[640px]"
                            >
                                <div className="grid grid-cols-2 gap-1 p-2">
                                    {item.subItems.map((subItem, idx) => (
                                        <motion.div
                                            key={subItem.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                        >
                                            <Link
                                                href={subItem.href}
                                                className="group/item flex items-start gap-4 p-4 rounded-[24px] hover:bg-blue-50/80 transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-sm"
                                            >
                                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500">
                                                    {getIcon(subItem.icon as string)}
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-nunito font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">
                                                        {subItem.name}
                                                    </span>
                                                    <span className="text-[12px] text-slate-500 line-clamp-1 group-hover/item:text-slate-600">
                                                        {(subItem as any).description}
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Bottom Accent */}
                                <div className="bg-slate-50/50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pentacloud Consulting · 2026</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};
