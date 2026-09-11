"use client";

import React from "react";
import MigrationHero from "./MigrationHero";
import MigrationServices from "./MigrationServices";
import MigrationProcess from "./MigrationProcess";
import MigrationWhyPentacloud from "./MigrationWhyPentacloud";
import MigrationCompliance from "./MigrationCompliance";
import MigrationFAQ from "./MigrationFAQ";

const DataMigration = () => {
  return (
    <div className="bg-background min-h-screen pt-16 sm:pt-24 pb-6 sm:pb-12 overflow-x-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] -z-10" />

      <MigrationHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <MigrationServices />
        <MigrationProcess />
        <MigrationWhyPentacloud />
        <MigrationCompliance />
        <MigrationFAQ />
      </div>
    </div>
  );
};

export default DataMigration;
