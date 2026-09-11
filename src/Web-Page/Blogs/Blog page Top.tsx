"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, ChevronDown, Globe } from 'lucide-react';

const CLAY_CARD = "bg-background rounded-[20px] sm:rounded-[28px] shadow-[8px_8px_16px_rgba(163,185,210,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)]";
const CLAY_PILL = "rounded-full shadow-[2px_2px_6px_rgba(163,185,210,0.3),-2px_-2px_6px_rgba(255,255,255,0.7)]";

export const CATEGORIES = [
  "All categories",
  "Salesforce Consulting",
  "Salesforce Integration",
  "Salesforce Customization",
  "Salesforce Implementation",
  "Salesforce Support",
  "Salesforce Training",
  "Salesforce Marketing",
  "Cloud Solution"
];

// ─── Domain-specific content config ──────────────────────────────────────────
const DOMAIN_CONTENT: Record<string, {
  badge: string;
  headingMain: string;
  headingAccent: string;
  description: string;
  accent: string;
  accentLight: string;
  accentBg: string;
  accentGlow: string;
  flag: string;
  tagline: string;
}> = {
  'pentacloud.in': {
    badge: 'INSIGHTS & UPDATES',
    headingMain: 'Insights &',
    headingAccent: 'Innovation',
    description: 'Stay ahead with our latest thoughts on Salesforce excellence, Cloud strategy, Digital marketing, and the future of enterprise technology — from India\'s leading Salesforce partner.',
    accent: '#1A7FD4',
    accentLight: '#1A7FD4/30',
    accentBg: '#F0F7FF',
    accentGlow: 'rgba(26,127,212,0.15)',
    flag: '🇮🇳',
    tagline: 'Pentacloud Consulting India',
  },
  'pentacloudconsulting.com': {
    badge: 'GLOBAL INSIGHTS',
    headingMain: 'Global',
    headingAccent: 'Expertise',
    description: 'Explore our Salesforce consulting insights for UAE, Dubai, Qatar and global markets. Real-world strategies, implementation guides, and enterprise cloud solutions from Pentacloud Consulting.',
    accent: '#0A4FA6',
    accentLight: '#0A4FA6/30',
    accentBg: '#EEF4FF',
    accentGlow: 'rgba(10,79,166,0.15)',
    flag: '🌐',
    tagline: 'Pentacloud Consulting',
  },
};

const DEFAULT_CONTENT = DOMAIN_CONTENT['pentacloud.in'];

