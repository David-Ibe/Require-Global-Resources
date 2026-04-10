import {
  Banknote,
  CheckCircle2,
  Clock,
  Landmark,
  ShieldCheck,
} from "@/components/icons";
import { WhatsAppIcon } from "@/components/icons";
import type { LucideIcon } from "@/components/icons";

const pills: { text: string; Icon: LucideIcon | typeof WhatsAppIcon }[] = [
  { text: "Verified Products", Icon: ShieldCheck },
  { text: "Pay on Delivery", Icon: Banknote },
  { text: "CAC Registered", Icon: Landmark },
  { text: "2–5 Days Delivery", Icon: Clock },
  { text: "WhatsApp Support", Icon: CheckCircle2 },
];

function PillSet() {
  return (
    <>
      {pills.map(({ text, Icon }) => (
        <span key={text} className="flex shrink-0 items-center gap-3">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium tracking-wide text-rgr-gray700 md:text-sm">
            <Icon className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
            {text}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-rgr-gray300" aria-hidden />
        </span>
      ))}
    </>
  );
}

export function TrustMarquee() {
  return (
    <div className="shrink-0 overflow-hidden border-y border-rgr-gray300/40 bg-white py-2.5 md:py-3">
      <div className="trust-marquee-track animate-marquee">
        <div className="flex items-center gap-3 pr-3">
          <PillSet />
        </div>
        <div className="flex items-center gap-3 pr-3" aria-hidden>
          <PillSet />
        </div>
      </div>
    </div>
  );
}
