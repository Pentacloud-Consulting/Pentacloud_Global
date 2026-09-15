import type { Metadata } from "next";
import WebDevelopmentHero from "@/Web-Page/Services/Web Development/WebDevelopmentHero";
import WebWhatWeBuild from "@/Web-Page/Services/Web Development/WebWhatWeBuild";
import WebTechnology from "@/Web-Page/Services/Web Development/WebTechnology";
import WebHowWeBuild from "@/Web-Page/Services/Web Development/WebHowWeBuild";
import WebWhyPentacloud from "@/Web-Page/Services/Web Development/WebWhyPentacloud";
import WebDevelopQuestions from "@/Web-Page/Services/Web Development/WebDevelopQuestions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Web Development & Custom Web Applications",
  description: "Modern, high-performance web development, Next.js web applications, e-commerce solutions, and enterprise web portals.",
};

export default function WebPage() {
  return (
    <main className="w-full bg-[#F0F6FF] min-h-screen overflow-x-clip">
      <Navbar />
      <WebDevelopmentHero />
      <WebWhatWeBuild />
      <WebTechnology />
      <WebHowWeBuild />
      <WebWhyPentacloud />
      <WebDevelopQuestions />
      <Footer />
    </main>
  );
}
