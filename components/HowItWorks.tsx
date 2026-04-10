"use client";

import { CheckCircle2 } from "lucide-react";

const STEPS = [
  "Submit your order details.",
  "We send payment account details on WhatsApp.",
  "You transfer and send your receipt.",
  "We verify payment and dispatch."
] as const;

export function HowItWorks() {
  return (
    <section className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#166534]">
        How payment works
      </h2>
      <ul className="mt-3 space-y-2">
        {STEPS.map((step) => (
          <li key={step} className="flex items-start gap-2 text-sm text-[#166534]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
