import type { Metadata } from "next";

import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms and Conditions | Require Global Resources",
  description:
    "Terms and Conditions for Require Global Resources Nigeria.",
  openGraph: {
    title: "Terms and Conditions | Require Global Resources",
    description:
      "Terms and Conditions for Require Global Resources Nigeria.",
    url: "https://requireglobalresources.com/terms",
    images: ["/og-default.svg"]
  }
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <h1 className="text-4xl font-bold text-brand-navy">
        Terms and Conditions
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: March 2025</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Introduction
          </h2>
          <p className="mt-3">
            These terms and conditions govern your use of
            requireglobalresources.com and all purchases made through Require
            Global Resources. By placing an order you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Ordering Process
          </h2>
          <p className="mt-3">
            All orders are confirmed via WhatsApp. Your order is only confirmed
            once you receive a confirmation message from our team. Payment must
            be completed before your order is dispatched.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Pricing</h2>
          <p className="mt-3">
            All prices are displayed in Nigerian Naira. Prices are subject to
            change without prior notice. The price at the time of your order
            confirmation is the price you pay.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Payment</h2>
          <p className="mt-3">
            We accept payment via bank transfer. Your order will be processed
            after payment is verified by our team. Payment details will be
            provided via WhatsApp upon order confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Delivery</h2>
          <p className="mt-3">
            Lagos delivery is within 24–48 hours of payment confirmation.
            Delivery to other states is within 2–5 business days via courier.
            Delivery fees apply and will be communicated at order confirmation.
            Require Global Resources is not responsible for delays caused by
            courier services or circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Returns and Replacements
          </h2>
          <p className="mt-3">
            If your product arrives damaged or defective contact us within 24
            hours of delivery via WhatsApp with photo evidence of the damage. We
            will arrange a replacement or refund at our discretion. Returns are
            not accepted for products that have been used or damaged after
            delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            Require Global Resources liability is limited to the value of the
            product purchased. We are not liable for any indirect or
            consequential losses arising from product use or delivery delays.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Contact</h2>
          <p className="mt-3">
            For all enquiries contact us via WhatsApp at +{contact.whatsappNumber}{" "}
            or email {contact.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
