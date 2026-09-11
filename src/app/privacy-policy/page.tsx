import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import PrivacyPolicy from "@/Details/Terms And Privacy/Privacy Policy";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
