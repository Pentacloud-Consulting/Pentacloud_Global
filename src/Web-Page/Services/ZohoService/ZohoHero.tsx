"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Globe, Briefcase, TrendingUp } from "lucide-react";
import { CLAY_CARD, NEUMORPHIC_BUTTON } from "./Constants";

const ZohoHero = () => {
  return (
    <section className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6 md:pb-10 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] -z-10" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          
          {/* Left Content — pinned to left edge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm border border-[#1A7FD4]/20 text-[#1A7FD4] rounded-full text-[8.5px] sm:text-[11px] font-black uppercase tracking-[3px] mb-4 sm:mb-5"
            >
              ZOHO SERVICES
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-nunito font-black text-[#0D1B2A] leading-[1.2] md:leading-[1.1] mb-3 sm:mb-5">
              Unlock the Full Power <br className="hidden sm:block"/>
              <span className="text-[#1A7FD4]">of the Zoho Ecosystem.</span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-[#4A6080] font-inter leading-relaxed mb-4 sm:mb-6 max-w-xl">
              Pentacloud is a certified Zoho partner delivering end-to-end Zoho consulting, implementation, integration, and training services, helping businesses across India and the UAE maximise their Zoho investment and run smarter, faster, and more profitably.
            </p>



            <div className="flex flex-row items-center justify-between sm:justify-start gap-1.5 sm:gap-6 text-[8px] sm:text-[11px] md:text-[12px] font-bold text-[#4A6080] border-t border-slate-200 pt-5 sm:pt-6 w-full">
               <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#34C98A] shrink-0" />
                  <span className="truncate hidden sm:inline">Certified Zoho Partner</span>
                  <span className="truncate sm:hidden">Certified Partner</span>
               </div>
               <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                  <span className="truncate">48hr Response</span>
               </div>
               <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#1A7FD4] shrink-0" />
                  <span className="truncate">India & UAE</span>
               </div>
            </div>
          </motion.div>

          {/* Right Visuals — pinned to right edge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center sm:justify-end w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 mt-8 lg:mt-0 overflow-visible"
          >
            {/* Wrapper for Image and Cards so they scale together */}
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-none mx-auto sm:mx-0">
              {/* Main Image Area */}
              <div className="bg-white p-2 rounded-[24px] sm:rounded-[48px] shadow-2xl border border-white/80 relative overflow-hidden aspect-[4/3] flex items-center justify-center group w-full">
                 <img 
                   src="/Images/Zoho Images/Zoho-Hero.webp" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   alt="Zoho Dashboard" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/10" />
              </div>

              {/* Floating Stat Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-[24px] border border-slate-100 shadow-[0_10px_30px_rgba(163,185,210,0.25)] absolute -top-2 right-1 sm:-top-4 sm:right-2 p-2 sm:p-5 flex flex-col items-center gap-1 sm:gap-3 z-20 min-w-[70px] sm:min-w-[130px]"
              >
                 <div className="w-5 h-5 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-white shadow-sm border border-slate-100/50 flex items-center justify-center">
                   <Globe className="w-3 h-3 sm:w-5 sm:h-5 text-blue-500" />
                 </div>
                 <div className="flex flex-col items-center">
                   <h4 className="text-sm sm:text-[32px] font-nunito font-black text-[#0D1B2A] leading-none mb-0.5 sm:mb-1">
                     10<span className="text-blue-500">+</span>
                   </h4>
                   <p className="text-[6px] sm:text-[11px] font-bold text-[#0D1B2A] leading-none text-center">Industries Served</p>
                 </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-[24px] border border-slate-100 shadow-[0_10px_30px_rgba(163,185,210,0.25)] absolute bottom-4 -left-2 sm:bottom-12 sm:-left-6 p-2 sm:p-5 flex flex-col items-center gap-1 sm:gap-3 z-20 min-w-[70px] sm:min-w-[140px]"
              >
                 <div className="w-5 h-5 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-white shadow-sm border border-slate-100/50 flex items-center justify-center">
                   <Briefcase className="w-3 h-3 sm:w-5 sm:h-5 text-indigo-500" />
                 </div>
                 <div className="flex flex-col items-center">
                    <h4 className="text-sm sm:text-[24px] font-nunito font-black text-[#0D1B2A] leading-none mb-0.5 sm:mb-1">
                      10<span className="text-blue-500">+</span>
                    </h4>
                    <p className="text-[6px] sm:text-[10px] font-bold text-[#0D1B2A] leading-tight text-center">Clients Transformed<br/>in 2026</p>
                 </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-[24px] border border-slate-100 shadow-[0_10px_30px_rgba(163,185,210,0.25)] absolute -bottom-2 right-1 sm:-bottom-4 sm:right-6 p-2 sm:p-5 flex flex-col items-center gap-1 sm:gap-3 z-20 min-w-[70px] sm:min-w-[130px]"
              >
                 <div className="w-5 h-5 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-white shadow-sm border border-slate-100/50 flex items-center justify-center">
                   <TrendingUp className="w-3 h-3 sm:w-5 sm:h-5 text-[#34C98A]" />
                 </div>
                 <div className="flex flex-col items-center">
                   <h4 className="text-sm sm:text-[32px] font-nunito font-black text-[#0D1B2A] leading-none mb-0.5 sm:mb-1">
                     300<span className="text-blue-500">%</span>
                   </h4>
                   <p className="text-[6px] sm:text-[11px] font-bold text-[#0D1B2A] leading-none text-center">Average ROI</p>
                 </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
    </section>
  );
};

export default ZohoHero;
