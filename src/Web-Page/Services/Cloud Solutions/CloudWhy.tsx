"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Search, TrendingDown, Lock, Shield, 
  Activity, Cloud, Server, Cpu, CheckCircle2
} from "lucide-react";

const CloudWhy = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Award,
      color: "#1A7FD4",
      title: "Certified Tier 3 Engineers",
      desc: "Every cloud project is led by Tier 3 certified engineers with hands-on expertise in AWS, Azure, and GCP.",
      badge: "SLA Guaranteed",
      visual: "tier3",
      image: "/Images/CloudSolution images/CloudSolution.why-1.webp"
    },
    {
      icon: Search,
      color: "#34C98A",
      title: "No-Obligation Assessment",
      desc: "We start with a free cloud audit, real findings, no sales pitch. Know your infrastructure health before you commit.",
      badge: "Free Audit",
      visual: "audit",
      image: "/Images/CloudSolution images/CloudSolution.why-2.webp"
    },
    {
      icon: TrendingDown,
      color: "#F59E0B",
      title: "40% Cost Reduction",
      desc: "Right-sizing and automated governance deliver massive savings within 90 days of implementation.",
      badge: "ROI Focused",
      visual: "cost",
      image: "/Images/CloudSolution images/CloudSolution.why-3.webp"
    },
    {
      icon: Lock,
      color: "#8B5CF6",
      title: "Zero Breach Infrastructure",
      desc: "Compliance-ready architecture (GDPR, HIPAA) with hardened security protocols from day one.",
      badge: "SOC2 Ready",
      visual: "security",
      image: "/Images/CloudSolution images/CloudSolution.why-4.webp"
    }
  ];

  return (
    <section className="py-10 sm:py-24 bg-[#E8F0F8] relative px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
        
        {/* Left Column - Visual Card (Sticky, Image 3/WhyPentacloud Style) - Hidden on Mobile */}
        <div className="hidden lg:block sticky top-28 self-start">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative min-h-[580px] rounded-[48px] overflow-hidden shadow-[20px_20px_60px_rgba(13,27,42,0.15)] group flex flex-col items-center justify-center border border-white/50"
            style={{ background: 'linear-gradient(135deg, #0D1B2A, #1A7FD4)' }}
          >
            {/* Mesh Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12"
              >
                <div className="w-full h-full rounded-[40px] bg-white/5 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group/img">
                   <motion.img 
                     key={`img-${activeFeature}`}
                     initial={{ scale: 1.2, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.8 }}
                     src={features[activeFeature].image} 
                     alt={features[activeFeature].title} 
                     className="absolute inset-0 w-full h-full object-cover"
                   />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Floating Badges */}
            <AnimatePresence>
               <motion.div
                 key={`badge-${activeFeature}`}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -30 }}
                 className="absolute bottom-12 left-12 bg-white p-5 rounded-[24px] shadow-2xl z-20 flex items-center gap-4"
               >
                 <div className="w-10 h-10 rounded-xl bg-[#E8F0F8] flex items-center justify-center text-[#1A7FD4]">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <div className="font-nunito font-black text-[14px] text-[#0D1B2A]">Enterprise Ready</div>
                    <div className="font-inter text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Tier 3 Verified</div>
                 </div>
               </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column - Content & Interactive List */}
        <div className="flex flex-col gap-8 sm:gap-12 w-full">
          <div className="flex flex-col gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-2 inline-block w-fit"
            >
              THE PENTACLOUD EDGE
            </motion.div>
            <h2 className="text-2xl sm:text-[42px] md:text-[52px] font-nunito font-black text-[#0D1B2A] leading-tight">
              Your Infrastructure, <br />
              <span className="text-[#1A7FD4]">Our Obsession</span>
            </h2>
            <p className="text-[#4A6080] font-inter text-xs sm:text-lg leading-relaxed max-w-lg">
              We combine deep technical certification with real-world infrastructure expertise, delivering cloud solutions that genuinely transform how your business performs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setActiveFeature(i)}
                onClick={() => setActiveFeature(i)}
                className={`relative flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-[20px] sm:rounded-[32px] transition-all duration-500 cursor-default group overflow-hidden ${
                  activeFeature === i 
                  ? "bg-white shadow-[15px_15px_40px_rgba(163,185,210,0.4)] -translate-x-1 sm:-translate-x-2" 
                  : "hover:bg-white/40"
                }`}
              >
                <div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded-xl sm:rounded-[20px] transition-all duration-500 ${
                    activeFeature === i 
                    ? "bg-[#1A7FD4] text-white shadow-lg rotate-[15deg] scale-110" 
                    : "bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4)] text-[#1A7FD4]"
                  }`}
                >
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-nunito font-black text-sm sm:text-[20px] transition-colors mb-1 sm:mb-2 truncate ${
                    activeFeature === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'
                  }`}>
                    {item.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {activeFeature === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-xs sm:text-[14px] text-[#4A6080] leading-relaxed pr-2 pt-1 mb-3">
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
        </div>
      </div>
    </section>
  );
};

export default CloudWhy;
