import type { Metadata } from "next";

import { brand, contact, siteUrl } from "@/lib/site-config";
import { storePage, storeType } from "@/lib/store-ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    `Privacy Policy for ${brand.shortName}. Learn how we collect and use your information.`,
  openGraph: {
    title: `Privacy policy | ${brand.shortName}`,
    description:
      `Privacy Policy for ${brand.shortName}. Learn how we collect and use your information.`,
    url: `${siteUrl}/privacy-policy`,
    images: ["/og-default.svg"]
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className={`${storePage.narrow} bg-rgr-surface`}>
      <h1 className={storeType.h1}>Privacy policy</h1>
      <p className={`${storeType.muted} mt-2`}>Last updated: March 2025</p>

      <div className={`${storeType.body} mt-10 space-y-10 text-[15px] md:text-base`}>
        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Who we are</h2>
          <p className="mt-3 text-rgr-gray700">
            {brand.shortName} is a registered Nigerian business based in
            Lagos, Nigeria. We sell quality products and deliver across Nigeria.
            Contact us at {contact.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            Information we collect
          </h2>
          <p className="mt-3 text-rgr-gray700">
            We collect your name, phone number, and message when you submit our
            contact form. We collect browsing data automatically via Facebook
            Pixel and Google Analytics 4 when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            How we use your information
          </h2>
          <p className="mt-3 text-rgr-gray700">
            We use your information to process and fulfill your orders, respond
            to your enquiries, improve our products and services, and show you
            relevant advertisements on Facebook and Instagram.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            Facebook Pixel and Google Analytics
          </h2>
          <p className="mt-3 text-rgr-gray700">
            This website uses Facebook Pixel and Google Analytics 4 to
            understand website traffic and improve our advertising. These tools
            collect anonymized browsing data. You can opt out of Google Analytics
            at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-rgr-navy underline underline-offset-2 hover:text-rgr-charcoal"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">
            WhatsApp communications
          </h2>
          <p className="mt-3 text-rgr-gray700">
            When you contact us via WhatsApp your messages are received and
            handled by our team only. We do not share your WhatsApp data with
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Data security</h2>
          <p className="mt-3 text-rgr-gray700">
            We do not sell your personal information to any third party. Your
            data is stored securely and used only for the purposes described
            above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Your rights</h2>
          <p className="mt-3 text-rgr-gray700">
            You may request deletion of your personal data at any time by
            contacting us at {contact.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-rgr-navy">Contact</h2>
          <p className="mt-3 text-rgr-gray700">
            For any privacy concerns contact us at {contact.email} or via
            WhatsApp at +{contact.whatsappNumber}.
          </p>
        </section>
      </div>
    </div>
  );
}
