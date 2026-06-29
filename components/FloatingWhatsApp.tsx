"use client";

import { WhatsAppIcon } from "@/components/icons";
import { trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/site-config";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[300] md:bottom-8 md:right-8">
      <button
        type="button"
        aria-label="Chat on WhatsApp"
        onClick={() => {
          trackWhatsAppClick("Floating WhatsApp Button");
          window.open(
            getWhatsAppLink(waEntryQuestion()),
            "_blank",
            "noopener,noreferrer"
          );
        }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <WhatsAppIcon size={26} />
      </button>
    </div>
  );
}
