import type { Metadata } from "next";

import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Require Global Resources",
  description:
    "Privacy Policy for Require Global Resources. Learn how we collect and use your information.",
  openGraph: {
    title: "Privacy Policy | Require Global Resources",
    description:
      "Privacy Policy for Require Global Resources. Learn how we collect and use your information.",
    url: "https://requireglobalresources.com/privacy-policy",
    images: ["/og-default.svg"]
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <h1 className="text-4xl font-bold text-brand-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: March 2025</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Who We Are</h2>
          <p className="mt-3">
            Require Global Resources is a registered Nigerian business based in
            Lagos, Nigeria. We sell quality products and deliver across Nigeria.
            Contact us at {contact.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Information We Collect
          </h2>
          <p className="mt-3">
            We collect your name, phone number, and message when you submit our
            contact form. We collect browsing data automatically via Facebook
            Pixel and Google Analytics 4 when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            How We Use Your Information
          </h2>
          <p className="mt-3">
            We use your information to process and fulfill your orders, respond
            to your enquiries, improve our products and services, and show you
            relevant advertisements on Facebook and Instagram.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Facebook Pixel and Google Analytics
          </h2>
          <p className="mt-3">
            This website uses Facebook Pixel and Google Analytics 4 to
            understand website traffic and improve our advertising. These tools
            collect anonymized browsing data. You can opt out of Google Analytics
            at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-electric underline hover:text-brand-navy"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            WhatsApp Communications
          </h2>
          <p className="mt-3">
            When you contact us via WhatsApp your messages are received and
            handled by our team only. We do not share your WhatsApp data with
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Data Security
          </h2>
          <p className="mt-3">
            We do not sell your personal information to any third party. Your
            data is stored securely and used only for the purposes described
            above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">
            Your Rights
          </h2>
          <p className="mt-3">
            You may request deletion of your personal data at any time by
            contacting us at {contact.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-navy">Contact</h2>
          <p className="mt-3">
            For any privacy concerns contact us at {contact.email} or via
            WhatsApp at +{contact.whatsappNumber}.
          </p>
        </section>
      </div>
    </div>
  );
}
