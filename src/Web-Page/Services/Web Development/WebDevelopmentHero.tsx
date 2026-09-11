"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Target, Smartphone, Globe, Shield, ShieldCheck, Gauge } from "lucide-react";

const CLAY_BUTTON = "rounded-[50px] shadow-[0_8px_20px_rgba(26,127,212,0.30),inset_0_-3px_0_rgba(0,0,0,0.12)]";

const WebDevelopmentHero = () => {
  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] bg-[#F0F6FF] flex items-center overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
      {/* Background Blobs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8E2FA] rounded-full filter blur-[120px] opacity-50 pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#D4EEFF] rounded-full filter blur-[90px] opacity-35 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#E0F0FF] rounded-full filter blur-[70px] pointer-events-none" 
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
        
        {/* Left Column — pinned to left edge */}
        <div className="flex flex-col items-start w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4">
          {/* Badge Row */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#EEF3FF] text-[#1A7FD4] font-nunito font-bold text-[9px] sm:text-[12px] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center gap-1.5"
            >
              <Globe className="w-3 h-3" />
              <span>Web Development</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#E8FFE8] text-[#34C98A] font-nunito font-bold text-[9px] sm:text-[12px] rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3" />
              <span>High Performance</span>
            </motion.div>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-1 mb-4 sm:mb-5">
            {["Websites That", "Don't Just Look Good, "].map((text, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as any, delay: 0.4 + i * 0.15 }}
                  className="font-nunito font-extrabold text-[clamp(24px,5vw,64px)] leading-[1.2] md:leading-[1.1] text-[#0D1B2A]"
                >
                  {text}
                </motion.h1>
              </div>
            ))}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as any, delay: 0.7 }}
                className="font-nunito font-extrabold text-[clamp(24px,5vw,64px)] leading-[1.2] md:leading-[1.1] text-transparent bg-clip-text bg-[length:300%_auto] animate-gradientSweep"
                style={{ backgroundImage: 'linear-gradient(90deg, #1A7FD4, #29C6E0, #34C98A, #1A7FD4)' }}
              >
                They Perform.
              </motion.h1>
            </div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-inter text-xs sm:text-sm md:text-[15px] text-[#4A6080] leading-relaxed max-w-[500px] mb-6 sm:mb-8 pr-2"
          >
            Pentacloud builds stunning, high-performance websites tailored to your business, combining cutting-edge design, bulletproof security, and scalable architecture that grows with your ambitions. Every pixel purposeful. Every millisecond optimised.
          </motion.p>



          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-inter text-[10px] sm:text-[12px] text-[#8BA4BE] flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#34C98A]" /> Secure by Default</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-[#1A7FD4]" /> Mobile First</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#F59E0B]" /> Core Web Vitals</span>
          </motion.div>
        </div>

        {/* Right Column — pinned to right edge */}
        <div className="relative flex items-start justify-center sm:justify-end w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 mt-6 lg:mt-0 overflow-visible lg:self-start lg:pt-8 xl:pt-12">
           <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.3 }}
            className={`relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px] aspect-[16/10] bg-white rounded-2xl sm:rounded-[28px] shadow-[12px_12px_40px_rgba(26,127,212,0.15)] group mx-auto sm:mx-0`}
          >
            {/* Browser Content Wrapper (Clipped) */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-[28px] overflow-hidden">
              {/* Top Bar */}
              <div className="h-6 sm:h-8 bg-[#EEF3FF] flex items-center px-4 sm:px-6 gap-2 shrink-0">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-400" />
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-400" />
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 max-w-[250px] mx-auto h-4 sm:h-5 bg-white/60 rounded border border-[#1A7FD4]/05 flex items-center px-2 text-[7px] sm:text-[9px] text-[#8BA4BE] font-inter truncate">
                  pentacloud.in
                </div>
              </div>

              {/* Browser Content */}
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-5">
                <div className="flex gap-3 sm:gap-5 items-start">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden shadow-sm flex-shrink-0"
                  >
                    <img 
                      src="/Images/Web Development images/WebDevelopment-why-1.webp" 
                      alt="Coding" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1 space-y-1 sm:space-y-1.5 pt-0.5 min-w-0">
                    <h3 className="text-[10px] sm:text-xs font-nunito font-black text-[#0D1B2A] truncate">Pentacloud Consulting</h3>
                    <p className="text-[7px] sm:text-[9px] text-[#4A6080] leading-relaxed max-w-[180px] line-clamp-2 sm:line-clamp-none">
                      Building high-performance digital experiences with React and cloud technology.
                    </p>
                    <div className="pt-0.5 flex gap-1">
                       <div className="px-1.5 py-0.5 bg-green-50 text-[6px] sm:text-[7px] font-bold text-green-600 rounded-full">Optimized</div>
                       <div className="px-1.5 py-0.5 bg-blue-50 text-[6px] sm:text-[7px] font-bold text-[#1A7FD4] rounded-full">React 19</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-6">
                  {[
                    { url: "/Images/App Devlopment Images/AppDevelopment-Question-1.webp", tag: "UI Design", label: "Custom UI/UX" },
                    { url: "/Images/Salesforce/Sales-Queston-3.webp", tag: "Full Stack", label: "Robust Backend" },
                    { url: "/Images/Data Migration Images/data migration-question-1.webp", tag: "Security", label: "SSL + Secure" }
                  ].map((img, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -2 }}
                      className="space-y-1 sm:space-y-1.5 min-w-0"
                    >
                      <div className="aspect-square rounded-md sm:rounded-lg overflow-hidden shadow-sm border border-white/50">
                        <img 
                          src={img.url} 
                          alt={img.tag} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[7px] sm:text-[8px] font-bold text-[#0D1B2A] truncate">{img.tag}</div>
                      <div className="text-[6px] sm:text-[7px] text-slate-400 leading-none truncate">{img.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top-Right Badge - Responsive padding & size */}
            <div className="absolute top-8 sm:top-10 right-2 sm:right-4 bg-[#1A7FD4] text-white font-nunito font-bold text-[8px] sm:text-[11px] px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-md sm:rounded-full shadow-lg z-20 flex items-center gap-1 border border-[#1A7FD4]/10">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>Full Stack</span>
            </div>

            {/* Floating Mini Cards */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 sm:-right-3 top-1/3 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl flex flex-col gap-1 sm:gap-1.5 z-20 w-[95px] sm:w-[130px]"
            >
              <div className="font-nunito font-bold text-[7px] sm:text-[10px] text-[#0D1B2A] truncate">Page Load Speed</div>
              <div className="flex items-center justify-between">
                <span className="font-nunito font-black text-[9px] sm:text-[12px] text-[#34C98A] flex items-center gap-1">{"< 1.2s"} <Zap className="w-3 h-3 shrink-0" fill="#34C98A" stroke="none" /></span>
              </div>
              <div className="h-1 w-full bg-[#E8FFE8] rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 2, delay: 1 }}
                   className="h-full bg-[#34C98A]" 
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-1 sm:-left-4 bottom-1/4 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl flex flex-col gap-1 sm:gap-1.5 z-20 w-[85px] sm:w-[110px]"
            >
              <div className="font-inter text-[7px] sm:text-[9px] text-[#8BA4BE]">SEO Score</div>
              <div className="font-nunito font-bold text-[9px] sm:text-[12px] text-[#0D1B2A] flex items-center gap-1">98/100 <Target className="w-3 h-3 text-[#E11D48]" /></div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#34C98A]" />)}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute right-2 bottom-2 sm:right-6 sm:bottom-4 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl z-20 w-[85px] sm:w-[110px]"
            >
              <div className="font-inter text-[7px] sm:text-[9px] text-[#8BA4BE]">Mobile Score</div>
              <div className="font-nunito font-bold text-[9px] sm:text-[12px] text-[#0D1B2A] flex items-center gap-1">100/100 <Smartphone className="w-3 h-3 text-[#1A7FD4]" /></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 opacity-50 pointer-events-none"
      >
        <span className="text-[10px] sm:text-[12px] font-inter text-[#8BA4BE]">Explore our capabilities</span>
        <ChevronDown className="w-4 h-4 text-[#8BA4BE]" />
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientSweep {
          animation: gradientSweep 4s ease infinite;
        }
        .skeleton {
          background: linear-gradient(90deg, #EEF3FF 25%, #D4EEFF 50%, #EEF3FF 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 2s infinite;
          border-radius: 4px;
        }
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
      `}} />
    </section>
  );
};

export default WebDevelopmentHero;
