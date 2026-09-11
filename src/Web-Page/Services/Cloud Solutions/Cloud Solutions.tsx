"use client";

import React from "react";
import CloudHero from "./CloudHero";
import CloudServiceHub from "./CloudServiceHub";
import CloudPlatforms from "./CloudPlatforms";
import CloudProcess from "./CloudProcess";
import CloudWhy from "./CloudWhy";

const CloudSolutions = () => {
  return (
    <main className="w-full bg-background">
      <CloudHero />
      <CloudServiceHub />
      <CloudPlatforms />
      <CloudProcess />
      <CloudWhy />
    </main>
  );
};

export default CloudSolutions;
