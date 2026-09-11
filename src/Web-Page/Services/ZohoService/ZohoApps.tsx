"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Users, BookOpen, LayoutDashboard, Megaphone, 
  CheckSquare, Headphones, BarChart2, Code2, 
  UserPlus, Package, GitMerge, Check,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { CLAY_CARD, CLAY_ICON } from "./Constants";

const apps = [
  {
    icon: <Users size={28} />,
    title: "Zoho CRM",
    category: "Sales & CRM",
    color: "bg-blue-50 text-[#1A7FD4]",
    body: "The core of the Zoho ecosystem. We implement and customise Zoho CRM to match your exact sales process, lead management, pipeline tracking, automation rules, custom modules, and third-party integrations.",
    features: ["Lead & contact management", "Deal pipeline & forecasting", "Workflow automation", "Custom modules & fields", "Email integration", "Mobile CRM app", "Sales analytics & reports"]
  },
  {
    icon: <BookOpen size={28} />,
    title: "Zoho Books",
    category: "Finance & Accounting",
    color: "bg-green-50 text-[#34C98A]",
    body: "Complete cloud accounting for growing businesses, invoicing, expense tracking, bank reconciliation, GST compliance, and financial reporting. We implement Zoho Books with full chart of accounts setup.",
    features: ["GST-compliant invoicing", "Expense management", "Bank reconciliation", "Financial statements", "Project billing", "Inventory integration", "Multi-currency support"]
  },
  {
    icon: <LayoutDashboard size={28} />,
    title: "Zoho One",
    category: "Business Suite",
    color: "bg-amber-50 text-[#F59E0B]",
    body: "Zoho One is the all-in-one operating system for business, 40+ integrated apps covering every business function. We manage complete Zoho One deployments from provisioning to organization-wide rollout.",
    features: ["40+ integrated business apps", "Single sign-on (SSO)", "Centralised user management", "Cross-app automation", "Unified analytics", "Mobile access all apps", "Admin console management"]
  },
  {
    icon: <Megaphone size={28} />,
    title: "Zoho Campaigns",
    category: "Email Marketing",
    color: "bg-pink-50 text-[#EC4899]",
    body: "Full-featured email marketing platform integrated natively with Zoho CRM. We set up Zoho Campaigns with list segmentation, automated nurture sequences, A/B testing, and CRM sync.",
    features: ["Email campaign creation", "List segmentation", "Automated workflows", "A/B testing", "CRM contact sync", "Engagement analytics", "Landing page builder"]
  },
  {
    icon: <CheckSquare size={28} />,
    title: "Zoho Projects",
    category: "Project Management",
    color: "bg-indigo-50 text-[#6366F1]",
    body: "End-to-end project management for teams of every size, tasks, milestones, Gantt charts, and time tracking. We configure Zoho Projects to match your methodology, whether waterfall, agile, or hybrid.",
    features: ["Task & milestone management", "Gantt chart planning", "Time tracking & timesheets", "Resource allocation", "Budget management", "Client portal access", "CRM & Books integration"]
  },
  {
    icon: <Headphones size={28} />,
    title: "Zoho Desk",
    category: "Customer Support",
    color: "bg-cyan-50 text-[#06B6D4]",
    body: "Context-aware customer support platform that connects your support team with your CRM data. We implement Zoho Desk with omni-channel support, SLA management, and knowledge base setup.",
    features: ["Multi-channel ticket management", "SLA & escalation rules", "Knowledge base creation", "AI-powered Zia assistant", "Customer satisfaction ratings", "CRM integration", "Reports & dashboards"]
  },
  {
    icon: <BarChart2 size={28} />,
    title: "Zoho Analytics",
    category: "Business Intelligence",
    color: "bg-purple-50 text-[#8B5CF6]",
    body: "Self-service business intelligence connecting data from all your Zoho apps and external sources into powerful dashboards. We build custom environments covering sales performance and operational KPIs.",
    features: ["Drag-and-drop report builder", "Multi-source data blending", "AI-powered insights (Zia)", "Interactive dashboards", "Scheduled email reports", "Mobile analytics app", "Embedded analytics option"]
  },
  {
    icon: <Code2 size={28} />,
    title: "Zoho Creator",
    category: "Low-Code Apps",
    color: "bg-orange-50 text-[#F97316]",
    body: "Low-code application development platform for building custom business apps. We use Zoho Creator to build bespoke workflows, approval processes, and field service apps that integrate with your stack.",
    features: ["Visual app builder", "Custom workflow automation", "Form & report creation", "Offline mobile apps", "Third-party integrations", "Role-based access control", "Zoho ecosystem integration"]
  },
  {
    icon: <UserPlus size={28} />,
    title: "Zoho Recruit",
    category: "HR & Recruitment",
    color: "bg-red-50 text-[#EF4444]",
    body: "End-to-end recruitment platform covering job posting, sourcing, and applicant tracking. We implement Zoho Recruit with custom hiring workflows and integration with Zoho People for onboarding.",
    features: ["Job posting & sourcing", "Candidate pipeline management", "Interview scheduling", "Assessment integration", "Career portal setup", "Offer letter automation", "Zoho People integration"]
  },
  {
    icon: <Users size={28} />,
    title: "Zoho People",
    category: "HR Management",
    color: "bg-blue-50 text-[#3B82F6]",
    body: "Cloud HR management covering employee records, leave, attendance, and appraisals. We configure Zoho People to match your HR policies, leave structures, and performance appraisal cycles.",
    features: ["Employee self-service portal", "Leave & attendance management", "Performance appraisal cycles", "Document management", "Shift & schedule management", "Payroll integration", "HR analytics & reports"]
  },
  {
    icon: <Package size={28} />,
    title: "Zoho Inventory",
    category: "Inventory Management",
    color: "bg-emerald-50 text-[#10B981]",
    body: "Multi-channel inventory management tracking stock levels, purchase orders, and sales orders in real time. Integrated natively with Zoho Books and popular eCommerce platforms.",
    features: ["Multi-warehouse management", "Purchase order management", "Sales order processing", "Barcode scanning support", "Shopify & Amazon integration", "Zoho Books integration", "Low stock alerts"]
  },
  {
    icon: <GitMerge size={28} />,
    title: "Zoho Flow",
    category: "Integration & Automation",
    color: "bg-slate-50 text-[#475569]",
    body: "Zoho's native integration platform connecting Zoho apps with 800+ third-party services. We design complex multi-step automation workflows that eliminate manual data entry completely.",
    features: ["800+ app connections", "Multi-step workflow builder", "Conditional logic & filters", "Error handling & retries", "Real-time & scheduled flows", "Webhook support", "Zoho CRM deep integration"]
  }
];

