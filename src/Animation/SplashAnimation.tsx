"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SplashAnimation({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Premium cinematic timeline
    const timers = [
      setTimeout(() => setPhase(1), 200),  // Penta-Core draw
      setTimeout(() => setPhase(2), 1100), // Cinematic Text Reveal
      setTimeout(() => setPhase(3), 3200), // Zoom & Fade Exit
      setTimeout(() => onComplete(), 4000), // Finish
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!mounted) return null;

  const brand = "PENTACLOUD".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={phase === 3 ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC] overflow-hidden"
    >
      {/* Ambient Light Ray */}
      <motion.div 
        initial={{ opacity: 0, rotate: -20, scaleY: 0 }}
        animate={phase >= 1 ? { opacity: 0.6, rotate: -20, scaleY: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[120vw] h-[200px] bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none z-0"
        style={{ filter: "blur(60px)" }}
      />

      <div className="relative flex flex-col items-center z-10">
        
        {/* The Cloud Logo */}
        <div className="relative w-40 h-20 mb-8 flex items-center justify-center">
          {/* Core Glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 1 ? { scale: 1, opacity: 0.2 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[200px] h-[100px] bg-[#1A7FD4] rounded-full blur-3xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={phase === 3 ? { opacity: 0, scale: 1.2, y: -20 } : phase >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full z-10"
          >
            <Image
              src="/Logo/Penta Logo.png"
              alt="Pentacloud Logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Cinematic 3D Typography Reveal */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-[0.1em] overflow-hidden" style={{ perspective: "1000px" }}>
            {brand.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "80%", opacity: 0, rotateX: -80 }}
                animate={phase >= 2 ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.05 * i, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                style={{ fontFamily: "var(--font-nunito), sans-serif", transformOrigin: "bottom" }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-[0.1em] md:tracking-[0.2em]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 2 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-5 mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
            animate={phase >= 2 ? { opacity: 1, y: 0, letterSpacing: "0.6em" } : {}}
            transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            className="text-slate-500 text-[10px] md:text-xs font-bold uppercase"
          >
            Consulting
          </motion.p>
        </div>
      </div>

    </motion.div>
  );
}
