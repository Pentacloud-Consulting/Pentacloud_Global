import ConsultingAndTraining from "@/Web-Page/Services/Consulting and Training/Consulting and Training";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export default function ConsultingPage() {
  return (
    <main className="w-full min-h-screen overflow-x-clip">
      <Navbar />
      <ConsultingAndTraining />
      <Footer />
    </main>
  );
}
