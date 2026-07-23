"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const QR_LINKS = [
  { href: "/table", label: "Home", exact: true },
  { href: "/table/story", label: "Story" },
  { href: "/table/celebrities", label: "Guests" },
  { href: "/table/food-guide", label: "Food guide" },
  { href: "/table/menu", label: "Menu" },
] as const;

export function HeritageNav() {
  const pathname = usePathname();

  return (
    <nav
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 text-base"
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
              "shrink-0 rounded-full border px-4 py-2.5 font-semibold transition",
              active
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--surface)]"
                : "border-[var(--border)] bg-[var(--surface)] text-foreground hover:border-[var(--brand-accent)]",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
