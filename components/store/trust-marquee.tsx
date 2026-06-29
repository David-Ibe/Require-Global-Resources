import {
  Banknote,
  Clock,
  Globe,
  Landmark,
  Truck,
  WhatsAppIcon,
  type LucideIcon,
} from "@/components/icons";

const pills: { text: string; Icon: LucideIcon | typeof WhatsAppIcon }[] = [
  { text: "Genuine Imports", Icon: Globe },
  { text: "Nigeria-Wide Delivery", Icon: Truck },
  { text: "Lagos Same-Day", Icon: Clock },
  { text: "Pay on Delivery Available", Icon: Banknote },
  { text: "CAC Registered #7879319", Icon: Landmark },
  { text: "Order on WhatsApp", Icon: WhatsAppIcon },
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
