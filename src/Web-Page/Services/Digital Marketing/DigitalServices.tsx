"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Share2,
  FileText,
  Mail,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const DigitalServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const servicesData = [
    {
      icon: Search,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Search Engine Optimisation",
      desc: "We build sustainable organic search visibility that compounds over time. Our SEO service covers full technical audits, on-page optimisation, content strategy, link building, Core Web Vitals improvement, and local SEO.",
      tags: ["Technical SEO", "Link Building", "Core Web Vitals"],
      metric: "180% Avg Organic Traffic Increase",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative z-10 text-[#1A7FD4] bg-white p-4 rounded-2xl shadow-xl"
          >
            <Search size={48} />
          </motion.div>
          <div className="absolute flex items-end gap-3 bottom-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [20, 40 + i * 20, 20] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="w-6 bg-[#1A7FD4]/20 rounded-t-lg"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Search Engine Marketing",
      desc: "We manage high-performance Google Ads and Bing Ads campaigns, keyword research, ad copy, landing page alignment, bid strategy, and conversion tracking, ensuring every rupee of ad spend generates maximum leads.",
      tags: ["Google Ads", "Conversion Tracking", "A/B Testing"],
      metric: "65% Avg Cost Per Lead Reduction",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white p-4 rounded-2xl shadow-xl z-10"
          >
            <TrendingUp size={48} className="text-[#1A7FD4]" />
          </motion.div>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 100 L 30 60 L 60 70 L 100 20"
              fill="none"
              stroke="#1A7FD4"
              strokeWidth="2"
              strokeDasharray="200"
              animate={{ strokeDashoffset: [200, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      ),
    },
    {
      icon: Share2,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Social Media Management",
      desc: "We manage your brand's presence across LinkedIn, Instagram, Facebook, and X, creating content calendars, designing posts, writing captions, scheduling, and community management. Every post serves a strategic purpose.",
      tags: ["Content Calendar", "Community Mgmt", "LinkedIn & Insta"],
      metric: "220% Avg Social Engagement Boost",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative z-10 w-48 h-48 flex items-center justify-center"
          >
            <div className="absolute bg-white p-4 rounded-2xl shadow-xl z-20">
              <Share2 size={48} className="text-[#1A7FD4]" />
            </div>
            {[0, 120, 240].map((angle, i) => (
              <div
                key={angle}
                className="absolute w-32 h-0.5 bg-[#1A7FD4]/20 origin-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute right-0 w-4 h-4 rounded-full bg-[#1A7FD4] -translate-y-1/2 translate-x-1/2 shadow-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      ),
    },
    {
      icon: FileText,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Content Marketing",
      desc: "Content is the foundation of every successful digital strategy. We create SEO-optimised blogs, whitepapers, case studies, email newsletters, LinkedIn articles, and website copy that educates your audience and builds authority.",
      tags: ["SEO Blogging", "Whitepapers", "Website Copy"],
      metric: "3x Increase in Time-on-Site",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="bg-white w-32 h-40 rounded-xl shadow-xl p-4 flex flex-col gap-3 relative z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FileText size={24} className="text-[#1A7FD4] mb-2" />
            {[1, 0.8, 0.6, 0.9].map((width, i) => (
              <motion.div
                key={i}
                animate={{ width: ["0%", `${width * 100}%`] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="h-2 bg-[#1A7FD4]/30 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      ),
    },
    {
      icon: Mail,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Email Marketing",
      desc: "Email remains the highest ROI digital channel, averaging $42 return per $1 spent. We design email campaigns, build automated nurture sequences, segment your lists, and A/B test subject lines to improve conversions.",
      tags: ["Automated Nurtures", "A/B Testing", "List Segmentation"],
      metric: "42% Open Rate (vs 21% Ind. Avg)",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl">
            <Mail size={48} className="text-[#1A7FD4]" />
          </div>
          {[1, -1].map((dir, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, dir * 100],
                y: [0, -80],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
              className="absolute text-[#1A7FD4]/40"
            >
              <Mail size={32} />
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      icon: Megaphone,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Paid Social Advertising",
      desc: "We run performance-driven paid campaigns across Meta (Facebook + Instagram), LinkedIn, and YouTube, audience research, creative strategy, ad design, copywriting, and pixel setup. We focus on qualified lead generation.",
      tags: ["Meta Ads", "LinkedIn Lead Gen", "Pixel Setup"],
      metric: "4.2x Avg ROAS Across Campaigns",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center gap-6">
          <motion.div
            className="bg-white p-4 rounded-2xl shadow-xl z-10"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Megaphone size={48} className="text-[#1A7FD4]" />
          </motion.div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: [20, 40 + i * 15, 20],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 bg-[#1A7FD4] rounded-full"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  const activeService = servicesData[activeIndex];

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden">
      <div className="text-center mb-8 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 bg-blue-50 text-[#1A7FD4] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] sm:tracking-[3px] mb-4 sm:mb-6"
        >
          WHAT WE OFFER
        </motion.div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-nunito font-black text-[#0D1B2A] mb-4 sm:mb-6 leading-tight">
          Complete Digital Marketing <br />{" "}
          <span className="text-[#1A7FD4]">Service Suite</span>
        </h2>
        <p className="text-[#4A6080] max-w-2xl mx-auto font-inter text-xs sm:text-base md:text-lg leading-relaxed px-2">
          Every channel. Every tactic. All under one roof, strategically aligned
          to grow your business.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* The Horizontal Ribbon (Navigation) */}
        <div className="bg-background/80 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl sm:rounded-4xl shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)] border border-white/50 flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 sm:gap-4 min-w-max px-2 sm:px-4">
            {servicesData.map((service, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ y: -3 }}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "shadow-[5px_5px_10px_rgba(163,185,210,0.4),-5px_-5px_10px_rgba(255,255,255,0.8)] scale-105"
                      : "hover:bg-slate-50"
                  }`}
                  style={{
                    backgroundColor: isActive ? service.bg : "transparent",
                    color: isActive ? service.color : "#94A3B8",
                  }}
                >
                  <service.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  {isActive && (
                    <motion.div
                      layoutId="activeGlowDigital"
                      className="absolute inset-0 rounded-xl sm:rounded-2xl border-2"
                      style={{
                        borderColor: service.color,
                        boxShadow: `0 0 20px ${service.color}40`,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* The Central Stage (Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 min-h-90 sm:min-h-112.5">
          {/* Left: Content Card */}
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-background rounded-2xl sm:rounded-[40px] p-5 sm:p-12 shadow-[20px_20px_40px_rgba(163,185,210,0.5),-20px_-20px_40px_rgba(255,255,255,0.95)] border border-white/50 relative overflow-hidden flex flex-col justify-center"
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: activeService.color }}
            />

            <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                style={{
                  backgroundColor: activeService.bg,
                  color: activeService.color,
                }}
              >
                <activeService.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="font-nunito font-black text-lg sm:text-[32px] text-[#0D1B2A] leading-tight truncate">
                  {activeService.title}
                </h3>
                <div
                  className="inline-block px-3 py-1 rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider mt-1 truncate"
                  style={{
                    backgroundColor: activeService.bg,
                    color: activeService.color,
                  }}
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
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: activeService.color }}
                  />
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
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#1A7FD4 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="w-full h-full relative flex items-center justify-center">
              {activeService.visual}
            </div>

            {/* Status bar */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Campaign Active
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServices;
