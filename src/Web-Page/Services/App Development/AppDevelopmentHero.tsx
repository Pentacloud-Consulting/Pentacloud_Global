"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, ChevronDown, ArrowRight, Apple, Globe, Star, Zap, Lock } from "lucide-react";

const CLAY_BUTTON_BLUE = "rounded-[50px] shadow-[0_8px_20px_rgba(26,127,212,0.30),inset_0_-3px_0_rgba(0,0,0,0.12)]";

const AppDevelopmentHero = () => {
  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] bg-background flex items-center overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
      {/* Background Blobs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8E2FA] rounded-full filter blur-[120px] opacity-50 pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#EEF3FF] rounded-full filter blur-[90px] opacity-35 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#E0F7FF] rounded-full filter blur-[70px] pointer-events-none" 
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
        
        {/* Left Column — pinned to left edge */}
        <div className="flex flex-col items-start w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4">
          {/* Badge Row */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#1A7FD4] font-nunito font-bold text-[9px] sm:text-[12px] rounded-full px-3 py-1.5 flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#1A7FD4] shrink-0" /> App Development
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.2),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#34C98A] font-nunito font-bold text-[9px] sm:text-[12px] rounded-full px-3 py-1.5 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#34C98A] shrink-0" /> iOS & Android
            </motion.div>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-1 mb-4 sm:mb-5">
            {["Apps That Users", "Love Opening"].map((text, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as any, delay: 0.4 + i * 0.15 }}
                  className="font-nunito font-extrabold text-[24px] sm:text-[36px] md:text-[46px] lg:text-[64px] leading-[1.2] lg:leading-[1.1] text-[#0D1B2A]"
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
                className="font-nunito font-extrabold text-[24px] sm:text-[36px] md:text-[46px] lg:text-[64px] leading-[1.2] lg:leading-[1.1] text-transparent bg-clip-text bg-[length:300%_auto] animate-gradientSweep"
                style={{ backgroundImage: 'linear-gradient(90deg, #1A7FD4, #29C6E0, #34C98A, #1A7FD4)' }}
              >
                Every Single Day.
              </motion.h1>
            </div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-inter text-xs sm:text-sm md:text-[15px] text-[#4A6080] leading-[1.8] max-w-[500px] mb-6 sm:mb-8"
          >
            Pentacloud builds intuitive, high-performance mobile and web applications that solve real business problems. From MVP to enterprise-scale, we design, build, and launch apps that your users keep coming back to, across iOS, Android, and Web.
          </motion.p>



          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-inter text-[10px] sm:text-[12px] text-[#8BA4BE] flex flex-wrap items-center gap-2 sm:gap-4"
          >
            <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-[#1A7FD4]" /> iOS & Android</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#29C6E0]" /> React Native</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#34C98A]" /> App Store Ready</span>
          </motion.div>
        </div>

        {/* Right Column — pinned to right edge */}
        <div className="relative flex items-center justify-center sm:justify-end w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 lg:-ml-6 xl:-ml-12 mt-8 lg:mt-0 overflow-visible lg:pt-6">
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.3 }}
            className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[520px] min-h-[300px] sm:min-h-[460px] bg-background rounded-[20px] sm:rounded-[28px] border-2 border-dashed border-[#1A7FD4]/20 flex items-center justify-center shadow-[20px_20px_60px_rgba(163,185,210,0.2),-10px_-10px_40px_rgba(255,255,255,0.95)] overflow-visible mx-auto sm:mx-0"
          >
            {/* Phone Mockups */}
            <div className="relative scale-[0.8] md:scale-95">
               {/* Phone 1 (Back) */}
                <motion.div 
                 animate={{ y: [0, -12, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -translate-x-1/2 -translate-y-1/2 left-[calc(50%-40px)] top-1/2 w-[160px] h-[300px] bg-[#EEF3FF] rounded-[32px] border-2 border-[#1A7FD4]/20 -rotate-8 z-0 overflow-hidden"
                >
                  <img 
                    src="/Profile/Profile-Banner.jpg" 
                    className="w-full h-full object-cover opacity-30 blur-[2px]" 
                    alt="App Background" 
                  />
                </motion.div>
               {/* Phone 2 (Front) */}
               <motion.div 
                 animate={{ y: [0, -16, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 className="relative w-[160px] h-[300px] bg-background rounded-[32px] border-[3px] border-white shadow-[10px_10px_20px_rgba(163,185,210,0.4),-10px_-10px_20px_rgba(255,255,255,0.9)] z-10 flex flex-col overflow-hidden ring-1 ring-[#1A7FD4]/10"
               >
                 {/* Status Bar */}
                 <div className="h-6 shrink-0 flex justify-between px-5 items-center pt-2">
                     <div className="text-[8px] font-bold text-[#1A7FD4]/40">9:41</div>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#1A7FD4]/40" />
                        <div className="w-1 h-1 rounded-full bg-[#1A7FD4]/40" />
                     </div>
                 </div>
                 {/* App Content */}
                 <div className="px-3.5 py-1 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                        <img 
                          src="/Profile/Arshad.png" 
                          className="w-7 h-7 rounded-full object-cover border border-[#1A7FD4]/20" 
                          alt="User"
                        />
                        <div className="flex flex-col">
                           <div className="text-[9px] font-black text-[#0D1B2A]">John Doe</div>
                           <div className="text-[7px] text-[#1A7FD4] font-bold">Sales Lead</div>
                        </div>
                    </div>
                    
                    <div className="mb-2 shrink-0">
                       <div className="text-[10px] font-black text-[#0D1B2A] mb-1">Monthly Growth</div>
                       <div className="h-1 w-full bg-[#EEF3FF] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "75%" }} 
                            transition={{ duration: 1.5, delay: 1 }} 
                            className="h-full bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]" 
                          />
                       </div>
                    </div>

                    <div className="flex-1 min-h-0 rounded-[12px] overflow-hidden mb-2 relative shadow-inner border border-slate-100">
                       <img 
                         src="/Images/App Devlopment Images/AppDevelopment-Why-3.webp" 
                         className="absolute inset-0 w-full h-full object-cover" 
                         alt="Analytics UI"
                       />
                    </div>

                    <div className="shrink-0 bg-[#F0F6FF] p-2 rounded-[10px] border border-[#1A7FD4]/10">
                       <div className="text-[7px] font-bold text-[#1A7FD4] mb-0.5">Active Projects</div>
                       <div className="text-[9px] font-black text-[#0D1B2A]">12 Corporate Apps</div>
                    </div>
                 </div>
                 {/* Bottom Nav */}
                 <div className="h-8 shrink-0 flex justify-center items-start pb-2">
                    <div className="w-10 h-1 rounded-full bg-slate-200" />
                 </div>
               </motion.div>
            </div>


            {/* Top Right Badge */}
            <div className="absolute -top-2 right-2 sm:right-4 bg-[#1A7FD4] text-white font-nunito font-bold text-[9px] sm:text-[11px] px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-lg z-20">
              Native App Development ✓
            </div>

            {/* Floating Mini Cards - Optimized offsets on mobile to prevent horizontal overflow */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-[15%] sm:-right-4 lg:-right-6 xl:-right-8 bg-background p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[10px_10px_20px_rgba(163,185,210,0.4),-10px_-10px_20px_rgba(255,255,255,0.9)] flex flex-col gap-1 sm:gap-1.5 z-20 w-[100px] sm:w-[130px]"
            >
              <div className="font-nunito font-bold text-[8px] sm:text-[10px] text-[#0D1B2A]">App Store Rating</div>
              <div className="flex items-center gap-1 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#F59E0B" className="w-2 h-2 sm:w-2.5 sm:h-2.5" />) }
              </div>
              <div className="font-nunito font-black text-[10px] sm:text-[12px] text-[#0D1B2A]">4.8 / 5.0</div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-0 bottom-[30%] sm:-left-8 bg-background p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[10px_10px_20px_rgba(163,185,210,0.4),-10px_-10px_20px_rgba(255,255,255,0.9)] flex flex-col gap-1 sm:gap-1.5 z-20 w-[90px] sm:w-[120px]"
            >
              <div className="font-inter text-[7px] sm:text-[9px] text-[#8BA4BE]">Avg. App Load</div>
              <div className="font-nunito font-bold text-[10px] sm:text-[12px] text-[#0D1B2A]">{"< 0.8s"} <Zap className="w-2.5 h-2.5 text-[#F59E0B] inline shrink-0" /></div>
              <div className="h-1 w-full bg-[#E8FFE8] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 2 }} className="h-full bg-[#34C98A]" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute right-2 bottom-2 sm:right-6 sm:bottom-4 bg-background p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[10px_10px_20px_rgba(163,185,210,0.4),-10px_-10px_20px_rgba(255,255,255,0.9)] z-20 flex flex-col gap-1 w-[85px] sm:w-[110px]"
            >
              <div className="font-inter text-[7px] sm:text-[9px] text-[#8BA4BE]">Platforms</div>
              <div className="font-nunito font-bold text-[10px] sm:text-[11px] text-[#0D1B2A] flex items-center gap-1.5">
                <Apple size={10} className="w-3 h-3" /> <Smartphone size={10} className="w-3 h-3" /> <Globe size={10} className="w-3 h-3" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50"
      >
        <span className="text-[10px] sm:text-[12px] font-inter text-[#8BA4BE]">Explore our capabilities</span>
        <ChevronDown size={18} className="text-[#8BA4BE]" />
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
          background: linear-gradient(90deg, #EEF3FF 25%, #E0F7FF 50%, #EEF3FF 75%);
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

export default AppDevelopmentHero;
