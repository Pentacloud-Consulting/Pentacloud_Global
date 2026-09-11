"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Cloud, 
  Radio, 
  Database, 
  Code, 
  Smartphone, 
  BarChart3,
  Server,
  Globe,
  Mail,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// --- Custom Animated Sub-components for Cards ---

// Card 1: Salesforce Pipeline
const PipelineFlow = () => {
  const steps = ["Lead", "Qual", "Prop", "Won"];
  return (
    <div className="flex items-center justify-between w-full mt-3 relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
      <motion.div 
        className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 z-0"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-1.5 z-10">
          <motion.div 
            initial={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
            whileInView={{ backgroundColor: "#3b82f6", borderColor: "#93c5fd" }}
            transition={{ duration: 0.5, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.5 - (i * 0.5) }}
            className="w-3 h-3 rounded-full border-2"
          />
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{step}</span>
        </div>
      ))}
    </div>
  );
};

// Card 2: Cloud Solutions Nodes
const ServerNodes = () => {
  return (
    <div className="relative w-full h-24 mt-3 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-20 h-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#818cf8]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_8px_#c084fc]" />
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.circle 
            cx="50" cy="50" r="40" 
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
      <Server className="absolute w-6 h-6 text-slate-400" />
    </div>
  );
};

// Card 3: End-to-End Arch (Hero Card)
const ArchDiagram = () => {
  return (
    <div className="flex items-center justify-between w-full h-24 mt-4 px-2">
      {/* Blocks */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div className="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20">
          <Smartphone className="w-4 h-4 text-white" />
        </div>
        <span className="text-[10px] text-blue-100/90">Client</span>
      </div>

      {/* Animated Path 1 */}
      <div className="flex-1 h-[2px] bg-white/10 relative mx-2">
        <motion.div 
          className="absolute top-0 left-0 w-6 h-[2px] bg-white shadow-[0_0_8px_white]"
          animate={{ x: ["0%", "400%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 z-10">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl backdrop-blur-md flex items-center justify-center border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Server className="w-5 h-5 text-blue-200" />
        </div>
        <span className="text-[10px] text-blue-200 font-medium">App Layer</span>
      </div>

      {/* Animated Path 2 */}
      <div className="flex-1 h-[2px] bg-white/10 relative mx-2">
        <motion.div 
          className="absolute top-0 left-0 w-6 h-[2px] bg-white shadow-[0_0_8px_white]"
          animate={{ x: ["0%", "400%"] }}
          transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 z-10">
        <div className="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20">
          <Database className="w-4 h-4 text-white" />
        </div>
        <span className="text-[10px] text-blue-100/90">Database</span>
      </div>
    </div>
  );
};

// Card 4: Data Migration
const DataMigrationFlow = () => {
  const [progress, setProgress] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;
    
    // Total steps: 100 for growth + 75 for 3s pause (at 40ms/step)
    const totalSteps = 175;

    const interval = setInterval(() => {
      setProgress((prev) => (prev < totalSteps ? prev + 1 : 0));
    }, 40); // 4 seconds growth + 3 seconds pause
    
    return () => clearInterval(interval);
  }, [isInView]);

  // Capped progress for display logic
  const displayProgress = Math.min(100, progress);

  return (
    <div ref={ref} className="w-full mt-3 flex flex-col gap-3">
      <div className="flex justify-between items-center px-4 relative h-12">
        <Database className="w-6 h-6 text-zinc-500" />
        
        {/* Curved Path */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10" viewBox="0 0 100 50">
          {/* Background Path - visible in light theme */}
          <path 
            d="M 0 25 Q 50 -10 100 25" 
            fill="none" 
            stroke="rgba(15, 23, 42, 0.15)" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
          />
          
          {/* Animated "Loading" Path */}
          <motion.path 
            d="M 0 25 Q 50 -10 100 25" 
            fill="none" 
            stroke="#fbbf24" 
            strokeWidth="2" 
            strokeDasharray="105" 
            strokeDashoffset={105 - (105 * displayProgress / 100)}
            transition={{ ease: "linear" }}
          />

          {/* Moving Dot */}
          <motion.circle 
            r="3" 
            fill="#fbbf24" 
            style={{ 
              filter: "drop-shadow(0 0 6px #fbbf24)",
              offsetPath: "path('M 0 25 Q 50 -10 100 25')",
              offsetDistance: `${displayProgress}%`
            }}
          />
        </svg>

        <Database className="w-6 h-6 text-amber-400" />
      </div>
      <div className="bg-slate-200 rounded-full h-1.5 w-full overflow-hidden">
        <motion.div 
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="h-full bg-amber-400"
        />
      </div>
      <span className="text-[10px] text-slate-500 font-bold font-mono text-center">
        Migration {displayProgress}% Complete
      </span>
    </div>
  );
};

// Card 6: Web Dev
const BrowserMockup = () => {
  return (
    <div className="w-full h-24 mt-3 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col shadow-sm">
      <div className="h-5 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "40%" }}
          transition={{ duration: 0.8 }}
          className="h-3 bg-slate-200 rounded"
        />
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-10 bg-slate-100 rounded flex-1"
        />
      </div>
    </div>
  );
};

// Card 7: App Dev
const PhoneMockup = () => {
  return (
    <div className="w-full mt-3 flex justify-center">
      <div className="w-16 h-24 border-[3px] border-slate-300 rounded-[1rem] bg-slate-50 overflow-hidden relative shadow-lg">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-slate-300 rounded-b-md z-10" />
        
        {/* Screen sliding up */}
        <motion.div 
          initial={{ y: "100%" }}
          whileInView={{ y: "20%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-[80%] bg-purple-500/20 backdrop-blur-sm rounded-t-xl border-t border-purple-500/50 p-1.5 flex flex-col gap-1.5"
        >
          <div className="w-full h-3 bg-purple-500/30 rounded" />
          <div className="w-full h-3 bg-purple-500/30 rounded" />
        </motion.div>
      </div>
    </div>
  );
};

// Card 8: Digital Marketing
const GrowthChart = () => {
  const bars = [30, 50, 40, 70, 60, 90, 100];
  const [progress, setProgress] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;
    
    // Total steps: 100 for growth + 75 for 3s pause (at 40ms/step)
    const totalSteps = 175; 
    
    const interval = setInterval(() => {
      setProgress((prev) => (prev < totalSteps ? prev + 1 : 0));
    }, 40); 
    
    return () => clearInterval(interval);
  }, [isInView]);

  // Use a capped progress for calculations so it stays at 100% during the pause
  const cappedProgress = Math.min(100, progress);

  return (
    <div ref={ref} className="w-full h-24 mt-2 flex items-end justify-between gap-1.5 px-1 relative">
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-2 bg-pink-500/20 text-pink-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.1)] z-10 backdrop-blur-sm"
      >
        ROI {Math.floor(cappedProgress * 2)}% ↑
      </motion.div>
      {bars.map((maxHeight, i) => {
        const barStep = 100 / bars.length;
        const barStart = i * barStep;
        const barEnd = (i + 1) * barStep;
        
        let currentHeight = 0;
        if (cappedProgress >= barEnd) {
          currentHeight = maxHeight;
        } else if (cappedProgress > barStart) {
          const barProgress = (cappedProgress - barStart) / barStep;
          currentHeight = barProgress * maxHeight;
        }

        const isFilled = cappedProgress > barStart;
        const isCurrent = cappedProgress > barStart && cappedProgress <= barEnd;
        const isFinal = i === bars.length - 1 && cappedProgress >= 100;

        return (
          <motion.div
            key={i}
            animate={{ 
              height: `${currentHeight}%`,
              backgroundColor: isFilled ? "#ec4899" : "#e2e8f0",
              boxShadow: (isCurrent || isFinal) ? "0 -4px 12px rgba(236,72,153,0.3)" : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{ 
              height: { type: "spring", stiffness: 300, damping: 30 },
              backgroundColor: { duration: 0.2 },
              boxShadow: { duration: 0.2 }
            }}
            className="w-full rounded-t-sm"
          />
        );
      })}
    </div>
  );
};

// Card 9: Zoho Services
const ZohoSyncFlow = () => {
  const icons = [
    { src: "/Zoho Service/Books.svg", label: "Books" },
    { src: "/Zoho Service/camaigns.svg", label: "Campaigns" },
    { src: "/Zoho Service/Peoples.svg", label: "People" },
    { src: "/Zoho Service/Projects.svg", label: "Projects" },
    { src: "/Zoho Service/Social.svg", label: "Social" }
  ];

  return (
    <div className="w-full h-48 mt-2 relative flex items-center justify-center">
      {/* Central Hub */}
      <motion.div 
        animate={{ 
          boxShadow: ["0 0 0px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.3)", "0 0 0px rgba(249,115,22,0)"],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-16 h-16 rounded-[1.25rem] bg-white border border-orange-100 flex flex-col items-center justify-center z-20 overflow-hidden p-2 shadow-lg"
      >
        <img src="/Zoho Service/CRM.svg" alt="Zoho CRM" className="w-7 h-7 object-contain" />
        <span className="text-[8px] font-black text-slate-800 mt-1">CRM</span>
      </motion.div>

      {/* Orbiting Nodes - Refined Spacing */}
      {icons.map((icon, i) => {
        // Spread positions to ensure complete visibility in a larger container
        const positions = [
          { top: "5%", left: "12%" },   // Top Left
          { top: "65%", left: "5%" },   // Bottom Left
          { top: "0%", left: "70%" },    // Top Right
          { top: "45%", left: "82%" },   // Mid Right
          { top: "80%", left: "45%" }     // Bottom Center
        ];
        
        const pos = positions[i];

        return (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, i % 2 === 0 ? 8 : -8, 0],
              x: [0, i % 3 === 0 ? 5 : -5, 0]
            }} 
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.1 
            }}
            className="absolute w-14 h-14 rounded-[1.25rem] bg-white border border-orange-100 flex flex-col items-center justify-center p-2 z-10 hover:scale-110 transition-transform cursor-default shadow-md overflow-hidden"
            style={{ ...pos }}
          >
            <img src={icon.src} alt={icon.label} className="w-6 h-6 object-contain" />
            <span className="text-[7px] font-black text-slate-800 mt-1 truncate w-full text-center leading-tight">{icon.label}</span>
          </motion.div>
        );
      })}

      {/* Sync Lines */}
      <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 200 192" preserveAspectRatio="none">
        <motion.path 
          d="M 50 50 L 100 96" 
          fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 4"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 40 150 L 100 96" 
          fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 4"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        <motion.path 
          d="M 160 100 L 100 96" 
          fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 4"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </svg>
    </div>
  );
};


