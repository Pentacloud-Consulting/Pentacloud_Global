"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[75vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/Hero/About-mobile.jpeg')] sm:bg-[url('/Hero/About.jpeg')]"
      />

      {/* Layered overlays: dark gradient bottom-up + subtle blue wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/70 to-[#0D1B2A]/50 sm:from-[#0D1B2A]/80 sm:via-[#0D1B2A]/40 sm:to-[#0D1B2A]/20" />
      <div className="absolute inset-0 bg-[#1A7FD4]/30 sm:bg-[#1A7FD4]/15" />
      {/* White top shade for navbar readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-5 py-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full text-white text-[9px] md:text-[10px] font-black tracking-[3px] uppercase mb-6 md:mb-10 shadow-lg"
        >
          OUR STORY
        </motion.div>

        {/* Main Headline */}
        <div className="flex flex-col gap-2 mb-6 md:mb-10 font-nunito font-black text-[clamp(36px,8vw,80px)] leading-[1.1] md:leading-[1.05]">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
              className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:drop-shadow-none"
            >
              We Are
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.45 }}
              className="text-[#29C6E0] py-1 md:py-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:drop-shadow-none"
            >
              Pentacloud
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.6 }}
              className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:drop-shadow-none"
            >
              Consulting
            </motion.div>
          </div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-white/85 max-w-[640px] leading-relaxed mb-10 md:mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          A global technology consulting firm driving digital transformation through AI-powered solutions and a human-centric approach, with a presence across India and the Middle East.
        </motion.p>

        {/* Scroll Indicator Moved into Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-3 pointer-events-none mt-4 md:mt-8"
        >
          <span className="font-nunito font-black text-[9px] md:text-[10px] text-white/70 uppercase tracking-[3px]">Explore Story</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
               <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientSweep {
          animation: gradientSweep 3s ease infinite;
        }
      `}} />
    </section>
  );
};

export default AboutHero;
