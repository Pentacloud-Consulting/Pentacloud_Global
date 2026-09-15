import type { Metadata } from "next";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import PrivacyPolicy from "@/Details/Terms And Privacy/Privacy Policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Pentacloud Consulting",
  description: "Read Pentacloud Consulting's Privacy Policy regarding client data protection, privacy compliance, and information handling practices.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
