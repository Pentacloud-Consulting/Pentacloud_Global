"use client";

import React from "react";
import ConsultingHero from "./ConsultingHero";
import ConsultingOffer from "./ConsultingOffer";
import ConsultingProcess from "./ConsultingProcess";
import TrainingDelivery from "./TrainingDelivery";
import ConsultingWhyPentacloud from "./ConsultingWhyPentacloud";
import ConsultingFAQ from "./ConsultingFAQ";

const ConsultingAndTraining = () => {
  return (
    <div className="bg-background min-h-screen pt-28 sm:pt-32 md:pt-40 pb-6 sm:pb-12 overflow-x-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-[120px] -z-10" />

      <ConsultingHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-8">
        <ConsultingOffer />
        <ConsultingProcess />
        <TrainingDelivery />
        <ConsultingWhyPentacloud />
        <ConsultingFAQ />
      </div>
    </div>
  );
};

export default ConsultingAndTraining;
