import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FAQ_GROUPS } from "@/lib/faqs";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I have a question that isn't covered on your FAQ page.`
);

export const metadata: Metadata = {
  title: "FAQ",
  description: `Payment, delivery, condition and consignment — ${brand.shortName}.`,
  alternates: { canonical: `${siteUrl}/faq` },
};

export default function FaqPage() {
  return (
    <div className="bg-page">
      <Container className="border-b border-neutral-100 py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
          FAQ
        </h1>
        <p className="mt-3 text-neutral-500">
          Payment, delivery, condition and consignment.
        </p>
      </Container>

      <Container className="max-w-2xl py-section-sm md:py-section">
        {FAQ_GROUPS.map((group) => (
          <section key={group.title} className="mb-12 last:mb-0">
            <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
              {group.title}
            </h2>
            <div className="mt-6 divide-y divide-neutral-100">
              {group.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-medium text-neutral-900">
                    {f.q}
                    <span className="shrink-0 text-neutral-400 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-relaxed text-neutral-600">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <p className="mt-12 text-center text-sm text-neutral-500">
          Still have a question?{" "}
          <a
            href={whatsappHref}
            className="mt-12 font-medium text-accent hover:underline"
          >
            Ask on WhatsApp
          </a>
        </p>
      </Container>
    </div>
  );
}
