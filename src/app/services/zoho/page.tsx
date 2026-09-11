import ZohoService from "@/Web-Page/Services/ZohoService/ZohoService";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoho Service - Pentacloud Consulting",
  description: "Advanced Zoho implementation and automation services for modern businesses.",
};

export default function ZohoServicePage() {
  return (
    <main>
      <Navbar />
      <ZohoService />
      <Footer />
    </main>
  );
}
