"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Sliders, GitMerge, Database, 
  GraduationCap, Headphones, CheckCircle2,
  Plus, Minus
} from "lucide-react";
import { CLAY_CARD, NEUMORPHIC_BUTTON, CLAY_ICON } from "./Constants";

const services = [
  {
    icon: <Settings />,
    title: "Zoho Implementation",
    body: "Complete end-to-end Zoho implementation, from requirements gathering and solution design to configuration, data migration, testing, and go-live.",
    included: ["Business requirements analysis", "Solution architecture design", "App configuration & customisation", "Data migration from legacy systems", "Integration with existing tools", "User acceptance testing (UAT)", "Go-live support", "30-day post-implementation support"],
    ideal: "New Zoho customers, Businesses replacing legacy CRM/ERP"
  },
  {
    icon: <Sliders />,
    title: "Customisation & Optimisation",
    body: "Is your existing Zoho underperforming? We audit your current Zoho setup, identify gaps and inefficiencies, and rebuild workflows and automation.",
    included: ["Full Zoho org audit", "Custom module development", "Workflow automation rebuild", "Custom function (Deluge) scripting", "Reports & dashboard creation", "Blueprint & approval process setup", "Performance optimisation"],
    ideal: "Existing Zoho users not getting full value, Teams with manual workarounds"
  },
  {
    icon: <GitMerge />,
    title: "Zoho Integration Services",
    body: "We connect your Zoho ecosystem to the rest of your technology stack, accounting software, eCommerce platforms, and custom in-house systems.",
    included: ["Zoho CRM ↔ Xero / Salesforce", "Zoho Books ↔ Shopify", "Zoho CRM ↔ WhatsApp Business", "Zoho ↔ Google / Microsoft 365", "Zoho Flow automation builds", "Webhook & REST API integration"],
    ideal: "Omni-channel businesses, Enterprise stacks"
  },
  {
    icon: <Database />,
    title: "Zoho Data Migration",
    body: "We migrate your existing business data into Zoho, contacts, deals, invoices, and historical records, from any source system with full data integrity.",
    included: ["Salesforce & HubSpot migration", "Microsoft Dynamics migration", "Tally / Tally Prime migration", "QuickBooks migration", "Excel / Google Sheets migration", "Legacy in-house CRM migration"],
    ideal: "Companies switching to Zoho"
  },
  {
    icon: <GraduationCap />,
    title: "Zoho Training Programmes",
    body: "Comprehensive Zoho training designed for every role, sales, finance, HR, and administrators, delivered on your actual Zoho environment.",
    included: ["Zoho CRM, Sales & Admin", "Zoho Books, Finance Team", "Zoho One, Admin & IT", "Zoho Campaigns & Desk training", "On-site or virtual delivery", "Certificate of completion"],
    ideal: "New teams, Organisations upskilling staff"
  },
  {
    icon: <Headphones />,
    title: "Ongoing Zoho Support",
    body: "Pentacloud is a certified Zoho Partner delivering end-to-end consulting, implementation, integration, and training services that help businesses across India and the UAE maximize their Zoho investment and scale smarter.",
    included: ["Monthly support retainers", "4hr, 8hr, or 16hr plans", "48hr response SLA", "Zoho update management", "Quarterly optimisation reviews", "Dedicated account manager"],
    ideal: "Growing SMBs, Enterprise departments"
  }
];

