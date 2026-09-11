"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, Palette, Code2, TestTube2, Rocket, Apple, Smartphone, CheckCircle2 } from "lucide-react";

const AppHowWeBuild = () => {
  const steps = [
    { title: "Idea Validation", duration: "Day 1–3", icon: Lightbulb, color: "#1A7FD4", deliverable: "Validation Report", desc: "We analyse your app idea, market size, competitor apps, technical feasibility, and monetisation potential.", visual: "validate" },
    { title: "UX Wireframes", duration: "Day 3–10", icon: Users, color: "#1A7FD4", deliverable: "User Flow Diagrams", desc: "User journey mapping, persona definition, and low-fidelity wireframes across every screen.", visual: "wireframe" },
    { title: "UI Design", duration: "Day 10–20", icon: Palette, color: "#EC4899", deliverable: "Interactive Prototype", desc: "High-fidelity mobile UI designs across all screens, animations, micro-interactions, and empty states.", visual: "design" },
    { title: "Development Sprints", duration: "Week 3–8", icon: Code2, color: "#34C98A", deliverable: "Weekly Test Builds", desc: "2-week agile sprints with weekly TestFlight / internal builds shared for your review.", visual: "sprints" },
    { title: "QA & Testing", duration: "Week 8–9", icon: TestTube2, color: "#F59E0B", deliverable: "QA Test Report", desc: "Testing on 30+ real devices, functional testing, performance profiling, and battery usage.", visual: "qa" },
    { title: "Launch & Growth", duration: "Week 9–10", icon: Rocket, color: "#EC4899", deliverable: "Live on App Stores", desc: "End-to-end App Store and Play Store submission, screenshots, descriptions, and metadata.", visual: "launch" }
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A7FD4] blur-[130px] opacity-[0.05] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#29C6E0] blur-[130px] opacity-[0.05] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[2px_2px_8px_rgba(163,185,210,0.15)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[3px] uppercase mb-4 sm:mb-5"
          >
            OUR PROCESS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-[1.1] mb-4 sm:mb-5"
          >
            From Idea to <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]">App Store in 6 Steps</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-sm leading-relaxed font-medium px-4">
            We follow a rigorous, transparent development cycle to ensure your app is built correctly, tested thoroughly, and launched successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.15),-10px_-10px_20px_rgba(255,255,255,0.6)] hover:shadow-[20px_20px_40px_rgba(163,185,210,0.2)] transition-all duration-500 flex flex-col overflow-hidden h-full"
            >
              {/* Step Number Backdrop */}
              <div className="absolute top-3 right-5 text-5xl sm:text-6xl font-nunito font-black text-[#1A7FD4] opacity-[0.03] group-hover:opacity-[0.06] pointer-events-none transition-opacity">
                {`0${i + 1}`}
              </div>

              {/* Decorative Glow */}
              <div 
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: step.color }}
              />

              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 rounded-[10px] sm:rounded-xl bg-white shadow-[4px_4px_10px_rgba(163,185,210,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shrink-0"
                style={{ color: step.color }}
              >
                <step.icon size={20} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
              </div>

              <h3 className="font-nunito font-black text-lg sm:text-[19px] text-[#0D1B2A] mb-2 group-hover:text-[#1A7FD4] transition-colors duration-300 leading-tight">
                {step.title}
              </h3>

              <div className="px-2 py-0.5 bg-white/60 rounded-md border border-white shadow-sm text-[8.5px] font-nunito font-black text-[#1A7FD4] uppercase tracking-widest w-fit mb-3">
                {step.duration}
              </div>
              
              <p className="font-inter text-[12px] sm:text-[13px] text-[#4A6080] leading-relaxed mb-4 font-medium flex-1">
                {step.desc}
              </p>

              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-white shadow-sm border border-white text-[9px] font-nunito font-black uppercase tracking-wider mb-5 w-fit group-hover:bg-white transition-colors"
                style={{ color: step.color }}
              >
                <step.icon size={12} strokeWidth={3} className="shrink-0" />
                <span className="truncate">{step.deliverable}</span>
              </div>

              {/* Enhanced Visual Footer */}
              <div className="pt-4 border-t border-white/40 mt-auto flex items-center justify-center h-14 sm:h-16 overflow-hidden">
                {step.visual === "validate" && (
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 bg-[#34C98A]/10 px-4 py-2 rounded-full border border-[#34C98A]/20"
                  >
                     <CheckCircle2 size={16} className="text-[#34C98A]" />
                     <span className="text-[11px] font-black text-[#34C98A] uppercase tracking-wider">Feasibility Passed</span>
                  </motion.div>
                )}

                {step.visual === "wireframe" && (
                  <div className="flex gap-2">
                    {[0, 1, 2].map((j) => (
                      <motion.div 
                        key={j} 
                        initial={{ height: 20 }}
                        animate={{ height: [20, 35, 20], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.2 }}
                        className="w-5 border-2 border-[#1A7FD4]/20 rounded-md bg-white/40"
                      />
                    ))}
                  </div>
                )}

                {step.visual === "design" && (
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EC4899] to-[#FF75B5] shadow-lg shadow-pink-500/20" />
                     <div className="flex flex-col gap-1">
                        <div className="w-12 h-1.5 bg-white/60 rounded-full" />
                        <div className="w-8 h-1.5 bg-white/40 rounded-full" />
                     </div>
                  </div>
                )}

                {step.visual === "sprints" && (
                  <div className="flex items-center gap-2 w-full max-w-[120px]">
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="flex-1 h-8 bg-white/40 rounded-lg border border-white/50 p-1 flex items-end">
                        <motion.div 
                          animate={{ height: j === 1 ? ['40%', '90%', '40%'] : '60%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-full rounded-sm ${j === 1 ? 'bg-[#34C98A]' : 'bg-[#34C98A]/30'}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {step.visual === "qa" && (
                  <div className="grid grid-cols-4 gap-1.5">
                    {[...Array(8)].map((_, j) => (
                      <motion.div 
                        key={j} 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.1 }}
                        className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] flex items-center justify-center text-white text-[7px] font-black"
                      >
                        ✓
                      </motion.div>
                    ))}
                  </div>
                )}

                {step.visual === "launch" && (
                  <div className="flex gap-4">
                     <motion.div whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0D1B2A]">
                        <Apple size={20} />
                     </motion.div>
                     <motion.div whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#34C98A]">
                        <Smartphone size={20} />
                     </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppHowWeBuild;
