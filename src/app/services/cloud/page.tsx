import type { Metadata } from "next";
import CloudSolutions from "@/Web-Page/Services/Cloud Solutions/Cloud Solutions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Cloud Migration, Security & Managed Services",
  description: "Enterprise cloud architecture, AWS, Azure, Google Cloud migration, DevOps, and 24/7 cloud infrastructure management.",
};

export default function CloudPage() {
  return (
    <main className="w-full min-h-screen overflow-x-clip">
      <Navbar />
      <CloudSolutions />
      <Footer />
    </main>
  );
}
