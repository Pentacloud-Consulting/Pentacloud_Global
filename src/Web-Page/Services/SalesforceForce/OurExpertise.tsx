"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  HeadphonesIcon, 
  Megaphone, 
  Users, 
  ShoppingCart, 
  BarChart2, 
  DollarSign, 
  Heart,
  ChevronRight,
  Files,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck
} from "lucide-react";

// --- Custom Animated Visual Stage for each Cloud ---
const CloudVisual = ({ type, color }: { type: string, color: string }) => {
  switch (type) {
    case "pipeline":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
          <div className="absolute w-64 h-32 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-around px-4">
             {[0, 1, 2, 3].map(i => (
               <motion.div 
                 key={i}
                 animate={{ 
                   height: [20, 40, 20],
                   backgroundColor: [color + "20", color, color + "20"]
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                 className="w-4 rounded-full"
               />
             ))}
          </div>
          <motion.div 
            animate={{ x: [-120, 120] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{ color }}
          >
            <TrendingUp size={32} />
          </motion.div>
        </div>
      );
    case "service":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-32 rounded-full border-4 border-dashed flex items-center justify-center"
            style={{ borderColor: color + "40" }}
          >
            <HeadphonesIcon size={48} style={{ color }} />
          </motion.div>
          {[0, 90, 180, 270].map(angle => (
            <motion.div 
              key={angle}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ 
                scale: [0, 1.5, 0],
                x: [0, 60 * Math.cos(angle * Math.PI / 180)],
                y: [0, 60 * Math.sin(angle * Math.PI / 180)]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
            />
          ))}
        </div>
      );
    case "marketing":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
          <svg className="w-64 h-32">
            <motion.path 
              d="M 10 80 Q 80 10, 160 80 T 310 80" 
              fill="none" 
              stroke={color + "40"} 
              strokeWidth="4" 
              strokeDasharray="8 8" 
            />
            <motion.circle 
              r="6" 
              fill={color}
              animate={{ 
                offsetDistance: ["0%", "100%"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: "path('M 10 80 Q 80 10, 160 80 T 310 80')" }}
            />
          </svg>
          <Megaphone size={32} className="absolute top-4 left-1/2 -translate-x-1/2" style={{ color }} />
        </div>
      );
    case "experience":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
           <div className="grid grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [`0 0 0px ${color}00`, `0 0 15px ${color}40`, `0 0 0px ${color}00`]
                  }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center"
                  style={{ color }}
                >
                  <Users size={18} />
                </motion.div>
              ))}
           </div>
        </div>
      );
    case "commerce":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="w-40 h-40 border border-dashed rounded-full flex items-center justify-center"
             style={{ borderColor: color + "40" }}
           >
              <ShoppingCart size={40} style={{ color }} />
           </motion.div>
           {[0, 120, 240].map(i => (
             <motion.div 
               key={i}
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity, delay: i / 120 }}
               className="absolute w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center"
               style={{ 
                 left: `${50 + 40 * Math.cos(i * Math.PI / 180)}%`,
                 top: `${50 + 40 * Math.sin(i * Math.PI / 180)}%`,
                 color 
               }}
             >
               <Zap size={14} />
             </motion.div>
           ))}
        </div>
      );
    case "analytics":
      return (
        <div className="relative w-full h-48 flex items-center justify-center gap-2 items-end pb-8">
           {[40, 70, 50, 90, 60].map((h, i) => (
             <motion.div 
               key={i}
               initial={{ height: 0 }}
               whileInView={{ height: `${h}%` }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: i * 0.1 }}
               className="w-8 rounded-t-lg"
               style={{ backgroundColor: color }}
             />
           ))}
           <BarChart2 size={32} className="absolute top-8 right-8" style={{ color }} />
        </div>
      );
    case "financial":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center border-2"
             style={{ borderColor: color + "20" }}
           >
              <DollarSign size={48} style={{ color }} />
           </motion.div>
           <ShieldCheck size={24} className="absolute bottom-12 right-1/2 translate-x-12" style={{ color: "#34C98A" }} />
        </div>
      );
    case "health":
      return (
        <div className="relative w-full h-48 flex items-center justify-center">
           <div className="relative w-32 h-32">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-50"
              />
              <Heart size={64} className="absolute inset-0 m-auto" style={{ color }} />
           </div>
           <motion.div 
             animate={{ x: [-100, 100] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="absolute w-full h-px bg-slate-200"
           >
              <div className="w-4 h-4 rounded-full bg-blue-500 blur-[2px] -translate-y-1/2" />
           </motion.div>
        </div>
      );
    default:
      return null;
  }
};

const OurExpertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clouds = [
    { 
      title: "Sales Cloud", 
      icon: TrendingUp, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Supercharge your sales pipeline with AI-driven lead scoring and opportunity management. We optimize every stage from lead generation to final closure.", 
      metric: "45% faster closure ↑", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Lead & Opportunity Management", "Sales Forecasting", "Einstein AI Scoring", "Mobile Sales App"],
      visual: "pipeline"
    },
    { 
      title: "Service Cloud", 
      icon: HeadphonesIcon, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Transform customer service with AI-powered routing and self-service portals. Deliver personalized support experiences at scale.", 
      metric: "60% resolution time ↓", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Omni-channel Support", "Case Management", "Knowledge Base", "Service Analytics"],
      visual: "service"
    },
    { 
      title: "Marketing Cloud", 
      icon: Megaphone, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Deliver personalised customer journeys across email, SMS, and social media. Build 1-to-1 relationships with your audience.", 
      metric: "200% engagement ↑", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Journey Builder", "Email Studio", "Audience Studio", "Social Media Marketing"],
      visual: "marketing"
    },
    { 
      title: "Experience Cloud", 
      icon: Users, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Build branded portals for customers, partners, and self-service communities. Enhance collaboration and user adoption.", 
      metric: "80% self-service ↑", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Customer Portals", "Partner Communities", "Help Centers", "Mobile Experience"],
      visual: "experience"
    },
    { 
      title: "Commerce Cloud", 
      icon: ShoppingCart, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Launch and scale B2B/B2C commerce with AI-powered merchandising. Create seamless shopping experiences across all channels.", 
      metric: "35% conversion ↑", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["B2C & B2B Commerce", "Order Management", "AI Personalization", "Multi-site Management"],
      visual: "commerce"
    },
    { 
      title: "Analytics Cloud", 
      icon: BarChart2, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Turn CRM data into insights with real-time Einstein Analytics dashboards. Make data-driven decisions with ease.", 
      metric: "Real-time insights", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Einstein Discovery", "Custom Dashboards", "Predictive Insights", "Data Integration"],
      visual: "analytics"
    },
    { 
      title: "Financial Services", 
      icon: DollarSign, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Purpose-built CRM for banks, insurance, and wealth management firms. Ensure regulatory compliance while growing client trust.", 
      metric: "HIPAA + GDPR Ready", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Wealth Management", "Insurance Service", "Banking Compliance", "Actionable Insights"],
      visual: "financial"
    },
    { 
      title: "Health Cloud", 
      icon: Heart, 
      bg: "#EEF3FF", 
      color: "#1A7FD4", 
      desc: "Connect patients and care teams in a unified platform with HIPAA compliance. Deliver patient-centric care across all touchpoints.", 
      metric: "Full Compliance", 
      metricBg: "#E8FFE8", 
      metricColor: "#34C98A",
      features: ["Patient 360", "Care Management", "Provider Relationship", "Health Analytics"],
      visual: "health"
    }
  ];

  const certs = [
    "Salesforce Admin ✓", "Sales Cloud Consultant ✓", "Service Cloud Consultant ✓", "Platform Developer I ✓", 
    "Marketing Cloud ✓", "Experience Cloud ✓", "CPQ Specialist ✓", "Data Architect ✓",
    "Sharing & Visibility ✓", "Development Lifecycle ✓", "App Builder ✓", "Advanced Admin ✓",
    "B2C Commerce ✓", "Einstein Analytics ✓", "Field Service ✓", "Pardot Specialist ✓"
  ];

  const activeCloud = clouds[activeIndex];

  return (
    <section className="pt-6 sm:pt-10 pb-4 sm:pb-6 px-3 sm:px-6 bg-background relative overflow-hidden flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A7FD4]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1A7FD4]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-4 sm:mb-10 flex flex-col items-center">
          <div className="text-[#1A7FD4] font-nunito font-bold text-[9px] sm:text-[11px] tracking-[4px] uppercase mb-2 leading-none">OUR EXPERTISE</div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[36px] md:text-[42px] text-[#0D1B2A] leading-tight">
            Salesforce Clouds <span className="text-[#1A7FD4]">We Master</span>
          </h2>
        </div>

        {/* File Organizer UI Container */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[320px_1fr] gap-0 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[20px_20px_60px_rgba(163,185,210,0.2),-10px_-10px_40px_rgba(255,255,255,0.9)] border border-slate-200/40 bg-background">
          
          {/* Left Sidebar: Folder Tabs */}
          <div className="bg-slate-50/50 md:bg-background/80 p-3 sm:p-6 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col shrink-0 w-full md:w-auto relative">
            <div className="hidden md:flex items-center gap-3 mb-6 pb-4 border-b border-slate-300/30 shrink-0">
              <div className="w-10 h-10 bg-[#1A7FD4] rounded-xl flex items-center justify-center text-white shadow-md">
                <Files size={20} />
              </div>
              <span className="font-nunito font-black text-[10px] uppercase tracking-[2px] text-[#0D1B2A]">Solutions Catalog</span>
            </div>

            <div className="relative">
              <div className="flex flex-row md:flex-col gap-2 md:space-y-1.5 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto pb-2 md:pb-0 px-1 md:px-0 flex-1 w-full whitespace-nowrap snap-x snap-mandatory custom-scrollbar">
                {clouds.map((cloud, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <motion.div
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      whileHover={{ x: 3 }}
                      className={`relative px-4 py-2.5 md:p-3 rounded-full md:rounded-xl cursor-pointer transition-all duration-300 flex flex-row items-center gap-2 md:gap-4 group shrink-0 snap-center border ${
                        isActive 
                          ? 'bg-white shadow-sm md:translate-x-3 z-20 border-[#1A7FD4]/20 md:border-transparent' 
                          : 'bg-white/40 md:bg-transparent border-white/50 md:border-transparent hover:bg-slate-200/50 z-10'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabIndicator"
                          className="absolute hidden md:block md:left-0 md:top-2 md:bottom-2 md:w-1.5 md:h-auto rounded-full"
                          style={{ backgroundColor: cloud.color }}
                        />
                      )}

                      <div 
                        className={`w-6 h-6 md:w-9 md:h-9 rounded-md md:rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isActive ? 'scale-110 shadow-sm' : 'opacity-60 grayscale'
                        } [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:md:w-[18px] [&_svg]:md:h-[18px]`}
                        style={{ backgroundColor: isActive ? cloud.bg : 'transparent', color: isActive ? cloud.color : '#64748B' }}
                      >
                        <cloud.icon />
                      </div>

                      <span className={`font-nunito font-bold text-xs md:text-[14px] transition-colors whitespace-nowrap ${
                        isActive ? 'text-[#0D1B2A]' : 'text-[#64748B]'
                      }`}>
                        {cloud.title}
                      </span>

                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto text-[#1A7FD4] hidden md:block"
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile scroll indicator arrow */}
              <div className="md:hidden absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none flex items-center justify-end pr-1 z-20">
                <div className="w-7 h-7 bg-white rounded-full shadow-[0_2px_8px_rgba(26,127,212,0.15)] border border-slate-100 flex items-center justify-center animate-pulse">
                  <ArrowRight size={14} className="text-[#1A7FD4]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: Content Sheet */}
          <div className="p-4 sm:p-10 lg:p-12 bg-background relative flex items-center justify-center min-h-auto sm:min-h-[450px] md:min-h-[550px] overflow-hidden w-full py-6 sm:py-10">
            
            {/* Floating Clouds Background Animation */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {mounted && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "120%", x: `${10 + i * 15}%`, opacity: 0 }}
                  animate={{ 
                    y: "-120%", 
                    opacity: [0, 0.08, 0.08, 0],
                  }}
                  transition={{ 
                    duration: 12 + Math.random() * 8, 
                    repeat: Infinity, 
                    delay: i * 2.5,
                    ease: "linear"
                  }}
                  className="absolute text-[#1A7FD4]"
                >
                  <Cloud size={50 + Math.random() * 70} strokeWidth={0.5} />
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-center"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 mb-6">
                    <motion.div 
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-[24px] flex items-center justify-center shadow-2xl relative bg-white border-2 sm:border-4 border-white overflow-hidden shrink-0 [&_svg]:w-6 [&_svg]:h-6 [&_svg]:sm:w-8 [&_svg]:sm:h-8 [&_svg]:md:w-10 [&_svg]:md:h-10"
                      style={{ boxShadow: `0 20px 40px ${activeCloud.bg}80`, color: activeCloud.color }}
                    >
                      <div className="absolute inset-0 opacity-10" style={{ backgroundColor: activeCloud.bg }} />
                      <activeCloud.icon className="relative z-10" />
                    </motion.div>

                    <div className="text-center md:text-left flex-1 min-w-0">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <div className="w-8 h-[1px] bg-[#1A7FD4]/30" />
                        <span className="text-[#1A7FD4] font-nunito font-black text-[8.5px] sm:text-[10px] tracking-[3px] uppercase leading-none">Expertise Module</span>
                        <div className="w-8 h-[1px] bg-[#1A7FD4]/30" />
                      </div>
                      <h3 className="font-nunito font-black text-lg sm:text-[32px] md:text-[40px] text-[#0D1B2A] leading-tight mb-2 sm:mb-4 truncate">
                        {activeCloud.title}
                      </h3>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-nunito font-bold text-[11px] sm:text-[13px] shadow-sm border leading-none"
                        style={{ backgroundColor: activeCloud.metricBg, color: activeCloud.metricColor, borderColor: `${activeCloud.metricColor}20` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeCloud.metricColor }} />
                        <span>{activeCloud.metric}</span>
                      </motion.div>
                    </div>
                  </div>

                  <p className="font-inter text-[11px] sm:text-[16px] md:text-[18px] text-[#4A6080] leading-[1.6] mb-4 sm:mb-8 max-w-xl">
                    {activeCloud.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 mb-5 sm:mb-8">
                    {activeCloud.features.map((feature, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 bg-slate-50/50 p-2 sm:p-3 rounded-xl border border-slate-100/50"
                      >
                         <CheckCircle2 size={16} className="text-[#34C98A] shrink-0" />
                         <span className="text-[10.5px] sm:text-[13px] font-bold text-[#4A6080]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>


                </div>

                {/* Right Visual Area (Desktop Only) */}
                <div className="hidden lg:flex flex-col items-center justify-center">
                   <CloudVisual type={activeCloud.visual} color={activeCloud.color} />
                   <div className="mt-8 flex flex-col items-center text-center">
                      <div className="flex gap-1 mb-2">
                         {[...Array(3)].map((_, i) => (
                           <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                         ))}
                      </div>
                      <span className="text-[9px] font-black text-[#8BA4BE] uppercase tracking-[2px]">Cloud Instance Active</span>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background watermark */}
            <div className="absolute bottom-4 right-4 opacity-[0.02] pointer-events-none select-none">
               <Files size={150} className="md:w-[250px] md:h-[250px]" strokeWidth={0.5} />
            </div>
          </div>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden py-3 mt-3 before:absolute before:left-0 before:top-0 before:h-full before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 sm:gap-8 whitespace-nowrap"
          >
            {[...certs, ...certs].map((cert, i) => (
              <div key={i} className="bg-white px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl sm:rounded-2xl text-[#64748B] font-nunito font-bold text-xs sm:text-[14px] shadow-sm border border-slate-100/80 leading-none">
                {cert}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 0px;
          width: 0px;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E2E8F0;
            border-radius: 10px;
          }
        }
      `}} />
    </section>
  );
};

export default OurExpertise;
