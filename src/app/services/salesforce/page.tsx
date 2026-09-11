import SalesforceConsultingHero from "@/Web-Page/Services/SalesforceForce/SalesforceConsultingHero";
import WhatWeOffer from "@/Web-Page/Services/SalesforceForce/WhatWeOffer";
import OurExpertise from "@/Web-Page/Services/SalesforceForce/OurExpertise";
import HowWeWork from "@/Web-Page/Services/SalesforceForce/HowWeWork";
import WhyPentacloud from "@/Web-Page/Services/SalesforceForce/WhyPentacloud";
import SalesforcePartners from "@/Web-Page/Services/SalesforceForce/SalesforcePartners";
import SalesforceQuestions from "@/Web-Page/Services/SalesforceForce/SalesforceQuestions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export default function SalesforcePage() {
  return (
    <main className="w-full bg-background min-h-screen overflow-x-clip">
      <Navbar />
      <SalesforceConsultingHero />
      <SalesforcePartners />
      <WhatWeOffer />
      <OurExpertise />
      <HowWeWork />
      <WhyPentacloud />
      <SalesforceQuestions />
      <Footer />
    </main>
  );
}
