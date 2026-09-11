"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="relative w-full py-4 px-4 md:px-6 lg:px-8 mb-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        className="relative w-full max-w-5xl mx-auto rounded-[24px] p-6 md:p-8 lg:px-14 py-6 md:py-8 overflow-hidden shadow-xl"
        style={{ background: 'linear-gradient(135deg, #1A7FD4 0%, #0D5FA3 60%, #29C6E0 100%)' }}
      >
        {/* Animated Background FX */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full filter blur-[50px] pointer-events-none" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[120px] h-[120px] bg-[#29C6E0]/20 rounded-full filter blur-[30px] pointer-events-none" 
        />

        {/* Shimmer sweep effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center lg:items-start gap-6">
          {/* Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white/60 font-['Nunito'] font-bold text-[12px] tracking-[4px] mb-2 uppercase"
            >
              PENTACLOUD
            </motion.div>

            <h2 className="font-['Nunito'] font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-2">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
                Ready to Transform Your Business?
              </motion.div>
            </h2>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="font-['Inter'] text-xs sm:text-sm text-white/80 leading-relaxed"
            >
              Join the 10+ clients we digitally transformed in 2026 — and let Pentacloud build something extraordinary for you too.
            </motion.p>
          </div>

          {/* Actions & Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 w-full border-t border-white/10 pt-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-row items-center gap-3 w-full sm:w-auto"
            >
              <Link href="/contact" className="bg-white text-[#1A7FD4] font-['Nunito'] font-bold text-[12px] sm:text-[14px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 whitespace-nowrap flex-1 sm:flex-initial text-center block">
                Start Your Journey →
              </Link>
              <Link href="/services/salesforce" className="bg-transparent border-2 border-white/40 text-white font-['Nunito'] font-bold text-[12px] sm:text-[14px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm whitespace-nowrap flex-1 sm:flex-initial text-center block">
                Explore Services
              </Link>
            </motion.div>

            {/* Contact Line */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className="text-center sm:text-right"
            >
              <span className="block font-['Inter'] text-[11px] text-white/50 mb-0.5">Or reach us at</span>
              <span className="font-['Nunito'] font-semibold text-[13px] text-white/90">+971 545 132 807</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
