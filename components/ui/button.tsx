import Link from "next/link";

import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[48px]";

const variants = {
  primary:
    "bg-accent px-8 py-3 text-white hover:bg-accent-hover active:bg-[#c24d15]",
  secondary:
    "border border-border bg-white px-8 py-3 text-navy hover:border-navy/30 hover:bg-neutral-50",
  ghost: "px-4 py-2 text-muted hover:text-neutral-900",
  navy: "bg-navy px-8 py-3 text-white hover:bg-navy-600 active:bg-navy-700",
  whatsapp:
    "bg-[#25D366] px-8 py-3.5 text-white hover:bg-[#20bd5a]",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "className">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    const linkProps = props as Omit<React.ComponentProps<typeof Link>, "className" | "href">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
