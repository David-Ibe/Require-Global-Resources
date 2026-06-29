"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/store/section-header";
import { HIGH_INTENT_FAQS } from "@/lib/home-content";
import { cn } from "@/lib/cn";

export function HomepageFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-page py-section-sm md:py-section" aria-labelledby="homepage-faq">
      <Container className="max-w-3xl">
        <SectionHeader
          title="Frequently asked questions"
          subtitle="Quick answers to the questions we hear most."
          align="center"
        />

        <div className="divide-y divide-border rounded-xl border border-border bg-white">
          {HIGH_INTENT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-neutral-900 md:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Have more questions?{" "}
          <Link href="/faq" className="font-medium text-navy hover:text-accent">
            View all FAQs →
          </Link>
        </p>
      </Container>
    </section>
  );
}
