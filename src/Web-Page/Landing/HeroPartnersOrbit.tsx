"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HeroPartnersOrbit = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const partners = [
    { name: "Salesforce", logo: "/Partners/Salesforceb.svg", pos: "top" },
    { name: "Xero", logo: "/Partners/XeroPartner.svg", pos: "right" },
    { name: "Zoho", logo: "/Partners/ZohoPartner.svg", pos: "bottom" },
    { name: "Meta", logo: "/Partners/MetaPartner.svg", pos: "left" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
      className="hidden lg:flex relative w-[580px] h-[580px] items-center justify-center"
    >
      {/* Orbit Ring (Invisible guide ring with border) */}
      <div className="absolute w-[460px] h-[460px] rounded-full border-[1.5px] border-blue-500/15 z-0" />

      {/* Glow Trail */}
      <div
        className={`absolute w-[460px] h-[460px] rounded-full z-[1] animate-orbit ${isPaused ? "paused" : ""}`}
        style={{
          background: "conic-gradient(from 0deg, rgba(26,127,212,0.0), rgba(26,127,212,0.12) 60deg, rgba(26,127,212,0.0) 120deg)",
        }}
      />

      {/* Rotating Wrapper */}
      <div
        className={`absolute w-[460px] h-[460px] rounded-full z-10 animate-orbit ${isPaused ? "paused" : ""}`}
      >
        {/* 4 Tiny Dots at 45deg intervals */}
        {[45, 135, 225, 315].map((angle) => (
          <div
            key={angle}
            className="absolute w-1.5 h-1.5 bg-blue-500/25 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(230px) rotate(-${angle}deg) translate(-50%, -50%)`,
            }}
          />
        ))}

        {/* 4 Partner Badges */}
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="absolute"
            style={{
              top: partner.pos === "top" ? "-52px" : partner.pos === "bottom" ? "auto" : "50%",
              bottom: partner.pos === "bottom" ? "-52px" : "auto",
              left: partner.pos === "left" ? "-52px" : partner.pos === "right" ? "auto" : "50%",
              right: partner.pos === "right" ? "-52px" : "auto",
              transform: partner.pos === "top" || partner.pos === "bottom" ? "translateX(-50%)" : "translateY(-50%)",
            }}
          >
            <motion.div
              className={`animate-counter ${isPaused ? "paused" : ""}`}
              onMouseEnter={() => {
                setIsPaused(true);
                setHoveredBadge(partner.name);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setHoveredBadge(null);
              }}
              whileHover={{ scale: 1.15 }}
            >
              <div className="relative w-[104px] h-[104px] bg-white rounded-full border-2 border-blue-500/12 shadow-[8px_8px_20px_rgba(26,127,212,0.12)] flex items-center justify-center p-3 cursor-pointer transition-all hover:shadow-[10px_10px_24px_rgba(26,127,212,0.18)]">
                <div className="relative w-16 h-16">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredBadge === partner.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#0D1B2A] text-white text-[12px] font-inter px-3 py-1 rounded-lg whitespace-nowrap z-50 shadow-lg"
                    >
                      {partner.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Center Logo Cloud container */}
      <div className="relative flex items-center justify-center z-10 w-[310px] h-[215px]">
        {/* Pulsing cloud glow matching shape */}
        <motion.div
          animate={{
            opacity: [0.15, 0.4, 0.15],
            scale: [0.95, 1.08, 0.95]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center blur-2xl z-0"
        >
           <div className="relative w-[275px] h-[90px] bg-[#1A7FD4] rounded-full mt-14">
             <div className="absolute bottom-[30px] left-[35px] w-[96px] h-[96px] bg-[#1A7FD4] rounded-full"></div>
             <div className="absolute bottom-[30px] right-[48px] w-[132px] h-[132px] bg-[#1A7FD4] rounded-full"></div>
           </div>
        </motion.div>

        {/* The Cloud CSS Shape */}
        <div className="absolute inset-0 flex items-center justify-center drop-shadow-[0_15px_35px_rgba(26,127,212,0.15)] z-10">
           <div className="relative w-[275px] h-[90px] bg-white rounded-full mt-14">
             {/* Left bump */}
             <div className="absolute bottom-[30px] left-[35px] w-[96px] h-[96px] bg-white rounded-full"></div>
             {/* Right bump */}
             <div className="absolute bottom-[30px] right-[48px] w-[132px] h-[132px] bg-white rounded-full"></div>
           </div>
        </div>

        {/* The Logo */}
        <div className="relative z-20 w-[168px] h-[60px] mt-8">
          <Image
            src="/Logo/Penta Logo.png"
            alt="Pentacloud Logo"
            fill
            loading="eager"
            sizes="168px"
            className="object-contain"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counterRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbitRotate 20s linear infinite;
        }
        .animate-counter {
          animation: counterRotate 20s linear infinite;
        }
        .paused {
          animation-play-state: paused !important;
        }
      `}} />
    </motion.div>
  );
};

export default HeroPartnersOrbit;
