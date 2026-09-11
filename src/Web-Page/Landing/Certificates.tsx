"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const certificates = [
  { 
    id: 1, 
    title: "Salesforce Certified Administrator", 
    issuer: "Salesforce", 
    image: "/Certificates/Administrator.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 2, 
    title: "Salesforce Certified Advanced Administrator", 
    issuer: "Salesforce", 
    image: "/Certificates/Advance Adminsitrator.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 3, 
    title: "Salesforce Certified Agentforce Specialist I", 
    issuer: "Salesforce", 
    image: "/Certificates/Agentforce Specialist 1.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 4, 
    title: "Salesforce Certified Agentforce Specialist II", 
    issuer: "Salesforce", 
    image: "/Certificates/Agentforce Specialist 2.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 5, 
    title: "Salesforce Certified Agentforce Specialist III", 
    issuer: "Salesforce", 
    image: "/Certificates/Agentforce Specialist 3.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 6, 
    title: "Salesforce Certified B2C Commerce Developer", 
    issuer: "Salesforce", 
    image: "/Certificates/B2C Commerce Developer.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 7, 
    title: "Salesforce Certified B2C Solution Architect", 
    issuer: "Salesforce", 
    image: "/Certificates/B2C Solution Architect.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 8, 
    title: "Salesforce Certified Business Analyst I", 
    issuer: "Salesforce", 
    image: "/Certificates/Business Analyst 1.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 9, 
    title: "Salesforce Certified Business Analyst II", 
    issuer: "Salesforce", 
    image: "/Certificates/Business Analyst 2.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 10, 
    title: "Salesforce Certified CPQ Specialist", 
    issuer: "Salesforce", 
    image: "/Certificates/CPQ Specialist.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 11, 
    title: "Salesforce Certified Experience Cloud Consultant", 
    issuer: "Salesforce", 
    image: "/Certificates/Experience Cloud Consultant.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 12, 
    title: "Salesforce Certified Industries CPQ Developer", 
    issuer: "Salesforce", 
    image: "/Certificates/Industries CPQ Developer.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 13, 
    title: "Salesforce Certified Associate (L1)", 
    issuer: "Xero", 
    image: "/Certificates/L1 Certified Associate.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 14, 
    title: "Salesforce Certified Specialist (L1)", 
    issuer: "Xero", 
    image: "/Certificates/L3 Certified Specialist.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 15, 
    title: "Salesforce Certified Professional", 
    issuer: "Salesforce", 
    image: "/Certificates/Logo for Salesforce Certified Professional (10).webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 16, 
    title: "Salesforce Certified Marketing Cloud Developer", 
    issuer: "Salesforce", 
    image: "/Certificates/Maketing Cloud Developer.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 17, 
    title: "Salesforce Certified Marketing Cloud Account Engagement Consultant", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Account Engagement Consultant.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 18, 
    title: "Salesforce Certified Marketing Cloud Account Engagement Specialist", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Account Engagement Specialist.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 19, 
    title: "Salesforce Certified Marketing Cloud Administrator", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Administrator.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 20, 
    title: "Salesforce Certified Marketing Cloud Administrator (Alt)", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Adminstrator.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 21, 
    title: "Salesforce Certified Marketing Cloud Consultant I", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Consultant 1.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 22, 
    title: "Salesforce Certified Marketing Cloud Consultant II", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Consultant 2.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 23, 
    title: "Salesforce Certified Marketing Cloud Developer (Alt)", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Developer.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 24, 
    title: "Salesforce Certified Marketing Cloud Email Specialist", 
    issuer: "Salesforce", 
    image: "/Certificates/Marketing Cloud Email Specialist.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 25, 
    title: "Salesforce Certified Platform App Builder", 
    issuer: "Salesforce", 
    image: "/Certificates/Platform App Builder.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 26, 
    title: "Salesforce Certified Sales Representative", 
    issuer: "Salesforce", 
    image: "/Certificates/Sales Representative.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 27, 
    title: "Slack Certified Administrator", 
    issuer: "Salesforce", 
    image: "/Certificates/Slack Administrator.webp", 
    color: "from-sky-500/20" 
  },
  { 
    id: 28, 
    title: "Salesforce Certified JavaScript Developer I", 
    issuer: "Salesforce", 
    image: "/Certificates/javaScript Developer 1.webp", 
    color: "from-sky-500/20" 
  }
];

const Certificates = () => {
  // Duplicate the list for seamless infinite scroll
  const scrollingList = [...certificates, ...certificates];

  return (
    <section className="bg-background py-6 sm:py-12 md:py-18 overflow-hidden border-t border-slate-200 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8F0F8] to-transparent pointer-events-none" />
      
      <div className="px-6 md:px-12 mb-4 md:mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[9px] md:text-sm font-bold text-blue-600 tracking-[0.2em] uppercase mb-1">
            World-Class Expertise
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Our Certified Capabilities
          </h3>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-hidden w-full">
        {/* Left and Right Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#E8F0F8] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#E8F0F8] to-transparent z-10" />

        <div className="flex gap-3 sm:gap-6 py-2 sm:py-4 animate-scrollCerts">
          {scrollingList.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex-shrink-0 w-28 sm:w-36 md:w-44 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-background border-2 border-white/50 shadow-[4px_4px_8px_rgba(163,185,210,0.3),-4px_-4px_8px_rgba(255,255,255,0.95)] hover:shadow-[10px_10px_20px_rgba(163,185,210,0.5),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-500 group relative overflow-hidden flex items-center justify-center"
            >
              {/* Uniform Blue Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-20 flex flex-col items-center justify-center w-full gap-2">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-34 md:h-34 flex items-center justify-center group-hover:scale-110 transition-all duration-300 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-300"
                  />
                </div>
                <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider font-bold text-center">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollCerts {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scrollCerts {
          animation: scrollCerts 85s linear infinite;
        }
        .animate-scrollCerts:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default Certificates;

