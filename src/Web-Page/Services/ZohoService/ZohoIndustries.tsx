"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, ShoppingBag, Banknote, Briefcase, 
  Factory, Home, ChevronLeft, ChevronRight
} from "lucide-react";
import { CLAY_CARD, CLAY_ICON } from "./Constants";

const industries = [
  {
    title: "Healthcare",
    icon: <Stethoscope size={24} />,
    body: "HIPAA-aware Zoho CRM for patient management, appointment scheduling, and referral tracking.",
    apps: ["Zoho CRM", "Zoho Books", "Zoho Desk", "Zoho People"],
    color: "bg-blue-50 text-[#1A7FD4]"
  },
  {
    title: "Retail & eCommerce",
    icon: <ShoppingBag size={24} />,
    body: "Zoho Inventory integrated with Shopify and Amazon for multi-channel stock management.",
    apps: ["Zoho Inventory", "Zoho CRM", "Zoho Campaigns"],
    color: "bg-emerald-50 text-[#34C98A]"
  },
  {
    title: "Financial Services",
    icon: <Banknote size={24} />,
    body: "Zoho CRM customised for client onboarding, KYC workflows, and relationship management.",
    apps: ["Zoho CRM", "Zoho Books", "Zoho Sign"],
    color: "bg-amber-50 text-[#F59E0B]"
  },
  {
    title: "Professional Services",
    icon: <Briefcase size={24} />,
    body: "Zoho Projects for client project management and time tracking. Zoho CRM for proposal management.",
    apps: ["Zoho Projects", "Zoho CRM", "Zoho Books"],
    color: "bg-indigo-50 text-[#6366F1]"
  },
  {
    title: "Manufacturing",
    icon: <Factory size={24} />,
    body: "Zoho Inventory for raw material tracking. Zoho CRM for dealer and distributor management.",
    apps: ["Zoho Inventory", "Zoho CRM", "Zoho Creator"],
    color: "bg-slate-50 text-[#475569]"
  },
  {
    title: "Real Estate",
    icon: <Home size={24} />,
    body: "Zoho CRM customised for property listings, lead source tracking, and deal closure workflows.",
    apps: ["Zoho CRM", "Zoho Campaigns", "Zoho Books"],
    color: "bg-red-50 text-[#EF4444]"
  }
];

const ZohoIndustries = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else if (window.innerWidth < 1280) setVisibleCount(3);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 24;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveDot(index);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [visibleCount]);

  const maxIndex = Math.max(0, industries.length - visibleCount);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 24;
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToActiveDot = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 24;
      scrollRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 bg-[#E8F0F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="max-w-4xl lg:max-w-none w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 bg-blue-50 text-[#1A7FD4] rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-[3px] mb-4 sm:mb-6"
            >
              INDUSTRIES
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-nunito font-black text-[#0D1B2A] leading-tight">
              Zoho Solutions Built <span className="text-[#1A7FD4]">for Your Industry</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1A7FD4] hover:border-[#1A7FD4] hover:bg-white bg-white/50 shadow-sm transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1A7FD4] hover:border-[#1A7FD4] hover:bg-white bg-white/50 shadow-sm transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Industry Carousel */}
        <div className="relative">
          <div 
            className="overflow-hidden -mx-6 px-6"
            style={{
              maskImage: "linear-gradient(to right, transparent, white 24px, white calc(100% - 24px), transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, white 24px, white calc(100% - 24px), transparent)"
            }}
          >
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-1 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {industries.map((industry, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 select-none snap-start"
                  style={{ 
                    width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 24 / visibleCount}px)`,
                    minWidth: visibleCount === 1 ? "100%" : "280px"
                  }}
                >
                  <motion.div
                    className={`${CLAY_CARD} p-5 sm:p-8 group hover:-translate-y-1 transition-all duration-500 h-full min-h-[300px] sm:min-h-[360px] flex flex-col rounded-[20px] sm:rounded-[32px]`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${CLAY_ICON} ${industry.color.split(" ")[1]} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:sm:w-6 [&_svg]:sm:h-6`}>
                      {industry.icon}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-nunito font-black text-[#0D1B2A] mb-2 sm:mb-3 group-hover:text-[#1A7FD4] transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#4A6080] font-inter leading-relaxed line-clamp-4">
                        {industry.body}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 mt-4 min-h-[84px] sm:min-h-[90px] flex flex-col justify-start">
                      <p className="text-[8px] sm:text-[9px] font-black text-[#1A7FD4] uppercase tracking-widest mb-2 sm:mb-3">Core Apps</p>
                      <div className="flex flex-wrap gap-1.5">
                         {industry.apps.map((app, idx) => (
                           <span key={idx} className="px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[7.5px] sm:text-[8px] font-bold text-slate-500 uppercase leading-none">
                             {app}
                           </span>
                         ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToActiveDot(i)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeDot === i ? "w-6 sm:w-8 bg-[#1A7FD4]" : "w-1 sm:w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZohoIndustries;
