import type { ElectronicsCategory } from "@/lib/electronics-categories";

/** Premium light placeholders — swap paths when real photos are ready. */
export const PLACEHOLDER = {
  laptop: {
    front: "/listings/placeholders/laptop-front.svg",
    angle: "/listings/placeholders/laptop-angle.svg",
    keyboard: "/listings/placeholders/laptop-keyboard.svg",
    gallery: [
      "/listings/placeholders/laptop-front.svg",
      "/listings/placeholders/laptop-angle.svg",
      "/listings/placeholders/laptop-keyboard.svg",
    ] as const,
  },
  phone: {
    front: "/listings/placeholders/phone-front.svg",
    back: "/listings/placeholders/phone-back.svg",
    side: "/listings/placeholders/phone-side.svg",
    gallery: [
      "/listings/placeholders/phone-front.svg",
      "/listings/placeholders/phone-back.svg",
      "/listings/placeholders/phone-side.svg",
    ] as const,
  },
  audio: {
    case: "/listings/placeholders/audio-case.svg",
    buds: "/listings/placeholders/audio-buds.svg",
    angle: "/listings/placeholders/audio-angle.svg",
    gallery: [
      "/listings/placeholders/audio-case.svg",
      "/listings/placeholders/audio-buds.svg",
      "/listings/placeholders/audio-angle.svg",
    ] as const,
  },
  sell: "/listings/placeholders/sell-device.svg",
} as const;

const categoryImages: Record<ElectronicsCategory["slug"], string> = {
  laptops: PLACEHOLDER.laptop.front,
  smartphones: PLACEHOLDER.phone.front,
  audio: PLACEHOLDER.audio.case,
  wearables: "/listings/placeholders/wearables.svg",
  accessories: "/listings/placeholders/accessories.svg",
};

export function getCategoryPlaceholderImage(slug: string): string {
  if (slug in categoryImages) {
    return categoryImages[slug as ElectronicsCategory["slug"]];
  }
  return PLACEHOLDER.laptop.front;
}

export function getListingFallbackImage(category: string): string {
  if (category.includes("phone") || category.includes("smart")) {
    return PLACEHOLDER.phone.front;
  }
  if (category.includes("audio") || category.includes("headphone")) {
    return PLACEHOLDER.audio.case;
  }
  if (category.includes("wear")) {
    return PLACEHOLDER.phone.front;
  }
  if (category.includes("access")) {
    return PLACEHOLDER.audio.buds;
  }
  return PLACEHOLDER.laptop.front;
}
