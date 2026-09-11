"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const ConsultingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do you customise training for our org?",
      a: "We use your actual sandbox or production environment, including your custom fields and workflows, making the training immediately applicable to your team's daily tasks.",
      image: "/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-question-1.webp"
    },
    {
      q: "What is your consulting methodology?",
      a: "We follow a 4-step process: Discovery, Deep Assessment, Strategic Recommendation, and Implementation Support, ensuring advice is grounded in your specific reality.",
      image: "/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-question-2.webp"
    },
    {
      q: "Do you offer post-training support?",
      a: "Yes, every programme includes 30 days of follow-up support to answer questions that arise as your team begins applying their new skills in real scenarios.",
      image: "/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-question-3.webp"
    },
    {
      q: "Are your consultants certified?",
      a: "Every member of our team holds multiple active certifications across Salesforce, Cloud platforms, and cybersecurity, maintained through regular vendor-validated exams.",
      image: "/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-question-4.webp"
    },
    {
      q: "Can you train teams across different timezones?",
      a: "Absolutely. We offer flexible scheduling for virtual instructor-led sessions to accommodate teams in India, the UAE, Europe, and North America with minimal disruption.",
      image: "/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-question-5.webp"
    }
  ];

  return (
    <section className="pt-0 sm:pt-4 pb-8 sm:pb-12 bg-background px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10 sm:mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-tight"
          >
            Common <span className="text-[#1A7FD4]">Questions</span>
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
                           <Link href="/contact" className="text-[#1A7FD4] font-nunito font-bold text-xs sm:text-[14px] mt-4 sm:mt-6 flex items-center gap-2 hover:gap-3 transition-all group/btn w-fit">
                             Contact us <ArrowRight size={14} className="transition-transform" />
                           </Link>
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

export default ConsultingFAQ;
