import Link from "next/link";

import { BrandLogoWall } from "@/components/store/brand-logo-wall";
import { Container } from "@/components/ui/container";

export function TrustedBrands() {
  return (
    <section className="border-y border-border bg-white py-12 md:py-14" aria-label="Trusted brands">
      <Container>
        <BrandLogoWall compact />
        <div className="mt-8 text-center">
          <Link
            href="/brands"
            className="text-sm font-medium text-navy transition hover:text-accent"
          >
            View All Brands →
          </Link>
        </div>
      </Container>
    </section>
  );
}
