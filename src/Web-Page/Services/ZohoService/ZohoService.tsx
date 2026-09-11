"use client";

import React from "react";
import ZohoHero from "./ZohoHero";
import ZohoApps from "./ZohoApps";
import ZohoOurServices from "./ZohoOurServices";
import ZohoIndustries from "./ZohoIndustries";
import ZohoFAQ from "./ZohoFAQ";

const ZohoService = () => {
  return (
    <main className="bg-[#F8FBFF] min-h-screen overflow-x-hidden w-full flex flex-col">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <ZohoHero />

      {/* ─── Zoho Ecosystem Section ─────────────────────────────── */}
      <ZohoApps />

      {/* ─── Our Services Section ────────────────────────────────── */}
      <ZohoOurServices />

      {/* ─── Industries Section ──────────────────────────────────── */}
      <ZohoIndustries />



      {/* ─── FAQ Section ─────────────────────────────────────────── */}
      <ZohoFAQ />


    </main>
  );
};

export default ZohoService;