// --- Main Process Bento Grid ---

const Process = () => {
  return (
    <section className="bg-background py-6 sm:py-10 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <div className="mb-6 md:mb-8 flex flex-col justify-start items-start gap-4">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2"
            >
              Our Expertise
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] md:leading-[1.1]"
            >
              Comprehensive Solutions for <span className="text-blue-600">Digital Transformation</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <p className="text-slate-600 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
              We combine strategic consulting with technical excellence to solve your most complex business challenges.
            </p>
          </motion.div>
        </div>

        {/* 4-Column CSS Grid - Dynamic row height on mobile, locked 280px on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[280px]">
                   {/* Card 1: Salesforce (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col h-full">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
              <Cloud className="w-4 h-4 text-blue-400" />
            </div>
            <PipelineFlow />
            <div className="mt-auto pt-2">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base">Salesforce Consulting</h3>
              <p className="text-slate-500 font-medium text-[11px] mt-1">Optimizing CRM pipelines.</p>
              <Link href="/services/salesforce" className="inline-flex items-center gap-2 text-blue-500 font-bold text-[10px] mt-2 hover:gap-3 transition-all group/btn">
                 Explore Service <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>
          </motion.div>

          {/* Card 2: Cloud Solutions (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col h-full">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
              <Radio className="w-4 h-4 text-blue-400" />
            </div>
            <ServerNodes />
            <div className="mt-auto pt-2">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base">Cloud Solutions</h3>
              <p className="text-slate-500 font-medium text-[11px] mt-1">Scalable infrastructure setup.</p>
              <Link href="/services/cloud" className="inline-flex items-center gap-2 text-blue-500 font-bold text-[10px] mt-2 hover:gap-3 transition-all group/btn">
                 Explore Service <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>
          </motion.div>

          {/* Card 3: End-to-End Cloud (Wide 2x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-6 flex flex-col relative overflow-hidden shadow-xl group cursor-pointer"
          >
            {/* Smooth Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A237E] to-[#185FA5] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0" />
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] z-0" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-auto border border-white/30 backdrop-blur-md">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <ArchDiagram />
              <div className="mt-auto pt-4">
                <h3 className="text-white font-bold text-lg sm:text-xl">End-to-End Cloud Solution</h3>
                <p className="text-blue-100/70 text-xs sm:text-[13px] mt-1 max-w-md">Full-cycle architecture from concept to global deployment.</p>
              </div>
            </div>
          </motion.div>

          {/* Row 2 */}

          {/* Card 6: Web Dev (Wide 2x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col h-full">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
              <Code className="w-4 h-4 text-blue-400" />
            </div>
            <BrowserMockup />
            <div className="mt-auto pt-2">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base">Web Development</h3>
              <p className="text-slate-500 font-medium text-[11px] mt-1">High-performance platforms.</p>
              <Link href="/services/web" className="inline-flex items-center gap-2 text-blue-500 font-bold text-[10px] mt-2 hover:gap-3 transition-all group/btn">
                 Explore Service <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>
          </motion.div>

          {/* Card 4: Data Migration (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col h-full">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
              <Database className="w-4 h-4 text-blue-400" />
            </div>
            <DataMigrationFlow />
            <div className="mt-auto pt-2">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base">Data Migration</h3>
              <p className="text-slate-500 font-medium text-[11px] mt-1">Secure, zero-downtime transfers.</p>
              <Link href="/services/data-migration" className="inline-flex items-center gap-2 text-blue-500 font-bold text-[10px] mt-2 hover:gap-3 transition-all group/btn">
                 Explore Service <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>
          </motion.div>

          {/* Card 7: App Dev (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-20 flex flex-col h-full">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
              <Smartphone className="w-4 h-4 text-blue-400" />
            </div>
            <PhoneMockup />
            <div className="mt-auto pt-2">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base">App Development</h3>
              <p className="text-slate-500 font-medium text-[11px] mt-1">Native & Cross-platform apps.</p>
              <Link href="/services/app" className="inline-flex items-center gap-2 text-blue-500 font-bold text-[10px] mt-2 hover:gap-3 transition-all group/btn">
                 Explore Service <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>
          </motion.div>

          {/* Row 3 - Perfectly Filling 4 Columns */}
          
          {/* Card 8: Digital Marketing (Wide 2x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex-1 flex flex-col h-full w-full relative z-20">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-slate-900 font-bold text-base sm:text-lg">Digital Marketing</h3>
                <p className="text-slate-500 font-medium text-xs sm:text-[13px] mt-1 max-w-[200px]">Data-driven marketing to maximize your brand reach and ROI.</p>
                <Link href="/services/digital-marketing" className="inline-flex items-center gap-2 text-blue-500 font-bold text-xs mt-4 hover:gap-3 transition-all group/btn">
                   Explore Service <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full flex items-end relative z-20">
              <GrowthChart />
            </div>
          </motion.div>

          {/* Card 9: Zoho Services (Wide 2x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 bg-background border-2 border-[#1A7FD4]/10 shadow-[8px_8px_16px_rgba(163,185,210,0.5),-8px_-8px_16px_rgba(255,255,255,0.95)] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-[#1A7FD4]/40 hover:shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Uniform Blue Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex-1 flex flex-col h-full w-full relative z-20">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-auto border border-blue-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-slate-900 font-bold text-base sm:text-lg">Zoho Services</h3>
                <p className="text-slate-500 font-medium text-xs sm:text-[13px] mt-1 max-w-[200px]">Unified business workflows with custom ecosystem implementations.</p>
                <Link href="/services/zoho" className="inline-flex items-center gap-2 text-blue-500 font-bold text-xs mt-4 hover:gap-3 transition-all group/btn">
                   Explore Service <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative z-20">
              <ZohoSyncFlow />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Process;
