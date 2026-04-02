"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ProductImageRotatorProps = {
  images: readonly string[];
  alt: string;
  className?: string;
  priority?: boolean;
};

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0A2463] p-6 text-center">
      <p className="text-lg font-semibold text-white">{alt}</p>
      <p className="mt-2 text-sm text-[#3E92CC]">Image coming soon</p>
    </div>
  );
}

export function ProductImageRotator({
  images,
  alt,
  className,
  priority
}: ProductImageRotatorProps) {
  const imageSet = images.length > 0 ? images : ["/og-default.svg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set());
  const canRotate = imageSet.length > 1;

  const handleImageError = useCallback((index: number) => {
    setErrorIndices((prev) => new Set(prev).add(index));
  }, []);

  useEffect(() => {
    if (!canRotate) {
      return;
    }

    let fadeTimeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      setIsFading(true);
      fadeTimeoutId = window.setTimeout(() => {
        setActiveIndex((previous) => (previous + 1) % imageSet.length);
        setIsFading(false);
      }, 260);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeoutId !== undefined) {
        window.clearTimeout(fadeTimeoutId);
      }
    };
  }, [canRotate, imageSet.length]);

  const handleNext = () => {
    if (!canRotate) {
      return;
    }
    setActiveIndex((previous) => (previous + 1) % imageSet.length);
  };

  const showPlaceholder = errorIndices.has(activeIndex);

  return (
    <button
      type="button"
      onClick={handleNext}
      className={`relative block h-full w-full text-left ${className ?? ""}`}
      aria-label={canRotate ? `Show next ${alt} image` : `Show ${alt} image`}
    >
      {showPlaceholder ? (
        <ImagePlaceholder alt={alt} />
      ) : (
        <Image
          src={imageSet[activeIndex]}
          alt={alt}
          fill
          className={`object-contain p-2 transition-opacity duration-300 ${isFading ? "opacity-75" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          unoptimized
          onError={() => handleImageError(activeIndex)}
        />
      )}
    </button>
  );
}
