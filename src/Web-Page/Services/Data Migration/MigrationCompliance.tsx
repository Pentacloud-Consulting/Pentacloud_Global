"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Lock, Globe, FileLock2 } from "lucide-react";

const complianceCards = [
  {
    title: "GDPR",
    icon: Globe,
    color: "#1A7FD4",
    body: "Full compliance for EU data, including data minimisation, audit trails, and secure destruction post-migration.",
  },
  {
    title: "HIPAA",
    icon: ShieldCheck,
    color: "#34C98A",
    body: "Healthcare-grade security with PHI mapping, BAA documentation, and AES-256 encrypted transfer protocols.",
  },
  {
    title: "ISO 27001",
    icon: Lock,
    color: "#8B5CF6",
    body: "Methodology aligned with international infosec standards, featuring rigorous risk assessment and asset management.",
  },
  {
    title: "Enterprise",
    icon: FileLock2,
    color: "#F59E0B",
    body: "Bank-level AES-256 encryption, VPN-secured channels, and mandatory MFA on all migration environments.",
  }
];

const MigrationCompliance = () => {
  return (
    <section className="py-8 sm:py-12 relative overflow-hidden px-4 sm:px-6">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A7FD4] blur-[120px] opacity-[0.04] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            SECURITY & COMPLIANCE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[48px] text-[#0D1B2A] leading-tight mb-5"
          >
            Your Data Stays <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#34C98A]">Safe. Always.</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-base leading-relaxed font-medium">
            Strict security protocols and regulatory frameworks protect your data and reputation throughout the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {complianceCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-8 border border-white/60 shadow-[10px_10px_25px_rgba(163,185,210,0.1),-5px_-5px_15px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col"
            >
              <div 
                className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500"
                style={{ color: card.color }}
              >
                <card.icon size={26} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-nunito font-black text-[#0D1B2A] mb-3 group-hover:text-[#1A7FD4] transition-colors">{card.title}</h3>
              <p className="text-[#4A6080] font-inter text-[13px] leading-relaxed font-medium">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.1)]">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Full Source Backup",
                "Encrypted Channels",
                "Sandbox Validation",
                "Phased Rollback",
                "Reconciliation Audit",
                "Secure Destruction"
              ].map((check, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#34C98A]/10 text-[#34C98A] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} strokeWidth={3} />
                   </div>
                   <span className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-wider">{check}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default MigrationCompliance;
