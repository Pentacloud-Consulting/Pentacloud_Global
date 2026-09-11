"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Layout, Code, CheckCircle, Rocket } from "lucide-react";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const HowWeWork = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { step: "01", title: "Discovery & Audit", icon: Search, bg: "#EEF3FF", color: "#1A7FD4", desc: "Deep-dive discovery to understand goals, tech stack, and pain points, followed by a free audit." },
    { step: "02", title: "Solution Architecture", icon: Layout, bg: "#EEF3FF", color: "#1A7FD4", desc: "Designing custom solutions, data models, integration points, and security architecture." },
    { step: "03", title: "Agile Build & Configure", icon: Code, bg: "#EEF3FF", color: "#1A7FD4", desc: "Building in 2-week sprints with continuous reviews, configuring flows, objects, and integrations." },
    { step: "04", title: "Testing & Training", icon: CheckCircle, bg: "#EEF3FF", color: "#1A7FD4", desc: "Rigorous UAT testing and data validation followed by role-specific team training sessions." },
    { step: "05", title: "Go-Live & Support", icon: Rocket, bg: "#EEF3FF", color: "#1A7FD4", desc: "Zero-downtime deployment, hypercare support, and transition into managed support models." }
  ];

  return (
    <section className="pt-4 pb-10 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ y: [0, 40, 0], x: [0, 40, 0] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-2 h-2 bg-[#1A7FD4] rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <div className="bg-background shadow-[4px_4px_10px_rgba(163,185,210,0.4),-4px_-4px_10px_rgba(255,255,255,0.8)] text-[#1A7FD4] font-nunito font-bold text-[9px] sm:text-[11px] tracking-[2px] rounded-full px-4 py-1.5 mb-4 sm:mb-6 leading-none">
            HOW WE WORK
          </div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[42px] text-[#0D1B2A] leading-tight">
            Your Salesforce Journey <br/>
            In <span className="text-[#1A7FD4]">5 Clear Steps</span>
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-[160px] left-0 right-0 h-[2px] hidden md:block">
             <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-[#1A7FD4] to-[#1A7FD4] origin-left"
             />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              viewport={{ once: true }}
              className={`${CLAY_CARD} p-4 sm:p-5 flex-1 relative group journey-card flex flex-col items-center justify-start md:justify-center min-h-[180px] md:min-h-[300px] transition-all duration-500`}
            >
              {/* Watermark (Revealed on Hover) */}
              <div 
                className="absolute bottom-4 right-4 text-7xl font-nunito font-black text-[#1A7FD4] pointer-events-none select-none opacity-0 md:group-hover:opacity-10 transition-opacity duration-500 z-10"
              >
                {step.step}
              </div>

              {/* Main Content & Info Reveal */}
              <div className="flex flex-col items-center justify-center w-full z-20 h-full">
                <div 
                  className={`w-[56px] h-[56px] md:w-[68px] md:h-[68px] flex items-center justify-center rounded-xl md:rounded-[22px] mb-3 md:mb-4 shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] relative bg-background transition-all duration-500 md:group-hover:rotate-[10deg] md:group-hover:scale-110 shrink-0`}
                  style={{ color: step.color, border: `2px solid ${step.bg}` }}
                >
                  <step.icon className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                  {i === 0 && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-ping" />
                  )}
                </div>
                
                <h3 className="font-nunito font-bold text-base md:text-[20px] text-[#0D1B2A] text-center transition-all duration-500 md:group-hover:scale-105">
                  {step.title}
                </h3>

                <div className="w-full grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                  <div className="overflow-hidden flex flex-col items-center">
                    <div className="pt-2 sm:pt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col items-center">
                      <p className="font-inter text-xs md:text-[13px] text-[#4A6080] leading-relaxed text-center px-2 sm:px-4">
                        {step.desc}
                      </p>

                      {i === 0 && (
                        <div className="mt-2 md:mt-3 text-[9px] sm:text-[10px] font-nunito font-black text-green-500 uppercase tracking-widest animate-pulse leading-none">
                          Most Popular
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
