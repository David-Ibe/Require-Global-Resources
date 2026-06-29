import Link from "next/link";

import { BrandLogoWall } from "@/components/store/brand-logo-wall";
import { Container } from "@/components/ui/container";

export function TrustedBrands() {
  return (
    <section className="bg-surface py-12 md:py-14" aria-label="Trusted brands">
      <Container>
        <BrandLogoWall compact />
        <div className="mt-8 text-center">
          <Link
            href="/brands"
            className="link-accent text-sm font-medium"
          >
            View All Brands →
          </Link>
        </div>
      </Container>
    </section>
  );
}
