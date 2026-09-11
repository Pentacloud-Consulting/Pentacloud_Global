"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Smartphone, Search, Shield, RefreshCw, BarChart2, Clock, HeadphonesIcon } from "lucide-react";

const WebWhyPentacloud = () => {
  const [activeWhy, setActiveWhy] = useState(0);
  const differentiators = [
    { title: "Performance-First Development", icon: Zap, bg: "#FFF8E0", color: "#F59E0B", desc: "Every site achieves 90+ Google PageSpeed on both mobile and desktop as standard.", image: "/Images/Web Development images/WebDevelopment-why-1.webp" },
    { title: "Mobile-First, Always", icon: Smartphone, bg: "#E0F7FF", color: "#29C6E0", desc: "Designed and built mobile-first, every breakpoint tested on real devices.", image: "/Images/Web Development images/WebDevelopment-why-2.webp" },
    { title: "SEO Foundation Built-In", icon: Search, bg: "#E8FFE8", color: "#34C98A", desc: "Semantic HTML, schema markup, meta structure, and Core Web Vitals all handled.", image: "/Images/Web Development images/WebDevelopment-why-3.webp" },
    { title: "Enterprise-Grade Security", icon: Shield, bg: "#EEF3FF", color: "#1A7FD4", desc: "SSL, CSP headers, HTTPS enforcement, and regular audits, protected from the ground up.", image: "/Images/Web Development images/WebDevelopment-why-4.webp" },
    { title: "CMS-Powered Updates", icon: RefreshCw, bg: "#F3E8FF", color: "#8B5CF6", desc: "Update content without touching code. We integrate your preferred CMS platforms.", image: "/Images/Web Development images/WebDevelopment-why-5.webp" },
    { title: "Analytics & Tracking", icon: BarChart2, bg: "#FFE8F0", color: "#EC4899", desc: "GA4, Pixel, GTM, and heatmaps configured at launch for data-driven decisions.", image: "/Images/Web Development images/WebDevelopment-why-6.webp" },
    { title: "On-Time, Every Time", icon: Clock, bg: "#FFF8E0", color: "#F59E0B", desc: "Fixed timelines, milestones, and weekly progress updates, zero surprises.", image: "/Images/Web Development images/WebDevelopment-why-7.webp" },
    { title: "Post-Launch Support", icon: HeadphonesIcon, bg: "#E8FFE8", color: "#34C98A", desc: "30-day support included on every project for bugs, updates, and monitoring.", image: "/Images/Web Development images/WebDevelopment-why-8.webp" }
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#F0F6FF] relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
        
        {/* Left Column - Visual Card (Sticky) - Hidden on Mobile */}
        <div className="hidden lg:block sticky top-28 self-start">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative min-h-[580px] rounded-[32px] shadow-[0_24px_60px_rgba(26,127,212,0.3)] group flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A7FD4 0%, #0D5FA3 50%, #29C6E0 100%)' }}
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
                <Zap className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">90+ PageSpeed</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Performance Optimized</div>
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
                <Shield className="w-3.5 h-3.5 text-[#1A7FD4] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">SSL + Security</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Enterprise Grade</div>
                </div>
              </motion.div>
            )}
            {activeWhy === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-32 right-10 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#29C6E0] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">Pixel Perfect</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Responsive Design</div>
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
            Websites Built for <br/>
            <span className="text-[#1A7FD4] relative inline-block">
              Business Growth
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
            We don't just build pretty websites. We engineer digital assets that generate leads, build brand trust, and scale without limits.
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
                className={`relative flex gap-3.5 sm:gap-5 p-3.5 sm:p-4 rounded-xl sm:rounded-[20px] transition-all duration-300 cursor-default group overflow-hidden ${activeWhy === i ? 'bg-white shadow-lg -translate-x-1.5 sm:-translate-x-2' : 'hover:bg-white/40'}`}
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

export default WebWhyPentacloud;
