const pills = [
  "✅ All products verified",
  "🚀 Nationwide delivery",
  "💵 Pay on delivery",
  "🏢 CAC registered",
  "💬 WhatsApp support 24/7",
  "🔄 Easy returns",
  "🇳🇬 Lagos based",
  "🔍 Quality checked",
  "📦 Fast shipping",
  "💯 No fake products",
];

function PillSet() {
  return (
    <>
      {pills.map((text) => (
        <span key={text} className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap text-[13px] font-medium tracking-wide text-rgr-gray700 md:text-sm">
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
    <div className="overflow-hidden border-y border-rgr-gray300/40 bg-white py-4">
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
