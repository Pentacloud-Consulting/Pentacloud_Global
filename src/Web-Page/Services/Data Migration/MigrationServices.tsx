"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Cloud, Database, Settings, Mail, Archive, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

const MigrationServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const migrationServices = [
    {
      icon: Users,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "CRM Data Migration",
      desc: "We migrate complete CRM datasets, contacts, accounts, leads, opportunities, activities, custom objects, and all historical data, between platforms without losing relationships, lookup fields, or data hierarchy. Specialising in migrations to and from Salesforce, Zoho CRM, HubSpot, Microsoft Dynamics, and legacy in-house CRMs.",
      tags: ["Salesforce & Zoho", "HubSpot & Dynamics", "Legacy CRM"],
      metric: "100% Relationship Integrity",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute left-10 w-16 h-24 border-2 border-dashed border-[#1A7FD4]/30 rounded-xl" />
          <div className="absolute right-10 w-16 h-24 border-2 border-dashed border-[#1A7FD4]/30 rounded-xl bg-[#1A7FD4]/5" />
          <motion.div animate={{ x: [-80, 80], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="bg-white p-3 rounded-lg shadow-xl text-[#1A7FD4] relative z-10">
            <Users size={32} />
          </motion.div>
        </div>
      )
    },
    {
      icon: Cloud,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Cloud Data Migration",
      desc: "We migrate on-premise workloads, databases, and applications to cloud environments, AWS, Azure, and GCP, using a phased approach that ensures business continuity throughout. Includes lift-and-shift, re-platforming, and re-architecture migrations depending on your long-term cloud strategy.",
      tags: ["AWS, Azure, GCP", "Lift-and-Shift", "Hybrid Cloud Setup"],
      metric: "Zero-Downtime Migration",
      visual: (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <Cloud size={64} className="text-[#1A7FD4] z-10 drop-shadow-xl" />
          <div className="absolute bottom-8 flex justify-center gap-4 w-32">
             {[1, 2, 3, 4].map(i => (
               <motion.div key={i} animate={{ y: [40, -10], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="w-2 h-2 rounded-full bg-[#1A7FD4]" />
             ))}
          </div>
        </div>
      )
    },
    {
      icon: Database,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Database Migration",
      desc: "We migrate databases across engines and platforms, MySQL, PostgreSQL, Microsoft SQL Server, Oracle, MongoDB, and more, handling schema conversion, data type mapping, stored procedure migration, and post-migration validation to ensure your applications run flawlessly on the new database.",
      tags: ["MySQL to PostgreSQL", "Oracle to AWS RDS", "Schema Conversion"],
      metric: "Full Schema Integrity",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4].map(i => (
               <motion.div key={i} animate={{ y: [20, 0], opacity: [0, 1] }} transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }} className="w-24 h-6 rounded-full border-2 border-[#1A7FD4]/40 bg-[#EEF3FF] flex items-center justify-center shadow-sm">
                 <Database size={14} className="text-[#1A7FD4]/50" />
               </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: Settings,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "ERP & Business System",
      desc: "We migrate complex ERP and business system data, financial records, inventory, HR data, purchase orders, and customer master data, between platforms like SAP, Oracle ERP, Microsoft Dynamics, Tally, and cloud ERP solutions. Every migration includes a parallel-run period to validate data accuracy before full cutover.",
      tags: ["SAP, Oracle, Dynamics", "Financial Data", "Dual-Run Validation"],
      metric: "100% Financial Accuracy",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="text-[#1A7FD4] drop-shadow-xl z-10">
            <Settings size={64} />
          </motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute text-[#1A7FD4]/50 ml-16 mt-16">
            <Settings size={40} />
          </motion.div>
        </div>
      )
    },
    {
      icon: Mail,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Email & Collaboration",
      desc: "We migrate complete email environments, emails, calendars, contacts, distribution lists, shared mailboxes, and archived data, between platforms with zero message loss and minimal disruption to daily operations. Including migrations to Microsoft 365 and Google Workspace.",
      tags: ["M365 & Google Workspace", "Shared Mailboxes", "Email Archives"],
      metric: "Zero Email Loss",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center gap-6">
           <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[#1A7FD4]/30 flex items-center justify-center bg-[#1A7FD4]/5">
              <Mail size={32} className="text-[#1A7FD4]/30" />
           </div>
           <motion.div animate={{ x: [-50, 50], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute z-10">
              <Mail size={32} className="text-[#1A7FD4] drop-shadow-md" />
           </motion.div>
           <div className="w-16 h-16 rounded-xl border-2 border-[#1A7FD4]/20 flex items-center justify-center bg-[#1A7FD4]/10">
              <CheckCircle2 size={32} className="text-[#1A7FD4]" />
           </div>
        </div>
      )
    },
    {
      icon: Archive,
      color: "#1A7FD4",
      bg: "#EEF3FF",
      title: "Legacy System & File",
      desc: "We decommission legacy systems and migrate unstructured data, file shares, document management systems, SharePoint environments, and on-premise storage, to modern cloud storage platforms including SharePoint Online, AWS S3, Google Drive, and OneDrive for Business.",
      tags: ["SharePoint Online", "AWS S3 & OneDrive", "Metadata Preservation"],
      metric: "100% Metadata Preserved",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative">
            <Archive size={64} className="text-[#1A7FD4] z-20 relative drop-shadow-xl" />
            <motion.div animate={{ y: [-40, 10], opacity: [0, 1, 0], scale: [1, 0.5, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#1A7FD4]/20 rounded-md border border-[#1A7FD4]/50 z-10 flex items-center justify-center backdrop-blur-sm">
               <div className="w-4 h-1 bg-[#1A7FD4]/50 rounded-full" />
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const activeService = migrationServices[activeIndex];

  return (
    <section className="py-8 sm:py-16 relative overflow-hidden">
      <div className="text-center mb-8 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 bg-blue-50 text-[#1A7FD4] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[2px] sm:tracking-[3px] mb-4 sm:mb-6"
        >
          WHAT WE MIGRATE
        </motion.div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-nunito font-black text-[#0D1B2A] mb-4 sm:mb-6 leading-tight">
          Every Type of Data, <br/> <span className="text-[#1A7FD4]">Every Platform</span>
        </h2>
        <p className="text-[#4A6080] max-w-2xl mx-auto font-inter text-xs sm:text-base md:text-lg leading-relaxed px-2">
          From legacy on-premise systems to modern cloud platforms, we migrate any data, from anywhere, to anywhere, with complete integrity.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* The Horizontal Ribbon (Navigation) */}
        <div className="bg-background/80 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl sm:rounded-4xl shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,0.95)] border border-white/50 flex justify-start sm:justify-center items-center overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 sm:gap-4 min-w-max px-2 sm:px-4">
            {migrationServices.map((service, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ y: -3 }}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'shadow-[5px_5px_10px_rgba(163,185,210,0.4),-5px_-5px_10px_rgba(255,255,255,0.8)] scale-105' 
                      : 'hover:bg-slate-50'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? service.bg : 'transparent',
                    color: isActive ? service.color : '#94A3B8'
                  }}
                >
                  <service.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  {isActive && (
                    <motion.div
                      layoutId="activeGlowMigration"
                      className="absolute inset-0 rounded-xl sm:rounded-2xl border-2"
                      style={{ borderColor: service.color, boxShadow: `0 0 20px ${service.color}40` }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* The Central Stage (Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 min-h-90 sm:min-h-112.5">
          
          {/* Left: Content Card */}
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-background rounded-2xl sm:rounded-[40px] p-5 sm:p-12 shadow-[20px_20px_40px_rgba(163,185,210,0.5),-20px_-20px_40px_rgba(255,255,255,0.95)] border border-white/50 relative overflow-hidden flex flex-col justify-center"
          >
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: activeService.color }}
            />

            <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                style={{ backgroundColor: activeService.bg, color: activeService.color }}
              >
                <activeService.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h3 className="font-nunito font-black text-lg sm:text-[32px] text-[#0D1B2A] leading-tight truncate">
                  {activeService.title}
                </h3>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider mt-1 truncate"
                  style={{ backgroundColor: activeService.bg, color: activeService.color }}
                >
                  {activeService.metric}
                </div>
              </div>
            </div>

            <p className="font-inter text-xs sm:text-[18px] md:text-[22px] text-[#4A6080] leading-relaxed mb-6 sm:mb-12 max-w-2xl">
              {activeService.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 sm:mb-12">
              {activeService.tags.map((tag, j) => (
                <span 
                  key={j} 
                  className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] sm:text-[12px] font-bold text-slate-500 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeService.color }} />
                  {tag}
                </span>
              ))}
            </div>


          </motion.div>

          {/* Right: Visual Stage */}
          <motion.div
            key={`visual-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-background rounded-2xl sm:rounded-[40px] border border-white/50 shadow-[inset_10px_10px_20px_rgba(163,185,210,0.3),inset_-10px_-10px_20px_rgba(255,255,255,0.8)] relative overflow-hidden perspective-1000 hidden lg:flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="w-full h-full relative flex items-center justify-center">
              {activeService.visual}
            </div>
            
            {/* Status bar */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40">
              <div className="flex gap-1">
                 {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Integrity Validated</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MigrationServices;
