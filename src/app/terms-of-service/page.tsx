import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import TermsOfServices from "@/Details/Terms And Privacy/Terms of services";

export default function TermsOfServicePage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <TermsOfServices />
      <Footer />
    </main>
  );
}
