import type { Metadata } from "next";
import DataMigration from "@/Web-Page/Services/Data Migration/Data Migration";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export const metadata: Metadata = {
  title: "Enterprise Cloud & Data Migration Services | Pentacloud Consulting",
  description: "Seamless database migration, CRM & ERP data transfer, zero-downtime cloud data migration, data integrity auditing, and legacy system modernization.",
  alternates: {
    canonical: "/services/data-migration",
  },
};

export default function MigrationPage() {
  return (
    <>
      <Navbar />
      <DataMigration />
      <Footer />
    </>
  );
}
