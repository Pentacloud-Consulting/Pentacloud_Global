// "use client";

// import React from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";

// const TeamCard = ({ member, index }: { member: any, index: number }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
  
//   const rotateX = useTransform(y, [-100, 100], [8, -8]);
//   const rotateY = useTransform(x, [-100, 100], [-8, 8]);

//   function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
//     const rect = event.currentTarget.getBoundingClientRect();
//     x.set(event.clientX - rect.left - rect.width / 2);
//     y.set(event.clientY - rect.top - rect.height / 2);
//   }

//   function handleMouseLeave() {
//     x.set(0);
//     y.set(0);
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.1, type: "spring", bounce: 0.4 }}
//       viewport={{ once: true, margin: "-50px" }}
//       style={{ perspective: 1000 }}
//       className="w-full"
//     >
//       <motion.div
//         onMouseMove={handleMouse}
//         onMouseLeave={handleMouseLeave}
//         style={{ rotateX, rotateY }}
//         className="w-full max-w-[300px] sm:max-w-[320px] mx-auto bg-background rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[8px_8px_16px_rgba(163,185,210,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] group transition-all duration-150 hover:shadow-[15px_15px_30px_rgba(163,185,210,0.5)] hover:-translate-y-1.5"
//       >
//         {/* Avatar Area */}
//         <div className="relative h-[140px] sm:h-[180px]">
//           <div className="absolute inset-0 overflow-hidden">
//             <img 
//               src={member.banner} 
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
//               alt="Banner" 
//             />
//           </div>
          
//           <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 z-20">
//             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
//               <img 
//                 src={member.image} 
//                 className="w-full h-full object-cover" 
//                 alt={member.name} 
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="h-8 sm:h-10" /> {/* Spacer for avatar overlap */}
        
//         {/* Info Area */}
//         <div className="p-4 sm:p-6">
//           <h3 className="font-nunito font-bold text-base sm:text-[20px] text-[#0D1B2A]">{member.name}</h3>
//           <div className="font-nunito font-semibold text-[11px] sm:text-[13px] text-[#1A7FD4] tracking-[1px] mb-2 sm:mb-4 uppercase">{member.role}</div>
//           <p className="font-inter text-xs sm:text-[13px] text-[#4A6080] leading-relaxed sm:leading-[1.7] mb-4 sm:mb-6 min-h-[60px] sm:min-h-[80px]">
//             {member.bio}
//           </p>
          
//           <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4 sm:mb-6">
//             {member.tags.map((tag:string, i:number) => (
//               <span key={i} className="bg-background shadow-[1px_1px_3px_rgba(163,185,210,0.3),-1px_-1px_3px_rgba(255,255,255,0.7)] text-[#1A7FD4] font-nunito font-bold text-[9px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full group-hover:scale-105 transition-transform">
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Socials Placeholder */}
//           <div className="flex gap-2 border-t border-slate-100 pt-3 sm:pt-4">
//              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-background shadow-[2px_2px_4px_rgba(163,185,210,0.3),-2px_-2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-colors cursor-pointer text-[10px] sm:text-xs font-bold">in</div>
//              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-background shadow-[2px_2px_4px_rgba(163,185,210,0.3),-2px_-2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white transition-colors cursor-pointer text-[10px] sm:text-xs font-bold">tw</div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const Leadership = () => {
//   const team = [
//     { 
//       name: "Founder CEO", 
//       role: "Pentacloud Consulting", 
//       bio: "Visionary technology leader driving Pentacloud's mission to democratise enterprise cloud solutions across Asia with a passion for Salesforce and AI.", 
//       tags: ["Salesforce", "Cloud Strategy", "AI"],
//       image: "/Profile/Arshad.png",
//       banner: "/Profile/Profile-Banner.jpg"
//     },
//     { 
//       name: "Cloud Architect", 
//       role: "Infra & DevOps Lead", 
//       bio: "Certified Tier 3 engineer specialising in enterprise cloud infrastructure, cybersecurity, and DevOps transformation for Fortune-level deployments.", 
//       tags: ["AWS", "DevOps", "Cybersecurity"],
//       image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
//       banner: "/Profile/Profile-Banner.jpg"
//     },
//     { 
//       name: "Salesforce Lead", 
//       role: "CRM & Integration", 
//       bio: "35+ Salesforce certifications and deep expertise in CRM implementation, customisation, and enterprise system integrations across multiple industries.", 
//       tags: ["Salesforce CRM", "Integrations", "Training"],
//       image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
//       banner: "/Profile/Profile-Banner.jpg"
//     },
//   ];

//   return (
//     <section className="w-full py-6 md:py-12 bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
//         <div className="text-center mb-8 sm:mb-16">
//           <div className="text-[#1A7FD4] font-nunito font-bold text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-2 sm:mb-4">THE PEOPLE</div>
//           <h2 className="font-nunito font-extrabold text-2xl sm:text-4xl md:text-[42px] text-[#0D1B2A] leading-[1.2] px-2">
//             Leadership That Leads <br/>
//             <span className="text-[#1A7FD4]">By Example</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
//           {team.map((m, i) => <TeamCard key={i} member={m} index={i} />)}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Leadership;
