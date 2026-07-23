"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function HeaderNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
        active
          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner"
          : "text-amber-100/90 hover:bg-white/10 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

