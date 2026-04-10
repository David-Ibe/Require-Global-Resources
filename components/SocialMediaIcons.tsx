"use client";

import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { getWhatsAppLink } from "@/lib/site-config";
import { waEntryQuestion } from "@/lib/whatsapp-sales";

type Variant = "footer" | "contact";

interface SocialMediaIconsProps {
  variant: Variant;
}

const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/requireglobalresources";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/requireglobalresources";
const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://tiktok.com/@requireglobalresources";
const whatsappUrl = getWhatsAppLink(waEntryQuestion());

const platforms = [
  {
    name: "Facebook",
    href: facebookUrl,
    icon: FacebookIcon,
    color: "#1877F2",
    ariaLabel: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: instagramUrl,
    icon: InstagramIcon,
    color: "#E1306C",
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "TikTok",
    href: tiktokUrl,
    icon: TikTokIcon,
    color: "#EE1D52",
    ariaLabel: "Follow us on TikTok",
  },
  {
    name: "WhatsApp",
    href: whatsappUrl,
    icon: WhatsAppIcon,
    color: "#25D366",
    ariaLabel: "Chat with us on WhatsApp",
  },
] as const;

export function SocialMediaIcons({ variant }: SocialMediaIconsProps) {
  const circleSize = variant === "footer" ? 36 : 44;
  const iconSize = variant === "footer" ? 18 : 22;

  return (
    <div className="flex flex-wrap items-start gap-3">
      {platforms.map((platform) => (
        <div key={platform.name} className={variant === "contact" ? "flex flex-col items-center gap-1.5" : ""}>
          <Link
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.ariaLabel}
            className="group inline-flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: circleSize,
              height: circleSize,
              backgroundColor: "#F4F4F5",
              color: platform.color,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = platform.color;
              el.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "#F4F4F5";
              el.style.color = platform.color;
            }}
          >
            <platform.icon size={iconSize} />
          </Link>
          {variant === "contact" && (
            <span className="text-xs text-rgr-gray700">{platform.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
