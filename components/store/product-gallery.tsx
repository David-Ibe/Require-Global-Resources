"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/cn";
import { getListingFallbackImage } from "@/lib/listing-placeholders";

type Props = {
  images: string[];
  alt: string;
  videoUrl?: string;
  videoPoster?: string;
  category?: string;
};

export function ProductGallery({ images, alt, videoUrl, videoPoster, category = "laptops" }: Props) {
  const fallback = getListingFallbackImage(category);
  const gallery = images.length > 0 ? images : [fallback];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const activeSrc = gallery[active] ?? gallery[0];

  const closeZoom = useCallback(() => setZoomed(false), []);

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="product-image-zoom block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          aria-label="Zoom image"
        >
          <Image
            src={activeSrc}
            alt={alt}
            width={1400}
            height={1050}
            priority
            className="mx-auto h-auto w-full max-h-[min(560px,70vh)] object-contain"
            sizes="(max-width:1024px) 100vw, 720px"
          />
        </button>

        {gallery.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg transition sm:h-20 sm:w-20",
                  active === i
                    ? "opacity-100 ring-2 ring-navy"
                    : "opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${i + 1}`}
                aria-current={active === i ? "true" : undefined}
              >
                <Image
                  src={src}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {videoUrl && (
          <div className="overflow-hidden rounded-2xl">
            <video
              controls
              poster={videoPoster || activeSrc}
              className="w-full"
              preload="metadata"
            >
              <source src={videoUrl} />
            </video>
          </div>
        )}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white/95 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image zoom"
          onClick={closeZoom}
          onKeyDown={(e) => e.key === "Escape" && closeZoom()}
        >
          <button
            type="button"
            onClick={closeZoom}
            className="absolute right-6 top-6 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Close
          </button>
          <div className="relative h-[min(80vh,800px)] w-full max-w-4xl">
            <Image
              src={activeSrc}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
