"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ClipboardList, FlaskConical, ShieldCheck, Rocket, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    title: "Discovery",
    duration: "1-5 Days",
    icon: FileText,
    color: "#1A7FD4",
    desc: "Complete audit of source data, relationships, and dependencies to map out technical requirements.",
  },
  {
    title: "Strategy",
    duration: "5-10 Days",
    icon: ClipboardList,
    color: "#8B5CF6",
    desc: "Detailed runbook design, including transformation rules, cutover windows, and rollback planning.",
  },
  {
    title: "Testing",
    duration: "Week 2-3",
    icon: FlaskConical,
    color: "#29C6E0",
    desc: "Full sandbox execution to validate field mapping and integrity before touching production data.",
  },
  {
    title: "Cleansing",
    duration: "Week 3-4",
    icon: ShieldCheck,
    color: "#34C98A",
    desc: "Standardising formats, removing duplicates, and applying final transformation rules for high-quality data.",
  },
  {
    title: "Migration",
    duration: "Week 4-5",
    icon: Rocket,
    color: "#F59E0B",
    desc: "Production cutover during pre-agreed window with real-time monitoring and 100% rollback safety.",
  },
  {
    title: "Validation",
    duration: "Week 5-6",
    icon: CheckCircle2,
    color: "#EC4899",
    desc: "Comprehensive reconciliation audit and handover of complete migration documentation.",
  }
];

const MigrationProcess = () => {
  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6 rounded-[48px]">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            HOW WE MIGRATE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[48px] text-[#0D1B2A] leading-tight mb-5"
          >
            Our 6-Step <span className="text-[#1A7FD4]">Migration Blueprint</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-base leading-relaxed font-medium">
            A battle-tested methodology built from 100+ successful migrations with a zero data loss record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-8 border border-white/60 shadow-[10px_10px_25px_rgba(163,185,210,0.1),-5px_-5px_15px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col"
            >
              <div className="absolute top-4 right-6 text-5xl font-nunito font-black text-[#1A7FD4] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                {`0${idx + 1}`}
              </div>

              <div 
                className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
                style={{ color: step.color }}
              >
                <step.icon size={26} strokeWidth={2.5} />
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-nunito font-black text-[#0D1B2A] leading-none">{step.title}</h3>
                <span className="px-2 py-0.5 bg-white/60 rounded-full border border-white text-[9px] font-black text-[#1A7FD4] uppercase tracking-wider">
                  {step.duration}
                </span>
              </div>
              
              <p className="text-[#4A6080] font-inter text-[13.5px] leading-relaxed font-medium mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MigrationProcess;
