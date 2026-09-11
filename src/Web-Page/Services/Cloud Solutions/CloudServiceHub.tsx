"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Network, Rocket, Brain, GitMerge,  
  ShieldCheck, Wifi, Server, Cloud,
  ArrowRight, ExternalLink
} from "lucide-react";

const CloudServiceHub = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      icon: Network,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cloud & DC Architecture",
      desc: "We design enterprise cloud and datacenter architectures from the ground up, VPC design, subnet planning, load balancing, and multi-region deployments.",
      tags: ["VPC Design", "Multi-Region", "DR Planning"],
      metric: "99.99% Uptime Design",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div className="w-16 h-16 bg-[#1A7FD4] rounded-2xl relative z-10 flex items-center justify-center text-white shadow-2xl">
             <Network size={32} />
             <motion.div 
               animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-[#1A7FD4] rounded-2xl"
             />
          </motion.div>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div key={angle} className="absolute w-32 h-px bg-[#1A7FD4]/20" style={{ transform: `rotate(${angle}deg)` }}>
              <motion.div 
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: angle / 360 }}
                className="absolute w-2 h-2 bg-[#1A7FD4] rounded-full blur-[1px]"
              />
            </div>
          ))}
        </div>
      )
    },
    {
      icon: Rocket,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Startup Infrastructure",
      desc: "Fast-track your cloud journey with CI/CD pipelines, containerised deployments, and cost-optimised infrastructure that scales with your growth.",
      tags: ["Docker", "K8s", "CI/CD"],
      metric: "Deployment in < 48h",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
           <motion.div
             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-20 h-20 bg-[#1A7FD4] rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10"
           >
             <Rocket size={40} />
           </motion.div>
           <div className="absolute bottom-20 flex gap-2">
             {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 40], opacity: [0.6, 0], scale: [1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-3 h-3 bg-[#1A7FD4]/30 rounded-full blur-[2px]"
                />
             ))}
           </div>
        </div>
      )
    },
    {
      icon: Brain,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "AI & Automation",
      desc: "Integrate intelligent workflows and ML pipelines into your core infrastructure to drive efficiency and proactive system management.",
      tags: ["MLOps", "Auto-Scale", "AI Ops"],
      metric: "70% Manual Task Reduction",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-[#1A7FD4] z-10"
          >
            <Brain size={80} strokeWidth={1.5} />
          </motion.div>
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={i}
                cx={`${50 + 35 * Math.cos(i * 30 * Math.PI / 180)}%`}
                cy={`${50 + 35 * Math.sin(i * 30 * Math.PI / 180)}%`}
                r="3"
                fill="#1A7FD4"
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </svg>
        </div>
      )
    },
    {
      icon: GitMerge,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "DevOps & Security",
      desc: "Infrastructure as Code with zero-trust policies. We ensure your pipelines are secure, compliant, and fully automated.",
      tags: ["Terraform", "Ansible", "IaC"],
      metric: "Zero-Breach Architecture",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border-2 border-dashed border-[#1A7FD4]/30 rounded-full flex items-center justify-center"
          >
             <div className="w-40 h-40 border border-[#1A7FD4]/20 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48"
          >
            <div className="w-6 h-6 bg-[#1A7FD4] rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-lg shadow-[#1A7FD4]/40" />
            <div className="w-4 h-4 bg-[#1A7FD4] rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2" />
          </motion.div>
          <GitMerge size={48} className="text-[#1A7FD4] absolute" />
        </div>
      )
    },
    {
      icon: ShieldCheck,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cybersecurity (GRC)",
      desc: "Compliance-ready architecture (ISO 27001, GDPR) with advanced vulnerability testing and threat mitigation.",
      tags: ["VAPT", "ISO 27001", "GRC"],
      metric: "Compliance Guaranteed",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-32 bg-[#1A7FD4]/10 rounded-full flex items-center justify-center border-4 border-[#1A7FD4]/20"
          >
            <ShieldCheck size={64} className="text-[#1A7FD4]" />
          </motion.div>
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-0.5 bg-[#1A7FD4]/30 blur-[2px]"
          />
        </div>
      )
    },
    {
      icon: Wifi,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "IT Overhaul",
      desc: "Modernize your network infrastructure with SD-WAN, smart segmentation, and high-performance connectivity solutions.",
      tags: ["SD-WAN", "Networking", "VLAN"],
      metric: "10x Network Speed",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center gap-6">
           {[1, 2, 3].map((i) => (
             <motion.div
               key={i}
               animate={{ height: [40, 80, 40], opacity: [0.4, 1, 0.4] }}
               transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
               className="w-4 bg-[#1A7FD4] rounded-full"
             />
           ))}
           <Wifi size={48} className="text-[#1A7FD4] absolute -bottom-4 opacity-20" />
        </div>
      )
    },
  ];

  const activeService = services[activeIndex];

  return (
    <section className="py-10 sm:py-16 bg-background relative overflow-hidden px-4 sm:px-6">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-[#1A7FD4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-[#1A7FD4]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#1A7FD4] font-nunito font-black text-[9px] sm:text-[11px] tracking-[4px] uppercase mb-3 sm:mb-4"
          >
            Service Ecosystem
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-nunito font-extrabold text-2xl sm:text-[36px] md:text-[52px] text-[#0D1B2A] leading-tight"
          >
            Next-Gen Cloud <span className="text-[#1A7FD4]">Command Center</span>
          </motion.h2>
        </div>

        {/* The New Structural Layout: Top Ribbon + Central Stage */}
        <div className="flex flex-col gap-6 sm:gap-8">
          
          {/* 1. The Horizontal Ribbon (Navigation) */}
          <div className="bg-background/80 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl sm:rounded-4xl shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)] border border-white/50 flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar">
            <div className="flex gap-2.5 sm:gap-4 min-w-max px-2 sm:px-4">
              {services.map((service, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ y: -3 }}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'shadow-[5px_5px_10px_rgba(163,185,210,0.4),-5px_-5px_10px_rgba(255,255,255,0.8)] scale-105' 
                        : 'hover:bg-slate-50'
                    }`}
                    style={{ 
                      backgroundColor: isActive ? service.bg : 'transparent',
                      color: isActive ? service.color : '#94A3B8'
                    }}
                  >
                    <service.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-xl sm:rounded-2xl border-2"
                        style={{ borderColor: service.color, boxShadow: `0 0 20px ${service.color}40` }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 2. The Central Stage (Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 min-h-90 sm:min-h-112.5">
            
            {/* Left: Content Card */}
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-background rounded-2xl sm:rounded-[40px] p-5 sm:p-12 shadow-[20px_20px_40px_rgba(163,185,210,0.5),-20px_-20px_40px_rgba(255,255,255,0.95)] border border-white/50 relative overflow-hidden flex flex-col justify-center"
            >
              {/* Background accent */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: activeService.color }}
              />

              <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                  style={{ backgroundColor: activeService.bg, color: activeService.color }}
                >
                  <activeService.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-nunito font-black text-lg sm:text-[32px] text-[#0D1B2A] leading-tight truncate">
                    {activeService.title}
                  </h3>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider mt-1 truncate"
                    style={{ backgroundColor: activeService.bg, color: activeService.color }}
                  >
                    {activeService.metric}
                  </div>
                </div>
              </div>

              <p className="font-inter text-xs sm:text-[18px] md:text-[22px] text-[#4A6080] leading-relaxed mb-6 sm:mb-12 max-w-2xl">
                {activeService.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 sm:mb-12">
                {activeService.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] sm:text-[12px] font-bold text-slate-500 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeService.color }} />
                    {tag}
                  </span>
                ))}
              </div>


            </motion.div>

            {/* Right: Visual Stage */}
            <motion.div
              key={`visual-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="bg-background rounded-2xl sm:rounded-[40px] border border-white/50 shadow-[inset_10px_10px_20px_rgba(163,185,210,0.3),inset_-10px_-10px_20px_rgba(255,255,255,0.8)] relative overflow-hidden perspective-1000 hidden lg:flex items-center justify-center p-6"
            >
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              <div className="w-full h-full relative flex items-center justify-center">
                {activeService.visual}
              </div>

              {/* Status bar */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40">
                <div className="flex gap-1">
                   {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Active</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Marquee/Trust Line */}
        <div className="mt-10 sm:mt-16 flex justify-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-x-12 sm:gap-y-6 opacity-40 grayscale group hover:grayscale-0 transition-all">
             {["AWS Certified", "Azure Partner", "Google Cloud", "Kubernetes", "Terraform"].map((partner, i) => (
                <span key={i} className="text-[#0D1B2A] font-nunito font-black text-[10px] sm:text-[14px] uppercase tracking-[3px]">{partner}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudServiceHub;
