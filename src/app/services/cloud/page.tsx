import CloudSolutions from "@/Web-Page/Services/Cloud Solutions/Cloud Solutions";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export default function CloudPage() {
  return (
    <main className="w-full min-h-screen overflow-x-clip">
      <Navbar />
      <CloudSolutions />
      <Footer />
    </main>
  );
}
