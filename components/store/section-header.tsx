import { cn } from "@/lib/cn";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "left",
}: Props) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-section-title text-neutral-900">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
