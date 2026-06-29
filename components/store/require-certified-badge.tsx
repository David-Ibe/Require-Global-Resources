import { ShieldCheck } from "@/components/icons";
import { cn } from "@/lib/cn";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "gap-1 px-2 py-0.5 text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-2 px-3 py-1.5 text-sm",
};

const iconSizes = { sm: 12, md: 14, lg: 16 };

export function RequireCertifiedBadge({ size = "md", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-navy/5 font-medium text-navy",
        sizes[size],
        className
      )}
    >
      <ShieldCheck size={iconSizes[size]} className="shrink-0 text-navy" />
      Require Certified
    </span>
  );
}

export function TrustPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-neutral-700",
        className
      )}
    >
      {children}
    </span>
  );
}
