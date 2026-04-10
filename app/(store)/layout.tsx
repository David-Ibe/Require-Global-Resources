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
      <StoreNavbar />
      <main>{children}</main>
      <StoreFooter />
      <FloatingWhatsApp />
    </>
  );
}
