"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe, Presentation, GraduationCap, Target, Laptop, RefreshCw, Video, Phone } from "lucide-react";

const deliveryFormats = [
  {
    icon: Building2,
    color: "#1A7FD4",
    title: "On-Site",
    desc: "In-person training using your actual systems for relevance.",
  },
  {
    icon: Globe,
    color: "#34C98A",
    title: "Virtual",
    desc: "Interactive live sessions with full recording support.",
  },
  {
    icon: Presentation,
    color: "#F59E0B",
    title: "Custom",
    desc: "Bespoke programmes built for your business logic.",
  },
  {
    icon: GraduationCap,
    color: "#8B5CF6",
    title: "Certification",
    desc: "Structured exam prep with 85%+ pass rate.",
  }
];

const trainingPrinciples = [
  { icon: Target, title: "Role-Specific", bg: "#FFE8F0", color: "#EC4899" },
  { icon: Laptop, title: "Hands-On", bg: "#E0F7FF", color: "#29C6E0" },
  { icon: RefreshCw, title: "Real Scenarios", bg: "#EEF3FF", color: "#1A7FD4" },
  { icon: Video, title: "Recorded", bg: "#F3E8FF", color: "#8B5CF6" },
  { icon: Phone, title: "Post-Support", bg: "#FFF8E0", color: "#F59E0B" }
];

const TrainingDelivery = () => {
  return (
    <section className="py-8 sm:py-12 relative overflow-hidden px-4 sm:px-6 bg-[#E8F0F8] rounded-[48px]">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            TRAINING DELIVERY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[44px] text-[#0D1B2A] leading-tight mb-5"
          >
            Learning That <span className="text-[#1A7FD4]">Changes Behaviour</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-base leading-relaxed font-medium px-4">
            Hands-on programmes built around real-world scenarios and immediate application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {deliveryFormats.map((format, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-white/60 shadow-[10px_10px_25px_rgba(163,185,210,0.1),-5px_-5px_15px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col"
            >
              <div 
                className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shrink-0"
                style={{ color: format.color }}
              >
                <format.icon size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-nunito font-black text-[#0D1B2A] mb-2 group-hover:text-[#1A7FD4] transition-colors uppercase tracking-wider">{format.title}</h3>
              <p className="text-[#4A6080] font-inter text-[13px] leading-relaxed font-medium">{format.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-[40px] border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.1)]">
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {trainingPrinciples.map((principle, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110 shadow-sm" style={{ backgroundColor: principle.bg, color: principle.color }}>
                     <principle.icon size={20} strokeWidth={2.5} />
                   </div>
                   <p className="text-[10px] font-black text-[#0D1B2A] uppercase tracking-wider">{principle.title}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingDelivery;
