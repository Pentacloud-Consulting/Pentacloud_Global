"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const AppDevelopQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: "How long does it take to build an app?", 
      a: "An MVP app typically takes 6–8 weeks for a single platform. A full cross-platform app with backend takes 10–14 weeks. Enterprise apps with complex integrations take 16–24 weeks. We share a detailed milestone timeline in your project proposal.",
      image: "/Images/App Devlopment Images/AppDevelopment-Question-1.webp"
    },
    { 
      q: "Do you build for both iOS and Android?", 
      a: "Yes, we build for both simultaneously using React Native, which shares ~90% of the codebase between platforms. This means significantly lower cost and faster delivery than building two separate native apps.",
      image: "/Images/App Devlopment Images/AppDevelopment-Question-2.webp"
    },
    { 
      q: "Do you handle App Store submission?", 
      a: "Absolutely, App Store and Play Store submission is included in every project. We handle developer account setup, app screenshots, metadata writing, content ratings, and the review process.",
      image: "/Images/App Devlopment Images/AppDevelopment-Question-3.webp"
    },
    { 
      q: "Can you integrate my app with Salesforce?", 
      a: "Yes, as a certified Salesforce partner, we specialise in building mobile apps that connect directly to Salesforce. Whether it's a custom field service app, a client portal, or a sales enablement tool.",
      image: "/Images/App Devlopment Images/AppDevelopment-Question-4.webp"
    },
    { 
      q: "What support do you provide after launch?", 
      a: "Every app project includes 30-day post-launch support covering crash monitoring, bug fixes, and App Store update submissions. We then offer monthly maintenance retainers.",
      image: "/Images/App Devlopment Images/AppDevelopment-Question-5.webp"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-background px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <div className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-3 sm:mb-4 w-fit mx-auto px-4 py-1.5 rounded-full">COMMON QUESTIONS</div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[36px] text-[#0D1B2A] leading-tight">
            App Development, <br className="sm:hidden" /> Answered Honestly
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
                               <Link href="/contact" className="text-[#1A7FD4] font-nunito font-bold text-xs mt-3 flex items-center gap-1.5 hover:gap-2 transition-all group/btn w-fit">
                                 Contact us <ArrowRight size={14} className="transition-transform" />
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
                               <Link href="/contact" className="text-[#1A7FD4] font-nunito font-bold text-xs mt-3 flex items-center gap-1.5 hover:gap-2 transition-all group/btn w-fit">
                                 Contact us <ArrowRight size={14} className="transition-transform" />
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
      <style dangerouslySetInnerHTML={{__html: `
        .skeleton {
          background: linear-gradient(90deg, #EEF3FF 25%, #E0F7FF 50%, #EEF3FF 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 2s infinite;
          border-radius: 4px;
        }
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
      `}} />
    </section>
  );
};

export default AppDevelopQuestions;
