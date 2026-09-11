"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Cloud, Zap, Search, Shield, FileText, Users, Settings, Code2, Server, LayoutDashboard, CheckCircle2, ArrowRight } from "lucide-react";

const ConsultingOffer = () => {
  const [activeConsultingIndex, setActiveConsultingIndex] = useState(0);
  const [activeTrainingIndex, setActiveTrainingIndex] = useState(0);

  const consultingServices = [
    {
      icon: Target,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Salesforce Strategy",
      desc: "Roadmap design and health checks to maximise CRM ROI.",
      tags: ["Health Checks", "ROI Planning"],
      metric: "Salesforce Roadmap",
      visual: "target"
    },
    {
      icon: Cloud,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cloud Advisory",
      desc: "Multi-cloud architecture design for AWS, Azure, and GCP.",
      tags: ["Cloud Ops", "Migration"],
      metric: "Readiness Report",
      visual: "cloud"
    },
    {
      icon: Zap,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Transformation",
      desc: "End-to-end digital evolution and process automation.",
      tags: ["Automation", "Modernisation"],
      metric: "Transformation Plan",
      visual: "zap"
    },
    {
      icon: Search,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Tech Audit",
      desc: "Comprehensive assessments of infrastructure and security.",
      tags: ["Security", "Cost Audit"],
      metric: "Detailed Audit",
      visual: "search"
    },
    {
      icon: Shield,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "IT Governance",
      desc: "Robust frameworks aligned to ISO 27001 and GDPR.",
      tags: ["Compliance", "GRC"],
      metric: "Compliance Roadmap",
      visual: "shield"
    },
    {
      icon: FileText,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Vendor Selection",
      desc: "Requirements gathering and RFP support for tech buys.",
      tags: ["RFP Support", "Vendor Score"],
      metric: "Evaluation Report",
      visual: "file"
    }
  ];

  const trainingProgrammes = [
    {
      icon: Users,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Salesforce User Training",
      desc: "Role-specific training to maximise platform adoption.",
      tags: ["Sales Reps", "Service Teams"],
      metric: "Adoption Boost",
      visual: "users"
    },
    {
      icon: Settings,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Salesforce Admin",
      desc: "Empowering internal teams to manage Salesforce.",
      tags: ["Flows", "Security"],
      metric: "Cert Ready",
      visual: "settings"
    },
    {
      icon: Code2,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Salesforce Dev",
      desc: "Technical training covering Apex, LWC, and APIs.",
      tags: ["Apex", "Integrations"],
      metric: "Dev Mastery",
      visual: "code"
    },
    {
      icon: Server,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cloud Infrastructure",
      desc: "Practical cloud training for IT teams and devs.",
      tags: ["AWS", "Azure", "GCP"],
      metric: "Cloud Ready",
      visual: "server"
    },
    {
      icon: LayoutDashboard,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Zoho Platform",
      desc: "End-to-end training across the Zoho ecosystem.",
      tags: ["Zoho CRM", "Zoho Books"],
      metric: "Full Adoption",
      visual: "zoho"
    },
    {
      icon: Shield,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cybersecurity",
      desc: "Workforce education on real cyber threats.",
      tags: ["Phishing", "Security"],
      metric: "Risk Reduction",
      visual: "cyber"
    }
  ];

  const activeConsulting = consultingServices[activeConsultingIndex];
  const activeTraining = trainingProgrammes[activeTrainingIndex];

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* PILLAR 1: CONSULTING */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col md:flex-row items-baseline gap-3 mb-6 sm:mb-8">
             <div className="text-3xl sm:text-5xl font-nunito font-black text-[#1A7FD4]/10 leading-none">01</div>
             <div>
                <h3 className="text-xl sm:text-2xl font-nunito font-black text-[#0D1B2A]">Technology Consulting</h3>
                <p className="text-[13px] text-[#4A6080] font-inter font-medium">Strategic guidance from certified practitioners.</p>
             </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-background/60 backdrop-blur-md p-2 rounded-[20px] sm:rounded-full shadow-[8px_8px_16px_rgba(163,185,210,0.3),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/50 flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar">
              <div className="flex gap-2 sm:gap-3 min-w-max px-2">
                {consultingServices.map((service, i) => {
                  const isActive = activeConsultingIndex === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setActiveConsultingIndex(i)}
                      whileHover={{ scale: 1.05 }}
                      className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-white shadow-md' : 'hover:bg-white/30'
                      }`}
                      style={{ color: isActive ? service.color : '#94A3B8' }}
                    >
                      <service.icon className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
                      {isActive && (
                        <motion.div layoutId="activeGlowC" className="absolute inset-0 rounded-xl sm:rounded-full border-2" style={{ borderColor: service.color }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              <motion.div
                key={`c-${activeConsultingIndex}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/40 backdrop-blur-sm rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 border border-white shadow-[15px_15px_30px_rgba(163,185,210,0.1)] flex flex-col justify-center min-h-[320px]"
              >
                <div className="flex items-center gap-3.5 mb-5">
                   <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner" style={{ backgroundColor: activeConsulting.bg, color: activeConsulting.color }}>
                      <activeConsulting.icon size={22} />
                   </div>
                   <div>
                      <h4 className="text-lg sm:text-2xl font-nunito font-black text-[#0D1B2A] leading-tight">{activeConsulting.title}</h4>
                      <div className="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider mt-1 inline-block" style={{ backgroundColor: activeConsulting.bg, color: activeConsulting.color }}>
                        {activeConsulting.metric}
                      </div>
                   </div>
                </div>
                <p className="font-inter text-[13.5px] sm:text-base text-[#4A6080] leading-relaxed mb-6 max-w-2xl font-medium">{activeConsulting.desc}</p>

              </motion.div>

              <motion.div
                key={`v-c-${activeConsultingIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/40 backdrop-blur-md rounded-[28px] sm:rounded-[40px] border border-white shadow-inner hidden lg:flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '20px 24px' }} />
                <activeConsulting.icon size={100} className="text-[#1A7FD4]/05" strokeWidth={1} />
                <div className="absolute bottom-6 left-6 right-6 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white flex justify-between items-center">
                   <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />)}
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-[1px]">Consultant Active</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* PILLAR 2: TRAINING */}
        <div>
          <div className="flex flex-col md:flex-row items-baseline gap-3 mb-6 sm:mb-8">
             <div className="text-3xl sm:text-5xl font-nunito font-black text-[#1A7FD4]/10 leading-none">02</div>
             <div>
                <h3 className="text-xl sm:text-2xl font-nunito font-black text-[#0D1B2A]">Training Programmes</h3>
                <p className="text-[13px] text-[#4A6080] font-inter font-medium">Hands-on, role-specific training for high adoption.</p>
             </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-background/60 backdrop-blur-md p-2 rounded-[20px] sm:rounded-full shadow-[8px_8px_16px_rgba(163,185,210,0.3),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/50 flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar">
              <div className="flex gap-2.5 sm:gap-3 min-w-max px-2">
                {trainingProgrammes.map((prog, i) => {
                  const isActive = activeTrainingIndex === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setActiveTrainingIndex(i)}
                      whileHover={{ scale: 1.05 }}
                      className={`relative w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-white shadow-lg' : 'hover:bg-white/40'
                      }`}
                      style={{ color: isActive ? prog.color : '#94A3B8' }}
                    >
                      <prog.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                      {isActive && (
                        <motion.div layoutId="activeGlowT" className="absolute inset-0 rounded-xl sm:rounded-full border-2" style={{ borderColor: prog.color }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              <motion.div
                key={`t-${activeTrainingIndex}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/40 backdrop-blur-sm rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 border border-white shadow-[15px_15px_30px_rgba(163,185,210,0.15)] flex flex-col justify-center min-h-[320px]"
              >
                <div className="flex items-center gap-3.5 mb-5">
                   <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner" style={{ backgroundColor: activeTraining.bg, color: activeTraining.color }}>
                      <activeTraining.icon size={22} />
                   </div>
                   <div>
                      <h4 className="text-lg sm:text-2xl font-nunito font-black text-[#0D1B2A] leading-tight">{activeTraining.title}</h4>
                      <div className="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider mt-1 inline-block" style={{ backgroundColor: activeTraining.bg, color: activeTraining.color }}>
                        {activeTraining.metric}
                      </div>
                   </div>
                </div>
                <p className="font-inter text-[13.5px] sm:text-base text-[#4A6080] leading-relaxed mb-6 max-w-2xl font-medium">{activeTraining.desc}</p>

              </motion.div>

              <motion.div
                key={`v-t-${activeTrainingIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/40 backdrop-blur-md rounded-[28px] sm:rounded-[40px] border border-white shadow-inner hidden lg:flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '20px 24px' }} />
                <activeTraining.icon size={100} className="text-[#1A7FD4]/05" strokeWidth={1} />
                <div className="absolute bottom-6 left-6 right-6 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white flex justify-between items-center">
                   <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />)}
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-[1px]">Training Active</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConsultingOffer;
