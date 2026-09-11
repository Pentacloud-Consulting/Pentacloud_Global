"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Atom, FileCode, Paintbrush, Wand2, Server, Database, Cloud, Globe, PenTool } from "lucide-react";

const TechCard = ({ tech, index }: { tech: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.1),-15px_-15px_30px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Decorative Glow */}
      <div 
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: tech.color }}
      />

      <div 
        className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0"
        style={{ color: tech.color }}
      >
        <tech.icon size={26} strokeWidth={2.5} />
      </div>

      <h3 className="font-nunito font-black text-lg text-[#0D1B2A] mb-1 group-hover:text-[#1A7FD4] transition-colors leading-tight">
        {tech.name}
      </h3>
      <div className="text-[9px] font-black text-[#8BA4BE] uppercase tracking-[2px] mb-3">
        {tech.sub}
      </div>
      
      <p className="font-inter text-[13px] text-[#4A6080] leading-relaxed mb-6 font-medium flex-1">
        {tech.desc}
      </p>

      <div className="space-y-2 mt-auto pt-4 border-t border-white/40">
        <div className="flex justify-between text-[9px] font-black text-[#1A7FD4] uppercase tracking-widest">
           <span>Core Proficiency</span>
           <span>{tech.level}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden border border-white/50">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${tech.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0] rounded-full" 
          />
        </div>
      </div>
    </motion.div>
  );
};

const WebTechnology = () => {
  const frontend = [
    { name: "Next.js", sub: "React Framework", icon: Code2, color: "#1A7FD4", level: 95, desc: "Server-side rendering for blazing-fast performance and optimal SEO." },
    { name: "React.js", sub: "UI Library", icon: Atom, color: "#29C6E0", level: 95, desc: "Component-driven interfaces with smooth interactions and performance." },
    { name: "TypeScript", sub: "Type Safety", icon: FileCode, color: "#1A7FD4", level: 90, desc: "Strongly-typed codebase reducing bugs and improving maintainability." },
    { name: "Tailwind", sub: "CSS System", icon: Paintbrush, color: "#29C6E0", level: 95, desc: "Pixel-perfect responsive designs built with consistent design tokens." },
    { name: "Framer", sub: "Animations", icon: Wand2, color: "#8B5CF6", level: 88, desc: "Silky smooth micro-animations that make your site feel premium." }
  ];

  const backend = [
    { name: "Node.js", sub: "Runtime", icon: Server, color: "#34C98A", level: 90, desc: "Scalable, event-driven server architecture for modern web apps." },
    { name: "Database", sub: "SQL & NoSQL", icon: Database, color: "#F59E0B", level: 88, desc: "Flexible database architecture chosen for your specific requirements." },
    { name: "Hosting", sub: "AWS / Vercel", icon: Cloud, color: "#1A7FD4", level: 92, desc: "Enterprise-grade cloud infrastructure with global CDN delivery." },
    { name: "Platforms", sub: "CMS Integrations", icon: Globe, color: "#EC4899", level: 95, desc: "Custom WordPress, Webflow, or headless CMS setups for content." },
    { name: "Figma", sub: "Design to Code", icon: PenTool, color: "#8B5CF6", level: 98, desc: "Pixel-perfect translation from Figma designs to production-ready code." }
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A7FD4] blur-[130px] opacity-[0.05] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            OUR TECHNOLOGY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[48px] text-[#0D1B2A] leading-tight mb-5"
          >
            Built With The Best <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]">Modern Tech Stack</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-lg leading-relaxed font-medium px-4">
            We leverage industry-leading technologies to build scalable, secure, and high-performance digital solutions.
          </p>
        </div>

        {/* Frontend Section */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
             <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/60" />
             <div className="px-5 py-1.5 bg-[#EEF3FF] text-[#1A7FD4] rounded-full text-[10px] font-black tracking-[3px] uppercase shadow-sm border border-white">
                Frontend
             </div>
             <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/60" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {frontend.map((tech, i) => (
               <TechCard key={i} tech={tech} index={i} />
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
             <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/60" />
             <div className="px-5 py-1.5 bg-[#E8FFE8] text-[#34C98A] rounded-full text-[10px] font-black tracking-[3px] uppercase shadow-sm border border-white">
                Backend & Infrastructure
             </div>
             <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/60" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {backend.map((tech, i) => (
               <TechCard key={i} tech={tech} index={i + 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebTechnology;