const ServiceCard = ({ service, index }: { service: (typeof services)[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.05,
        layout: { type: "spring", stiffness: 100, damping: 20 }
      }}
      className={`${CLAY_CARD} relative overflow-hidden group flex flex-col h-[350px] sm:h-[430px] w-full transition-shadow duration-500 hover:shadow-2xl rounded-[20px] sm:rounded-[32px]`}
    >
      {/* User's idea: Colored top border */}
      <motion.div 
        layout
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[4px] sm:h-[6px] bg-[#1A7FD4] rounded-b-xl opacity-80"
        animate={{ width: isExpanded ? "100%" : "60%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      <div className="p-5 sm:p-8 flex flex-col h-full relative z-10 min-w-0">
        {/* Header Section: Icon & Title */}
        <motion.div 
          layout
          className={`flex ${isExpanded ? "flex-row items-center gap-3 mb-3 sm:mb-4" : "flex-col items-center text-center mb-2 sm:mb-4"}`}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.div 
            layout
            className={`${isExpanded ? "w-10 h-10" : "w-14 h-14 sm:w-20 sm:h-20"} ${CLAY_ICON} text-[#1A7FD4] flex items-center justify-center group-hover:rotate-3 transition-all duration-500 shrink-0 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:sm:w-9 [&_svg]:sm:h-9`}
          >
            {service.icon}
          </motion.div>
          <motion.h3 
            layout
            className={`font-nunito font-black text-[#0D1B2A] leading-tight transition-all duration-500 min-w-0 ${isExpanded ? "text-base text-left" : "text-lg sm:text-2xl mb-1 sm:mb-2"}`}
          >
            {service.title}
          </motion.h3>
        </motion.div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col relative overflow-hidden min-w-0 w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="compact"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center h-full min-w-0 w-full pt-2 sm:pt-4"
              >
                <p className="text-xs sm:text-sm text-[#4A6080] font-inter font-medium leading-relaxed max-w-[260px] mb-4 line-clamp-5 sm:line-clamp-none">
                  {service.body}
                </p>
                <button
                  onClick={() => setIsExpanded(true)}
                  className={`${NEUMORPHIC_BUTTON} px-5 py-2.5 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black text-[#1A7FD4] uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all duration-300 cursor-pointer mt-auto mb-2`}
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={3} />
                  <span>View Details</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col h-full min-w-0 w-full"
              >
                <div className="flex-grow overflow-y-auto pr-1.5 custom-scrollbar min-w-0">
                   <p className="text-[8.5px] sm:text-[10px] font-black text-[#1A7FD4] uppercase tracking-wider mb-3">WHAT'S INCLUDED:</p>
                   <div className="grid grid-cols-1 gap-2 mb-4 sm:gap-3 sm:mb-6">
                     {service.included.slice(0, 8).map((item, idx) => (
                       <motion.div 
                         key={idx} 
                         initial={{ opacity: 0, x: 10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: idx * 0.03 }}
                         className="flex items-start gap-2 min-w-0"
                       >
                         <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#34C98A] mt-0.5 shrink-0" />
                         <span className="text-[9.5px] sm:text-[11px] font-bold text-[#4A6080] leading-tight truncate">{item}</span>
                       </motion.div>
                     ))}
                   </div>

                   <div className="p-3 bg-slate-50/80 rounded-lg sm:rounded-xl border border-slate-100 mb-4 sm:mb-6 min-w-0">
                     <p className="text-[7.5px] sm:text-[9px] font-black text-[#1A7FD4] uppercase tracking-wider mb-0.5 sm:mb-1">IDEAL FOR:</p>
                     <p className="text-[9px] sm:text-[10px] font-bold text-[#0D1B2A] leading-relaxed truncate">{service.ideal}</p>
                   </div>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full py-3 text-[8.5px] sm:text-[10px] font-black text-[#4A6080] uppercase tracking-[2px] sm:tracking-[3px] flex items-center justify-center gap-1.5 hover:text-[#1A7FD4] transition-all duration-300 border-t border-slate-50 mt-3 sm:mt-4 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={3} />
                  <span>Back to Summary</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const ZohoOurServices = () => {
  return (
    <section className="py-10 px-4 sm:px-6 bg-[#E8F0F8] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-blue-50 text-[#1A7FD4] rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-[3px] mb-4 sm:mb-6"
          >
            HOW WE HELP
          </motion.div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-nunito font-black text-[#0D1B2A] leading-tight mb-4 sm:mb-6">
            Complete Zoho Services <br/> <span className="text-[#1A7FD4]">From Setup to Scale</span>
          </h2>
          <p className="text-[#4A6080] font-inter text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just install Zoho. We configure it, integrate it, train your team on it, and support it, ensuring your investment delivers maximum ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 items-start">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZohoOurServices;
