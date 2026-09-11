"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Database, Fingerprint, Lock, Share2, HelpCircle, Mail } from "lucide-react";

const policyContent = [
  {
    id: 1,
    title: "Introduction",
    icon: Fingerprint,
    color: "#1A7FD4",
    bg: "#EEF3FF",
    desc: "At Pentacloud Consulting, we prioritize the privacy and security of your personal and business data. This Privacy Policy outlines how we collect, use, and protect your information across our website and consulting services."
  },
  {
    id: 2,
    title: "Information We Collect",
    icon: Database,
    color: "#8B5CF6",
    bg: "#F3E8FF",
    desc: "We collect Personal Identification Data (name, email, phone) and Usage Data (IP addresses, interactions). Client Data shared securely during projects is governed strictly by NDA and SLAs."
  },
  {
    id: 3,
    title: "How We Use Your Info",
    icon: HelpCircle,
    color: "#F59E0B",
    bg: "#FFF8E0",
    desc: "Your data is used to provide consulting services, communicate project updates, and ensure the security of our IT infrastructure. We only send marketing communications if you have explicitly opted in."
  },
  {
    id: 4,
    title: "Data Security & Retention",
    icon: ShieldAlert,
    color: "#34C98A",
    bg: "#E8FFE8",
    desc: "We implement industry-leading encryption and strict access controls. Personal and client data is only retained for as long as necessary to fulfill project needs or as required by law."
  },
  {
    id: 5,
    title: "Third-Party Sharing",
    icon: Share2,
    color: "#EC4899",
    bg: "#FFE8F0",
    desc: "We do not sell, trade, or rent your personal information. We may share data with trusted third-party providers (e.g., AWS, Vercel) solely to operate our website and deliver our services."
  },
  {
    id: 6,
    title: "Your Rights",
    icon: Lock,
    color: "#29C6E0",
    bg: "#E0F7FF",
    desc: "You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights or opt out, please contact us."
  }
];

const PrivacyPolicy = () => {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 bg-[#E8F0F8] min-h-screen relative overflow-hidden">
      {/* Animated Floating Background Decor */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#1A7FD4] blur-[120px] sm:blur-[150px] opacity-[0.06] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#29C6E0] blur-[120px] sm:blur-[150px] opacity-[0.06] rounded-full pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[10px] sm:text-xs font-black tracking-[4px] uppercase mb-4 inline-block">
            LEGAL
          </div>
          <h1 className="font-nunito font-black text-3xl sm:text-5xl lg:text-6xl text-[#0D1B2A] leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-inter text-[#4A6080] text-sm sm:text-base max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* 3D-like Animated Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 perspective-1000">
          {policyContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -4, scale: 1.02, rotateX: 5 }}
              className="bg-white/50 backdrop-blur-md rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 border border-white/60 shadow-[8px_8px_16px_rgba(163,185,210,0.1),-8px_-8px_16px_rgba(255,255,255,0.4)] flex flex-col h-full group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/50"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </div>
                <h2 className="font-nunito font-black text-[13px] sm:text-xl text-[#0D1B2A] leading-tight group-hover:text-[#1A7FD4] transition-colors">
                  {item.id}. {item.title}
                </h2>
              </div>
              <p className="font-inter text-[10px] sm:text-[15px] text-[#4A6080] leading-snug sm:leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 bg-white/70 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-white shadow-[15px_15px_30px_rgba(163,185,210,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EEF3FF] text-[#1A7FD4] flex items-center justify-center shrink-0 border border-blue-100">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-nunito font-black text-xl sm:text-2xl text-[#0D1B2A] mb-1">Privacy Concerns?</h3>
              <p className="font-inter text-xs sm:text-sm text-[#4A6080] font-medium">
                Reach out to our Data Protection team directly.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 w-full sm:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <a href="mailto:contactus@pentacloudconsulting.com" className="font-nunito font-bold text-[#1A7FD4] hover:text-[#0D5FA3] transition-colors text-sm sm:text-base">
              contactus@pentacloudconsulting.com
            </a>
            <a href="tel:+971545132807" className="font-inter font-bold text-slate-600 text-xs sm:text-sm">
              +971 545 132 807
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;
