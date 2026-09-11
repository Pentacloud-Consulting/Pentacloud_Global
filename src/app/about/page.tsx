import AboutHero from "@/Web-Page/About/AboutHero";
import WhoWeAre from "@/Web-Page/About/WhoWeAre";
import WhatDriveUs from "@/Web-Page/About/WhatDriveUs";
import OurJourney from "@/Web-Page/About/OurJourney";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

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
