"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Globe2, Share2, Copy, Check, Loader2, X } from "lucide-react";
import { CLAY_CARD } from "./Constants";
import ContactPhone from "@/Component/ContactPhone";
import { getDomainConfig } from "@/Web-Page/Blogs/Dynamic Change Blog";

const locations = [
  {
    label: "India Office",
    address: "Jagan Arcade, 4th Floor, 1st Main Road, Anandnagar, RT Nagar, Bengaluru, 560032, Karnataka, India",
    phone: "+91 8147897286",
    iconColor: "text-[#1A7FD4]",
    lat: 13.02384,
    lon: 77.58948,
    zoom: 17,
    mapQuery: "13.02384,77.58948"
  },
  {
    label: "UAE Presence",
    address: "Office No. 84, Owner Adel Mohammed Ali, Al Quoz 1, Al Quoz 1, Dubai, 0000, Dubai",
    phone: "+971 545 132 807",
    iconColor: "text-[#34C98A]",
    lat: 25.1480,
    lon: 55.2250,
    zoom: 16,
    mapQuery: "25.1480,55.2250"
  },
  {
    label: "Qatar Presence",
    address: "Building 16, Zone 69, Street 169, Lusail Boulevard (next to Downtown Lusail Tram Station), Doha, Qatar",
    phone: "+974 7200 7930",
    iconColor: "text-[#F59E0B]",
    lat: 25.41655,
    lon: 51.50109,
    zoom: 17,
    mapQuery: "25.41655,51.50109"
  }
];

const ContactLocations = () => {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLocationClick = (idx: number) => {
    if (activeLocation === idx) {
      setActiveLocation(null);
      return;
    }
    
    setActiveLocation(idx);
    setIsLoadingMap(true);
    setCopied(false);
  };

  const handleShare = () => {
    if (activeLocation !== null) {
      const loc = locations[activeLocation];
      const textToCopy = `${loc.label}\n${loc.address}\nPhone: ${loc.phone}\nGoogle Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-0 px-0 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-4">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleLocationClick(idx)}
              className={`${CLAY_CARD} border border-slate-200/80 p-5 sm:p-6 flex flex-col items-start cursor-pointer transition-all duration-300 rounded-[24px] sm:rounded-[28px] ${
                activeLocation === idx ? "ring-2 ring-[#1A7FD4] shadow-[0_10px_30px_rgba(26,127,212,0.15)] -translate-y-2" : "hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-background shadow-[inset_1.5px_1.5px_4px_rgba(163,185,210,0.25),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.7)] flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                <Globe2 className={`${loc.iconColor} w-4.5 h-4.5 sm:w-5 sm:h-5`} />
              </div>
              
              <h4 className="font-nunito font-black text-sm sm:text-[17px] text-[#0D1B2A] mb-2 sm:mb-3">
                {loc.label}
              </h4>

              <div className="space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-5 flex-grow">
                <div className="flex gap-2.5">
                  <MapPin size={13} className="text-[#4A6080] shrink-0 mt-0.5" />
                  <p className="font-inter text-[#4A6080] text-[11px] sm:text-[13px] leading-relaxed">
                    {loc.address}
                  </p>
                </div>
                
                <div className="flex gap-2.5 items-center">
                  <Phone size={13} className="text-[#4A6080] shrink-0" />
                  <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-nunito font-bold text-[#0D1B2A] text-[11px] sm:text-[13px] hover:text-[#1A7FD4] transition-colors">
                    {loc.phone}
                  </a>
                </div>
              </div>

              <div className="w-full pt-3 sm:pt-4 border-t border-[#1A7FD4]/5 flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] font-nunito font-black tracking-widest text-[#1A7FD4] uppercase">
                  {activeLocation === idx ? "VIEWING MAP" : "ACTIVE NOW"}
                </span>
                <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${activeLocation === idx ? 'bg-[#1A7FD4]' : 'bg-[#34C98A]'} animate-pulse`} />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeLocation !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="overflow-hidden"
            >
              <div className={`${CLAY_CARD} border border-slate-200/80 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] relative mt-4 shadow-sm`}>
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="font-nunito font-black text-lg sm:text-xl text-[#0D1B2A]">
                    {locations[activeLocation].label} Map
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setActiveLocation(null)}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#4A6080] px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
                    >
                      <X size={16} /> <span className="hidden sm:inline">Close</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 bg-[#1A7FD4] hover:bg-[#156bb3] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-md group"
                    >
                      {copied ? (
                        <><Check size={16} /> <span className="hidden sm:inline">Copied!</span></>
                      ) : (
                        <><Share2 size={16} className="group-hover:hidden" /> <Copy size={16} className="hidden group-hover:block" /> <span className="hidden sm:inline">Share & Copy</span></>
                      )}
                    </button>
                  </div>
                </div>

                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200/50">
                  {isLoadingMap && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                      <Loader2 size={48} className="text-[#1A7FD4] animate-spin mb-4" />
                      <h4 className="font-nunito font-black text-[#0D1B2A] text-lg sm:text-xl mb-2 animate-pulse">
                        Loading Map...
                      </h4>
                      <p className="text-[#4A6080] font-inter text-sm text-center max-w-xs">
                        Locating our {locations[activeLocation].label}
                      </p>
                    </div>
                  )}
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].mapQuery)}&t=&z=${locations[activeLocation].zoom || 16}&ie=UTF8&iwloc=&output=embed`}
                    onLoad={() => setIsLoadingMap(false)}
                  ></iframe>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactLocations;
