import ContactResumeForm from "@/Web-Page/Career/Contact Resume Form";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export default function CareerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[150px] -z-10" />
        <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-[120px] -z-10" />

        <ContactResumeForm />
      </main>
      <Footer />
    </>
  );
}
