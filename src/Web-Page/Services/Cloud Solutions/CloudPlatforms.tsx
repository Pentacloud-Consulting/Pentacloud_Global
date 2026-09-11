"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Box, GitBranch, Activity, Shield, Settings, Server, Layers } from "lucide-react";

const CloudPlatforms = () => {
  const publicClouds = [
    {
      name: "Amazon Web Services",
      sub: "Primary Cloud Partner",
      icon: Cloud,
      color: "#F59E0B",
      desc: "EC2, S3, RDS, Lambda, CloudFront, VPC, IAM, certified AWS architecture deployments with cost optimisation reviews.",
      cert: "AWS Solutions Architect",
      level: 95
    },
    {
      name: "Microsoft Azure",
      sub: "Enterprise Cloud",
      icon: Cloud,
      color: "#1A7FD4",
      desc: "Azure AD, Virtual Machines, AKS, Azure DevOps, Microsoft 365 integration, ideal for Microsoft-first enterprises.",
      cert: "Azure Administrator",
      level: 90
    },
    {
      name: "Google Cloud Platform",
      icon: Cloud,
      sub: "Modern Cloud",
      color: "#34C98A",
      desc: "GKE, BigQuery, Cloud Run, Vertex AI, Firebase, GCP expertise for modern data-intensive and AI-powered workloads.",
      cert: "GCP Cloud Engineer",
      level: 87
    },
    {
      name: "Private & Hybrid Cloud",
      icon: Server,
      sub: "On-Premise + Cloud",
      color: "#8B5CF6",
      desc: "VMware, Hyper-V, and OpenStack deployments, hybrid architectures bridging on-premise datacenters with public cloud.",
      cert: "VMware VCP",
      level: 85
    }
  ];

  const tools = [
    { name: "Terraform", sub: "IaC", icon: Layers, level: 93 },
    { name: "Docker + K8s", sub: "Container", icon: Box, level: 92 },
    { name: "CI/CD", sub: "Automation", icon: GitBranch, level: 90 },
    { name: "Monitoring", sub: "Observability", icon: Activity, level: 88 },
    { name: "Security", sub: "Endpoint", icon: Shield, level: 87 },
    { name: "Ansible", sub: "Config", icon: Settings, level: 89 }
  ];

  const certifications = [
    "AWS Solutions Architect ✓", "Azure Administrator ✓", "GCP Engineer ✓",
    "Terraform Associate ✓", "Kubernetes CKA ✓", "CISSP ✓", "CCNP ✓",
    "ISO 27001 Auditor ✓", "Docker Certified ✓", "Security+ ✓"
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#E8F0F8] relative overflow-hidden px-4 sm:px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A7FD4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 sm:px-6 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] text-[9px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-6"
          >
            PLATFORMS WE MASTER
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-[52px] font-nunito font-black text-[#0D1B2A] leading-tight"
          >
            Multi-Cloud Expertise <br />
            <span className="text-[#1A7FD4]">Across All Major Platforms</span>
          </motion.h2>
        </div>

        {/* Public Cloud Section */}
        <div className="mb-6 sm:mb-12">
          <div className="inline-flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#1A7FD4] font-black text-[9px] sm:text-[10px] uppercase tracking-[3px] mb-6 sm:mb-10">
            PUBLIC CLOUD ECOSYSTEM
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
            {publicClouds.map((cloud, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[#E8F0F8] rounded-[20px] sm:rounded-[40px] p-5 sm:p-8 shadow-[10px_10px_20px_rgba(163,185,210,0.6),-10px_-10px_20px_rgba(255,255,255,0.95)] hover:shadow-[20px_20px_40px_rgba(163,185,210,0.7),-20px_-20px_40px_rgba(255,255,255,1)] group transition-all duration-500 flex flex-col"
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-3xl bg-[#E8F0F8] shadow-[inset_4px_4px_8px_rgba(163,185,210,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center mb-6 sm:mb-8 group-hover:shadow-[4px_4px_12px_rgba(163,185,210,0.5),-4px_-4px_12px_rgba(255,255,255,0.9)] group-hover:rotate-15 transition-all duration-500 shrink-0"
                  style={{ color: cloud.color }}
                >
                  <cloud.icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-[20px] font-nunito font-black text-[#0D1B2A] mb-0.5 sm:mb-1 group-hover:text-[#1A7FD4] transition-colors truncate">{cloud.name}</h3>
                <span className="text-[8px] sm:text-[9px] font-black text-[#4A6080] uppercase tracking-widest block mb-4 sm:mb-6">{cloud.sub}</span>
                <p className="text-xs sm:text-[13px] text-[#4A6080] font-inter leading-relaxed mb-6 sm:mb-8 h-auto sm:h-20 overflow-hidden grow">
                  {cloud.desc}
                </p>
                
                <div className="pt-4 sm:pt-6 border-t border-[#1A7FD4]/08 space-y-3 sm:space-y-4 mt-auto">
                  <div className="text-[8.5px] sm:text-[10px] font-black text-[#1A7FD4] uppercase tracking-widest">Expertise Level</div>
                  <div className="w-full h-1.5 sm:h-2 bg-[#E8F0F8] shadow-[inset_2px_2px_4px_rgba(163,185,210,0.3)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cloud.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cloud.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <div className="inline-flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-white/60 shadow-[inset_2px_2px_5px_rgba(163,185,210,0.25)] rounded-full text-[#34C98A] font-black text-[9px] sm:text-[10px] uppercase tracking-[3px] mb-6 sm:mb-10">
            DEVOPS & SECURITY TOOLS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-6 lg:gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#E8F0F8] rounded-xl sm:rounded-3xl p-3.5 sm:p-6 shadow-[6px_6px_12px_rgba(163,185,210,0.4),-6px_-6px_12px_rgba(255,255,255,0.85)] group flex flex-col items-center text-center transition-all duration-300"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-2xl bg-[#E8F0F8] shadow-[inset_3px_3px_6px_rgba(163,185,210,0.3)] flex items-center justify-center text-[#1A7FD4] mb-3 sm:mb-4 group-hover:rotate-15 transition-all duration-500 shrink-0">
                  <tool.icon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                </div>
                <h4 className="text-xs sm:text-[14px] font-nunito font-black text-[#0D1B2A] mb-0.5 sm:mb-1 truncate w-full">{tool.name}</h4>
                <div className="text-[8px] sm:text-[9px] font-black text-[#4A6080] uppercase tracking-tighter mb-3 sm:mb-4 opacity-60 truncate w-full">{tool.sub}</div>
                <div className="w-full h-0.5 sm:h-1 bg-[#E8F0F8] shadow-[inset_1px_1px_2px_rgba(163,185,210,0.3)] rounded-full overflow-hidden mt-auto">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.level}%` }}
                    viewport={{ once: true }}
                    className="h-full bg-[#1A7FD4]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Bottom */}
      <div className="mt-10 sm:mt-14 border-y border-[#1A7FD4]/08 bg-[#E8F0F8]/50 backdrop-blur-sm py-6 sm:py-10 relative overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee-slow">
          {[...certifications, ...certifications].map((cert, i) => (
            <div key={i} className="px-4 py-1.5 sm:px-6 sm:py-2 bg-[#E8F0F8] shadow-[4px_4px_8px_rgba(163,185,210,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] rounded-full text-[#1A7FD4] font-nunito font-black text-[9px] sm:text-[11px] uppercase tracking-wider">
              {cert}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CloudPlatforms;
