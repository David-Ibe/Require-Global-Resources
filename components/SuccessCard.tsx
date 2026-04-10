"use client";

import { ShieldCheck } from "@/components/icons";
import { WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppURL } from "@/lib/whatsapp";

type SuccessCardProps = {
  fullName: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  phone: string;
  address: string;
  state: string;
};

export function SuccessCard({
  fullName,
  productName,
  unitPrice,
  quantity,
  phone,
  address,
  state
}: SuccessCardProps) {
  const lineTotal = unitPrice * quantity;
  const waLink = buildWhatsAppURL({
    productName,
    unitPrice,
    quantity,
    fullName,
    phone,
    address,
    state
  });

  return (
    <section className="rounded-2xl border border-[#bbf7d0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-[#166534]">
        <ShieldCheck className="h-5 w-5" aria-hidden />
        <p className="text-sm font-semibold">Order details received</p>
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-rgr-navy">
        Confirm payment on WhatsApp
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-rgr-gray700">
        We manually verify every payment before dispatch. Message us now to get
        account details and complete your order.
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d]"
      >
        <WhatsAppIcon size={16} />
        Message us on WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-rgr-gray500">
        WhatsApp: +234 802 913 8335 — {quantity} × ₦{unitPrice.toLocaleString()} = ₦
        {lineTotal.toLocaleString()}
      </p>
    </section>
  );
}
