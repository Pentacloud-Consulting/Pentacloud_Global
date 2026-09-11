"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Phone, ArrowRight } from "lucide-react";
import { CLAY_CARD } from "./Constants";

const consultingPackages = [
  {
    name: "Advisory Session",
    bestFor: "Specific questions needing expert input",
    price: "₹15,000 / session",
    duration: "3-hour session",
    includes: ["3-hour expert consultation", "Session notes document", "3 follow-up email Q&As", "Recorded session"],
    featured: false
  },
  {
    name: "Project Consulting",
    bestFor: "Specific transformation project or initiative",
    price: "₹75,000 onwards",
    duration: "2–8 weeks",
    includes: ["Full discovery session", "Comprehensive assessment", "Strategy & recommendations", "Executive presentation", "Roadmap with business case", "30-day Q&A support"],
    featured: true
  },
  {
    name: "Monthly Retainer",
    bestFor: "Ongoing strategic guidance",
    price: "₹45,000 / month",
    duration: "Rolling monthly",
    includes: ["8 hours consulting/month", "Weekly 30-min check-in", "Unlimited email Q&A", "Monthly strategy review", "Priority same-day response"],
    featured: false
  }
];

const trainingPackages = [
  {
    name: "Individual Training",
    bestFor: "1–4 people",
    price: "₹8,000 / person / day",
    duration: "",
    includes: ["Full training curriculum", "Sandbox access", "Recorded session", "30-day support", "Certificate"],
    featured: false
  },
  {
    name: "Team Training",
    bestFor: "Teams of 5–30",
    price: "₹35,000 / day",
    duration: "Up to 15 participants",
    includes: ["Custom content for your org", "On-site or virtual delivery", "All training materials", "Recorded sessions", "60-day support", "Adoption tracking report"],
    featured: true
  },
  {
    name: "Enterprise Programme",
    bestFor: "Organisation-wide training",
    price: "Custom Quote",
    duration: "",
    includes: ["Training needs analysis", "Custom curriculum design", "Role-specific tracks", "Multiple cohorts", "Train-the-trainer option", "Quarterly adoption reviews"],
    featured: false
  }
];

const ConsultingPackages = () => {
  return (
    <section className="mb-12 sm:mb-24 md:mb-32">
      <div className="text-center mb-10 sm:mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 bg-blue-50 text-[#1A7FD4] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] sm:tracking-[3px] mb-4 sm:mb-6"
        >
          ENGAGEMENT OPTIONS
        </motion.div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-nunito font-black text-[#0D1B2A] mb-4 sm:mb-6 leading-tight">
          Flexible Packages <br/> <span className="text-[#1A7FD4]">For Every Need</span>
        </h2>
        <p className="text-[#4A6080] max-w-2xl mx-auto font-inter text-xs sm:text-base md:text-lg leading-relaxed px-2">
          From a single advisory session to a full corporate programme — we have an engagement model that fits your budget.
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-xl sm:text-2xl font-nunito font-black text-[#0D1B2A] mb-6 sm:mb-10 text-center">Consulting Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {consultingPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${CLAY_CARD} p-6 sm:p-8 flex flex-col rounded-[20px] sm:rounded-[32px] relative ${pkg.featured ? 'border-2 border-[#1A7FD4]' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A7FD4] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Featured
                </div>
              )}
              <h4 className="text-lg sm:text-xl font-nunito font-black text-[#0D1B2A] mb-2">{pkg.name}</h4>
              <p className="text-xs text-[#4A6080] font-inter mb-4 h-8">{pkg.bestFor}</p>
              <div className="mb-6 border-b border-blue-50 pb-6">
                <p className="text-xl sm:text-2xl font-black text-[#1A7FD4]">{pkg.price}</p>
                {pkg.duration && <p className="text-xs font-bold text-slate-500 mt-1">{pkg.duration}</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#4A6080]">
                    <Check className="w-4 h-4 text-[#34C98A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-nunito font-bold text-sm transition-all ${pkg.featured ? 'bg-[#1A7FD4] text-white hover:bg-blue-700' : 'bg-blue-50 text-[#1A7FD4] hover:bg-blue-100'}`}>
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h3 className="text-xl sm:text-2xl font-nunito font-black text-[#0D1B2A] mb-6 sm:mb-10 text-center">Training Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {trainingPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${CLAY_CARD} p-6 sm:p-8 flex flex-col rounded-[20px] sm:rounded-[32px] relative ${pkg.featured ? 'border-2 border-[#1A7FD4]' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A7FD4] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Featured
                </div>
              )}
              <h4 className="text-lg sm:text-xl font-nunito font-black text-[#0D1B2A] mb-2">{pkg.name}</h4>
              <p className="text-xs text-[#4A6080] font-inter mb-4 h-8">{pkg.bestFor}</p>
              <div className="mb-6 border-b border-blue-50 pb-6">
                <p className="text-xl sm:text-2xl font-black text-[#1A7FD4]">{pkg.price}</p>
                {pkg.duration && <p className="text-xs font-bold text-slate-500 mt-1">{pkg.duration}</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#4A6080]">
                    <Check className="w-4 h-4 text-[#34C98A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-nunito font-bold text-sm transition-all ${pkg.featured ? 'bg-[#1A7FD4] text-white hover:bg-blue-700' : 'bg-blue-50 text-[#1A7FD4] hover:bg-blue-100'}`}>
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-900 to-[#0D1B2A] rounded-[24px] sm:rounded-[48px] p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000')] opacity-10 mix-blend-overlay bg-cover bg-center" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-nunito font-black text-white mb-4 sm:mb-6 leading-tight">
            Ready to Build Your <br /> Team's Capability?
          </h2>
          <p className="text-blue-100 text-sm sm:text-lg mb-8 sm:mb-10 font-inter">
            Book a free 30-minute call with one of our certified experts. No obligation. Just honest advice.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
            <button className="bg-[#1A7FD4] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-nunito font-black text-sm sm:text-lg shadow-[0_10px_20px_rgba(26,127,212,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-nunito font-black text-sm sm:text-lg backdrop-blur-sm transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Call +971 545 132 807
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <span className="flex items-center gap-2 text-blue-100 text-xs sm:text-sm font-bold">
              🎓 Free 30-min Consultation
            </span>
            <span className="flex items-center gap-2 text-blue-100 text-xs sm:text-sm font-bold">
              ⚡ Response in 24hrs
            </span>
            <span className="flex items-center gap-2 text-blue-100 text-xs sm:text-sm font-bold">
              🔒 No Obligation
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConsultingPackages;
