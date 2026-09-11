"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Eye, Shield, Zap, BarChart2, RefreshCw, Lock, Users } from "lucide-react";

const AppWhyPentacloud = () => {
  const [activeWhy, setActiveWhy] = useState(0);
  const differentiators = [
    { title: "True Cross-Platform Expertise", icon: Smartphone, bg: "#EEF3FF", color: "#1A7FD4", desc: "Certified in React Native, Swift, and Kotlin, we choose the right technology for your app.", image: "/Images/App Devlopment Images/AppDevelopment-Why-1.webp" },
    { title: "Weekly Test Builds Shared", icon: Eye, bg: "#E0F7FF", color: "#29C6E0", desc: "Every 2 weeks you receive a TestFlight build to test on your real device.", image: "/Images/App Devlopment Images/AppDevelopment-Why-2.webp" },
    { title: "App Store Submission Managed", icon: Shield, bg: "#EEF3FF", color: "#1A7FD4", desc: "We handle every aspect of submission, screenshots, metadata, and rejection handling.", image: "/Images/App Devlopment Images/AppDevelopment-Why-3.webp" },
    { title: "Performance Obsessed", icon: Zap, bg: "#FFF8E0", color: "#F59E0B", desc: "< 0.8s cold start, smooth 60fps animations, and minimal battery drain.", image: "/Images/App Devlopment Images/AppDevelopment-Why-4.webp" },
    { title: "Analytics Built-In", icon: BarChart2, bg: "#E8FFE8", color: "#34C98A", desc: "Mixpanel, Firebase, or your preferred tool configured at launch for data-driven decisions.", image: "/Images/App Devlopment Images/AppDevelopment-Why-5.webp" },
    { title: "Post-Launch Updates", icon: RefreshCw, bg: "#EEF3FF", color: "#1A7FD4", desc: "Every project ends with a prioritised feature roadmap to keep your app fresh.", image: "/Images/App Devlopment Images/AppDevelopment-Why-6.webp" },
    { title: "Security & Privacy First", icon: Lock, bg: "#FFE8F0", color: "#EC4899", desc: "Encrypted storage, secure APIs, and GDPR-compliant data handling.", image: "/Images/App Devlopment Images/AppDevelopment-Why-7.webp" },
    { title: "Salesforce-Connected Apps", icon: Users, bg: "#EEF3FF", color: "#1A7FD4", desc: "As certified partners, we build apps that connect directly to your Salesforce org.", image: "/Images/App Devlopment Images/AppDevelopment-Why-8.webp" }
  ];

  return (
    <section className="py-8 sm:py-12 bg-background relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
        
        {/* Left Column - Visual Card (Sticky) - Hidden on Mobile to prevent layout collapse */}
        <div className="hidden lg:block sticky top-28 self-start">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative min-h-[600px] rounded-[32px] shadow-[0_24px_60px_rgba(26,127,212,0.30)] group flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #1A7FD4 0%, #0D1B2A 50%, #1A7FD4 100%)' }}
          >
          {/* Main Dynamic Image Placeholder */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWhy}
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12"
            >
              <div className="w-full h-full rounded-[24px] bg-white/5 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group/img">
                   <motion.img 
                     key={`img-${activeWhy}`}
                     initial={{ scale: 1.2, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.8 }}
                     src={differentiators[activeWhy].image} 
                     alt={differentiators[activeWhy].title} 
                     className="absolute inset-0 w-full h-full object-cover"
                   />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Badges - Dynamic based on selection */}
          <AnimatePresence>
            {activeWhy === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-12 left-8 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#1A7FD4] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">iOS + Android</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">One Codebase, Both Platforms</div>
                </div>
              </motion.div>
            )}
            {activeWhy === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-12 right-8 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">0.8s Cold Start</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Performance Optimized</div>
                </div>
              </motion.div>
            )}
            {activeWhy === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-32 right-10 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#34C98A] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">App Store Ready</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Submission Experts</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column - Differentiators */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <div className="text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-3 sm:mb-4">
            WHY PENTACLOUD
          </div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[38px] text-[#0D1B2A] leading-tight mb-4 sm:mb-6">
            Apps Built for <br/>
            <span className="text-[#1A7FD4] relative inline-block">
              Real Users, Real Results
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-1 left-0 h-1 bg-[#1A7FD4] opacity-20 rounded-full"
              />
            </span>
          </h2>
          <p className="font-inter text-xs sm:text-base text-[#4A6080] leading-relaxed mb-6 sm:mb-10 pr-2">
            We obsess over user experience, performance, and retention, building apps that users love, businesses trust, and App Store reviewers approve.
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setActiveWhy(i)}
                onClick={() => setActiveWhy(i)}
                className={`relative flex gap-3.5 sm:gap-5 p-3.5 sm:p-4 rounded-xl sm:rounded-[20px] transition-all duration-300 cursor-default group overflow-hidden ${activeWhy === i ? 'bg-[#E8F0F8] shadow-lg -translate-x-1.5 sm:-translate-x-2' : 'hover:bg-[#E8F0F8]/40'}`}
              >
                <div 
                  className={`w-10 h-10 sm:w-[52px] sm:h-[52px] shrink-0 flex items-center justify-center rounded-lg sm:rounded-[14px] transition-all duration-300 ${activeWhy === i ? 'bg-[#1A7FD4] text-white' : 'bg-white shadow-sm text-[#1A7FD4]'}`}
                >
                  <item.icon className="w-4.5 h-4.5 sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-nunito font-bold text-sm sm:text-[17px] transition-colors mb-1 truncate ${activeWhy === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'}`}>
                    {item.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {activeWhy === i && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-[11px] sm:text-[13px] text-[#4A6080] leading-relaxed mb-3 pr-2 pt-1">
                          {item.desc}
                        </p>
                        
                        {/* Premium Inline Visual Card - Only rendered on mobile/tablet viewports */}
                        <div className="lg:hidden w-full aspect-video rounded-xl overflow-hidden relative border border-slate-100 shadow-sm mt-3">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
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

export default AppWhyPentacloud;
