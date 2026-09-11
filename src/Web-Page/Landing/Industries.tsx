"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Activity, 
  ShoppingCart, 
  Target, 
  Building2, 
  Landmark, 
  Network,
  ArrowRight
} from "lucide-react";

const industries = [
  {
    id: 6,
    title: "Automotive",
    icon: <Landmark className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "High-performance, connected infrastructure for automotive innovation.",
    color: "from-amber-500 to-orange-400",
    bgImage: "bg-[url('/Industries/Financial%20Institutions.webp')]"
  },
  {
    id: 1,
    title: "Automation",
    icon: <Bot className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Streamlining operations with intelligent RPA and workflow automation.",
    color: "from-blue-600 to-cyan-500",
    bgImage: "bg-[url('/Industries/Automation.webp')]"
  },
  {
    id: 2,
    title: "Health Care",
    icon: <Activity className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Secure, compliant cloud solutions for modern patient care and data management.",
    color: "from-emerald-500 to-teal-400",
    bgImage: "bg-[url('/Industries/Health%20Care.webp')]"
  },
  {
    id: 3,
    title: "Retail & eCommerce",
    icon: <ShoppingCart className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Scalable architectures to handle peak traffic and personalize shopping experiences.",
    color: "from-orange-500 to-pink-500",
    bgImage: "bg-[url('/Industries/Retail_eCommerce.webp')]"
  },
  {
    id: 4,
    title: "Marketing & Advertising",
    icon: <Target className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Data-driven platforms for real-time analytics and global campaign delivery.",
    color: "from-purple-600 to-pink-400",
    bgImage: "bg-[url('/Industries/Marketing_Advertising.webp')]"
  },
  {
    id: 5,
    title: "Real Estate",
    icon: <Building2 className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Enterprise-grade real estate technology solutions and property management modernization.",
    color: "from-blue-800 to-indigo-600",
    bgImage: "bg-[url('/Industries/Corporate%20Enterprises.webp')]"
  },
  {
    id: 7,
    title: "End to End IT Consulting",
    icon: <Network className="w-5 h-5 sm:w-8 sm:h-8" />,
    description: "Comprehensive architectural guidance from concept to global deployment.",
    color: "from-indigo-500 to-blue-500",
    bgImage: "bg-[url('/Industries/End%20to%20End%20IT%20Consulting.webp')]"
  },
];

const Industries = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="bg-background py-10 sm:py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 shadow-sm"
          >
            Global Impact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transform</span>
          </motion.h2>
        </div>

        {/* Expandable Flex Cards Layout */}
        <div className="flex flex-col md:flex-row h-[600px] md:h-[380px] w-full gap-2 md:gap-4">
          {industries.map((industry, index) => {
            const isActive = hoveredIndex === index;

            return (
              <motion.div
                key={industry.id}
                onHoverStart={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)} // For mobile touch
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } 
                }}
                className={`relative rounded-[1.5rem] sm:rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 md:flex-shrink will-change-[flex,transform] transform-gpu ${
                  isActive ? "md:flex-[4] flex-[3]" : "md:flex-[1] flex-[1]"
                }`}
              >
                {/* Background Image with Overlay */}
                <motion.div 
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.32, 0.72, 0, 1] 
                  }}
                  className={`absolute inset-0 bg-cover bg-center ${industry.bgImage} opacity-100`} 
                />
                
                {/* Gradient Overlays for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/30 to-blue-950/10 opacity-85" />
                
                {/* Subtle Active Tint Overlay */}
                <motion.div 
                  animate={{ 
                    opacity: isActive ? 1 : 0 
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-blue-600/20" 
                />

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3">
                    {/* Icon Box */}
                    <div className={`flex items-center justify-center rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-500 origin-bottom-left ${
                      isActive 
                        ? 'w-10 h-10 sm:w-16 sm:h-16 bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'w-8 h-8 sm:w-12 sm:h-12 bg-white/20 shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                    }`}>
                      <div className="text-white">
                        {industry.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-white transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                      isActive 
                        ? 'text-lg sm:text-2xl md:text-3xl' 
                        : 'text-sm sm:text-base md:hidden'
                    }`}>
                      {industry.title}
                    </h3>
                  </div>

                  {/* Description - Only visible when active */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100 mt-3 sm:mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                    <p className="text-zinc-50 text-[11px] sm:text-sm md:text-lg max-w-md leading-relaxed border-l-2 border-white/50 pl-3 sm:pl-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {industry.description}
                    </p>
                  </div>
                </div>

                {/* Inactive Shade Overlay for vertical text readability */}
                <div className={`absolute inset-0 bg-gradient-to-b from-blue-950/40 via-indigo-900/30 to-slate-900/60 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

                {/* Inactive Vertical Title (Desktop Only) */}
                {!isActive && (
                  <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none pb-16">
                    <div className="-rotate-90 whitespace-nowrap transform origin-center">
                      <span className="text-white/95 font-bold text-[13px] md:text-sm tracking-[0.15em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:0_0_12px_rgba(99,179,237,0.6)]">
                        {industry.title}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
