import type { Metadata } from "next";
import DigitalMarketing from "@/Web-Page/Services/Digital Marketing/Digital Marketing";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Performance Digital Marketing & SEO Services | Pentacloud Consulting",
  description: "Data-driven SEO, PPC ad management, social media marketing, content marketing, lead generation, and conversion rate optimization (CRO) services.",
  alternates: {
    canonical: "/services/digital-marketing",
  },
};

export default function MarketingPage() {
  return (
    <>
      <Navbar />
      <DigitalMarketing />
      <Footer />
    </>
  );
}