const ZohoApps = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Update visible count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(apps.length / visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <section className="pt-8 sm:pt-14 pb-10 sm:pb-24 px-4 sm:px-6 bg-[#F8FBFF] overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(26,127,212,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-blue-50 text-[#1A7FD4] rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-[3px] mb-4 sm:mb-6"
          >
            ZOHO ECOSYSTEM
          </motion.div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-nunito font-black text-[#0D1B2A] mb-4 sm:mb-6 leading-tight">
            45+ Zoho Apps. <br/> <span className="text-[#1A7FD4]">One Unified Partner.</span>
          </h2>
          <p className="text-[#4A6080] font-inter text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From CRM to accounting, marketing to HR, we implement and optimise every corner of the Zoho ecosystem for your business.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative px-1 sm:px-10 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-1 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white hover:scale-110 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 lg:opacity-100 lg:group-hover:opacity-100 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-7 sm:h-7" strokeWidth={3} />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-1 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-[#1A7FD4] hover:bg-[#1A7FD4] hover:text-white hover:scale-110 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 lg:opacity-100 lg:group-hover:opacity-100 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-7 sm:h-7" strokeWidth={3} />
          </button>

          {/* Cards Wrapper */}
          <div className="overflow-hidden py-2 sm:py-4">
            <motion.div 
              className="flex gap-4 sm:gap-8 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ right: 0, left: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                const threshold = 100;
                if (swipe < -threshold) {
                  nextSlide();
                } else if (swipe > threshold) {
                  prevSlide();
                }
              }}
              animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * (visibleCount === 1 ? 16 : 32)}px)` }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
              {apps.map((app, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 select-none"
                  style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * (visibleCount === 1 ? 16 : 32) / visibleCount}px)` }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`${CLAY_CARD} p-5 sm:p-8 group hover:-translate-y-2 transition-all duration-500 flex flex-col h-full min-h-[380px] sm:min-h-[460px] rounded-[20px] sm:rounded-[32px]`}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${CLAY_ICON} ${app.color.split(" ")[1]} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shrink-0 [&_svg]:w-5.5 [&_svg]:h-5.5 [&_svg]:sm:w-7 [&_svg]:sm:h-7`}>
                       {app.icon}
                    </div>
                    <div className="flex-grow flex flex-col">
                       <p className="text-[8.5px] sm:text-[10px] font-black text-[#1A7FD4] uppercase tracking-[1.5px] sm:tracking-[2px] mb-1.5">{app.category}</p>
                       <h3 className="text-lg sm:text-2xl font-nunito font-black text-[#0D1B2A] mb-2 sm:mb-4">{app.title}</h3>
                       <p className="text-xs sm:text-sm text-[#4A6080] font-inter leading-relaxed mb-4 sm:mb-8 line-clamp-4 flex-grow">
                          {app.body}
                       </p>
                       <div className="space-y-2 sm:space-y-3 mt-auto">
                          {app.features.slice(0, 4).map((feature, idx) => (
                             <div key={idx} className="flex items-center gap-2 sm:gap-3 text-[9.5px] sm:text-[11px] font-bold text-[#0D1B2A] min-w-0">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#1A7FD4] shrink-0">
                                   <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={3} />
                                </div>
                                <span className="truncate">{feature}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-12">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === i ? "w-6 sm:w-10 bg-[#1A7FD4] shadow-[0_0_10px_rgba(26,127,212,0.3)]" : "w-2 sm:w-2.5 bg-[#1A7FD4]/20 hover:bg-[#1A7FD4]/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZohoApps;
