"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, CheckCircle2, Loader2, Zap, MessageCircle, ChevronDown, Send, Lock
} from "lucide-react";
import { CLAY_CARD, CLAY_INPUT } from "./Constants";
import ContactLocations from "./ContactLocations";
import { supabase } from "../../lib/supabaseClient";

const CustomSelect = ({ label, options, placeholder, value, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <label className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm ml-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`${CLAY_INPUT} px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm flex items-center justify-between cursor-pointer group`}
      >
        <span className={value ? "text-[#0D1B2A]" : "text-[#4A6080]/60"}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-[#1A7FD4] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 left-0 right-0 top-[calc(100%+6px)] bg-background rounded-2xl shadow-[10px_10px_30px_rgba(163,185,210,0.4),-10px_-10px_30px_rgba(255,255,255,0.9)] border border-white/50 overflow-hidden"
          >
            <div className="max-h-[200px] sm:max-h-[240px] overflow-y-auto custom-scrollbar grid grid-cols-2 p-2 gap-1">
              {options.map((opt: string) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2.5 sm:px-4 sm:py-3 font-inter text-xs sm:text-sm text-[#4A6080] hover:bg-[#1A7FD4] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center"
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormBlock = ({ handleSubmit, formStatus, agreed, setAgreed, formData, setFormData, errorMessage, handleReset }: any) => {
  const isFormValid = Boolean(
    agreed &&
    formData.name && formData.name.trim().length > 0 &&
    formData.email && formData.email.trim().length > 0 &&
    formData.service && formData.service.trim().length > 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${CLAY_CARD} p-4 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[32px]`}
    >
      {formStatus === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-8"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-16 h-16 sm:w-24 sm:h-24 bg-background shadow-[inset_3px_3px_8px_rgba(163,185,210,0.3),inset_-3px_-3px_8px_rgba(255,255,255,0.7)] text-[#34C98A] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
          >
             <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-nunito font-black text-[#0D1B2A] mb-4 sm:mb-6">Message Sent! 🎉</h2>
          <p className="text-[#4A6080] text-xs sm:text-base md:text-lg font-inter mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Thank you for reaching out. One of our consultants will contact you within 24 business hours. In the meantime, feel free to explore our services or connect with us on LinkedIn.
          </p>
          <button 
            onClick={handleReset}
            type="button"
            className="bg-[#1A7FD4] text-white px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-nunito font-black text-sm sm:text-xl shadow-[0_10px_20px_rgba(26,127,212,0.25)] hover:-translate-y-1 transition-all"
          >
            Close
          </button>
        </motion.div>
      ) : (
        <>
          <div className="mb-5 sm:mb-8">
            <h3 className="text-xl sm:text-3xl font-nunito font-black text-[#0D1B2A] mb-2 sm:mb-3">Contact for Business</h3>
            <p className="text-[#4A6080] font-inter text-xs sm:text-sm leading-relaxed">Fill in the form below and one of our consultants will reach out within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-1.5">
            <label className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm ml-2">Full Name *</label>
            <input
              required
              minLength={2}
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`${CLAY_INPUT} px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm ml-2">Work Email *</label>
            <input
              required
              type="email"
              placeholder="your@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`${CLAY_INPUT} px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-1.5">
            <label className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm ml-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 or +971 ..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`${CLAY_INPUT} px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm`}
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm ml-2">Company Name</label>
            <input
              type="text"
              placeholder="Your company name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`${CLAY_INPUT} px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm`}
            />
          </div>
        </div>

        <CustomSelect 
          label="Service You're Interested In *"
          placeholder="Select a service"
          options={["Salesforce Consulting", "Cloud Solutions", "Web Development", "App Development", "Digital Marketing", "Data Migration", "Consulting & Training", "Zoho Services", "Multiple Services", "Not Sure, Need Advice"]}
          value={formData.service}
          onChange={(val: string) => setFormData({ ...formData, service: val })}
        />

        <div className="flex items-center gap-3 px-2">
          <div className="shrink-0 flex">
             <input 
               id="consent" 
               type="checkbox" 
               required 
               checked={agreed}
               onChange={(e) => setAgreed(e.target.checked)}
               className="w-4 h-4 rounded border-[#1A7FD4]/20 text-[#1A7FD4] focus:ring-[#1A7FD4]/20 cursor-pointer" 
             />
          </div>
          <label htmlFor="consent" className="text-[10px] sm:text-xs text-[#4A6080] font-inter leading-relaxed cursor-pointer select-none pt-[2px]">
            I agree to Pentacloud Consulting storing my details to respond to this enquiry.
          </label>
        </div>

        {/* Error message */}
        {formStatus === "error" && errorMessage && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-inter text-xs sm:text-sm">
            ⚠️ {errorMessage}
          </div>
        )}

        <button 
          type="submit"
          disabled={formStatus === "loading" || !isFormValid}
          className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-nunito font-black text-sm sm:text-xl flex items-center justify-center gap-2.5 transition-all ${
            isFormValid
              ? "bg-[#1A7FD4] text-white shadow-[0_10px_20px_rgba(26,127,212,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {formStatus === "loading" ? (
            <>Processing... <Loader2 size={20} className="animate-spin" /></>
          ) : (
            <>Send Message <Send size={20} /></>
          )}
        </button>
          </form>
        </>
      )}
    </motion.div>
  );
};

