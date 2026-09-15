import type { Metadata } from "next";
import Blogs from "@/Web-Page/Blogs/Blogs";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Technology & Cloud Strategy Blog | Pentacloud Consulting",
  description: "Read the latest articles, tutorials, and business insights on Salesforce, Zoho, Cloud Migration, Web Development, and Digital Transformation.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <Blogs />
      <Footer />
    </>
  );
}
