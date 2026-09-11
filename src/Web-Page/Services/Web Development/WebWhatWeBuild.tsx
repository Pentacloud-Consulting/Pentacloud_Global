"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Building2, ShoppingCart, Target, LayoutDashboard, Code2, Star, CheckCircle2 } from "lucide-react";

// --- Custom Counter Component ---
const Counter = ({ from, to, duration = 2.5 }: { from: number, to: number | string, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });
  const numericTo = typeof to === 'string' ? parseFloat(to.replace(/[^0-9.]/g, '')) : to;

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, numericTo, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            const displayValue = Math.round(value);
            nodeRef.current.textContent = typeof to === 'string' ? to.replace(/[0-9.]+/, displayValue.toString()) : displayValue.toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, numericTo, duration, inView, to]);

  return <span ref={nodeRef}>{from}</span>;
};

const WebWhatWeBuild = () => {
  const services = [
    {
      title: "Corporate Websites",
      desc: "Professional, conversion-focused sites that establish brand authority and turn visitors into leads with performance-first architecture.",
      icon: Building2,
      color: "#1A7FD4",
      tags: ["Next.js", "CMS", "SEO Ready"],
      isWide: true,
      visual: "browser"
    },
    {
      title: "eCommerce",
      desc: "High-converting online stores with seamless payments, inventory management, and personalised shopping.",
      icon: ShoppingCart,
      color: "#F59E0B",
      tags: ["Shopify", "Payment"],
      visual: "cart"
    },
    {
      title: "Landing Pages",
      desc: "High-performing pages engineered for campaigns, A/B test-ready and built for maximum conversion rates.",
      icon: Target,
      color: "#34C98A",
      tags: ["Funnels", "A/B Ready"],
      visual: "conversion"
    },
    {
      title: "Web Portals",
      desc: "Complex client portals and admin dashboards built with real-time data and role-based access control.",
      icon: LayoutDashboard,
      color: "#8B5CF6",
      tags: ["RBAC", "Real-time"],
      visual: "dashboard"
    },
    {
      title: "Custom Apps",
      desc: "Bespoke web applications built from scratch for your unique business logic and scalable architecture.",
      icon: Code2,
      color: "#29C6E0",
      tags: ["React", "API First"],
      visual: "code"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1A7FD4] blur-[130px] opacity-[0.05] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#29C6E0] blur-[130px] opacity-[0.05] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[2px_2px_8px_rgba(163,185,210,0.15)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4 sm:mb-5"
          >
            WHAT WE BUILD
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[36px] md:text-[44px] text-[#0D1B2A] leading-[1.1] mb-4 sm:mb-5"
          >
            Web Experiences <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#29C6E0]">Built for Results</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-sm leading-relaxed font-medium px-4">
            From marketing sites to complex enterprise portals, we engineer digital assets that generate leads and build brand trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-white/40 backdrop-blur-sm rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.15),-10px_-10px_20px_rgba(255,255,255,0.6)] hover:shadow-[20px_20px_40px_rgba(163,185,210,0.2)] transition-all duration-500 flex flex-col overflow-hidden h-full ${service.isWide ? 'sm:col-span-2' : ''}`}
            >
              {/* Decorative Glow */}
              <div 
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: service.color }}
              />

              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 rounded-[10px] sm:rounded-xl bg-white shadow-[4px_4px_10px_rgba(163,185,210,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shrink-0"
                style={{ color: service.color }}
              >
                <service.icon size={20} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
              </div>

              <h3 className="font-nunito font-black text-lg sm:text-[19px] text-[#0D1B2A] mb-2 group-hover:text-[#1A7FD4] transition-colors duration-300 leading-tight">
                {service.title}
              </h3>
              
              <p className="font-inter text-[12px] sm:text-[13px] text-[#4A6080] leading-relaxed mb-4 font-medium flex-1">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5 content-start">
                {service.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="px-2 py-0.5 bg-white/60 rounded-md border border-white shadow-sm text-[8.5px] font-nunito font-black text-[#1A7FD4] uppercase tracking-wider group-hover:bg-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Enhanced Visual Footer */}
              <div className="pt-4 border-t border-white/40 mt-auto">
                {service.visual === "browser" && (
                   <div className="w-full flex items-center justify-between bg-white/30 p-2.5 rounded-2xl border border-white/50">
                      <div className="flex gap-1">
                         {[...Array(3)].map((_, idx) => <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[#1A7FD4]/20" />)}
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-1.5 bg-[#1A7FD4]/10 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-50, 50] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-[#1A7FD4]/40" />
                         </div>
                         <CheckCircle2 size={14} className="text-[#1A7FD4]" />
                      </div>
                   </div>
                )}
                {service.visual === "cart" && (
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black text-[#4A6080]/40 uppercase tracking-widest leading-none">Checkout Flow</span>
                        <div className="flex gap-0.5 text-amber-500">
                           {[...Array(5)].map((_, idx) => <Star key={idx} size={10} fill="currentColor" />)}
                        </div>
                     </div>
                     <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-[#F59E0B] rounded-full text-[10px] font-black text-white shadow-lg shadow-orange-500/20">
                        Add to Cart
                     </motion.div>
                  </div>
                )}
                {service.visual === "conversion" && (
                   <div className="space-y-2">
                      <div className="flex justify-between items-end px-0.5">
                         <span className="text-[9px] font-black text-[#4A6080]/40 uppercase tracking-widest">Growth Rate</span>
                         <span className="text-[14px] font-black text-[#34C98A] leading-none">+12.5%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden border border-white/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#34C98A] to-[#10B981] rounded-full" 
                        />
                      </div>
                   </div>
                )}
                {service.visual === "dashboard" && (
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                         <LayoutDashboard size={18} className="text-[#8B5CF6]" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                         <div className="w-full h-1 bg-white/60 rounded-full" />
                         <div className="w-2/3 h-1 bg-white/40 rounded-full" />
                      </div>
                   </div>
                )}
                {service.visual === "code" && (
                   <div className="bg-[#0D1B2A] rounded-xl p-3 border border-white/5 font-mono text-[10px] text-[#29C6E0] flex items-center justify-between">
                      <span className="opacity-60">{"<Code />"}</span>
                      <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 h-3 bg-[#1A7FD4] rounded-full" />
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Sites Delivered", value: "25+" },
              { label: "Avg Load Time", value: "< 1.5s" },
              { label: "PageSpeed Score", value: "98+" },
              { label: "Mobile Responsive", value: "100%" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white/40 backdrop-blur-md rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 border border-white/60 shadow-[8px_8px_16px_rgba(163,185,210,0.1)] hover:shadow-[12px_12px_24px_rgba(163,185,210,0.15)] transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="text-xl sm:text-[28px] font-nunito font-black text-[#1A7FD4] leading-none mb-1.5 group-hover:scale-105 transition-transform">
                  <Counter from={0} to={stat.value} />
                </div>
                <div className="text-[8px] sm:text-[9px] font-black text-[#4A6080]/60 uppercase tracking-[1.5px] leading-tight">{stat.label}</div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WebWhatWeBuild;
