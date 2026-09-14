"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Users, Target, Rocket, Heart } from "lucide-react";
import Link from "next/link";

const SalesforceQuestions = () => {
  const faqs = [
    { 
      question: "How long does a Salesforce implementation take?", 
      answer: "Timelines vary by complexity, a standard Sales Cloud implementation typically takes 4–8 weeks. Larger multi-cloud projects with custom integrations can take 3–6 months.",
      icon: Rocket,
      color: "#1A7FD4",
      image: "/Images/Salesforce/Sales-Queston-1.webp"
    },
    { 
      question: "Do we need to already be on Salesforce to work with you?", 
      answer: "Not at all. We work with businesses at every stage, whether you're evaluating Salesforce for the first time, migrating from another CRM, or looking to optimise an existing Salesforce org.",
      icon: Target,
      color: "#1A7FD4",
      image: "/Images/Salesforce/Sales-Queston-2.webp"
    },
    { 
      question: "What Salesforce certifications does your team hold?", 
      answer: "Our team collectively holds 35+ active Salesforce certifications spanning Salesforce Certified Administrator, Platform Developer I & II, Sales Cloud Consultant, and more.",
      icon: Shield,
      color: "#1A7FD4",
      image: "/Images/Salesforce/Sales-Queston-3.webp"
    },
    { 
      question: "How do you ensure our data is safe during migration?", 
      answer: "Data security is non-negotiable. We follow strict protocols including full backups, sandbox testing, encrypted transfer, and a zero-data-loss guarantee.",
      icon: Users,
      color: "#1A7FD4",
      image: "/Images/Salesforce/Sales-Queston-4.webp"
    },
    { 
      question: "What happens after our Salesforce goes live?", 
      answer: "We offer three post-launch options: 30-day hypercare, monthly managed support retainers, and ad-hoc support for specific requirements.",
      icon: Heart,
      color: "#1A7FD4",
      image: "/Images/Salesforce/Sales-Queston-5.webp"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 bg-[#E8F0F8] px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 sm:px-6 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-3 sm:mb-6"
          >
            COMMON QUESTIONS
          </motion.div>
          <h2 className="text-2xl sm:text-[42px] font-nunito font-black text-[#0D1B2A] leading-tight">
            Salesforce Consulting, <br />
            <span className="text-[#1A7FD4]">Answered Honestly</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {faqs
              .map((faq, i) => ({ faq, i }))
              .filter(({ i }) => i % 2 === 0)
              .map(({ faq, i }) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-[#E8F0F8] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ${
                    activeIndex === i 
                    ? "shadow-[inset_6px_6px_12px_rgba(163,185,210,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]" 
                    : "shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-0 gap-3 min-w-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                       <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-[15deg] shadow-inner scale-90' : 'group-hover:rotate-12'}`} style={{ color: faq.color }}>
                          <faq.icon className="w-5 h-5" />
                       </div>
                       <span className={`font-nunito font-black text-sm sm:text-base md:text-lg leading-snug transition-colors duration-300 min-w-0 break-words pr-2 ${activeIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'}`}>
                         {faq.question}
                       </span>
                    </div>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1A7FD4] transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-180 shadow-inner' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 flex flex-col gap-4 items-start">
                            {faq.image && (
                              <div className="w-full h-36 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3)] flex items-center justify-center overflow-hidden shrink-0">
                                 <motion.img 
                                   whileHover={{ scale: 1.05 }}
                                   src={faq.image} 
                                   alt={faq.question} 
                                   className="w-full h-full object-cover"
                                 />
                              </div>
                            )}
                           <div className="flex-1 min-w-0">
                              <p className="font-inter text-[#4A6080] text-xs sm:text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                              <Link href="/contact">
                                <motion.div
                                  whileHover={{ x: 3 }}
                                  className="mt-3 flex items-center gap-1.5 text-[#1A7FD4] font-nunito font-black text-xs uppercase tracking-wider cursor-pointer"
                                >
                                  <span>Contact us</span>
                                  <span>→</span>
                                </motion.div>
                              </Link>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {faqs
              .map((faq, i) => ({ faq, i }))
              .filter(({ i }) => i % 2 === 1)
              .map(({ faq, i }) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-[#E8F0F8] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ${
                    activeIndex === i 
                    ? "shadow-[inset_6px_6px_12px_rgba(163,185,210,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]" 
                    : "shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-0 gap-3 min-w-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                       <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-[15deg] shadow-inner scale-90' : 'group-hover:rotate-12'}`} style={{ color: faq.color }}>
                          <faq.icon className="w-5 h-5" />
                       </div>
                       <span className={`font-nunito font-black text-sm sm:text-base md:text-lg leading-snug transition-colors duration-300 min-w-0 break-words pr-2 ${activeIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'}`}>
                         {faq.question}
                       </span>
                    </div>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1A7FD4] transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-180 shadow-inner' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 flex flex-col gap-4 items-start">
                            {faq.image && (
                              <div className="w-full h-36 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3)] flex items-center justify-center overflow-hidden shrink-0">
                                 <motion.img 
                                   whileHover={{ scale: 1.05 }}
                                   src={faq.image} 
                                   alt={faq.question} 
                                   className="w-full h-full object-cover"
                                 />
                              </div>
                            )}
                           <div className="flex-1 min-w-0">
                              <p className="font-inter text-[#4A6080] text-xs sm:text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                              <Link href="/contact">
                                <motion.div
                                  whileHover={{ x: 3 }}
                                  className="mt-3 flex items-center gap-1.5 text-[#1A7FD4] font-nunito font-black text-xs uppercase tracking-wider cursor-pointer"
                                >
                                  <span>Contact us</span>
                                  <span>→</span>
                                </motion.div>
                              </Link>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesforceQuestions;
