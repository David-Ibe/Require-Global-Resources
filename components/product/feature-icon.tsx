import {
  Banknote,
  Car,
  CircleDollarSign,
  Clock,
  Gift,
  Home,
  Lock,
  Package,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Wifi,
  type LucideIcon,
} from "@/components/icons";

const featureMap: [RegExp, LucideIcon][] = [
  [/magnet|phone|mount/i, Smartphone],
  [/rotate|360/i, RotateCw],
  [/save|₦|naira|discount|price/i, CircleDollarSign],
  [/free\s*delivery|free\s*ship/i, Truck],
  [/delivery|ship/i, Gift],
  [/gap|seat|car|vehicle|auto/i, Car],
  [/bundle|premium|package/i, Package],
  [/verify|quality|original|authentic/i, ShieldCheck],
  [/leather|finish|material|fabric/i, Sparkles],
  [/smart\s*home|wifi|wireless/i, Wifi],
  [/home|house/i, Home],
  [/fast|speed|quick/i, Clock],
  [/secure|safe|lock/i, Lock],
  [/pay\s*on\s*delivery|cod|cash/i, Banknote],
  [/star|rating|review/i, Star],
];

export function iconForFeature(text: string): LucideIcon {
  for (const [pattern, icon] of featureMap) {
    if (pattern.test(text)) return icon;
  }
  return Sparkles;
}