export function BlogPageTop({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, setVisibleCount, activeDomain, onSwitchDomain }: any) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const content = DOMAIN_CONTENT[activeDomain] || DEFAULT_CONTENT;
  const isConsulting = activeDomain === 'pentacloudconsulting.com';

  return (
    <>
      {/* ══ HERO HEADER ════════════════════════════════════════ */}
      <div className="text-center mb-6 sm:mb-16">

        {/* ── Domain Badge strip ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain + '-badge'}
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-5"
          >
            {/* Domain label pill */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[11px] font-nunito font-bold tracking-widest border"
              style={{
                color: content.accent,
                borderColor: `${content.accent}30`,
                background: content.accentBg,
              }}
            >
              {content.flag} {content.tagline.toUpperCase()}
            </span>

            {/* Insights badge */}
            <span
              className={`${CLAY_PILL} inline-flex items-center gap-1.5 bg-background font-nunito font-bold text-[9px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] px-3 py-1 sm:px-4 sm:py-1.5 shadow-[inset_3px_3px_8px_rgba(163,185,210,0.25),inset_-3px_-3px_8px_rgba(255,255,255,0.7)]`}
              style={{ color: content.accent }}
            >
              <BookOpen size={10} />
              {content.badge}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* ── Main Heading ── */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeDomain + '-heading'}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as any }}
            className="font-nunito font-black text-xl sm:text-4xl md:text-6xl text-[#0D1B2A] mb-2 sm:mb-5 leading-[1.2] md:leading-[1.1]"
          >
            {content.headingMain}{' '}
            <span className="relative" style={{ color: content.accent }}>
              {content.headingAccent}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 w-full h-0.75 rounded-full origin-left block"
                style={{ background: `${content.accent}30` }}
              />
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* ── Description ── */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeDomain + '-desc'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-inter text-[#4A6080] max-w-2xl mx-auto text-[11px] sm:text-base md:text-[17px] leading-relaxed mb-4 sm:mb-8 px-2"
          >
            {content.description}
          </motion.p>
        </AnimatePresence>

        {/* ── Domain Toggle Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-10"
        >
          <span className="font-nunito font-bold text-[11px] sm:text-sm text-[#4A6080] flex items-center gap-1">
            <Globe size={12} /> Blogs From:
          </span>

          {/* pentacloud.in button */}
          <button
            type="button"
            onClick={() => onSwitchDomain && onSwitchDomain('pentacloud.in')}
            className={`cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-nunito font-bold text-[11px] sm:text-sm transition-all duration-300 flex items-center gap-1 ${
              activeDomain === 'pentacloud.in'
                ? 'text-white shadow-md scale-105'
                : 'bg-white border hover:shadow-sm'
            }`}
            style={
              activeDomain === 'pentacloud.in'
                ? { background: DOMAIN_CONTENT['pentacloud.in'].accent }
                : { color: DOMAIN_CONTENT['pentacloud.in'].accent, borderColor: `${DOMAIN_CONTENT['pentacloud.in'].accent}40`, background: DOMAIN_CONTENT['pentacloud.in'].accentBg }
            }
          >
            🇮🇳 pentacloud.in
          </button>

          {/* pentacloudconsulting.com button */}
          <button
            type="button"
            onClick={() => onSwitchDomain && onSwitchDomain('pentacloudconsulting.com')}
            className={`cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-nunito font-bold text-[11px] sm:text-sm transition-all duration-300 flex items-center gap-1 ${
              activeDomain === 'pentacloudconsulting.com'
                ? 'text-white shadow-md scale-105'
                : 'bg-white border hover:shadow-sm'
            }`}
            style={
              activeDomain === 'pentacloudconsulting.com'
                ? { background: DOMAIN_CONTENT['pentacloudconsulting.com'].accent }
                : { color: DOMAIN_CONTENT['pentacloudconsulting.com'].accent, borderColor: `${DOMAIN_CONTENT['pentacloudconsulting.com'].accent}40`, background: DOMAIN_CONTENT['pentacloudconsulting.com'].accentBg }
            }
          >
            🌐 pentacloudconsulting.com
          </button>
        </motion.div>

        {/* ── Active domain indicator bar ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain + '-bar'}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-2 rounded-full h-1 w-24 sm:w-48 origin-center"
            style={{ background: `linear-gradient(90deg, ${content.accent}00, ${content.accent}, ${content.accent}00)` }}
          />
        </AnimatePresence>
      </div>

      {/* ── Search & Filter Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-row items-center justify-between gap-2 sm:gap-6 w-full mb-6 sm:mb-12"
      >
        {/* Search Bar */}
        <div
          className={`${CLAY_CARD} flex-1 flex items-center gap-1.5 sm:gap-3 px-3 py-2.5 sm:px-5 sm:py-4 rounded-full transition-all duration-300 min-w-0`}
          style={{ ['--tw-shadow-color' as any]: content.accentGlow }}
        >
          <Search size={16} className="shrink-0 text-[#8BA4BE]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
            placeholder={isConsulting ? "Search insights..." : "Search articles..."}
            className="flex-1 font-inter text-xs sm:text-[15px] text-[#0D1B2A] bg-transparent outline-none placeholder:text-[#8BA4BE] min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#8BA4BE] hover:text-[#1A7FD4] text-xs font-bold transition-colors p-0.5"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative shrink-0 z-50 w-[130px] xs:w-[150px] sm:w-[240px]">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`${CLAY_CARD} flex items-center justify-between gap-1.5 px-3 py-2.5 sm:px-5 sm:py-4 font-nunito font-bold text-xs sm:text-[15px] text-[#0D1B2A] rounded-full w-full transition-all duration-300 hover:-translate-y-0.5`}
          >
            <Filter size={15} style={{ color: content.accent }} className="shrink-0" />
            <span className="truncate flex-1 text-left">{activeCategory}</span>
            <ChevronDown size={15} className={`text-[#8BA4BE] shrink-0 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-[220px] sm:w-[260px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.15)] border border-white/20 overflow-hidden"
              >
                <div className="flex flex-col max-h-[60vh] overflow-y-auto p-1.5 sm:p-2 custom-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setVisibleCount(6);
                        setIsFilterOpen(false);
                      }}
                      className="text-left px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-nunito font-bold text-xs sm:text-sm transition-all duration-200"
                      style={
                        activeCategory === cat
                          ? { background: content.accent, color: '#fff' }
                          : { color: '#4A6080' }
                      }
                      onMouseEnter={e => {
                        if (activeCategory !== cat) {
                          (e.currentTarget as HTMLButtonElement).style.background = content.accentBg;
                          (e.currentTarget as HTMLButtonElement).style.color = content.accent;
                        }
                      }}
                      onMouseLeave={e => {
                        if (activeCategory !== cat) {
                          (e.currentTarget as HTMLButtonElement).style.background = '';
                          (e.currentTarget as HTMLButtonElement).style.color = '#4A6080';
                        }
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
