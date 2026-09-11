"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, DollarSign, Server, Shield, Cloud, ChevronDown, Phone, ArrowRight, CheckCircle2, Zap
} from "lucide-react";
import CountUp from "react-countup";

const CloudCTA = () => {
  const stats = [
    { icon: Activity, color: "#1A7FD4", val: 99.9, suffix: "%", label: "Uptime SLA", sub: "Guaranteed availability" },
    { icon: DollarSign, color: "#34C98A", val: 40, suffix: "%", label: "Avg Cost Reduction", sub: "vs. unoptimised spend" },
    { icon: Server, color: "#8B5CF6", val: 500, suffix: "+", label: "Cloud Workloads", sub: "Across AWS, Azure & GCP" },
    { icon: Shield, color: "#EC4899", val: 0, label: "Security Breaches", sub: "Across all managed clients" }
  ];

  const faqs = [
    {
      q: "What is the difference between cloud migration and cloud architecture?",
      a: "Cloud architecture is designing how your systems should be structured in the cloud, which services to use, security boundaries, and cost optimisation. Cloud migration is the execution, actually moving your workloads to that architecture. We do both, always starting with architecture first.",
      type: "clay"
    },
    {
      q: "How long does cloud migration take?",
      a: "A typical SMB cloud migration takes 4–8 weeks from assessment to go-live. Enterprise migrations with multiple applications and databases take 3–6 months. We always start with non-critical workloads to ensure zero disruption.",
      type: "neuro"
    },
    {
      q: "Which cloud platform should we choose?",
      a: "It depends on your existing stack and compliance needs. We're cloud-agnostic and recommend AWS for general workloads, Azure for Microsoft-first organisations, and GCP for data/AI workloads. Many clients use two platforms side by side.",
      type: "clay"
    },
    {
      q: "How do you ensure our data is secure during migration?",
      a: "Security is designed into every migration. We use encrypted data transfer, minimal privilege IAM policies, network isolation, and full backups before cutover. We also provide a complete security audit report post-migration.",
      type: "neuro"
    },
    {
      q: "What does managed cloud support include?",
      a: "Our managed support covers 24/7 monitoring, automated alerting, monthly cost optimisation reviews, patch management, incident response with Tier 3 escalation, and quarterly architecture reviews.",
      type: "clay"
    },
    {
      q: "Can you reduce our existing cloud costs?",
      a: "In almost every case, yes. We typically find 30–50% cost savings through right-sizing, reserved instance planning, and removing zombie resources. We offer a free cost optimisation audit first.",
      type: "neuro"
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-background">
      {/* --- STATS ROW (NEUMORPHIC) --- */}
      <div className="py-10 sm:py-24 bg-[#E8F0F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16 flex flex-col items-center">
            <div className="px-4 py-1.5 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] text-[9px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-6">
              OUR CLOUD IMPACT
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-nunito font-black text-[#0D1B2A] leading-tight">
              Numbers That Prove <br />
              <span className="text-[#1A7FD4]">Our Cloud Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-[#E8F0F8] rounded-[20px] p-5 sm:p-8 shadow-[8px_8px_16px_rgba(163,185,210,0.6),-8px_-8px_16px_rgba(255,255,255,0.9)] flex flex-col items-center text-center group border border-white/40 min-w-0"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F0F8] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-[4px_4px_12_rgba(163,185,210,0.6),-4px_-4px_12_rgba(255,255,255,0.9)] transition-all duration-500 shrink-0">
                  <stat.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" color={stat.color} />
                </div>
                <div className="text-2xl sm:text-5xl font-nunito font-black text-[#1A7FD4] mb-1.5 sm:mb-2 flex items-baseline truncate w-full justify-center">
                  <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2.5} enableScrollSpy />
                  {stat.suffix}
                </div>
                <div className="font-nunito font-bold text-[10px] sm:text-sm text-[#0D1B2A] mb-1.5 sm:mb-2 uppercase tracking-wide truncate w-full">{stat.label}</div>
                <div className="text-[9.5px] sm:text-[11px] font-inter text-[#8BA4BE] font-medium leading-tight truncate w-full">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA CARD --- */}
      <div className="py-10 px-4 sm:px-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 0.88, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#0D1B2A] via-[#1A3A5C] to-[#1A7FD4] rounded-[20px] sm:rounded-[40px] p-6 sm:p-12 md:p-20 shadow-[0_32px_80px_rgba(13,27,42,0.30)] relative flex flex-col items-center text-center border border-white/10"
        >
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: -200, opacity: [0, 0.08, 0.08, 0] }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: i * 2 }}
              className="absolute text-white pointer-events-none"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Cloud size={24} />
            </motion.div>
          ))}

          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A7FD4] blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#29C6E0] blur-[80px] opacity-15 pointer-events-none" />

          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-6 sm:mb-8 border border-white/20 shrink-0"
          >
            <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>

          <h2 className="text-xl sm:text-3xl md:text-5xl font-nunito font-black text-white leading-tight mb-4 sm:mb-8">
            Ready to Move Your <br />
            Business to the Cloud?
          </h2>

          <p className="max-w-2xl text-white/80 font-inter text-xs sm:text-lg mb-6 sm:mb-12 leading-relaxed">
            Get a free no-obligation cloud assessment from our Tier 3 certified engineers. We'll analyse your current infrastructure and show you exactly what cloud transformation looks like for your business.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6 sm:mb-12 w-full sm:w-auto">
            <button className="bg-white text-[#1A7FD4] font-nunito font-bold px-5 py-3 sm:px-10 sm:py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-base cursor-pointer">
              <span>Book Free Cloud Assessment</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button className="bg-transparent text-white font-nunito font-bold px-5 py-3 sm:px-10 sm:py-5 rounded-full border-2 border-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs sm:text-base cursor-pointer">
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call +971 545 132 807</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { text: "Free Assessment", icon: Cloud },
              { text: "Report in 48hrs", icon: Zap },
              { text: "100% Confidential", icon: CheckCircle2 }
            ].map((trust, i) => (
              <div key={i} className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-white/60 text-[9px] sm:text-[11px] font-bold tracking-wider flex items-center gap-1.5">
                <trust.icon className="w-3.5 h-3.5" />
                <span>{trust.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- FAQ ACCORDION --- */}
      <div className="py-10 px-4 sm:px-6 bg-[#E8F0F8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-[#1A7FD4] text-[9px] sm:text-xs font-bold tracking-[2px] uppercase">COMMON QUESTIONS</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-nunito font-black text-[#0D1B2A] mt-2 sm:mt-4 leading-tight">
              Cloud Questions, <br />
              <span className="text-[#1A7FD4]">Answered Honestly</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="group">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left p-4 sm:p-8 rounded-xl sm:rounded-[24px] transition-all flex items-center justify-between gap-3 min-w-0 ${
                    faq.type === 'clay' 
                      ? 'bg-white border border-[#1A7FD4]/10 shadow-sm hover:shadow-md' 
                      : 'bg-[#E8F0F8] shadow-[4px_4px_10px_rgba(163,185,210,0.4),-4px_-4px_10px_rgba(255,255,255,0.85)] hover:shadow-[6px_6px_12px_rgba(163,185,210,0.5)]'
                  } ${openFaq === i ? 'ring-2 ring-[#1A7FD4]/20' : ''}`}
                >
                  <span className="font-nunito font-bold text-[#0D1B2A] text-sm sm:text-lg leading-tight truncate pr-2 flex-1">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    className="shrink-0 text-[#1A7FD4]"
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 pt-0 sm:p-8 sm:pt-0 text-[#4A6080] font-inter text-xs sm:text-base leading-relaxed ${faq.type === 'neuro' ? 'bg-[#E8F0F8] rounded-b-xl sm:rounded-b-[24px] -mt-4 pt-6 sm:-mt-6 sm:pt-10 shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3)]' : ''}`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudCTA;