const ContactInfoForm = ({ activeTab, onTabChange }: any) => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
  });

  const handleReset = () => {
    setFormStatus("idle");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
    });
    setAgreed(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      // Call our own server-side API route (avoids browser network restrictions)
      const res = await fetch('/api/contact/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company,
          service: formData.service,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      // Also save to localStorage so dashboard shows it immediately
      if (data.lead) {
        try {
          const stored = localStorage.getItem('MOCK_LEADS');
          const leads = stored ? JSON.parse(stored) : [];
          leads.unshift(data.lead);
          localStorage.setItem('MOCK_LEADS', JSON.stringify(leads));
        } catch (_) {}
      }

      setFormStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setErrorMessage(message);
      setFormStatus("error");
    }
  };

  return (
    <div className="bg-background min-h-screen pt-16 sm:pt-24 pb-4 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-start">
            
            {/* LEFT SIDE: HERO + INFO + SOCIAL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 space-y-4 sm:space-y-8"
            >
              {/* [image 2] Area: Intro Header */}
              <div>
                <div className="bg-background shadow-[3px_3px_8px_rgba(163,185,210,0.3),-3px_-3px_8px_rgba(255,255,255,0.75)] text-[#1A7FD4] font-nunito font-black text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] rounded-full px-4 py-1.5 mb-4 sm:mb-8 inline-block uppercase">
                  GET IN TOUCH
                </div>
                
                <h1 className="font-nunito font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] mb-4 sm:mb-6 leading-[1.2] lg:leading-[1.1]">
                  Let's Build Something <br/>
                  <span className="text-[#1A7FD4]">Extraordinary</span> <br/>
                  Together.
                </h1>
                
                <p className="font-inter text-[#4A6080] text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
                  Whether you have a project in mind, need expert advice, or just want to explore how Pentacloud can help your business grow.
                </p>
                
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                  {[
                    { icon: <Zap size={14} className="text-[#1A7FD4] shrink-0 animate-pulse" />, text: "Response Within 24hrs", color: "text-[#1A7FD4]", border: "border-[#1A7FD4]/10" },
                    { icon: <Lock size={14} className="text-[#34C98A] shrink-0" />, text: "100% Confidential", color: "text-[#34C98A]", border: "border-[#34C98A]/10" }
                  ].map((pill, i) => (
                    <div 
                      key={i} 
                      className={`bg-white/60 backdrop-blur-sm px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-[3px_3px_10px_rgba(163,185,210,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)] border ${pill.border} flex items-center gap-2 hover:scale-[1.03] hover:shadow-md transition-all duration-300`}
                    >
                      {pill.icon}
                      <span className={`font-nunito font-extrabold text-[10px] sm:text-xs tracking-wide ${pill.color}`}>{pill.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Only: Form Block inserted immediately after the Intro info */}
              <div className="block lg:hidden">
                <FormBlock 
                  handleSubmit={handleSubmit}
                  formStatus={formStatus}
                  agreed={agreed}
                  setAgreed={setAgreed}
                  formData={formData}
                  setFormData={setFormData}
                  errorMessage={errorMessage}
                  handleReset={handleReset}
                />
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-3 sm:space-y-4 pt-4 lg:pt-0">
                 <div className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm border border-[#1A7FD4]/10 flex items-center justify-center text-[#1A7FD4] group-hover:scale-105 transition-transform shrink-0">
                       <Mail size={15} />
                    </div>
                    <span className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm break-all">contactus@pentacloudconsulting.com</span>
                 </div>
                 <div className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm border border-[#34C98A]/10 flex items-center justify-center text-[#34C98A] group-hover:scale-105 transition-transform shrink-0">
                       <MessageCircle size={15} />
                    </div>
                    <span className="font-nunito font-black text-[#0D1B2A] text-xs sm:text-sm">+971 545 132 807</span>
                 </div>
              </div>



              {/* Follow Us Section - aligned in exactly 1 line */}
              <div>
                <span className="font-nunito font-black text-[#0D1B2A] uppercase tracking-wider text-[9px] sm:text-[10px] mb-3 block">FOLLOW US</span>
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
                  {[
                    { 
                      label: "LinkedIn", 
                      url: "https://www.linkedin.com/company/pentacloudconsulting/",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-[360deg]">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      ),
                      hoverClass: "group-hover:text-white group-hover:bg-[#0A66C2] group-hover:shadow-[0_8px_20px_rgba(10,102,194,0.3)]",
                      hoverText: "group-hover:text-[#0A66C2]",
                      borderColor: "hover:border-[#0A66C2]/40"
                    },
                    { 
                      label: "Instagram", 
                      url: "https://www.instagram.com/pentacloudconsulting/",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-[360deg]">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                      hoverClass: "group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-[#FD1D1D] group-hover:via-[#E1306C] group-hover:to-[#C13584] group-hover:shadow-[0_8px_20px_rgba(225,48,108,0.3)]",
                      hoverText: "group-hover:text-[#E1306C]",
                      borderColor: "hover:border-[#E1306C]/40"
                    },
                    { 
                      label: "Facebook", 
                      url: "https://www.facebook.com/profile.php?id=61573242994665&mibextid=wwXIfr&rdid=a9vdt4aEsAkRZwBi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CP9RauVy6%2F%3Fmibextid%3DwwXIfr#",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-[360deg]">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      ),
                      hoverClass: "group-hover:text-white group-hover:bg-[#1877F2] group-hover:shadow-[0_8px_20px_rgba(24,119,242,0.3)]",
                      hoverText: "group-hover:text-[#1877F2]",
                      borderColor: "hover:border-[#1877F2]/40"
                    },
                    { 
                      label: "X (Twitter)", 
                      url: "https://x.com/pentacloudind?s=21",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-[360deg]">
                          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                          <path d="M20 4L4 20" />
                        </svg>
                      ),
                      hoverClass: "group-hover:text-white group-hover:bg-[#000000] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
                      hoverText: "group-hover:text-black",
                      borderColor: "hover:border-black/40"
                    }
                  ].map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[3px_3px_10px_rgba(163,185,210,0.15),-3px_-3px_10px_rgba(255,255,255,0.7)] ${social.borderColor} transition-all duration-300 group text-center cursor-pointer`}
                    >
                      <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-[1px_1px_3px_rgba(163,185,210,0.15),-1px_-1px_3px_rgba(255,255,255,0.8)] text-[#4A6080] flex items-center justify-center shrink-0 transition-all duration-300 ${social.hoverClass}`}>
                        {social.icon}
                      </div>
                      <span className={`font-nunito font-extrabold text-[9px] sm:text-xs text-[#4A6080] ${social.hoverText} mt-2 sm:mt-2.5 transition-colors duration-300 uppercase tracking-wider`}>
                        {social.label.split(" ")[0]}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Desktop Only: Form Block */}
            <div className="hidden lg:block">
              <FormBlock 
                handleSubmit={handleSubmit}
                formStatus={formStatus}
                agreed={agreed}
                setAgreed={setAgreed}
                formData={formData}
                setFormData={setFormData}
                errorMessage={errorMessage}
                handleReset={handleReset}
              />
            </div>
          </div>
        
        {/* Office Locations Section */}
        <div className="mt-8 sm:mt-12">
          <ContactLocations />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
