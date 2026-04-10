/**
 * Centralized icon set for the RGR brand.
 *
 * Lucide icons — clean outline style, consistent stroke-width (2).
 * Brand SVG icons (WhatsApp, social) — custom paths that match Lucide's
 * visual weight so everything feels cohesive.
 *
 * USAGE:
 *   import { icons, WhatsAppIcon } from "@/components/icons";
 *   <icons.truck className="h-5 w-5 text-emerald-500" />
 *   <WhatsAppIcon size={20} className="text-white" />
 */

import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Gift,
  Home,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  RotateCw,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  User,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";

/* ────────────────────────────────────────────
   1.  LUCIDE ICON MAP
   ──────────────────────────────────────────── */

export const icons = {
  arrowRight: ArrowRight,
  badgeCheck: BadgeCheck,
  banknote: Banknote,
  car: Car,
  checkCircle: CheckCircle2,
  chevronRight: ChevronRight,
  circleDollar: CircleDollarSign,
  clock: Clock,
  close: X,
  gift: Gift,
  home: Home,
  landmark: Landmark,
  lock: Lock,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  messageCircle: MessageCircle,
  package: Package,
  phone: Phone,
  rotateCw: RotateCw,
  search: Search,
  shield: Shield,
  shieldCheck: ShieldCheck,
  shoppingCart: ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  star: Star,
  truck: Truck,
  user: User,
  wifi: Wifi,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/* ────────────────────────────────────────────
   2.  BRAND SVG ICONS (not in Lucide)
   Designed to match Lucide visual weight at
   24×24 with stroke-width 2 aesthetic.
   ──────────────────────────────────────────── */

type BrandIconProps = {
  size?: number;
  className?: string;
};

export function WhatsAppIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function TikTokIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  );
}

/* ────────────────────────────────────────────
   3.  PRESET ICON COMPONENTS
   Ready-to-drop wrappers with brand-appropriate
   defaults for common use cases.
   ──────────────────────────────────────────── */

type PresetProps = { className?: string; size?: number };

export function VerifiedIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <ShieldCheck className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function DeliveryIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <Truck className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function PayOnDeliveryIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <Banknote className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function CACRegisteredIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <Landmark className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function CarAccessoriesIcon({ className = "h-5 w-5 text-gray-700", size }: PresetProps) {
  return <Car className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function SmartHomeIcon({ className = "h-5 w-5 text-gray-700", size }: PresetProps) {
  return <Wifi className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function DeliveryTimeIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <Clock className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function CustomerReviewIcon({ className = "h-5 w-5 text-gray-700", size }: PresetProps) {
  return <User className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function CartIcon({ className = "h-5 w-5 text-gray-700", size }: PresetProps) {
  return <ShoppingCart className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function TrustCheckIcon({ className = "h-5 w-5 text-emerald-500", size }: PresetProps) {
  return <CheckCircle2 className={className} {...(size ? { size } : {})} aria-hidden />;
}

export function ReviewStarIcon({ className = "h-4 w-4", filled = false }: PresetProps & { filled?: boolean }) {
  return (
    <Star
      className={filled ? `${className} fill-rgr-gold text-rgr-gold` : `${className} text-rgr-gray300`}
      aria-hidden
    />
  );
}

/* ────────────────────────────────────────────
   4.  RE-EXPORTS
   So components can import everything from
   one place: import { Star, icons } from "@/components/icons"
   ──────────────────────────────────────────── */

export {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Gift,
  Home,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  RotateCw,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  User,
  Wifi,
  X,
};

export type { LucideIcon };
