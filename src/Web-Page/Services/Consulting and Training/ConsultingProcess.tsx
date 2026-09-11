"use client";

import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    title: "Discovery",
    duration: "Day 1-2",
    color: "#1A7FD4",
    desc: "Mapping your business goals and tech landscape to identify growth gaps.",
  },
  {
    title: "Assessment",
    duration: "Week 1-2",
    color: "#8B5CF6",
    desc: "Deep-dive audit of your current org, infrastructure, and team capabilities.",
  },
  {
    title: "Strategy",
    duration: "Week 2-3",
    color: "#F59E0B",
    desc: "Prioritised roadmap with clear ROI metrics and sequenced recommendations.",
  },
  {
    title: "Execution",
    duration: "Ongoing",
    color: "#34C98A",
    desc: "Seamless implementation support or expert handover for your internal team.",
  }
];

const ConsultingProcess = () => {
  return (
    <section className="py-8 sm:py-8 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            OUR METHODOLOGY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-tight mb-5"
          >
            Clear Path to <span className="text-[#1A7FD4]">Results</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-lg leading-relaxed font-medium px-4">
            A structured approach from honest assessment to actionable strategic outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.1),-15px_-15px_30px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-6xl font-nunito font-black text-[#1A7FD4] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                {`0${idx + 1}`}
              </div>

              <div 
                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500"
                style={{ color: step.color }}
              >
                <span className="font-black text-lg">{idx + 1}</span>
              </div>

              <h3 className="text-lg font-nunito font-black text-[#0D1B2A] mb-1 group-hover:text-[#1A7FD4] transition-colors uppercase tracking-wider">{step.title}</h3>
              <div className="text-[9px] font-black text-[#1A7FD4] uppercase tracking-widest mb-4">
                {step.duration}
              </div>
              
              <p className="text-[#4A6080] font-inter text-[13px] leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultingProcess;
