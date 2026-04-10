import { AnnouncementBar } from "@/components/store/announcement-bar";
import { StoreFooter } from "@/components/store/store-footer";
import { StoreNavbar } from "@/components/store/store-navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function StoreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <StoreNavbar />
      <main>{children}</main>
      <StoreFooter />
      <FloatingWhatsApp />
    </>
  );
}
