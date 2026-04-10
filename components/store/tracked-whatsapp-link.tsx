"use client";

import type { ReactNode } from "react";

import { trackWhatsAppClick } from "@/lib/analytics";

type TrackedWhatsAppLinkProps = {
  href: string;
  eventLabel: string;
  className?: string;
  children: ReactNode;
};

export function TrackedWhatsAppLink({
  href,
  eventLabel,
  className,
  children
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick(eventLabel)}
    >
      {children}
    </a>
  );
}
