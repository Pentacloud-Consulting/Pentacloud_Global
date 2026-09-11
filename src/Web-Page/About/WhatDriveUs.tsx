"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Shield, Zap, Users, Award } from "lucide-react";

const WhatDriveUs = () => {
  const coreValues = [
    { 
      icon: Shield, 
      color: '#34C98A', 
      title: 'Integrity', 
      text: 'We operate with radical transparency, keeping promises to every client, every time.' 
    },
    { 
      icon: Zap, 
      color: '#F59E0B', 
      title: 'Innovation', 
      text: 'We challenge conventions and leverage AI to deliver future-ready solutions.' 
    },
    { 
      icon: Users, 
      color: '#8B5CF6', 
      title: 'Client First', 
      text: 'We put client success at the center of every decision we make.' 
    },
    { 
      icon: Award, 
      color: '#EC4899', 
      title: 'Excellence', 
      text: 'Backed by 35+ certifications, we uphold the highest standards of technical excellence.' 
    },
  ];

  return (
    <section className="relative w-full py-12 sm:py-24 bg-[#E8F0F8] overflow-hidden">
      {/* Dynamic Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#1A7FD4] rounded-full filter blur-[100px] sm:blur-[150px] opacity-[0.05] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#29C6E0] rounded-full filter blur-[100px] sm:blur-[150px] opacity-[0.05] pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[2px_2px_8px_rgba(163,185,210,0.15)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[3px] uppercase mb-4 sm:mb-6"
          >
            WHAT DRIVES US
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] leading-[1.2] text-[#0D1B2A] max-w-3xl"
          >
            Our Mission, Vision & <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]">Core Values</span>
          </motion.h2>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative bg-white/50 backdrop-blur-sm rounded-[32px] p-7 sm:p-9 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25)] transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A7FD4] to-transparent opacity-50" />
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-[6px_6px_12px_rgba(163,185,210,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)] text-[#1A7FD4] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-all duration-200">
              <Target size={28} strokeWidth={2.5} className="sm:w-8 sm:h-8" />
            </div>
            <div className="font-nunito font-black text-[10px] sm:text-[11px] tracking-[3px] text-[#1A7FD4] mb-3 uppercase">OUR MISSION</div>
            <h3 className="font-nunito font-black text-xl sm:text-[24px] text-[#0D1B2A] mb-4 group-hover:text-[#1A7FD4] transition-colors leading-tight">Driving Digital Excellence</h3>
            <p className="font-inter text-[13.5px] sm:text-[15px] text-[#4A6080] leading-relaxed font-medium">
              To empower businesses with cutting-edge Salesforce, Cloud, and AI solutions, delivering measurable transformation that scales with ambition and drives sustainable growth.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative bg-white/50 backdrop-blur-sm rounded-[32px] p-7 sm:p-9 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25)] transition-all duration-200 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#29C6E0] to-transparent opacity-50" />
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-[6px_6px_12px_rgba(163,185,210,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)] text-[#29C6E0] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-all duration-200">
              <Eye size={28} strokeWidth={2.5} className="sm:w-8 sm:h-8" />
            </div>
            <div className="font-nunito font-black text-[10px] sm:text-[11px] tracking-[3px] text-[#29C6E0] mb-3 uppercase">OUR VISION</div>
            <h3 className="font-nunito font-black text-xl sm:text-[24px] text-[#0D1B2A] mb-4 group-hover:text-[#29C6E0] transition-colors leading-tight">Technology for Every Business</h3>
            <p className="font-inter text-[13.5px] sm:text-[15px] text-[#4A6080] leading-relaxed font-medium">
              To be the most trusted technology partner in Asia, making enterprise-grade Salesforce and Cloud solutions accessible to businesses of every size.
            </p>
          </motion.div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {coreValues.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[28px] p-6 sm:p-7 border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.1),-8px_-8px_20px_rgba(255,255,255,0.5)] hover:shadow-[15px_15px_30px_rgba(163,185,210,0.15)] transition-all duration-200 overflow-hidden"
            >
              {/* Decorative Glow */}
              <div 
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: val.color }}
              />

              <div 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-[4px_4px_8px_rgba(163,185,210,0.08),-4px_-4px_8px_rgba(255,255,255,0.6)] flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-105"
                style={{ color: val.color }}
              >
                <val.icon size={22} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-nunito font-black text-lg text-[#0D1B2A] mb-2 group-hover:text-[#1A7FD4] transition-colors duration-150">
                {val.title}
              </h4>
              <p className="font-inter text-[13px] text-[#4A6080] leading-relaxed font-medium">
                {val.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatDriveUs;
