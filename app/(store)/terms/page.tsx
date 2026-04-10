import type { Metadata } from "next";

import { brand, contact, siteUrl } from "@/lib/site-config";
import { storePage, storeType } from "@/lib/store-ui";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: `Terms and Conditions for ${brand.shortName} Nigeria.`,
  openGraph: {
    title: `Terms | ${brand.shortName}`,
    description: `Terms and Conditions for ${brand.shortName} Nigeria.`,
    url: `${siteUrl}/terms`,
    images: ["/og-default.svg"]
  }
};

export default function TermsPage() {
  return (
    <div className={`${storePage.narrow} bg-rgr-surface`}>
      <h1 className={storeType.h1}>Terms and conditions</h1>
      <p className={`${storeType.muted} mt-2`}>Last updated: March 2025</p>

      <div className={`${storeType.body} mt-10 space-y-10 text-[15px] md:text-base`}>
        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Introduction</h2>
          <p className="mt-3 text-rgr-gray700">
            These terms and conditions govern your use of
            requireglobalresources.com and all purchases made through Require
            Global Resources. By placing an order you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Ordering process</h2>
          <p className="mt-3 text-rgr-gray700">
            All orders are confirmed via WhatsApp. Your order is only confirmed
            once you receive a confirmation message from our team. Payment must
            be completed before your order is dispatched.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Pricing</h2>
          <p className="mt-3 text-rgr-gray700">
            All prices are displayed in Nigerian Naira. Prices are subject to
            change without prior notice. The price at the time of your order
            confirmation is the price you pay.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Payment</h2>
          <p className="mt-3 text-rgr-gray700">
            We accept payment via bank transfer. Your order will be processed
            after payment is verified by our team. Payment details will be
            provided via WhatsApp upon order confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Delivery</h2>
          <p className="mt-3 text-rgr-gray700">
            Lagos delivery is within 24–48 hours of payment confirmation.
            Delivery to other states is within 2–5 business days via courier.
            Delivery fees apply and will be communicated at order confirmation.
            {brand.shortName} is not responsible for delays caused by
            courier services or circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            Returns and replacements
          </h2>
          <p className="mt-3 text-rgr-gray700">
            If your product arrives damaged or defective contact us within 24
            hours of delivery via WhatsApp with photo evidence of the damage. We
            will arrange a replacement or refund at our discretion. Returns are
            not accepted for products that have been used or damaged after
            delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            Limitation of liability
          </h2>
          <p className="mt-3 text-rgr-gray700">
            {brand.shortName} liability is limited to the value of the product
            purchased. We are not liable for any indirect or
            consequential losses arising from product use or delivery delays.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Contact</h2>
          <p className="mt-3 text-rgr-gray700">
            For all enquiries contact us via WhatsApp at +{contact.whatsappNumber}{" "}
            or email {contact.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
