"use client";

import React from "react";
import { motion } from "framer-motion";

const SalesforcePartners = () => {
  const partners = [
    { name: "Salesforce", src: "/Partners/Salesforce.svg" },
    { name: "Zoho", src: "/Partners/Zoho.svg" },
    { name: "Xero", src: "/Partners/Xero.svg" },
    { name: "Meta", src: "/Partners/Meta.svg" }
  ];

  return (
    <div className="py-6 sm:py-8 bg-white px-4 sm:px-6 border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-0">
          <div className="text-[9px] sm:text-[11px] font-nunito font-bold text-[#1A7FD4] tracking-[3px] uppercase mb-6 sm:mb-12 leading-none">OFFICIAL TECHNOLOGY PARTNERS</div>
          <div className="relative overflow-hidden py-4 sm:py-8">
            <div className="absolute inset-y-0 left-0 w-12 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-10 sm:gap-20 items-center w-max"
            >
              {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
                <div key={i} className="flex items-center justify-center transition-all duration-500 shrink-0">
                  <img 
                    src={p.src} 
                    alt={p.name} 
                    className="h-10 sm:h-16 w-auto object-contain max-w-[120px] sm:max-w-[200px]"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesforcePartners;
