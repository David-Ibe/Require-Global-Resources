"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatNaira } from "@/lib/currency";

type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
  images?: readonly string[];
  href: string;
};

export function ProductCard({
  name,
  description,
  price,
  image,
  images,
  href
}: ProductCardProps) {
  const imageSet = images?.length ? images : [image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeImage = imageSet[activeImageIndex] ?? image;
  const canCycleImages = imageSet.length > 1;

  const handleImageClick = () => {
    if (!canCycleImages) {
      return;
    }

    setActiveImageIndex((previous) => (previous + 1) % imageSet.length);
  };

  useEffect(() => {
    if (!canCycleImages) {
      return;
    }

    let fadeTimeoutId: number | undefined;

    const rotationIntervalId = window.setInterval(() => {
      setIsFading(true);

      fadeTimeoutId = window.setTimeout(() => {
        setActiveImageIndex((previous) => (previous + 1) % imageSet.length);
        setIsFading(false);
      }, 250);
    }, 3200);

    return () => {
      window.clearInterval(rotationIntervalId);
      if (fadeTimeoutId !== undefined) {
        window.clearTimeout(fadeTimeoutId);
      }
    };
  }, [canCycleImages, imageSet.length]);

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative mb-4 h-56 overflow-hidden rounded-xl bg-slate-50">
        <button
          type="button"
          onClick={handleImageClick}
          className="relative block h-full w-full text-left"
          aria-label={
            canCycleImages
              ? `Show next ${name} image`
              : `Show ${name} image`
          }
        >
          <Image
            src={activeImage}
            alt={name}
            fill
            className={`object-contain p-2 transition-opacity duration-300 ${isFading ? "opacity-70" : "opacity-100"}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </button>
      </div>
      <h3 className="text-xl font-semibold text-brand-navy">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <p className="mt-4 text-lg font-bold text-brand-dark">₦{formatNaira(price)}</p>
      <p className="mt-1 text-xs text-slate-500">🚚 Delivery in 24–72hrs</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-md bg-brand-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy"
      >
        Order Now
      </Link>
    </article>
  );
}
