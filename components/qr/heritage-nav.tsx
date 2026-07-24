"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, BookOpen, Users, Compass, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const QR_LINKS = [
  { href: "/table", label: "Home", exact: true, icon: Home },
  { href: "/table/story", label: "Story", icon: BookOpen },
  { href: "/table/celebrities", label: "Guests", icon: Users },
  { href: "/table/food-guide", label: "Guide", icon: Compass },
  { href: "/table/menu", label: "Menu", icon: UtensilsCrossed },
] as const;

export function HeritageNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const branch = searchParams.get("branch");

  return (
    <nav
      className="flex w-full items-center justify-between gap-1 rounded-full bg-black/90 px-2 py-2 backdrop-blur-xl border border-amber-500/25 shadow-2xl md:gap-2 md:px-3 md:py-2.5"
      aria-label="Table portal navigation"
    >
      {QR_LINKS.map((link) => {
        const Icon = link.icon;
        const active =
          "exact" in link && link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        // Preserve ?branch= parameter across table navigation
        const targetUrl = branch
          ? `${link.href}?branch=${encodeURIComponent(branch)}`
          : link.href;

        return (
          <Link
            key={link.href}
            href={targetUrl}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 rounded-full px-2.5 py-1.5 transition-all duration-300 md:flex-row md:gap-2 md:px-4 md:py-2 min-h-[44px] min-w-[52px]",
              active
                ? "bg-amber-500/10 text-amber-400 font-bold"
                : "text-white/60 hover:bg-white/5 hover:text-white font-medium",
            )}
          >
            {active ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-amber-500/20 blur-md"
              />
            ) : null}

            <Icon className="relative z-10 h-4 w-4 md:h-4 md:w-4 shrink-0 transition-transform duration-200" />
            <span className="relative z-10 text-[10px] sm:text-xs tracking-wide">
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
