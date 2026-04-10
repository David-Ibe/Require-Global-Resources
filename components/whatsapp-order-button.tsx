"use client";

import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { trackLead, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppLink } from "@/lib/site-config";

type WhatsAppOrderButtonProps = {
  label: string;
  productName: string;
  sourcePage: string;
  message: string;
  price: string;
  className?: string;
};

export function WhatsAppOrderButton({
  label,
  productName,
  sourcePage,
  message,
  price,
  className = ""
}: WhatsAppOrderButtonProps) {
  const [pending, setPending] = useState(false);
  const whatsappLink = getWhatsAppLink(message);

  async function handleClick() {
    if (pending) return;
    setPending(true);

    trackLead({ productName, price });
    trackWhatsAppClick(productName);

    try {
      await fetch("/api/order-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_name: productName,
          source_page: sourcePage
        })
      });
    } catch {
      // Non-blocking by design: users should still reach WhatsApp.
    } finally {
      setPending(false);
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#22C55E] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#16A34A] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
      disabled={pending}
    >
      <WhatsAppIcon size={18} className="shrink-0" />
      {pending ? "Opening WhatsApp..." : label}
    </button>
  );
}
