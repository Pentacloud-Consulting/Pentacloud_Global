"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart2, Search, Target, Globe, Cloud } from "lucide-react";
import Link from "next/link";

const DigitalFAQ = () => {
  const faqs = [
    {
      question: "How long before we see results from SEO?",
      answer: "SEO is a long-term investment, you typically start seeing measurable ranking improvements in 3–4 months, with significant traffic growth by month 5–6. For competitive industries, 12 months is a realistic timeline for dominant rankings. We set honest expectations from day one and provide monthly progress reports showing ranking movement, traffic trends, and domain authority growth.",
      icon: Search,
      color: "#1A7FD4",
      image: "/Images/Digital marketing images/digital marketing-question-1.webp"
    },
    {
      question: "What is the minimum ad spend required for Google or Meta Ads?",
      answer: "For Google Ads, we recommend a minimum monthly ad spend of ₹50,000 to generate meaningful data and results. For Meta Ads, ₹30,000 per month is the minimum effective budget. These are ad spend budgets paid directly to Google/Meta, separate from our management fee. We can work with lower budgets for testing phases.",
      icon: BarChart2,
      color: "#34C98A",
      image: "/Images/Digital marketing images/digital marketing-question-2.webp"
    },
    {
      question: "Do you manage the ad accounts or do we need to set them up?",
      answer: "We handle everything, account creation, pixel setup, conversion tracking, campaign structure, creative production, and ongoing management. All ad accounts are set up under your business ownership so you retain full access and data ownership at all times. We never hold client accounts hostage.",
      icon: Target,
      color: "#F59E0B",
      image: "/Images/Digital marketing images/digital marketing-question-3.webp"
    },
    {
      question: "Can you integrate marketing with our Salesforce CRM?",
      answer: "Yes, as a certified Salesforce and Zoho partner, this is one of our key differentiators. We connect your marketing campaigns directly to your CRM, tracking leads from first click through to closed deal. This gives you true revenue attribution and helps your sales team prioritise the hottest marketing leads automatically.",
      icon: Cloud,
      color: "#8B5CF6",
      image: "/Images/Digital marketing images/digital marketing-question-4.webp"
    },
    {
      question: "Do you work with businesses outside India?",
      answer: "Yes, we serve clients across India and the Middle East (UAE, Saudi Arabia, Qatar). We have local market expertise in both geographies, understanding platform preferences, content sensitivities, and digital advertising regulations in each market. Our team operates across IST and Gulf Standard Time to ensure responsive support.",
      icon: Globe,
      color: "#1A7FD4",
      image: "/Images/Digital marketing images/digital marketing-question-5.webp"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] px-4 sm:px-10 rounded-[24px] sm:rounded-[48px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-[#E8F0F8] rounded-full shadow-[3px_3px_6px_rgba(163,185,210,0.4),-3px_-3px_6px_rgba(255,255,255,0.85)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-4 sm:mb-6 inline-block"
          >
            COMMON QUESTIONS
          </motion.div>
          <h2 className="text-2xl sm:text-[42px] font-nunito font-black text-[#0D1B2A] leading-tight">
            Digital Marketing, <br />
            <span className="text-[#1A7FD4]">Answered Honestly</span>
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-[#E8F0F8] rounded-[20px] sm:rounded-[32px] overflow-hidden transition-all duration-500 ${
                activeIndex === i 
                ? "shadow-[inset_4px_4px_8px_rgba(163,185,210,0.25),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]" 
                : "shadow-[6px_6px_12px_rgba(163,185,210,0.4),-6px_-6px_12px_rgba(255,255,255,0.85)]"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-4 py-5 sm:px-10 sm:py-8 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-0 gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                   <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[3px_3px_6px_rgba(163,185,210,0.3),-3px_-3px_6px_rgba(255,255,255,0.8)] flex items-center justify-center transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-[15deg] shadow-inner scale-90' : 'group-hover:rotate-12'}`} style={{ color: faq.color }}>
                      <faq.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                   </div>
                   <span className={`font-nunito font-black text-sm sm:text-lg md:text-xl transition-colors duration-300 truncate ${activeIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'}`}>
                     {faq.question}
                   </span>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E8F0F8] shadow-[3px_3px_6px_rgba(163,185,210,0.3),-3px_-3px_6px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#1A7FD4] transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-180 shadow-inner' : ''}`}>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-5 pt-1 sm:px-10 sm:pb-10 sm:pt-2 flex flex-col md:flex-row gap-4 sm:gap-8 items-start">
                        <div className="w-24 sm:w-48 h-16 sm:h-32 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[inset_3px_3px_6px_rgba(163,185,210,0.25)] flex items-center justify-center overflow-hidden shrink-0">
                           <motion.img 
                             whileHover={{ scale: 1.1 }}
                             src={faq.image} 
                             alt={faq.question} 
                             className="w-full h-full object-cover"
                           />
                        </div>
                       <div className="flex-1 min-w-0">
                          <p className="font-inter text-[#4A6080] text-xs sm:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                          <Link href="/contact">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="mt-4 sm:mt-6 flex items-center gap-1.5 text-[#1A7FD4] font-nunito font-black text-xs sm:text-sm uppercase tracking-wider"
                            >
                              Contact us <span>→</span>
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
    </section>
  );
};

export default DigitalFAQ;
