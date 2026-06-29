export type UseCase = {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: "graduation" | "briefcase" | "building" | "camera" | "gamepad" | "home";
};

export const USE_CASES: UseCase[] = [
  {
    slug: "students",
    title: "Students",
    description: "Affordable laptops and tablets for coursework, research and campus life.",
    href: "/listings?q=student+laptop",
    icon: "graduation",
  },
  {
    slug: "professionals",
    title: "Professionals",
    description: "Reliable MacBooks, ThinkPads and premium phones for daily productivity.",
    href: "/listings?q=professional",
    icon: "briefcase",
  },
  {
    slug: "businesses",
    title: "Businesses",
    description: "Bulk procurement, official quotations and dedicated account support.",
    href: "/business",
    icon: "building",
  },
  {
    slug: "creators",
    title: "Creators",
    description: "High-performance laptops, displays and audio for content creation.",
    href: "/listings?q=creator",
    icon: "camera",
  },
  {
    slug: "gamers",
    title: "Gamers",
    description: "Gaming laptops, peripherals and accessories from trusted brands.",
    href: "/listings?category=gaming",
    icon: "gamepad",
  },
  {
    slug: "home-office",
    title: "Home Office",
    description: "Monitors, laptops and office equipment for remote and hybrid work.",
    href: "/listings?category=office-equipment",
    icon: "home",
  },
];
