"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Zap, CheckCircle2 } from "lucide-react";
import { NEUMORPHIC_BUTTON } from "./Constants";

const MigrationHero = () => {
  return (
    <section className="py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-start w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4"
      >
        <div className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full shadow-sm text-[#1A7FD4] text-[10px] sm:text-[11px] font-black tracking-[3px] uppercase mb-4 sm:mb-6 border border-white/40 inline-block">
          DATA MIGRATION
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-nunito font-black text-[#0D1B2A] leading-[1.2] lg:leading-[1.1] mb-3 sm:mb-5">
          Move Your Data. <br className="hidden sm:block"/>
          <span className="text-[#1A7FD4]">Zero Loss.</span> <br/>
          Zero Downtime.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#4A6080] max-w-xl font-inter leading-relaxed mb-4 sm:mb-6">
          Pentacloud delivers secure, compliant, and seamless data migration across platforms, systems, and clouds, protecting every record, every relationship, and every byte of your business-critical data through every stage of the migration journey.
        </p>
        


        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 py-3.5 px-5 sm:py-4 sm:px-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/40 w-full sm:w-fit justify-center sm:justify-start text-[11px] sm:text-xs shadow-[2px_2px_5px_rgba(163,185,210,0.15)]">
           <span className="text-[#4A6080] font-bold flex items-center gap-2">
             <Lock className="w-3.5 h-3.5 text-[#1A7FD4] shrink-0" /> 100% Data Integrity
           </span>
           <span className="text-gray-300 hidden sm:inline">|</span>
           <span className="text-[#4A6080] font-bold flex items-center gap-2">
             <Zap className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" /> Zero Downtime Guaranteed
           </span>
           <span className="text-gray-300 hidden sm:inline">|</span>
           <span className="text-[#1A7FD4] font-black flex items-center gap-2">
             <CheckCircle2 className="w-3.5 h-3.5 text-[#34C98A] shrink-0" /> GDPR & HIPAA Compliant
           </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center sm:justify-end w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 mt-8 lg:mt-0 overflow-visible"
      >
        <div className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 rounded-[24px] sm:rounded-[48px] shadow-2xl border border-white aspect-[4/3] flex items-center justify-center relative group max-w-[280px] sm:max-w-[420px] lg:max-w-none mx-auto sm:mx-0 w-full">
           <div className="absolute inset-0 rounded-[24px] sm:rounded-[48px] overflow-hidden">
              <img 
                src="/Images/Data Migration Images/data migration Hero.webp" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Cloud Infrastructure" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EEF3FF]/40 to-transparent" />
           </div>
           
           {/* Floating Stat Cards - Optimized coordinates for perfect mobile alignments */}
           <motion.div 
             animate={{ y: [0, -5, 0] }} 
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-3 left-2 sm:top-6 sm:-left-4 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-blue-50/50 z-20 w-[100px] sm:w-[150px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Data Migrated</p>
              <p className="text-sm sm:text-xl font-black text-[#1A7FD4]">10M+ Records</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Across all projects</p>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 5, 0] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-4 right-2 sm:bottom-10 sm:-right-4 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-[#EEF3FF]/50 z-20 w-[90px] sm:w-[140px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Success Rate</p>
              <p className="text-sm sm:text-2xl font-black text-[#34C98A]">100%</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Zero data loss record</p>
           </motion.div>

           <motion.div 
             animate={{ y: [-3, 3, -3] }} 
             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-3 right-4 sm:-top-4 sm:right-8 p-2 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-blue-50/50 z-20 w-[100px] sm:w-[160px]"
           >
              <p className="text-[7px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Compliance</p>
              <p className="text-[10px] sm:text-base font-black text-[#1A7FD4]">GDPR · HIPAA · ISO</p>
              <p className="text-[6px] sm:text-[8px] text-slate-400 font-bold leading-none mt-0.5">Fully compliant migrations</p>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MigrationHero;
