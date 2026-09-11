"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Sliders, 
  Activity, 
  GitMerge, 
  HeadphonesIcon, 
  GraduationCap, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const WhatWeOffer = () => {
  const services = [
    {
      title: "Salesforce Implementation",
      desc: "We handle complete end-to-end Salesforce deployment, from requirements gathering and solution architecture to go-live support. Sales Cloud, Service Cloud, Marketing Cloud, we implement them all with zero disruption to your operations.",
      icon: Settings,
      color: "#1A7FD4",
      tags: ["Sales Cloud", "Service Cloud", "Marketing Cloud"],
      visual: "steps"
    },
    {
      title: "Customisation & Optimisation",
      desc: "Your business is unique, your Salesforce should be too. We build custom objects, flows, validation rules, and Lightning components that perfectly mirror your business processes and eliminate every manual workaround.",
      icon: Sliders,
      color: "#1A7FD4",
      tags: ["Custom Objects", "Lightning", "Process Builder", "Flows"],
      visual: "gears"
    },
    {
      title: "Salesforce Health Check",
      desc: "Is your Salesforce underperforming? Our certified Tier 3 engineers conduct a comprehensive no-obligation audit covering data quality, security settings, automation efficiency, and adoption rates, delivering an actionable improvement roadmap.",
      icon: Activity,
      color: "#1A7FD4",
      tags: ["Free Audit", "Security Review", "Performance Report"],
      visual: "health"
    },
    {
      title: "System Integration",
      desc: "We seamlessly connect Salesforce with your existing tech stack, ERP systems, marketing tools, accounting software like Xero, Zoho, and custom APIs. Data flows automatically, eliminating silos and giving you a single source of business truth.",
      icon: GitMerge,
      color: "#1A7FD4",
      tags: ["API Integration", "Xero", "Zoho", "ERP", "REST/SOAP"],
      visual: "apps"
    },
    {
      title: "Support & Maintenance",
      desc: "Your Salesforce journey doesn't end at go-live. We provide dedicated ongoing support with guaranteed 48-hour response SLA, proactive monitoring, release management, and continuous improvement, so your CRM stays ahead of your business needs.",
      icon: HeadphonesIcon,
      color: "#1A7FD4",
      tags: ["48hr SLA", "Release Mgmt", "Proactive Monitoring"],
      visual: "ticket"
    },
    {
      title: "Training & Enablement",
      desc: "User adoption is where most Salesforce investments fail. Our certified trainers deliver role-specific training programs, Admin, Sales Rep, Manager, ensuring your team uses Salesforce confidently and productively from day one.",
      icon: GraduationCap,
      color: "#1A7FD4",
      tags: ["Admin Training", "User Adoption", "Role-Based", "Certified Trainers"],
      visual: "progress"
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#E8F0F8] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#1A7FD4] blur-[100px] sm:blur-[150px] opacity-[0.06] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#1A7FD4] blur-[100px] sm:blur-[150px] opacity-[0.06] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[2px_2px_8px_rgba(163,185,210,0.15)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[3px] uppercase mb-4 sm:mb-6"
          >
            WHAT WE OFFER
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-[1.2] mb-4 sm:mb-6"
          >
            Complete Salesforce <br className="hidden sm:block"/>
            <span className="text-[#1A7FD4]">Service Ecosystem</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-base leading-relaxed font-medium px-4">
            From initial implementation to ongoing optimisation, we cover every aspect of your Salesforce journey with precision and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25),-15px_-15px_50px_rgba(255,255,255,0.8)] transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Decorative Glow */}
              <div 
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[70px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: service.color }}
              />

              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-6 rounded-xl bg-white shadow-[6px_6px_12px_rgba(163,185,210,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)] group-hover:scale-105 transition-all duration-500"
                style={{ color: service.color }}
              >
                <service.icon size={26} strokeWidth={2.5} className="sm:w-7 sm:h-7" />
              </div>

              <h3 className="font-nunito font-black text-xl sm:text-[22px] text-[#0D1B2A] mb-3 group-hover:text-[#1A7FD4] transition-colors duration-300 leading-tight">
                {service.title}
              </h3>
              
              <p className="font-inter text-[13px] sm:text-[13.5px] text-[#4A6080] leading-relaxed mb-6 font-medium">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {service.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="px-2.5 py-1 bg-white/60 rounded-lg border border-white shadow-sm text-[9px] font-nunito font-black text-[#1A7FD4] uppercase tracking-wider group-hover:bg-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Enhanced Visual Footer */}
              <div className="pt-6 border-t border-white/40 mt-auto">
                {service.visual === "steps" && (
                  <div className="flex items-center justify-between w-full px-1">
                    {["Architect", "Build", "Deploy"].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#1A7FD4] shadow-[0_0_8px_#1A7FD4]' : 'bg-[#1A7FD4]/20'}`} />
                          <span className={`text-[9px] font-black uppercase tracking-tighter ${idx === 0 ? 'text-[#1A7FD4]' : 'text-[#4A6080]/30'}`}>{step}</span>
                        </div>
                        {idx < 2 && <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1A7FD4]/20 to-[#1A7FD4]/10 mx-2" />}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {service.visual === "gears" && (
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Settings size={18} className="text-[#1A7FD4]" />
                      </motion.div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                       <div className="flex justify-between text-[9px] font-black text-[#1A7FD4] uppercase tracking-widest">
                          <span>Progress</span>
                          <span>85%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden border border-white/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-[#1A7FD4]" 
                          />
                       </div>
                    </div>
                  </div>
                )}

                {service.visual === "health" && (
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-8 h-8 transform -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#E8F0F8" strokeWidth="4" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 100 }}
                          whileInView={{ strokeDashoffset: 13 }}
                          viewport={{ once: true }}
                          cx="18" cy="18" r="16" fill="transparent" stroke="#1A7FD4" strokeWidth="4" strokeDasharray="100" className="transition-all duration-1000 ease-out" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#1A7FD4]">87%</div>
                    </div>
                    <div>
                       <div className="text-[8px] font-black text-[#4A6080]/40 uppercase tracking-widest mb-0.5">Cloud Vitality</div>
                       <div className="text-[12px] font-black text-[#1A7FD4] uppercase tracking-wider">High Stability</div>
                    </div>
                  </div>
                )}

                {service.visual === "apps" && (
                  <div className="flex items-center justify-between w-full bg-white/30 p-2 rounded-xl border border-white/50">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-[#1A7FD4]">SF</div>
                    <div className="flex-1 flex justify-center gap-1 px-3">
                      {[0, 1, 2, 3].map((dot) => (
                        <motion.div 
                          key={dot}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                          className="w-1 h-1 rounded-full bg-[#1A7FD4]" 
                        />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#1A7FD4] shadow-sm flex items-center justify-center text-[10px] font-black text-white">ERP</div>
                  </div>
                )}

                {service.visual === "ticket" && (
                  <div className="flex items-center justify-between w-full bg-[#1A7FD4]/10 px-3 py-2 rounded-xl border border-[#1A7FD4]/20">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-[#1A7FD4] flex items-center justify-center text-white">
                          <CheckCircle size={12} strokeWidth={3} />
                       </div>
                       <span className="text-[10px] font-black text-[#0D1B2A] tracking-tight uppercase">Ticket #4282 Resolved</span>
                    </div>
                    <span className="text-[9px] font-black text-[#1A7FD4] opacity-60">12:40 PM</span>
                  </div>
                )}

                {service.visual === "progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-end px-0.5">
                       <span className="text-[9px] font-black text-[#4A6080] uppercase tracking-widest">Team Adoption Rate</span>
                       <span className="text-[14px] font-black text-[#1A7FD4] leading-none">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden border border-white/50 p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "94%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-[#1A7FD4] rounded-full" 
                      />
                    </div>
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

export default WhatWeOffer;
