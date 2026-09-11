"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, PenTool, Paintbrush, Code2, TestTube2, Rocket, CheckCircle2 
} from "lucide-react";

const WebHowWeBuild = () => {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      duration: "Day 1–3",
      icon: MessageSquare,
      color: "#1A7FD4",
      body: "Deep-dive session to define goals, audience, and technical scope, resulting in a solidified project roadmap.",
      deliverable: "Project Brief",
      side: "left"
    },
    {
      num: "02",
      title: "Wireframing",
      duration: "Day 3–7",
      icon: PenTool,
      color: "#8B5CF6",
      body: "Architecting the site structure, defining user flows, and conversion paths before any visual work begins.",
      deliverable: "UX Blueprint",
      side: "right"
    },
    {
      num: "03",
      title: "UI Design",
      duration: "Day 7–14",
      icon: Paintbrush,
      color: "#29C6E0",
      body: "High-fidelity Figma designs with interactive prototypes to visualise exactly how your site will look and feel.",
      deliverable: "Figma Prototype",
      side: "left"
    },
    {
      num: "04",
      title: "Build Phase",
      duration: "Week 2–5",
      icon: Code2,
      color: "#34C98A",
      body: "Engineered development using Next.js and Tailwind, creating a high-performance, mobile-first experience.",
      deliverable: "Staging Site",
      side: "right"
    },
    {
      num: "05",
      title: "Optimisation",
      duration: "Week 5–6",
      icon: TestTube2,
      color: "#F59E0B",
      body: "Cross-browser testing, SEO audit, security hardening, and Core Web Vitals profiling for peak performance.",
      deliverable: "QA Report",
      side: "left"
    },
    {
      num: "06",
      title: "Handover",
      duration: "Week 6–7",
      icon: Rocket,
      color: "#EC4899",
      body: "Final deployment with full analytics integration, CMS training, and documentation for your in-house team.",
      deliverable: "Live Launch",
      side: "right"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A7FD4] blur-[130px] opacity-[0.05] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#29C6E0] blur-[130px] opacity-[0.05] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            OUR WEB PROCESS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[48px] text-[#0D1B2A] leading-[1.1] mb-5"
          >
            From Brief to <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]">Browser in 6 Steps</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-lg leading-relaxed font-medium px-4">
            A transparent, agile workflow designed to deliver high-converting web experiences on time and within budget.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Main Vertical Track */}
          <div className="absolute left-[27px] sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/40 shadow-inner rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#1A7FD4] via-[#29C6E0] to-[#EC4899] shadow-[0_0_15px_rgba(26,127,212,0.4)]"
            />
          </div>

          <div className="flex flex-col gap-12 sm:gap-24 relative">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-center w-full ${step.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}>
                
                {/* Content Card */}
                <motion.div 
                  initial={{ x: step.side === 'left' ? -40 : 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true }}
                  className={`w-[calc(100%-54px)] ml-[54px] sm:w-full sm:ml-0 md:w-[45%] group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-8 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25)] transition-all duration-500 flex flex-col overflow-hidden`}
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-6 text-5xl sm:text-6xl font-nunito font-black text-[#1A7FD4] opacity-[0.03] group-hover:opacity-[0.06] pointer-events-none transition-opacity">
                    {step.num}
                  </div>

                  {/* Decorative Glow */}
                  <div 
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shrink-0"
                      style={{ color: step.color }}
                    >
                      <step.icon size={26} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-nunito font-black text-lg sm:text-xl text-[#0D1B2A] group-hover:text-[#1A7FD4] transition-colors leading-tight">{step.title}</h3>
                      <div className="px-2.5 py-0.5 bg-white/60 rounded-full border border-white shadow-sm text-[9px] font-black text-[#1A7FD4] uppercase tracking-wider mt-1 w-fit">
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  <p className="font-inter text-[13px] text-[#4A6080] leading-relaxed mb-6 font-medium flex-1">
                    {step.body}
                  </p>

                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-white text-[10px] font-nunito font-black uppercase tracking-wider w-fit group-hover:bg-white transition-colors"
                    style={{ color: step.color }}
                  >
                    <CheckCircle2 size={14} strokeWidth={3} className="shrink-0 opacity-60" />
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </motion.div>

                {/* Timeline Intersection Node */}
                <div className="absolute left-[27px] sm:left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center flex z-20">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg border border-white/60 flex items-center justify-center relative">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner transition-colors duration-500" style={{ backgroundColor: step.color }} />
                    <motion.div 
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                  
                  {/* Decorative H-Line Connector (Desktop Only) */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`hidden md:block absolute h-[1px] w-12 bg-white/60 ${step.side === 'left' ? 'right-10 origin-right' : 'left-10 origin-left'}`}
                  />
                </div>

                {/* Grid Spacer */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebHowWeBuild;
