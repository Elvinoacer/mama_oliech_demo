"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const QR_LINKS = [
  { href: "/table", label: "Home", exact: true, icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "/table/story", label: "Story", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { href: "/table/celebrities", label: "Guests", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
  { href: "/table/food-guide", label: "Guide", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { href: "/table/menu", label: "Menu", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
] as const;

export function HeritageNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex w-full items-center justify-between gap-1 rounded-full bg-white/5 px-2 py-2 backdrop-blur-xl border border-white/10 shadow-2xl md:gap-2 md:px-3 md:py-3"
      aria-label="Table portal"
    >
      {QR_LINKS.map((link) => {
        const active =
          "exact" in link && link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 rounded-full px-3 py-2 transition-all duration-300 md:flex-row md:gap-2 md:px-5",
              active
                ? "bg-amber-500/10 text-amber-500"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            )}
          >
            {active && (
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md" />
            )}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
            >
              {link.icon.split(' M').map((d, i) => (
                <path key={i} d={i === 0 ? d : `M${d}`} />
              ))}
            </svg>
            <span className="relative z-10 text-[10px] font-semibold tracking-wide md:text-xs">
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
