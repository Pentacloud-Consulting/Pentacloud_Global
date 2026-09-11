"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Star, LayoutDashboard, Globe, MessageCircle, Heart, GraduationCap, Award, Users } from "lucide-react";

const differentiators = [
  { title: "Expert Led", icon: Award, color: "#1A7FD4", body: "Certified practitioners who build and scale implementations daily." },
  { title: "Active Certs", icon: ShieldCheck, color: "#34C98A", body: "35+ active certifications across Salesforce and major Cloud platforms." },
  { title: "Vendor Neutral", icon: Globe, color: "#8B5CF6", body: "Independent, honest advice driven strictly by your business goals." },
  { title: "Personalised", icon: Star, color: "#EC4899", body: "Training and strategy tailored using your actual system configurations." },
  { title: "Full Support", icon: Zap, color: "#F59E0B", body: "One partner covering everything from roadmap design to post-live training." },
  { title: "Global Scale", icon: Users, color: "#1A7FD4", body: "Deep cultural and regulatory expertise across India and Middle East markets." },
  { title: "Flexible", icon: MessageCircle, color: "#8B5CF6", body: "Programmes scheduled to minimise operational disruption to your business." },
  { title: "ROI Focused", icon: GraduationCap, color: "#34C98A", body: "Every engagement starts with defined outcomes and adoption targets." }
];

const ConsultingWhyPentacloud = () => {
  return (
    <section className="py-8 sm:py-12 relative overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-10 lg:gap-16 items-center">
        
        {/* Visual Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-[40px] overflow-hidden shadow-[20px_20px_60px_rgba(163,185,210,0.2)] group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
             <img 
               src="/Images/CONSULTING & TRAINING Images/CONSULTING & TRAINING-why-2.webp" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               alt="Expert Consulting" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/50 via-transparent to-transparent" />
             
             <div className="absolute bottom-6 left-6 right-6 bg-white/40 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-xl">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1A7FD4]">
                      <Award size={22} strokeWidth={2.5} />
                   </div>
                   <div>
                      <p className="text-xs font-black text-[#0D1B2A] uppercase tracking-wider">Practitioner Led</p>
                      <p className="text-[10px] font-bold text-[#4A6080]/80 uppercase">Experience You Can Trust</p>
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
          <h2 className="text-2xl sm:text-[36px] md:text-[44px] font-nunito font-black text-[#0D1B2A] mb-8 leading-[1.1]">
            Expertise That <span className="text-[#1A7FD4]">Empowers Growth</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {differentiators.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex gap-3"
              >
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1A7FD4] shrink-0 group-hover:scale-150 transition-transform" />
                <div className="min-w-0">
                  <h4 className="font-nunito font-black text-[13px] text-[#0D1B2A] mb-1 group-hover:text-[#1A7FD4] transition-colors uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#4A6080] font-inter leading-relaxed font-medium">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingWhyPentacloud;
