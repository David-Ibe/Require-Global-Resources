import Link from "next/link";
import { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
  ariaLabel?: string;
};

export function CTAButton({
  href,
  children,
  className = "",
  newTab = false,
  ariaLabel
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-lg bg-brand-electric px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-brand-navy hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </Link>
  );
}
