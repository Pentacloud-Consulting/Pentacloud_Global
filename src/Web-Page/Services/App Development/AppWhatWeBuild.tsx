"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { 
  Smartphone, Tablet, ShieldCheck, Zap, 
  Star, Users, CheckCircle2
} from "lucide-react";

// --- Custom Counter Component ---
const Counter = ({ from, to, duration = 2 }: { from: number, to: number | string, duration?: number }) => {
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

const AppWhatWeBuild = () => {
  const apps = [
    {
      title: "iOS & Android Apps",
      desc: "Native-quality cross-platform applications built with React Native and Flutter. Single codebase, dual-platform dominance.",
      icon: Smartphone,
      color: "#1A7FD4",
      tags: ["React Native", "Flutter", "Store Ready"],
      visual: "rating"
    },
    {
      title: "Enterprise Solutions",
      desc: "Secure, scalable internal applications for workforce management, logistics, and real-time data collection.",
      icon: Tablet,
      color: "#8B5CF6",
      tags: ["RBAC", "Offline Sync", "ERP Link"],
      visual: "performance"
    },
    {
      title: "FinTech & Payments",
      desc: "PCI-compliant applications with high-security biometric authentication and real-time transaction processing.",
      icon: ShieldCheck,
      color: "#34C98A",
      tags: ["PCI-DSS", "Biometrics", "Stripe"],
      visual: "security"
    },
    {
      title: "Real-time Social Apps",
      desc: "Applications requiring low-latency communication, push notifications, and high concurrent user handling.",
      icon: Zap,
      color: "#F59E0B",
      tags: ["WebSockets", "Live Chat", "Scalable"],
      visual: "active"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1A7FD4] blur-[130px] opacity-[0.06] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6] blur-[130px] opacity-[0.06] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[2px_2px_8px_rgba(163,185,210,0.15)] text-[#1A7FD4] text-[9px] sm:text-[10px] font-black tracking-[4px] uppercase mb-4 sm:mb-6"
          >
            MOBILE INNOVATION
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-2xl sm:text-[40px] md:text-[52px] text-[#0D1B2A] leading-[1.1] mb-5 sm:mb-6"
          >
            Mobile Experiences <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A7FD4] to-[#8B5CF6]">Built for Scale</span>
          </motion.h2>
          <p className="font-inter text-[#4A6080] max-w-xl text-xs sm:text-lg leading-relaxed font-medium px-4">
            We transform your ideas into powerful, pocket-sized experiences that engage users and drive business results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/40 backdrop-blur-sm rounded-[32px] p-6 sm:p-7 border border-white/60 shadow-[15px_15px_30px_rgba(163,185,210,0.15),-15px_-15px_30px_rgba(255,255,255,0.6)] hover:shadow-[25px_25px_50px_rgba(163,185,210,0.25)] transition-all duration-500 flex flex-col overflow-hidden h-full"
            >
              {/* Decorative Glow */}
              <div 
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: app.color }}
              />

              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-6 rounded-xl bg-white shadow-[6px_6px_12px_rgba(163,185,210,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shrink-0"
                style={{ color: app.color }}
              >
                <app.icon size={26} strokeWidth={2.5} className="sm:w-7 sm:h-7" />
              </div>

              <h3 className="font-nunito font-black text-xl text-[#0D1B2A] mb-3 group-hover:text-[#1A7FD4] transition-colors duration-300 leading-tight">
                {app.title}
              </h3>
              
              <p className="font-inter text-[13px] text-[#4A6080] leading-relaxed mb-6 font-medium flex-1">
                {app.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 content-start">
                {app.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="px-2.5 py-1 bg-white/60 rounded-lg border border-white shadow-sm text-[9px] font-nunito font-black text-[#1A7FD4] uppercase tracking-wider group-hover:bg-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Enhanced Visual Footer */}
              <div className="pt-6 border-t border-white/40 mt-auto">
                {app.visual === "rating" && (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                       <div className="text-[8px] font-black text-[#4A6080]/40 uppercase tracking-widest">Store Rating</div>
                       <div className="flex gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                       </div>
                    </div>
                    <div className="text-xl font-black text-[#0D1B2A] flex items-baseline">
                      4.9<span className="text-[10px] text-[#4A6080]/40 font-black ml-0.5">/5</span>
                    </div>
                  </div>
                )}

                {app.visual === "performance" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-end px-0.5">
                       <span className="text-[9px] font-black text-[#4A6080]/40 uppercase tracking-widest">Perf Core</span>
                       <span className="text-[14px] font-black text-[#8B5CF6]">98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden border border-white/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-full" 
                      />
                    </div>
                  </div>
                )}

                {app.visual === "security" && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#34C98A]/10 border border-[#34C98A]/20 flex items-center justify-center text-[#34C98A]">
                       <CheckCircle2 size={20} strokeWidth={3} />
                    </div>
                    <div>
                       <div className="text-[8px] font-black text-[#4A6080]/40 uppercase tracking-widest mb-0.5">Security Level</div>
                       <div className="text-[12px] font-black text-[#34C98A] uppercase tracking-wider">PCI Compliant</div>
                    </div>
                  </div>
                )}

                {app.visual === "active" && (
                  <div className="flex items-center justify-end">
                    <div className="text-[10px] font-black text-[#F59E0B] uppercase tracking-tighter text-right">
                       <span className="block text-[14px] text-[#0D1B2A] leading-none mb-0.5">1.2k+</span>
                       Live Users
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Successful Deployments", value: "25+" },
              { label: "Crash-Free Rate", value: "99.9%" },
              { label: "Active App Users", value: "10k+" },
              { label: "On-Time Delivery", value: "100%" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-md rounded-[24px] p-5 sm:p-6 border border-white/60 shadow-[10px_10px_20px_rgba(163,185,210,0.1)] hover:shadow-[15px_15px_30px_rgba(163,185,210,0.2)] transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="text-2xl sm:text-[32px] font-nunito font-black text-[#1A7FD4] leading-none mb-2 group-hover:scale-110 transition-transform">
                  <Counter from={0} to={stat.value} />
                </div>
                <div className="text-[9px] sm:text-[10px] font-black text-[#4A6080]/60 uppercase tracking-[2px] leading-tight">{stat.label}</div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AppWhatWeBuild;
