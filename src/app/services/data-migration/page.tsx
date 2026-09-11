import DataMigration from "@/Web-Page/Services/Data Migration/Data Migration";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";

export default function MigrationPage() {
  return (
    <>
      <Navbar />
      <DataMigration />
      <Footer />
    </>
  );
}
