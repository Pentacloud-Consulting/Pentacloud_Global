"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Zap, Settings, Database, HelpCircle, Cloud } from "lucide-react";
import Link from "next/link";

const ZohoFAQ = () => {
  const faqs = [
    {
      question: "What is the difference between Zoho CRM and Zoho One?",
      answer: "Zoho CRM is a single application focused on sales, marketing, and customer relationship management. Zoho One is a complete business operating suite containing 40+ integrated Zoho applications covering sales, marketing, finance, HR, project management, and more, all under one subscription. Zoho One is significantly better value for growing businesses that need multiple functions.",
      icon: Settings,
      color: "#1A7FD4",
      image: "/Images/Zoho Images/Zoho-Question-1.webp"
    },
    {
      question: "How long does a Zoho CRM implementation take?",
      answer: "A standard Zoho CRM implementation for an SMB takes 2–4 weeks from kickoff to go-live. More complex implementations with custom modules, Deluge scripting, and multiple integrations take 5–8 weeks. A full Zoho One deployment across multiple departments takes 8–16 weeks depending on business complexity.",
      icon: Zap,
      color: "#34C98A",
      image: "/Images/Zoho Images/Zoho-Question-2.webp"
    },
    {
      question: "Can you migrate our data from Salesforce to Zoho?",
      answer: "Yes, Salesforce to Zoho CRM migration is one of our most common requests. We migrate all standard objects as well as custom objects, fields, attachments, and historical data, maintaining all relationships between records. We run a full test migration in a Zoho sandbox before touching production data.",
      icon: Database,
      color: "#F59E0B",
      image: "/Images/Zoho Images/Zoho-Question-3.webp"
    },
    {
      question: "Is Zoho Books GST compliant for Indian businesses?",
      answer: "Yes, Zoho Books is fully GST compliant and is approved by the Indian government for GST e-invoicing. We configure Zoho Books with correct GST tax rates, HSN/SAC codes, e-invoice generation, and GSTR report generation. For UAE clients, we set up VAT compliance per Federal Tax Authority requirements.",
      icon: Shield,
      color: "#8B5CF6",
      image: "/Images/Zoho Images/Zoho-Question-4.webp"
    },
    {
      question: "Can Zoho integrate with our existing tools?",
      answer: "Zoho has native integrations with hundreds of popular business tools and connects to 800+ apps through Zoho Flow. Commonly requested integrations include Zoho CRM with Xero, WhatsApp Business, Google Workspace, Microsoft 365, Shopify, Stripe, and Slack.",
      icon: Cloud,
      color: "#1A7FD4",
      image: "/Images/Zoho Images/Zoho-Question-5.webp"
    },
    {
      question: "Do you provide ongoing Zoho support after implementation?",
      answer: "Yes, ongoing Zoho managed support is one of our core offerings. We offer monthly retainer plans starting from 4 hours per month, covering user management, configuration changes, new automation builds, and troubleshooting. Most growing businesses find the Standard plan (8hrs/month) sufficient for day-to-day management.",
      icon: HelpCircle,
      color: "#34C98A",
      image: "/Images/Zoho Images/Zoho-Question-6.webp"
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
            Zoho Ecosystem, <br />
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

export default ZohoFAQ;
