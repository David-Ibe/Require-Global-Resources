import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

/** Max 1440px content width with generous gutters. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-12",
        className
      )}
    >
      {children}
    </Tag>
  );
}
