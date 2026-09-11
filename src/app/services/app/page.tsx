import AppDevelopmentHero from "@/Web-Page/Services/App Development/AppDevelopmentHero";
import AppWhatWeBuild from "@/Web-Page/Services/App Development/AppWhatWeBuild";
import AppTechnology from "@/Web-Page/Services/App Development/AppTechnology";
import AppHowWeBuild from "@/Web-Page/Services/App Development/AppHowWeBuild";
import AppWhyPentacloud from "@/Web-Page/Services/App Development/AppWhyPentacloud";
import AppDevelopQuestions from "@/Web-Page/Services/App Development/AppDevelopQuestions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

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
