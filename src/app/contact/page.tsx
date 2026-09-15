import type { Metadata } from "next";
import Contact from "@/Web-Page/Contact/Contact";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Contact Pentacloud Consulting | Get in Touch with IT Experts",
  description: "Contact Pentacloud Consulting for cloud solutions, Salesforce implementation, Zoho integration, app development, or IT consulting inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}
