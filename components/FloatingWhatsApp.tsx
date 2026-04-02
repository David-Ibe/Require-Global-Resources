"use client";

import { trackLead, trackWhatsAppClick } from "@/lib/analytics";

const whatsappMessage =
  "Hi,%20I%20want%20to%20enquire%20about%20your%20products";

export function FloatingWhatsApp() {
  const cleanedNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  const whatsappLink = `https://wa.me/${cleanedNumber}?text=${whatsappMessage}`;

  return (
    <button
      type="button"
      aria-label="Chat with us on WhatsApp"
      onClick={() => {
        trackLead({ productName: "General Enquiry", price: "" });
        trackWhatsAppClick("Floating WhatsApp Button");
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
      }}
      className="fixed bottom-6 right-6 z-[9999] inline-flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-200 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 animate-[pulse_2.6s_ease-in-out_infinite]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="none"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M19.11 17.41c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.09-.16.19-.33.21-.61.07-.28-.14-1.17-.43-2.24-1.37-.83-.73-1.39-1.64-1.55-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.56-.46-.48-.64-.49-.17-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34 0 1.38 1 2.72 1.14 2.91.14.19 1.97 3.01 4.77 4.22.67.29 1.19.46 1.6.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.9-1.33.23-.66.23-1.22.16-1.33-.07-.12-.26-.19-.54-.33Z"
        />
        <path
          fill="currentColor"
          d="M16.01 4C9.39 4 4 9.32 4 15.88c0 2.11.56 4.17 1.62 5.98L4 28l6.34-1.64a12.06 12.06 0 0 0 5.67 1.44h.01c6.62 0 12-5.32 12-11.88C28.02 9.32 22.64 4 16.01 4Zm0 21.77h-.01a9.96 9.96 0 0 1-5.08-1.39l-.36-.21-3.76.98 1.01-3.66-.24-.38a9.79 9.79 0 0 1-1.51-5.24c0-5.48 4.51-9.94 10.05-9.94 2.68 0 5.2 1.03 7.1 2.9a9.84 9.84 0 0 1 2.95 7.04c0 5.48-4.51 9.94-10.05 9.94Z"
        />
      </svg>
    </button>
  );
}
