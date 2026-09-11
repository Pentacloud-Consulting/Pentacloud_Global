"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="py-16 sm:py-24 bg-background px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-4 w-fit mx-auto px-4 py-1.5 rounded-full"
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

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`transition-all duration-500 overflow-hidden ${openIndex === i ? `${CLAY_CARD}` : 'bg-background hover:bg-background rounded-2xl sm:rounded-[32px] shadow-[4px_4px_10px_rgba(163,185,210,0.15),-4px_-4px_10px_rgba(255,255,255,0.8)]'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left p-4 sm:p-6 group gap-3"
              >
                <span className={`font-nunito font-bold text-sm sm:text-[17px] transition-colors leading-tight ${openIndex === i ? 'text-[#1A7FD4]' : 'text-[#0D1B2A] group-hover:text-[#1A7FD4]'}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === i ? 'bg-background text-[#1A7FD4] shadow-[inset_2px_2px_5px_rgba(163,185,210,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]' : 'bg-background text-[#1A7FD4] shadow-[2px_2px_5px_rgba(163,185,210,0.4),-2px_-2px_5px_rgba(255,255,255,0.8)]'}`}>
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
                    <div className="px-4 pb-6 sm:px-6 sm:pb-8">
                      <div className="h-px w-full bg-[#1A7FD4]/05 mb-4 sm:mb-6" />
                      <div className="flex flex-col md:flex-row gap-5 sm:gap-8">
                        <div className="w-full md:w-[260px] aspect-video md:aspect-[4/3] rounded-xl sm:rounded-[20px] bg-[#EEF3FF] overflow-hidden shrink-0 shadow-inner">
                           <motion.img 
                             whileHover={{ scale: 1.05 }}
                             src={faq.image} 
                             alt={faq.q} 
                             className="w-full h-full object-cover"
                           />
                         </div>
                         
                         <div className="flex flex-col justify-center min-w-0">
                           <p className="font-inter text-xs sm:text-[15px] text-[#4A6080] leading-relaxed">
                             {faq.a}
                           </p>
                         </div>
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

export default ContactFAQ;
