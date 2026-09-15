import type { Metadata } from "next";
import AppDevelopmentHero from "@/Web-Page/Services/App Development/AppDevelopmentHero";
import AppWhatWeBuild from "@/Web-Page/Services/App Development/AppWhatWeBuild";
import AppTechnology from "@/Web-Page/Services/App Development/AppTechnology";
import AppHowWeBuild from "@/Web-Page/Services/App Development/AppHowWeBuild";
import AppWhyPentacloud from "@/Web-Page/Services/App Development/AppWhyPentacloud";
import AppDevelopQuestions from "@/Web-Page/Services/App Development/AppDevelopQuestions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Mobile & Web App Development Services | Pentacloud Consulting",
  description: "Enterprise mobile app development for iOS and Android, cross-platform apps with React Native & Flutter, and custom scalable web application development.",
  alternates: {
    canonical: "/services/app",
  },
};

export default function AppPage() {
  return (
    <main className="w-full bg-background min-h-screen overflow-x-clip">
      <Navbar />
      <AppDevelopmentHero />
      <AppWhatWeBuild />
      <AppTechnology />
      <AppHowWeBuild />
      <AppWhyPentacloud />
      <AppDevelopQuestions />
      <Footer />
    </main>
  );
}
