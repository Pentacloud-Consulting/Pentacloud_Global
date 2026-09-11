"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Layout, Smartphone, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";

const WebDevelopQuestions = () => {
  const faqs = [
    { 
      question: "How long does a website take to build?", 
      answer: "For a standard business website (5–15 pages), our timeline is typically 5–7 weeks. eCommerce and custom web applications take 8–16 weeks depending on complexity.",
      icon: Layout,
      color: "#1A7FD4",
      image: "/Images/Web Development images/WebDevelopment-Question-1.webp"
    },
    { 
      question: "Do you build on WordPress or custom code?", 
      answer: "Both, we recommend the right approach for your needs. We use WordPress/Webflow for content-heavy sites and Next.js/React for performance-critical applications.",
      icon: Code2,
      color: "#34C98A",
      image: "/Images/Web Development images/WebDevelopment-Question-2.webp"
    },
    { 
      question: "Will my website be mobile-friendly?", 
      answer: "Absolutely, every website we build is mobile-first by default. We test across 20+ screen sizes and aim for 100/100 Mobile scores.",
      icon: Smartphone,
      color: "#F59E0B",
      image: "/Images/Web Development images/WebDevelopment-Question-3.webp"
    },
    { 
      question: "How do you handle website security?", 
      answer: "Security is built-in, not bolted on. We implement SSL, firewall protection, automated backups, and follow OWASP security standards for every project.",
      icon: ShieldCheck,
      color: "#8B5CF6",
      image: "/Images/Web Development images/WebDevelopment-Question-4.webp"
    },
    { 
      question: "Do you provide hosting and maintenance?", 
      answer: "Yes, we offer high-performance cloud hosting and managed maintenance packages so you can focus on your business while we handle the tech.",
      icon: Globe,
      color: "#1A7FD4",
      image: "/Images/Web Development images/WebDevelopment-Question-5.webp"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 sm:px-6 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-3 sm:mb-6 inline-block"
          >
            COMMON QUESTIONS
          </motion.div>
          <h2 className="text-2xl sm:text-[42px] font-nunito font-black text-[#0D1B2A] leading-tight">
            Web Development, <br className="sm:hidden" /> Answered Honestly
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-[#E8F0F8] rounded-2xl sm:rounded-[32px] overflow-hidden transition-all duration-500 ${
                activeIndex === i 
                ? "shadow-[inset_6px_6px_12px_rgba(163,185,210,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]" 
                : "shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-4 sm:px-10 sm:py-8 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-0 gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                   <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-[15deg] shadow-inner scale-90' : 'group-hover:rotate-12'}`} style={{ color: faq.color }}>
                      <faq.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                   </div>
                   <span className={`font-nunito font-black text-sm sm:text-lg md:text-xl transition-colors duration-300 truncate ${activeIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A]'}`}>
                     {faq.question}
                   </span>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1A7FD4] transition-all duration-500 shrink-0 ${activeIndex === i ? 'rotate-180 shadow-inner' : ''}`}>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
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
                    <div className="px-4 pb-6 pt-1 sm:px-10 sm:pb-10 sm:pt-2 flex flex-col md:flex-row gap-5 sm:gap-8 items-start">
                       <div className="w-full md:w-48 h-32 rounded-xl sm:rounded-2xl bg-[#E8F0F8] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.3)] flex items-center justify-center overflow-hidden shrink-0 aspect-video md:aspect-auto">
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            src={faq.image} 
                            alt={faq.question} 
                            className="w-full h-full object-cover"
                          />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="font-inter text-[#4A6080] text-xs sm:text-[16px] leading-relaxed">
                            {faq.answer}
                          </p>
                          <Link href="/contact">
                            <motion.div
                              whileHover={{ x: 3 }}
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

export default WebDevelopQuestions;
