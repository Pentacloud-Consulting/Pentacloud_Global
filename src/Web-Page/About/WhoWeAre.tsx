"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Zap, TrendingUp, Handshake, ShieldCheck, Award, MapPin, Compass, Layers } from "lucide-react";

const WhoWeAre = () => {
  const [cards, setCards] = useState([0, 1, 2]); // Indices of the cards in order

  // Auto-swipe effect every 3 seconds, resets timer when cards state changes (i.e. on manual swipe)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift()!;
        newCards.push(swipedCard);
        return newCards;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [cards]);

  const handleDragEnd = (event: any, info: any) => {
    // If swiped significantly (more than 100px in any direction)
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift()!;
        newCards.push(swipedCard);
        return newCards;
      });
    }
  };

  const cardContent = [
    // Card 1 (Brand/Vision Card)
    <div key="front" className="w-full h-full flex flex-col justify-between p-5 sm:p-8 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[28px] sm:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(26,127,212,0.3)] text-white overflow-hidden relative border border-white/10 group">
      {/* Background Decorative Glow */}
      <div className="absolute top-[-20%] right-[-20%] w-[180px] h-[180px] bg-blue-500/30 rounded-full filter blur-[40px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[150px] h-[150px] bg-cyan-500/20 rounded-full filter blur-[35px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

      <div className="flex justify-between items-start relative z-10 w-full">
        <span className="text-[10px] uppercase tracking-[3px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Our Core Vision
        </span>
        <Compass className="w-5 h-5 text-blue-400 animate-pulse" />
      </div>

      <div className="font-nunito font-extrabold italic text-lg sm:text-2xl md:text-[25px] leading-snug mt-4 mb-4 sm:mt-6 sm:mb-6 text-slate-100 relative z-10 drop-shadow-sm">
        "Empowering businesses through cutting-edge technology and human-centric engineering."
      </div>

      <div className="flex items-center justify-between relative z-10 pt-3 sm:pt-4 border-t border-white/10 w-full">
        <div className="flex flex-col text-left">
          <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-bold">Innovation Partner</span>
          <span className="text-[10px] sm:text-xs text-white font-medium">Pentacloud Consulting</span>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl flex items-center justify-center">
          <img 
            src="/Logo/Penta Logo.png" 
            alt="Penta Logo" 
            className="h-4 sm:h-5 object-contain brightness-0 invert opacity-90" 
          />
        </div>
      </div>
    </div>,

    // Card 2 (Global Operations Card)
    <div key="middle" className="w-full h-full flex flex-col justify-between p-5 sm:p-8 bg-white rounded-[28px] sm:rounded-[40px] shadow-[0_20px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/5 rounded-full filter blur-[20px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-indigo-500/5 rounded-full filter blur-[30px] pointer-events-none" />

      <div className="flex justify-between items-start w-full gap-2">
        <span className="text-[8px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[3px] font-bold text-slate-500 bg-slate-100 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 break-words text-center">
          Global Operations
        </span>
        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-green-500/20 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          <span className="text-[8px] sm:text-[9px] text-green-600 font-bold uppercase tracking-wider">Live Hub</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-3 my-auto w-full text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1A7FD4] shrink-0 border border-blue-100">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">HQ Location</span>
            <span className="text-[10px] sm:text-sm text-slate-800 font-bold leading-tight">Bengaluru Tech Hub, India</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-100">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reach</span>
            <span className="text-[10px] sm:text-sm text-slate-800 font-bold leading-tight">Global Delivery & Support</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-slate-100 text-center w-full">
        <div className="flex flex-col">
          <span className="text-xs sm:text-base text-[#1A7FD4] font-black leading-none">35+</span>
          <span className="text-[7px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Certs</span>
        </div>
        <div className="flex flex-col border-x border-slate-100">
          <span className="text-xs sm:text-base text-indigo-500 font-black leading-none">25+</span>
          <span className="text-[7px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Clients</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-base text-cyan-500 font-black leading-none">100%</span>
          <span className="text-[7px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Success</span>
        </div>
      </div>
    </div>,

    // Card 3 (Partnership/Alliances Card)
    <div key="back" className="w-full h-full flex flex-col justify-between p-5 sm:p-8 bg-gradient-to-tr from-[#EEF2F6] to-[#F8FAFC] rounded-[28px] sm:rounded-[40px] shadow-[0_20px_40px_rgba(15,23,42,0.06)] border border-white overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-20%] w-[180px] h-[180px] bg-amber-500/10 rounded-full filter blur-[35px] pointer-events-none" />

      <div className="flex justify-between items-start relative z-10 w-full gap-2">
        <span className="text-[8px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[3px] font-bold text-amber-600 bg-amber-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/20 break-words text-center">
          Certified Partnerships
        </span>
        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
      </div>

      <div className="my-auto py-2 flex flex-col items-center justify-center relative z-10 w-full">
        <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_12px_24px_rgba(15,23,42,0.04)] border border-slate-100 max-w-[85%] sm:max-w-[80%] flex items-center justify-center">
          <img 
            src="/Logo/Pentacloud logo.png" 
            alt="Pentacloud Logo" 
            className="w-full object-contain max-h-[35px] sm:max-h-[45px]"
          />
        </div>
        <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-3 sm:mt-4 text-center">
          Salesforce & Zoho Official Partner
        </span>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 relative z-10 pt-3 sm:pt-4 border-t border-slate-100 w-full">
        <div className="flex items-center gap-1 bg-white px-2 sm:px-2.5 py-1 rounded-xl shadow-sm border border-slate-100 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-600">
          <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" /> Salesforce
        </div>
        <div className="flex items-center gap-1 bg-white px-2 sm:px-2.5 py-1 rounded-xl shadow-sm border border-slate-100 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-600">
          <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500" /> Zoho
        </div>
      </div>
    </div>
  ];

  return (
    <section className="relative w-full py-6 md:py-12 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1A7FD4] rounded-full filter blur-[120px] opacity-[0.05] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#29C6E0] rounded-full filter blur-[120px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center relative z-10">
        
        {/* Left Column - Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-background shadow-[2px_2px_6px_rgba(163,185,210,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] border border-white/40 text-[#1A7FD4] text-[10px] sm:text-xs font-bold tracking-[3px] uppercase mb-4 sm:mb-8 inline-block rounded-full"
          >
            WHO WE ARE
          </motion.div>
          
          <h2 className="font-nunito font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#0D1B2A] leading-[1.2] md:leading-[1.1] mb-4 sm:mb-8">
            Redefining Technology<br/>
            <span className="text-[#1A7FD4]">With Human Touch</span>
          </h2>

          <div className="space-y-4 sm:space-y-6 font-inter text-xs sm:text-sm md:text-[17px] text-[#4A6080] leading-relaxed sm:leading-[1.8] mb-6 sm:mb-10 max-w-xl">
            <p>
              Pentacloud Consulting is a global technology consulting firm delivering AI-powered digital transformation.
            </p>
            <p>
              As a certified Salesforce and Zoho partner with 35+ industry certifications, we deliver end-to-end services that empower businesses across Healthcare, Retail, Finance, and Enterprise sectors.
            </p>
          </div>

          {/* Grid Layout to Lock Pills on 1 Single Line */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 max-w-lg">
            {[
              { icon: Handshake, label: 'Human-Centric' },
              { icon: Zap, label: 'AI-Powered' },
              { icon: ShieldCheck, label: 'Certified Experts' }
            ].map((pill, i) => {
              const Icon = pill.icon;
              return (
                <div key={i} className="bg-background text-[#1A7FD4] font-nunito font-black text-[8px] sm:text-[10px] md:text-[11px] rounded-full px-1.5 py-2.5 sm:px-5 sm:py-3 shadow-[2px_2px_8px_rgba(163,185,210,0.25),-2px_-2px_8px_rgba(255,255,255,0.7)] border border-white/50 uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 truncate text-center">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1A7FD4] flex-shrink-0" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Swipable Card Stack */}
        <div className="relative h-[420px] sm:h-[500px] flex items-center justify-center mt-6 lg:mt-0 perspective-1000">
          <AnimatePresence>
            {cards.map((cardIndex, i) => {
              const isFront = i === 0;
              const isMiddle = i === 1;
              const isBack = i === 2;

              return (
                <motion.div
                  key={cardIndex}
                  drag={isFront}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ 
                    scale: 0.8, 
                    opacity: 0, 
                    y: 20 
                  }}
                  animate={{ 
                    scale: isFront ? 1 : isMiddle ? 0.9 : 0.8,
                    opacity: isFront ? 1 : isMiddle ? 0.7 : 0.4,
                    x: isFront ? 0 : isMiddle ? 20 : 40,
                    y: isFront ? 0 : isMiddle ? -10 : -20,
                    rotate: isFront ? 0 : isMiddle ? -6 : 8,
                    zIndex: cards.length - i,
                  }}
                  exit={{ 
                    x: 300, 
                    opacity: 0, 
                    scale: 0.5,
                    rotate: 45,
                    transition: { duration: 0.4 } 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  style={{ 
                    cursor: isFront ? "grab" : "default",
                    touchAction: "none"
                  }}
                  className="absolute w-[280px] sm:w-[320px] md:w-[360px] h-[350px] sm:h-[400px] md:h-[440px] origin-center"
                >
                  {cardContent[cardIndex]}
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Swipe Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-2 sm:-bottom-10 text-[#1A7FD4]/40 font-nunito font-bold text-[10px] tracking-widest uppercase flex items-center gap-2"
          >
            ← Swipe Card to Change →
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default WhoWeAre;
