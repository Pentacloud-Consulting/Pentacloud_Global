"use client";

import React from "react";
import DigitalHero from "./DigitalHero";
import DigitalServices from "./DigitalServices";
import DigitalProcess from "./DigitalProcess";
import DigitalWhyPentacloud from "./DigitalWhyPentacloud";
import DigitalFAQ from "./DigitalFAQ";

const DigitalMarketing = () => {
  return (
    <div className="bg-background min-h-screen pt-16 sm:pt-24 pb-6 sm:pb-12 overflow-x-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] -z-10" />

      <DigitalHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <DigitalServices />
        <DigitalProcess />
        <DigitalWhyPentacloud />
        <DigitalFAQ />
      </div>
    </div>
  );
};

export default DigitalMarketing;
