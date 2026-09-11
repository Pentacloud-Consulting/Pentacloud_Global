"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Users, RefreshCw, Globe, Heart } from "lucide-react";

const WhyPentacloud = () => {
  const [activeWhy, setActiveWhy] = useState(0);
  const differentiators = [
    { title: "35+ Active Salesforce Certifications", icon: Shield, bg: "#EEF3FF", color: "#1A7FD4", desc: "Our team holds certifications across Admin, Developer, Architect, and Consultant tracks.", image: "/Images/Salesforce/Sales-WhyPenta-1.webp" },
    { title: "48-Hour Response Guarantee", icon: Zap, bg: "#EEF3FF", color: "#1A7FD4", desc: "Every support request is acknowledged within 48 hours, with critical issues escalated immediately.", image: "/Images/Salesforce/Sales-WhyPenta-2.webp" },
    { title: "Industry-Specific Expertise", icon: Users, bg: "#EEF3FF", color: "#1A7FD4", desc: "Deep domain knowledge across Healthcare, Finance, Retail, and Corporate Enterprise.", image: "/Images/Salesforce/Sales-WhyPenta-3.webp" },
    { title: "Agile Delivery, Always On Time", icon: RefreshCw, bg: "#EEF3FF", color: "#1A7FD4", desc: "2-week sprint cycles with full client visibility, no black-box development.", image: "/Images/Salesforce/Sales-WhyPenta-4.webp" },
    { title: "India + UAE Presence", icon: Globe, bg: "#EEF3FF", color: "#1A7FD4", desc: "Offices in Bengaluru and UAE presence, serving clients across India and the Middle East.", image: "/Images/Salesforce/Sales-WhyPenta-5.webp" },
    { title: "Post Go-Live Partnership", icon: Heart, bg: "#EEF3FF", color: "#1A7FD4", desc: "We don't disappear after launch. Our managed support ensures your Salesforce evolves.", image: "/Images/Salesforce/Sales-WhyPenta-6.webp" }
  ];

  return (
    <section className="pt-10 pb-8 sm:pt-20 sm:pb-12 bg-background relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
        
        {/* Left Column - Sticky Wrapper - Hidden on Mobile */}
        <div className="hidden lg:block relative w-full self-stretch">
          <div className="sticky top-32">
            <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative min-h-[560px] rounded-[32px] overflow-hidden shadow-[0_24px_60px_rgba(26,127,212,0.3)] group flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1A7FD4, #0D5FA3)' }}
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
                className="absolute bottom-10 left-8 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#1A7FD4] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">Salesforce Certified</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">35+ Active Certifications</div>
                </div>
              </motion.div>
            )}
            {activeWhy === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-10 right-8 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">48hr Response SLA</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Guaranteed Support</div>
                </div>
              </motion.div>
            )}
            {activeWhy === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-24 right-6 bg-white p-4 rounded-[16px] shadow-2xl z-20 flex items-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                <div>
                   <div className="font-nunito font-bold text-[14px] text-[#0D1B2A] leading-tight">On-Time Delivery</div>
                   <div className="font-inter text-[12px] text-[#4A6080]">Agile Sprint Cycles</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </motion.div>
          </div>
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
            Not Just Another <br/>
            <span className="text-[#1A7FD4] relative inline-block">
              Salesforce Partner
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
            We combine deep technical certification with real-world business consulting, delivering Salesforce solutions that your team actually adopts and loves.
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
    </section>
  );
};

export default WhyPentacloud;
