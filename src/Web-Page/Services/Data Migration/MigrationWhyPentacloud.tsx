"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Zap, Clock, FileText, Lock, Users, RefreshCw } from "lucide-react";

const differentiators = [
  { title: "Zero-Loss Record", icon: CheckCircle2, color: "#1A7FD4", body: "100% data integrity maintained across 100+ successful enterprise migrations." },
  { title: "Full Rollback Safety", icon: RefreshCw, color: "#34C98A", body: "Complete verified backups before every move, ensuring zero-risk restoration capability." },
  { title: "Certified Experts", icon: ShieldCheck, color: "#8B5CF6", body: "Salesforce certified specialists who deeply understand metadata and complex relationships." },
  { title: "Strict Compliance", icon: Lock, color: "#EC4899", body: "GDPR, HIPAA, and ISO 27001 compliant methodologies with full audit trail documentation." },
  { title: "Parallel Validation", icon: Users, color: "#F59E0B", body: "Dual-run testing catches discrepancies before go-live, eliminating post-migration surprises." },
  { title: "Zero Downtime", icon: Zap, icon2: Clock, color: "#1A7FD4", body: "Phased delta migrations ensure continuous business operations during the cutover." },
  { title: "Complete Docs", icon: FileText, color: "#29C6E0", body: "Full mapping specs, transformation rules, and reconciliation reports for your records." },
  { title: "30-Day Support", icon: CheckCircle2, color: "#34C98A", body: "Ongoing assistance post-migration to investigation discrepancies and handle corrections." }
];

const MigrationWhyPentacloud = () => {
  return (
    <section className="py-8 sm:py-12 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-20 items-center">
        
        {/* Visual Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-[48px] overflow-hidden shadow-[20px_20px_60px_rgba(163,185,210,0.3)] group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
             <img 
               src="/Images/Data Migration Images/data migration-why.webp" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               alt="Secure Data" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 via-transparent to-transparent" />
             
             {/* Dynamic Badge */}
             <div className="absolute bottom-8 left-8 right-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-xl">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1A7FD4]">
                      <ShieldCheck size={28} strokeWidth={2.5} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-[#0D1B2A] uppercase tracking-wider mb-0.5">100% Secure</p>
                      <p className="text-[11px] font-bold text-[#4A6080]/80 uppercase tracking-tighter">Zero Data Loss Guarantee</p>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Content Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4 w-fit"
          >
            WHY PENTACLOUD
          </motion.div>
          <h2 className="text-2xl sm:text-[40px] md:text-[48px] font-nunito font-black text-[#0D1B2A] mb-8 leading-[1.1]">
            Expertise You <span className="text-[#1A7FD4]">Can Trust</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {differentiators.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex gap-4"
              >
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1A7FD4] shrink-0 group-hover:scale-150 transition-transform" />
                <div className="min-w-0">
                  <h4 className="font-nunito font-black text-sm text-[#0D1B2A] mb-1.5 group-hover:text-[#1A7FD4] transition-colors leading-tight uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[12.5px] text-[#4A6080] font-inter leading-relaxed font-medium">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MigrationWhyPentacloud;
