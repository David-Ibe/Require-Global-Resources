import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";

import { brand, getWhatsAppLink } from "@/lib/site-config";

export default function NotFound() {
  const whatsappHref = getWhatsAppLink(
    "Hi, I need help finding a product on your website."
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-rgr-navy px-6 text-center">
      <Image
        src="/logo-mark.png"
        alt={brand.shortName}
        width={64}
        height={64}
        className="h-16 w-16"
      />
      <h1 className="mt-6 font-display text-6xl uppercase tracking-tight text-white md:text-8xl">
        404
      </h1>
      <p className="mt-4 font-display text-xl uppercase tracking-wider text-rgr-gold">
        Page Not Found
      </p>
      <p className="mt-3 max-w-md text-sm text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Head back to the store or chat with us on WhatsApp for help.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-rgr-gold px-8 py-3.5 font-display text-sm uppercase tracking-wider text-rgr-navy transition hover:bg-amber-400"
        >
          ← Back to Store
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white transition hover:bg-[#20bd5a]"
        >
          <WhatsAppIcon size={16} />
          WhatsApp Support
        </a>
      </div>
      <p className="mt-12 text-xs text-white/30">
        {brand.name} &middot; {brand.legalName} &middot; CAC Registered
      </p>
    </div>
  );
}
