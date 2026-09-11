"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TrendingUp, Globe2, Briefcase, Users } from "lucide-react";

const stats = [
  { 
    id: 1, 
    value: 10, 
    suffix: "+", 
    label: "Industries Served",
    description: "Deep domain expertise across diverse global markets.",
    icon: <Globe2 className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
  },
  { 
    id: 2, 
    value: 25, 
    suffix: "+", 
    label: "Projects Delivered",
    description: "Successful delivery of complex enterprise solutions.",
    icon: <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
  },
  { 
    id: 3, 
    value: 10, 
    suffix: "+", 
    label: "Clients in 2026",
    description: "Digitally transformed 10+ clients in 2026.",
    icon: <Users className="w-4 h-4 sm:w-6 sm:h-6 text-violet-400" />
  },
  { 
    id: 4, 
    value: 300, 
    suffix: "%", 
    label: "Average ROI",
    description: "Measurable business growth and operational efficiency.",
    icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400" />
  },
];

const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

const Trust = () => {
  return (
    <section className="relative flex items-center justify-center py-6 sm:py-10 md:py-12 overflow-hidden bg-background">
      {/* Background Video & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Hero/Global Reach.jpeg"
          alt="Global Reach"
          className="w-full h-full object-cover opacity-100"
        />
        
        {/* Light Theme Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#E8F0F8] via-[#E8F0F8]/50 to-transparent" />
        <div className="absolute inset-0 z-10 bg-[#E8F0F8]/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20 w-full">
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-white shadow-[2px_2px_6px_#e2e8f0,-2px_-2px_6px_#ffffff,inset_1px_1px_2px_#ffffff,inset_-1px_-1px_2px_#e2e8f0] text-blue-700 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            Global Reach
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] px-2"
          >
            Companies Trust Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
              Salesforce Expertise
            </span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-[1.5rem] sm:rounded-[3rem] border border-white/60 bg-white/30 backdrop-blur-2xl shadow-[15px_15px_30px_rgba(15,23,42,0.04),-8px_-8px_20px_rgba(255,255,255,0.35)] p-4 sm:p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 relative z-10">
            {stats.map((stat, index) => (
              <div key={stat.id} className="relative group flex flex-col items-center">
                {/* Vertical Divider for all viewports since they're on a single line */}
                {index !== stats.length - 1 && (
                  <div className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 w-px h-1/2 sm:h-2/3 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                )}

                <div className="flex flex-col items-center text-center px-1 sm:px-4">
                  <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[2px_2px_5px_rgba(163,185,210,0.15),-2px_-2px_5px_rgba(255,255,255,0.7)] flex items-center justify-center mb-2 sm:mb-6 text-slate-700 group-hover:bg-white/60 transition-all duration-500">
                    {stat.icon}
                  </div>
                  
                  <div className="flex items-baseline gap-0.5 mb-0.5 sm:mb-1">
                    <span className="text-base sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">
                      <Counter from={0} to={stat.value} duration={2.5} />
                    </span>
                    <span className="text-[10px] sm:text-2xl md:text-3xl lg:text-4xl font-black text-blue-600">
                      {stat.suffix}
                    </span>
                  </div>
                  
                  <h4 className="text-[9px] sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 mb-1 sm:mb-2 line-clamp-1">
                    {stat.label}
                  </h4>
                  
                  <p className="hidden sm:block text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-[280px]">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;
