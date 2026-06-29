import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { brand, getWhatsAppLink, siteUrl } from "@/lib/site-config";

const whatsappHref = getWhatsAppLink(
  `Hi ${brand.shortName}, I have an item to sell. Here are the details:\n\nProduct: \nCondition: \nAsking price: \n\nPhotos coming in this chat.`
);

export const metadata: Metadata = {
  title: "Sell Your Device",
  description: `Sell your laptop, phone or audio device through ${brand.shortName}.`,
  alternates: { canonical: `${siteUrl}/sell` },
};

export default function SellPage() {
  return (
    <div className="bg-page">
      <Container className="py-section-sm md:py-section">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-section-title font-semibold tracking-tight text-neutral-950">
            Sell your device
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Have a genuine laptop, phone or audio device? We list it, market it,
            and close the buyer for you. Commission agreed up front.
          </p>
          <div className="mt-10">
            <Button href={whatsappHref} variant="primary" className="min-h-[52px] min-w-[200px]">
              WhatsApp us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
