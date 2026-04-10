"use client";

import { WhatsAppIcon } from "@/components/icons";
import { trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/site-config";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[300]">
      <button
        type="button"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us"
        onClick={() => {
          trackWhatsAppClick("Floating WhatsApp Button");
          window.open(
            getWhatsAppLink(waEntryQuestion()),
            "_blank",
            "noopener,noreferrer"
          );
        }}
        className="group relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition duration-200 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <span className="absolute inset-0 animate-wa-pulse rounded-full bg-[#25D366]" />
        <WhatsAppIcon size={24} className="relative z-10" />
      </button>
    </div>
  );
}
