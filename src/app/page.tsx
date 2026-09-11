import Navbar from "@/Component/Navbar";
import Hero from "@/Web-Page/Landing/Hero";
import Certificates from "@/Web-Page/Landing/Certificates";

import Trust from "@/Web-Page/Landing/trust";
import Industries from "@/Web-Page/Landing/Industries";
import Process from "@/Web-Page/Landing/Process";
import Footer from "@/Component/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Hero />
      <Certificates />

      <Process />
      <Trust />
      <Industries />
      <Footer />
    </main>
  );
}
