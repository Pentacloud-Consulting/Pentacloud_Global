import type { Metadata } from "next";
import ConsultingAndTraining from "@/Web-Page/Services/Consulting and Training/Consulting and Training";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "IT Consulting & Corporate Technology Training | Pentacloud Consulting",
  description: "Strategic IT consulting, digital transformation roadmaps, cloud architecture advisory, enterprise technology upskilling, and corporate IT training.",
  alternates: {
    canonical: "/services/consulting",
  },
};

export default function ConsultingPage() {
  return (
    <main className="w-full min-h-screen overflow-x-clip">
      <Navbar />
      <ConsultingAndTraining />
      <Footer />
    </main>
  );
}
