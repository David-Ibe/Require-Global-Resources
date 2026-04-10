import {
  Car,
  CircleDollarSign,
  Gift,
  Package,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  type LucideIcon
} from "lucide-react";

export function iconForFeature(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (t.includes("magnet") || t.includes("phone")) return Smartphone;
  if (t.includes("rotate") || t.includes("360")) return RotateCw;
  if (t.includes("save") || t.includes("₦") || t.includes("naira"))
    return CircleDollarSign;
  if (t.includes("delivery") || t.includes("free")) return Gift;
  if (t.includes("gap") || t.includes("seat") || t.includes("car"))
    return Car;
  if (t.includes("bundle") || t.includes("premium")) return Package;
  if (t.includes("verify") || t.includes("quality")) return ShieldCheck;
  if (t.includes("leather") || t.includes("finish")) return Sparkles;
  return Sparkles;
}
