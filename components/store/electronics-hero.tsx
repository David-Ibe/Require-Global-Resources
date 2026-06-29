import { HeroSearch } from "@/components/store/hero-search";

import { Container } from "@/components/ui/container";

import { Button } from "@/components/ui/button";

import { CheckCircle2 } from "@/components/icons";

import { brand, getWhatsAppLink } from "@/lib/site-config";



const whatsappHref = getWhatsAppLink(

  `Hi ${brand.shortName}, I'd like help finding the right product.`

);



const TRUST_ITEMS = [

  "Genuine Products",

  "Nationwide Delivery",

  "Verified Listings",

] as const;



export function ElectronicsHero() {

  return (

    <section className="hero-glow animate-fade-in pt-12 pb-14 md:pt-16 md:pb-16" aria-label="Hero">

      <Container className="max-w-3xl text-center">

        <h1 className="text-hero-title text-neutral-900">

          Genuine Electronics.

          <br />

          Delivered.

        </h1>



        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted md:text-xl">

          Computers, smartphones, audio and accessories from the brands you know.

        </p>



        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">

          {TRUST_ITEMS.map((item) => (

            <li

              key={item}

              className="inline-flex items-center gap-2 text-sm text-neutral-700"

            >

              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />

              {item}

            </li>

          ))}

        </ul>



        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">

          <Button href="/listings" variant="navy" className="min-h-[52px] min-w-[200px]">

            Shop Now

          </Button>

          <Button href={whatsappHref} variant="secondary" className="min-h-[52px] min-w-[200px]">

            Chat on WhatsApp

          </Button>

        </div>

      </Container>

    </section>

  );

}

