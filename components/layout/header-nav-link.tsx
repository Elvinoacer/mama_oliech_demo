"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export interface HeaderNavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function HeaderNavLink({ href, label, className }: HeaderNavLinkProps) {
  const pathname = usePathname();

  // Root "/" matches strictly; subpages match prefix (e.g. /locations/hurlingham matches /locations)
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm font-semibold transition-all duration-200 select-none shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#160c07] active:scale-95",
        active
          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner"
          : "border border-transparent text-amber-100/90 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      {label}
    </Link>
  );
}
