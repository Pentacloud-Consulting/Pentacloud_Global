"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Zap } from "lucide-react";

const options = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    body: "Instant response for quick queries and project starts.",
    cta: "Open WhatsApp",
    href: "https://wa.me/971545132807?text=Hi%20Pentacloud!%20I'd%20like%20to%20discuss%20a%20project.",
    color: "#34C98A",
    response: "Within 2 Hours"
  },
  {
    icon: Mail,
    title: "Email Us",
    body: "For detailed briefs, RFPs, and formal business inquiries.",
    cta: "Send Email",
    href: "mailto:contactus@pentacloudconsulting.com",
    color: "#1A7FD4",
    response: "Within 24 Hours"
  },
  {
    icon: Phone,
    title: "Schedule",
    body: "Book a 30-min discovery call with our consultants.",
    cta: "Book a Call",
    href: "tel:+971545132807",
    color: "#F59E0B",
    response: "Flexible Time"
  },
  {
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    title: "LinkedIn",
    body: "Connect for industry insights and company updates.",
    cta: "Follow Us",
    href: "https://linkedin.com/company/pentacloudconsulting",
    color: "#0A66C2",
    response: "Daily Updates"
  }
];

const ContactQuickOptions = () => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            GET IN TOUCH
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-tight"
          >
            Start a <span className="text-[#1A7FD4]">Conversation</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {options.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25)] transition-all duration-500 flex flex-col overflow-hidden h-full"
            >
              {/* Decorative Glow */}
              <div 
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: option.color }}
              />

              <div 
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center mb-6 rounded-xl bg-white shadow-[6px_6px_12px_rgba(163,185,210,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shrink-0"
                style={{ color: option.color }}
              >
                <option.icon size={24} strokeWidth={2.5} />
              </div>

              <h3 className="font-nunito font-black text-lg text-[#0D1B2A] mb-2 group-hover:text-[#1A7FD4] transition-colors duration-300 leading-tight">
                {option.title}
              </h3>
              
              <p className="font-inter text-[13px] text-[#4A6080] leading-relaxed mb-6 font-medium flex-1">
                {option.body}
              </p>

              <div className="space-y-4 mt-auto pt-6 border-t border-white/40">
                <div className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-xl border border-white shadow-sm">
                   <Zap size={12} className="text-[#F59E0B]" />
                   <span className="text-[10px] font-black text-[#0D1B2A] uppercase tracking-wider">{option.response}</span>
                </div>
                
                <a 
                  href={option.href}
                  target="_blank"
                  className="w-full py-2.5 rounded-xl text-white font-nunito font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                  style={{ backgroundColor: option.color, boxShadow: `0 8px 20px ${option.color}40` }}
                >
                  {option.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactQuickOptions;
