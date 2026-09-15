import type { Metadata } from "next";
import AboutHero from "@/Web-Page/About/AboutHero";
import WhoWeAre from "@/Web-Page/About/WhoWeAre";
import WhatDriveUs from "@/Web-Page/About/WhatDriveUs";
import OurJourney from "@/Web-Page/About/OurJourney";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "About Pentacloud Consulting | Trusted Technology & Cloud Partner",
  description: "Pentacloud Consulting delivers end-to-end technology solutions including Salesforce, Zoho, Cloud migration, web/mobile development, and IT consulting across India, UAE, and Qatar.",
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <AboutHero />
      <WhoWeAre />
      <WhatDriveUs />
      <OurJourney />
      <Footer />
    </main>
  );
}
