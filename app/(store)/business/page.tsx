import type { Metadata } from "next";
import Link from "next/link";

import { BusinessProcurement } from "@/components/store/business-procurement";
import { SectionHeader } from "@/components/store/section-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckCircle2 } from "@/components/icons";
import { brand, contact, defaultSiteTitle, getWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Business Procurement | ${defaultSiteTitle}`,
  description:
    "Corporate technology procurement for businesses, schools, NGOs and government. Volume pricing, official quotations and dedicated account support.",
};

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Tell us what you need",
    description: "Share your requirements via WhatsApp, email or our contact form. Quantity, specs and timeline.",
  },
  {
    step: "2",
    title: "Receive a formal quotation",
    description: "We prepare a CAC-registered quotation with itemised pricing, delivery timeline and warranty terms.",
  },
  {
    step: "3",
    title: "Approve and pay",
    description: "Bank transfer to Require Trading Limited. We issue an official invoice for your records.",
  },
  {
    step: "4",
    title: "Verified delivery",
    description: "Nationwide logistics with tracking. Dedicated after-sales support for your organisation.",
  },
] as const;

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I'd like to discuss business procurement for our organisation.`
);

export default function BusinessPage() {
  return (
    <div className="bg-page">
      <section className="hero-glow border-b border-border py-section-sm md:py-section">
        <Container className="max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Business procurement
          </p>
          <h1 className="mt-4 text-hero-title text-neutral-900">
            Technology for organisations
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            We help businesses, schools, startups, NGOs and government institutions
            procure genuine technology at scale — with official documentation and
            dedicated support.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={whatsappHref} variant="primary" className="min-h-[52px] min-w-[220px]">
              Request a Quotation
            </Button>
            <Button href={`mailto:${contact.email}`} variant="secondary" className="min-h-[52px]">
              Email Us
            </Button>
          </div>
        </Container>
      </section>

      <section id="volume" className="py-section-sm md:py-section">
        <Container>
          <SectionHeader
            title="What we offer"
            subtitle="End-to-end procurement — from quotation to after-sales support."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Dedicated account manager",
              "Volume pricing on bulk orders",
              "Official CAC-registered quotations",
              "Tax-compliant invoices",
              "Nationwide delivery and logistics",
              "Warranty registration and support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-6"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-sm text-neutral-800">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="quotations" className="bg-white py-section-sm md:py-section">
        <Container>
          <SectionHeader
            title="How procurement works"
            subtitle="A straightforward process designed for corporate buyers."
            align="center"
          />
          <ol className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="rounded-xl border border-border p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {step.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <BusinessProcurement />

      <section className="py-section-sm md:py-section">
        <Container className="text-center">
          <h2 className="text-section-title text-neutral-900">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Tell us what your organisation needs. We typically respond within one business hour.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={whatsappHref} variant="primary" className="min-h-[52px]">
              Chat on WhatsApp
            </Button>
            <Button href="/listings" variant="secondary" className="min-h-[52px]">
              Browse Catalogue
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
