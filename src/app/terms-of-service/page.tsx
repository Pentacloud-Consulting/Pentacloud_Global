import type { Metadata } from "next";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import TermsOfServices from "@/Details/Terms And Privacy/Terms of services";

export const metadata: Metadata = {
  title: "Terms of Service | Pentacloud Consulting",
  description: "Read the Terms of Service governing the use of Pentacloud Consulting's website and technology consulting services.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <TermsOfServices />
      <Footer />
    </main>
  );
}
