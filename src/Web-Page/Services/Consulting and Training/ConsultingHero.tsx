"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Star } from "lucide-react";
import { NEUMORPHIC_BUTTON } from "./Constants";

const ConsultingHero = () => {
  return (
    <section className="py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4"
      >
        <div className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full shadow-sm text-[#1A7FD4] text-[10px] sm:text-[11px] font-black tracking-[3px] sm:tracking-[4px] uppercase mb-4 sm:mb-6 border border-white/40 inline-block">
          CONSULTING & TRAINING
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-nunito font-black text-[#0D1B2A] leading-[1.2] lg:leading-[1.1] mb-3 sm:mb-5">
          Expert Guidance. <br/>
          <span className="text-[#1A7FD4]">Real Skills.</span> <br/>
          Lasting Results.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#4A6080] max-w-xl font-inter leading-relaxed mb-4 sm:mb-6">
          We consult on the right technology decisions and train your team to execute them — delivered by the same certified experts who build real systems.
        </p>
        


        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 sm:gap-4 py-2 sm:py-3 px-4 sm:px-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 w-full sm:w-fit shadow-[2px_2px_5px_rgba(163,185,210,0.15)]">
           <span className="text-[#4A6080] text-[10px] sm:text-xs font-bold flex items-center gap-1.5">
             <Trophy className="w-3 h-3 text-[#F59E0B] shrink-0" /> 35+ Certifications
           </span>
           <span className="text-gray-300 hidden sm:inline">|</span>
           <span className="text-[#4A6080] text-[10px] sm:text-xs font-bold flex items-center gap-1.5">
             <Users className="w-3 h-3 text-[#1A7FD4] shrink-0" /> 50+ Trained
           </span>
           <span className="text-gray-300 hidden sm:inline">|</span>
           <span className="text-[#1A7FD4] text-[10px] sm:text-xs font-black flex items-center gap-1.5">
             <Star className="w-3 h-3 text-[#34C98A] fill-[#34C98A] shrink-0" /> Tier 3 Experts
           </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center sm:justify-end w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 pt-6 lg:pt-0 overflow-visible"
      >
        <div className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 rounded-[24px] sm:rounded-[48px] shadow-2xl border border-white aspect-[4/3] flex items-center justify-center relative group max-w-[280px] sm:max-w-[420px] lg:max-w-none mx-auto sm:mx-0 w-full">
           <div className="absolute inset-0 rounded-[24px] sm:rounded-[48px] overflow-hidden">
              <img 
                src="/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-Hero.webp" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Consulting Team" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF3FF]/40 to-transparent" />
           </div>
           
           {/* Floating Stat Cards - Optimized for Mobile Bounds to prevent overflow */}
           <motion.div 
             animate={{ y: [0, -5, 0] }} 
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-4 left-2 sm:top-6 sm:-left-4 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-blue-50/50 z-20 w-[90px] sm:w-[140px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Professionals Trained</p>
              <p className="text-sm sm:text-2xl font-black text-[#1A7FD4]">500+</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Across India & UAE</p>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 5, 0] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-8 right-2 sm:bottom-10 sm:-right-4 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-blue-50/50 z-20 w-[90px] sm:w-[140px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Cert Pass Rate</p>
              <p className="text-sm sm:text-xl font-black text-[#34C98A]">85%+</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Exam prep participants</p>
           </motion.div>

           <motion.div 
             animate={{ y: [-3, 3, -3] }} 
             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-3 right-4 sm:right-8 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-blue-50/50 z-20 w-[85px] sm:w-[130px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Active Certifications</p>
              <p className="text-xs sm:text-lg font-black text-[#1A7FD4]">35+</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Real expertise</p>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConsultingHero;
