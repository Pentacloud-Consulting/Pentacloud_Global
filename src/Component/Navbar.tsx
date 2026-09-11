"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, ArrowRight, Cloud, Settings, Database, Code, Smartphone, RefreshCw, GraduationCap, LayoutGrid } from "lucide-react";
 
const getMobileIcon = (iconName: string | undefined) => {
  switch (iconName) {
    case "Salesforce": return <Cloud size={16} />;
    case "Zoho": return <Settings size={16} />;
    case "Cloud": return <Database size={16} />;
    case "Web": return <Code size={16} />;
    case "App": return <Smartphone size={16} />;
    case "Marketing": return <Globe size={16} />;
    case "Migration": return <RefreshCw size={16} />;
    case "Consulting": return <GraduationCap size={16} />;
    default: return <LayoutGrid size={16} />;
  }
};
import Link from "next/link";
import Image from "next/image";
import { SwipeMaskNav } from "@/Animation/NavbarAnimation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "#", 
      hasDropdown: true,
      subItems: [
        { 
          name: "Salesforce Consulting", 
          href: "/services/salesforce",
          icon: "Salesforce",
          description: "Certified implementation and optimization."
        },
        { 
          name: "Zoho Service", 
          href: "/services/zoho",
          icon: "Zoho",
          description: "End-to-end Zoho suite automation."
        },
        { 
          name: "Cloud Solution", 
          href: "/services/cloud",
          icon: "Cloud",
          description: "Scalable infrastructure and migration."
        },
        { 
          name: "Web Development", 
          href: "/services/web",
          icon: "Web",
          description: "High-performance modern websites."
        },
        { 
          name: "App Development", 
          href: "/services/app",
          icon: "App",
          description: "Native iOS and Android applications."
        },
        { 
          name: "Digital Marketing", 
          href: "/services/digital-marketing",
          icon: "Marketing",
          description: "Data-driven growth and ROI focus."
        },
        { 
          name: "Data Migration", 
          href: "/services/data-migration",
          icon: "Migration",
          description: "Secure and zero-loss data transfers."
        },
        { 
          name: "Consulting And Training", 
          href: "/services/consulting",
          icon: "Consulting",
          description: "Expert guidance and team upskilling."
        },
      ]
    },
    { name: "Contact Us", href: "/contact" },
    { name: "Career", href: "/careers" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled ? "pt-2 px-2 md:px-4" : "pt-0 px-0"}`}>
      <nav
        className={`w-full transition-all duration-500 relative ${
          isScrolled
            ? "max-w-[98%] xl:max-w-[98%] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] rounded-2xl py-2.5 sm:py-3 px-4 sm:px-6 md:px-8"
            : "max-w-full bg-transparent py-4 sm:py-6 px-4 sm:px-8 md:px-12"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image 
              src="/Logo/Pentacloud logo.png" 
              alt="Pentacloud Logo" 
              width={180} 
              height={45} 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <SwipeMaskNav items={navLinks} />
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1.5 text-slate-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              key={isMobileMenuOpen ? "close" : "menu"}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`absolute left-0 right-0 bg-background/95 backdrop-blur-2xl border border-white/50 p-5 md:hidden shadow-2xl z-50 max-h-[calc(100vh-100px)] overflow-y-auto ${
                isScrolled ? "top-[calc(100%+0.75rem)] rounded-2xl" : "top-full border-b"
              }`}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col">
                    {link.hasDropdown ? (
                      <div className="flex flex-col">
                        <button 
                          onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                          className="flex items-center justify-between text-base font-bold text-slate-900 hover:text-blue-600 transition-colors w-full py-1.5 focus:outline-none"
                        >
                          <span>{link.name}</span>
                          <motion.div
                            animate={{ rotate: isServicesExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isServicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-3 border-l border-slate-100 flex flex-col gap-2.5 mt-1"
                            >
                              <div className="grid grid-cols-1 gap-2.5 py-1">
                                {link.subItems?.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className="flex items-center gap-3 group"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setIsServicesExpanded(false);
                                    }}
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                      {getMobileIcon(sub.icon)}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sub.name}</span>
                                      <span className="text-[10px] text-slate-500 line-clamp-1">{sub.description}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors py-1.5"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsServicesExpanded(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <hr className="border-slate-100/80 my-1" />
                <div className="flex flex-col pt-1">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all block w-full">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
