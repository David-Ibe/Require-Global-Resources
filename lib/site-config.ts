export const brand = {
  name: "Require Global Resources",
  shortName: "Require Global Resources",
  tagline: "Quality Products. Delivered Across Nigeria.",
  colors: {
    navy: "#0A2463",
    electricBlue: "#3E92CC",
    white: "#FFFFFF",
    darkGray: "#1A1A2E"
  },
  location: "Lagos, Nigeria"
} as const;

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348029138335",
  instagramHandle: "@requireglobalresources",
  email: "sales@requireglobalresources.com"
} as const;

export const productCatalog = {
  carPhoneHolder: {
    slug: "car-phone-holder",
    name: "Magnetic Car Phone Holder",
    shortName: "Car Phone Holder",
    price: process.env.NEXT_PUBLIC_CAR_PHONE_HOLDER_PRICE ?? "12,500",
    benefit: "Secure your phone while driving — no shaking, no distractions.",
    heroTitle: "Drive Hands-Free. Stay Safe on Lagos Roads.",
    heroSubtitle:
      "Magnetic mount - snaps on instantly, holds firm on any road surface.",
    prefilledMessage:
      "Hi, I want to order the Magnetic Car Phone Holder. Please confirm availability and delivery details.",
    image: "/car-phone-holder.svg",
    images: [
      "/products/car-phone-holder-gallery/01-face.png",
      "/products/car-phone-holder-gallery/02-dashboard.png",
      "/products/car-phone-holder-gallery/03-product.png",
      "/products/car-phone-holder-gallery/04-variants.png"
    ],
    ogImage: "/og-car-phone-holder.svg"
  },
  bloodPressureMonitor: {
    slug: "blood-pressure-monitor",
    name: "Digital Blood Pressure Monitor",
    shortName: "Blood Pressure Monitor",
    price: process.env.NEXT_PUBLIC_BLOOD_PRESSURE_MONITOR_PRICE ?? "24,500",
    benefit: "Accurate readings at home — no clinic visits needed.",
    heroTitle: "Know Your Blood Pressure. Protect Your Heart.",
    heroSubtitle:
      "Clinical-accurate wrist monitor. Check anytime, anywhere - no clinic visit needed.",
    prefilledMessage:
      "Hi, I want to order the Digital Blood Pressure Monitor. Please confirm availability and delivery details.",
    image: "/blood-pressure-monitor.svg",
    images: [
      "/products/blood-pressure-monitor-gallery/01-face.png",
      "/products/blood-pressure-monitor-gallery/02-device-kit.png",
      "/products/blood-pressure-monitor-gallery/03-wrist.png",
      "/products/blood-pressure-monitor-gallery/04-arm-use.png",
      "/products/blood-pressure-monitor-gallery/05-cuff-monitor.png"
    ],
    ogImage: "/og-blood-pressure-monitor.svg"
  }
} as const;

export const trustSignals = [
  "100% Verified — No Counterfeits",
  "24–72hr Delivery Nationwide",
  "Pay on Delivery Available",
  "Easy WhatsApp Ordering"
] as const;

export const testimonials = {
  carPhoneHolder: [
    {
      name: "Chinedu A.",
      location: "Lagos Island",
      rating: 5,
      text: "Very strong hold, even on Third Mainland traffic bumps. Delivery was fast."
    },
    {
      name: "Aisha M.",
      location: "Ikeja",
      rating: 5,
      text: "Easy to install and rotate. Exactly what I needed for navigation."
    },
    {
      name: "Femi O.",
      location: "Lekki",
      rating: 5,
      text: "Quality is better than what I expected. Ordered on WhatsApp and got it quickly."
    }
  ],
  bloodPressureMonitor: [
    {
      name: "Mrs. Okafor",
      location: "Surulere",
      rating: 5,
      text: "Simple to use and accurate readings. My family uses it daily."
    },
    {
      name: "Kunle A.",
      location: "Yaba",
      rating: 5,
      text: "Compact and clear display. Great for tracking my numbers at home."
    },
    {
      name: "Grace E.",
      location: "Ajah",
      rating: 5,
      text: "Excellent customer support and quick Lagos delivery."
    }
  ],
  homepage: [
    {
      name: "Deborah T.",
      location: "Lagos Island",
      rating: 5,
      text: "Professional service and genuine products. I highly recommend them."
    },
    {
      name: "Samuel K.",
      location: "Victoria Island",
      rating: 5,
      text: "Ordered via WhatsApp and received my package the next day."
    },
    {
      name: "Ifeoma N.",
      location: "Maryland",
      rating: 5,
      text: "Trusted company with smooth ordering and clear communication."
    }
  ]
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://requireglobalresources.com";

export function getWhatsAppLink(message: string): string {
  const cleaned = contact.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
