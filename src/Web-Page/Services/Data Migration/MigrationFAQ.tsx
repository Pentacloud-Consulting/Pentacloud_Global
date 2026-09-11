"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Database, Shield, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)]";

const migrationStats = [
  { val: "10M+", label: "Records", sub: "Integrity Verified", icon: Database, color: "#1A7FD4" },
  { val: "100%", label: "Success", sub: "Zero Data Loss", icon: Shield, color: "#34C98A" },
  { val: "100+", label: "Projects", sub: "Across Platforms", icon: Zap, color: "#F59E0B" },
  { val: "30", label: "Days", sub: "Post-Live Support", icon: RefreshCw, color: "#8B5CF6" }
];

const MigrationFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do you guarantee zero data loss?",
      a: "Our zero data loss guarantee is backed by three layers of protection: complete verified backups, sandbox test migrations for mapping validation, and post-migration reconciliation reports that mathematically prove completeness.",
      image: "/Images/Data Migration Images/data migration-question-1.webp"
    },
    {
      q: "How long does a data migration take?",
      a: "Timeline depends on complexity. Standard CRM migrations typically take 3–5 weeks. High-volume enterprise ERP or database moves with complex transformation requirements range from 6–12 weeks.",
      image: "/Images/Data Migration Images/data migration-question-2.webp"
    },
    {
      q: "Will there be any downtime during migration?",
      a: "For most migrations, we achieve zero downtime using delta migration techniques. For migrations requiring a cutover window, we plan this during off-peak hours, typically requiring only 2–4 hours.",
      image: "/Images/Data Migration Images/data migration-question-3.webp"
    },
    {
      q: "Can you migrate from any CRM to Salesforce?",
      a: "Yes, we have migrated data from virtually every major platform including HubSpot, Microsoft Dynamics, Zoho CRM, Pipedrive, and even legacy in-house databases or Excel-based contact lists.",
      image: "/Images/Data Migration Images/data migration-question-4.webp"
    },
    {
      q: "What happens if something goes wrong?",
      a: "Our methodology includes rollback capability at every stage. We can restore full operational status within minutes. No migration is signed off until your team has verified data accuracy in production.",
      image: "/Images/Data Migration Images/data migration-question-5.webp"
    }
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#E8F0F8] px-4 sm:px-6 rounded-[48px]">
      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="text-center mb-10 sm:mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4"
          >
            MIGRATION RECORD
          </motion.div>
          <h2 className="text-2xl sm:text-[36px] md:text-[44px] font-nunito font-black text-[#0D1B2A] leading-tight">
            Numbers That Prove <span className="text-[#1A7FD4]">Our Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {migrationStats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/40 backdrop-blur-sm rounded-[32px] p-6 border border-white/60 shadow-[10px_10px_25px_rgba(163,185,210,0.1)] text-center group transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ color: stat.color }}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <p className="text-2xl sm:text-4xl font-nunito font-black text-[#1A7FD4] mb-1 leading-none">{stat.val}</p>
              <p className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className="text-[10px] text-[#4A6080]/60 font-bold uppercase tracking-tighter">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-[800px] mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <div className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.85)] text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-3 sm:mb-4 w-fit mx-auto px-4 py-1.5 rounded-full">COMMON QUESTIONS</div>
          <h2 className="font-nunito font-extrabold text-2xl sm:text-[36px] text-[#0D1B2A] leading-tight">
            Data Migration, <br className="sm:hidden" /> Answered Honestly
          </h2>
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
      </section>
    </div>
  );
};

export default MigrationFAQ;
