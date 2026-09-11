"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, Shield, Server, Activity, ArrowRight, CheckCircle2, Zap, Laptop, Smartphone
} from "lucide-react";

const CloudHero = () => {
  const [nodesOnline, setNodesOnline] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setNodesOnline((prev) => (prev < 247 ? prev + 1 : 247));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] overflow-hidden bg-[#F0F6FF] flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
      {/* Background Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C8E2FA] rounded-full blur-[130px] opacity-55 pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, -50, 0],
          scale: [1, 1.05, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#D4EEFF] rounded-full blur-[100px] opacity-40 pointer-events-none" 
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#E0F7FF] rounded-full blur-[80px] opacity-30 pointer-events-none" 
      />

      {/* Cloud Particles */}
      {isMounted && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ 
            y: "-10vh",
            opacity: [0, 0.12, 0.12, 0]
          }}
          transition={{ 
            duration: 20 + Math.random() * 20, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-[#1A7FD4] pointer-events-none z-0"
        >
          <Cloud size={16 + Math.random() * 24} />
        </motion.div>
      ))}

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
        {/* Left Column — pinned to left edge */}
        <div className="flex flex-col items-start text-left gap-3 sm:gap-5 w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-4">
          {/* Badge Row */}
          <div className="flex flex-wrap gap-2 justify-start">
            {[
              { text: "Cloud Solutions", bg: "bg-[#EEF3FF]", border: "border-[#1A7FD4]/30", color: "text-[#1A7FD4]", icon: Cloud },
              { text: "Enterprise Grade", bg: "bg-[#E8FFE8]", border: "border-[#34C98A]/30", color: "text-[#34C98A]", icon: Shield },
              { text: "99.9% Uptime", bg: "bg-[#FFF8E0]", border: "border-[#F59E0B]/30", color: "text-[#F59E0B]", icon: CheckCircle2 }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12, delay: i * 0.05 }}
                className={`px-2.5 py-1 sm:py-1.5 rounded-full border ${badge.bg} ${badge.border} ${badge.color} text-[8px] sm:text-[10px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1`}
              >
                <badge.icon className="w-3 h-3" />
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Headline */}
          <div className="flex flex-col items-start">
            <motion.h1 
              initial={{ y: 70, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[60px] text-[#0D1B2A] leading-[1.2] md:leading-[1.1] tracking-tight"
            >
              Enterprise Cloud <br className="hidden sm:block" />
              Infrastructure That <br />
              <span className="bg-gradient-to-r from-[#1A7FD4] via-[#29C6E0] to-[#2563EB] bg-[length:300%_auto] bg-clip-text text-transparent animate-gradient-sweep">
                Never Sleeps.
              </span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-inter text-xs sm:text-sm md:text-[15px] text-[#4A6080] leading-relaxed max-w-[500px] pr-2"
          >
            Pentacloud designs, deploys, and manages enterprise-grade cloud infrastructure, from architecture blueprints to 24/7 managed operations. Scalable, secure, and optimised for performance from day one.
          </motion.p>



          {/* Trust Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[#8BA4BE] text-[9px] sm:text-[12px] font-inter flex flex-wrap items-center gap-x-2.5 gap-y-1.5"
          >
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#34C98A]" /> HIPAA + GDPR Compliant</span>
            <span className="opacity-30 hidden sm:block">·</span>
            <span className="flex items-center gap-1.5"><Cloud className="w-3.5 h-3.5 text-[#1A7FD4]" /> AWS + GCP Certified</span>
            <span className="opacity-30 hidden sm:block">·</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#F59E0B]" fill="#F59E0B" /> 99.9% Uptime SLA</span>
          </motion.div>

          {/* Floating Cards */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-3 sm:mt-5 w-full relative z-20">
            {[
              { icon: Activity, title: "Uptime: 99.97%", sub: "Health", delay: 0 },
              { icon: Server, title: `${nodesOnline} Nodes`, sub: "Active Servers", delay: 1 },
              { icon: Shield, title: "All Secure", sub: "Security", delay: 2 }
            ].map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                className="bg-[#E8F0F8] rounded-[10px] sm:rounded-[14px] p-1.5 sm:p-2.5 shadow-[4px_4px_10px_rgba(163,185,210,0.5),-4px_-4px_10px_rgba(255,255,255,0.9)] flex items-center gap-1.5 min-w-0 border border-white/40"
              >
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#1A7FD4] shadow-inner shrink-0">
                  <card.icon className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${i === 0 || i === 2 ? "text-green-500" : ""}`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[6px] sm:text-[7.5px] text-[#8BA4BE] font-bold uppercase leading-none mb-0.5 truncate">{card.sub}</span>
                  <span className="text-[7.5px] sm:text-[10px] font-bold text-[#0D1B2A] whitespace-nowrap leading-none truncate">{card.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column — pinned to right edge */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", delay: 0.4 }}
          className="relative w-full max-w-full px-6 sm:px-0 sm:pr-6 md:pr-12 lg:pr-16 xl:pr-24 mt-8 lg:-mt-10 overflow-visible flex items-center justify-center sm:justify-end"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[460px] aspect-[4/4.5] mx-auto sm:mx-0 group">
            {/* Animated background glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-indigo-400/20 rounded-[32px] sm:rounded-[48px] blur-2xl group-hover:blur-3xl transition-all duration-700 pointer-events-none" />
            
            {/* Main Glass Panel */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-[32px] sm:rounded-[48px] border border-white shadow-[0_8px_32px_rgba(26,127,212,0.1),inset_0_0_0_1px_rgba(255,255,255,1)] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10 transition-transform duration-700 group-hover:-translate-y-2">
              
              {/* Decorative Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(26,127,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(26,127,212,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />

              <div className="relative w-full h-full flex flex-col items-center justify-between z-10 pt-4 pb-8 sm:pt-6 sm:pb-10">
                
                {/* TOP: Cloud */}
                <div className="relative flex justify-center w-full z-20">
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Halo */}
                    <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse rounded-full" />
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-50 to-white rounded-2xl sm:rounded-[28px] border border-blue-100/50 shadow-[0_10px_25px_rgba(26,127,212,0.15),inset_0_1px_2px_rgba(255,255,255,1)] flex items-center justify-center relative z-10">
                      <Cloud className="w-7 h-7 sm:w-10 sm:h-10 text-blue-600 drop-shadow-sm" />
                    </div>
                  </motion.div>
                </div>

                {/* CONNECTION LINES (Cloud to Servers) */}
                <div className="absolute top-[25%] left-0 w-full h-[25%] pointer-events-none -z-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Base lines */}
                    <path d="M 200 0 L 100 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    <path d="M 200 0 L 200 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    <path d="M 200 0 L 300 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    
                    {/* Animated paths */}
                    <path d="M 200 0 L 100 100" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                    <path d="M 200 0 L 200 100" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                    <path d="M 200 0 L 300 100" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                  </svg>
                </div>

                {/* MIDDLE: Servers */}
                <div className="flex gap-4 sm:gap-6 w-full justify-center relative z-20">
                  {["Web", "API", "DB"].map((label, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-[20px] p-3 sm:p-4 border border-white shadow-[0_8px_20px_rgba(26,127,212,0.08),inset_0_1px_2px_rgba(255,255,255,1)] flex flex-col items-center gap-2 sm:gap-3 min-w-[70px] sm:min-w-[90px] group/node relative"
                    >
                      {/* Status Dot */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                      
                      <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-blue-50/80 group-hover/node:bg-blue-100/80 transition-colors">
                        <Server className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <span className="text-[10px] sm:text-[13px] font-black text-[#0D1B2A] tracking-wide">{label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CONNECTION LINES (Servers to Devices) */}
                <div className="absolute top-[60%] left-0 w-full h-[25%] pointer-events-none -z-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Base lines */}
                    <path d="M 100 0 L 160 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    <path d="M 200 0 L 160 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    <path d="M 200 0 L 240 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    <path d="M 300 0 L 240 100" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                    
                    {/* Animated paths */}
                    <path d="M 100 0 L 160 100" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                    <path d="M 200 0 L 160 100" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                    <path d="M 200 0 L 240 100" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                    <path d="M 300 0 L 240 100" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 8" fill="none" className="animate-data-flow" opacity="0.6" />
                  </svg>
                </div>

                {/* BOTTOM: Devices */}
                <div className="flex gap-5 sm:gap-8 w-full justify-center relative z-20">
                  {[Laptop, Smartphone].map((Icon, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }} 
                      className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white shadow-[0_8px_20px_rgba(26,127,212,0.08),inset_0_1px_2px_rgba(255,255,255,1)] flex items-center justify-center text-[#4A6080] relative overflow-hidden group/device"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover/device:opacity-100 transition-opacity" />
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                    </motion.div>
                  ))}
                </div>

              </div>

              <div className="absolute bottom-4 sm:bottom-6 text-[9px] sm:text-[11px] text-[#1A7FD4]/50 font-bold tracking-[2px] uppercase">
                Cloud Architecture Blueprint
              </div>

              {/* Top Right Badge */}
              <div className="absolute top-0 right-0 m-4 sm:m-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1A7FD4] text-white rounded-full font-bold text-[8px] sm:text-[10px] shadow-[0_8px_16px_rgba(26,127,212,0.25)] flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                <CheckCircle2 className="w-3.5 h-3.5" /> <span>End-to-End Cloud</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes sweep {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-sweep {
          animation: sweep 4s linear infinite;
        }
        @keyframes data-flow {
          from { stroke-dashoffset: 14; }
          to { stroke-dashoffset: 0; }
        }
        .animate-data-flow {
          animation: data-flow 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CloudHero;
