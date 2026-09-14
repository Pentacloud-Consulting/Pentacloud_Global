"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How soon can you start my project?",
      a: "We typically have a 2–3 week lead time for new implementations. This allows us to ensure the right certified experts are allocated to your project. For urgent support issues, our managed services team can often begin within 48 hours.",
      image: "/Images/Contactpage/Contact Q-1.webp"
    },
    {
      q: "Do you work with startups and small businesses?",
      a: "Absolutely. While we handle enterprise-scale migrations and implementations, we have dedicated packages designed specifically for startups and growing businesses who need a solid technology foundation to scale.",
      image: "/Images/Contactpage/Contact Q-2.webp"
    },
    {
      q: "What are your engagement models?",
      a: "We offer three flexible models: Fixed-Price Projects (best for clearly defined implementations), Monthly Retainers (ideal for ongoing support and evolution), and Time & Materials (for flexible consulting engagements).",
      image: "/Images/Contactpage/Contact Q-3.webp"
    },
    {
      q: "Are you a certified Salesforce and Zoho partner?",
      a: "Yes, Pentacloud is an official partner with over 35+ active certifications. This means our work is validated by the vendors themselves and we have direct access to priority support and roadmap insights.",
      image: "/Images/Contactpage/Contact Q-4.webp"
    },
    {
      q: "Do you provide on-site consulting and training?",
      a: "Yes, we provide on-site services across India and the UAE. We also deliver virtual consulting and training globally, ensuring your team gets high-quality support regardless of their location.",
      image: "/Images/Contactpage/Contact Q-5.webp"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-background px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-3 sm:mb-4 w-fit mx-auto px-4 py-1.5 rounded-full"
          >
            COMMON QUESTIONS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-tight"
          >
            Contact Pentacloud, <br className="sm:hidden" />
            <span className="text-[#1A7FD4]">Answered Honestly</span>
          </motion.h2>
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
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`transition-all duration-500 overflow-hidden ${openIndex === i ? `${CLAY_CARD}` : 'bg-background hover:bg-background rounded-2xl sm:rounded-3xl shadow-[4px_4px_10px_rgba(163,185,210,0.15),-4px_-4px_10px_rgba(255,255,255,0.8)]'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center text-left p-4 sm:p-6 group gap-3 min-w-0"
                  >
                    <span className={`font-nunito font-bold text-sm sm:text-base leading-snug transition-colors break-words pr-2 ${openIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A] group-hover:text-[#1A7FD4]'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === i ? 'bg-background text-[#1A7FD4] shadow-[inset_2px_2px_5px_rgba(163,185,210,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]' : 'bg-background text-[#1A7FD4] shadow-[2px_2px_5px_rgba(163,185,210,0.4),-2px_-2px_5px_rgba(255,255,255,0.8)]'}`}>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 flex flex-col gap-4 items-start">
                            {faq.image && (
                              <div className="w-full h-36 rounded-xl sm:rounded-2xl bg-[#EEF3FF] overflow-hidden shrink-0 shadow-inner">
                                 <motion.img 
                                   whileHover={{ scale: 1.05 }}
                                   src={faq.image} 
                                   alt={faq.q} 
                                   className="w-full h-full object-cover"
                                 />
                               </div>
                            )}
                             
                             <div className="flex flex-col justify-center min-w-0">
                               <p className="font-inter text-xs sm:text-sm text-[#4A6080] leading-relaxed">
                                 {faq.a}
                               </p>
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
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`transition-all duration-500 overflow-hidden ${openIndex === i ? `${CLAY_CARD}` : 'bg-background hover:bg-background rounded-2xl sm:rounded-3xl shadow-[4px_4px_10px_rgba(163,185,210,0.15),-4px_-4px_10px_rgba(255,255,255,0.8)]'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center text-left p-4 sm:p-6 group gap-3 min-w-0"
                  >
                    <span className={`font-nunito font-bold text-sm sm:text-base leading-snug transition-colors break-words pr-2 ${openIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A] group-hover:text-[#1A7FD4]'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === i ? 'bg-background text-[#1A7FD4] shadow-[inset_2px_2px_5px_rgba(163,185,210,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]' : 'bg-background text-[#1A7FD4] shadow-[2px_2px_5px_rgba(163,185,210,0.4),-2px_-2px_5px_rgba(255,255,255,0.8)]'}`}>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 flex flex-col gap-4 items-start">
                            {faq.image && (
                              <div className="w-full h-36 rounded-xl sm:rounded-2xl bg-[#EEF3FF] overflow-hidden shrink-0 shadow-inner">
                                 <motion.img 
                                   whileHover={{ scale: 1.05 }}
                                   src={faq.image} 
                                   alt={faq.q} 
                                   className="w-full h-full object-cover"
                                 />
                               </div>
                            )}
                             
                             <div className="flex flex-col justify-center min-w-0">
                               <p className="font-inter text-xs sm:text-sm text-[#4A6080] leading-relaxed">
                                 {faq.a}
                               </p>
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

export default ContactFAQ;
