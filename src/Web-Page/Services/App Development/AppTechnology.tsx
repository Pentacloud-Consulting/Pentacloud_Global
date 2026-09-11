"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Zap, Server, Flame, Cloud, Share2, PenTool, CreditCard, BarChart2, GitBranch, Layers } from "lucide-react";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const AppTechnology = () => {
  const categories = [
    {
      label: "Mobile Frameworks",
      bg: "#EEF3FF",
      color: "#1A7FD4",
      techs: [
        { name: "React Native", sub: "Cross-Platform", icon: Smartphone, color: "#29C6E0", bg: "#E0F7FF", level: 95, desc: "Write once, run natively on iOS and Android with near-native performance." },
        { name: "Swift / SwiftUI", sub: "Native iOS", icon: Zap, color: "#F59E0B", bg: "#FFF8E0", level: 88, desc: "Apple's modern language for building fluid, performant iOS experiences." },
        { name: "Kotlin", sub: "Native Android", icon: Smartphone, color: "#34C98A", bg: "#E8FFE8", level: 87, desc: "Google's preferred language for Android development, concise and safe." },
        { name: "Flutter", sub: "Cross-Platform UI", icon: Layers, color: "#1A7FD4", bg: "#EEF3FF", level: 85, desc: "Google's UI toolkit for building natively compiled apps from a single codebase." }
      ]
    },
    {
      label: "Backend & APIs",
      bg: "#E8FFE8",
      color: "#34C98A",
      techs: [
        { name: "Node.js + Express", sub: "API Backend", icon: Server, color: "#34C98A", bg: "#E8FFE8", level: 92, desc: "Scalable REST and GraphQL APIs handling thousands of concurrent connections." },
        { name: "Firebase", sub: "Real-time Backend", icon: Flame, color: "#F59E0B", bg: "#FFF8E0", level: 90, desc: "Real-time database, auth, push notifications, and cloud functions." },
        { name: "AWS / GCP", sub: "Cloud Infrastructure", icon: Cloud, color: "#1A7FD4", bg: "#EEF3FF", level: 90, desc: "Enterprise cloud hosting with auto-scaling and 99.9% uptime SLA." },
        { name: "GraphQL", sub: "API Query Language", icon: Share2, color: "#EC4899", bg: "#FFE8F0", level: 86, desc: "Efficient, flexible API queries that give apps exactly the data they need." }
      ]
    },
    {
      label: "Tools & Services",
      bg: "#EEF3FF",
      color: "#1A7FD4",
      techs: [
        { name: "Figma", sub: "UI/UX Design", icon: PenTool, color: "#1A7FD4", bg: "#EEF3FF", level: 98, desc: "Every app starts with a pixel-perfect, device-accurate Figma prototype." },
        { name: "Stripe", sub: "Payments", icon: CreditCard, color: "#29C6E0", bg: "#E0F7FF", level: 92, desc: "Seamless in-app payments, subscriptions, and marketplace payouts." },
        { name: "Mixpanel / Analytics", sub: "User Analytics", icon: BarChart2, color: "#34C98A", bg: "#E8FFE8", level: 88, desc: "Deep user behavior analytics and funnel tracking to improve retention." },
        { name: "Fastlane / CI-CD", sub: "Deployment Pipeline", icon: GitBranch, color: "#F59E0B", bg: "#FFF8E0", level: 90, desc: "Automated build, test, and App Store / Play Store deployment pipeline." }
      ]
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-background relative overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-2 h-2 bg-[#1A7FD4] rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-10">
          <div className="text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-3 sm:mb-4">TECHNOLOGY</div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[42px] text-[#0D1B2A] leading-tight">
            Built With The Best <br className="sm:hidden" /> <span className="text-[#1A7FD4]">App Technologies</span>
          </h2>
        </div>

        {categories.map((cat, idx) => (
          <div key={idx} className="mb-12 sm:mb-20">
            <div 
              className="font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] rounded-full px-5 py-1.5 mb-6 sm:mb-8 w-fit mx-auto md:mx-0 uppercase bg-background shadow-[4px_4px_10px_rgba(163,185,210,0.4),-4px_-4px_10px_rgba(255,255,255,0.8)]"
              style={{ color: cat.color }}
            >
              {cat.label}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {cat.techs.map((tech, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.6 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ type: "spring", bounce: 0.4, delay: i * 0.05 }}
                   whileHover={{ y: -6, scale: 1.02 }}
                   viewport={{ once: true }}
                   className={`${CLAY_CARD} p-5 sm:p-6 flex flex-col h-full group overflow-hidden`}
                 >
                    <div 
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-[14px] mb-3 sm:mb-4 transition-all duration-500 group-hover:rotate-[360deg] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] relative bg-background shrink-0`}
                      style={{ color: tech.color }}
                    >
                      <tech.icon className="w-4.5 h-4.5 sm:w-[22px] sm:h-[22px]" />
                    </div>
                   <h3 className="font-nunito font-bold text-base sm:text-[18px] text-[#0D1B2A] mb-0.5 sm:mb-1">{tech.name}</h3>
                   <div className="text-[10px] sm:text-[11px] font-nunito font-bold text-[#8BA4BE] uppercase mb-2 sm:mb-3 tracking-[1px]">{tech.sub}</div>
                   <p className="font-inter text-[11px] sm:text-[12px] text-[#4A6080] leading-relaxed mb-4 sm:mb-6 flex-1">
                     {tech.desc}
                   </p>
                   <div className="space-y-2">
                     <div className="flex justify-between text-[9px] sm:text-[10px] font-nunito font-black" style={{ color: cat.color }}>
                        <span>Expertise</span>
                        <span>{tech.level}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-[#EEF3FF] rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${tech.level}%` }}
                         viewport={{ once: true }}
                         transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                         className="h-full group-hover:brightness-110" 
                         style={{ backgroundColor: cat.color }}
                       />
                     </div>
                   </div>
                 </motion.div>
              ))}
            </div>
          </div>
          ))}
          </div>
          </section>
          );
          };

          export default AppTechnology;
