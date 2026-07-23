/**
 * Marketing site header.
 *
 * TODO:
 * - Design: logo wordmark + warm brand palette.
 * - Sticky header on scroll; mobile drawer using MobileNav.
 * - Highlight active route with usePathname (client subcomponent).
 * - Optional: "Order delivery" CTA always visible on mobile.
 */

import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-foreground/10">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          {/* TODO: replace text with logo asset */}
          {BRAND.shortName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="opacity-80 transition hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* TODO: wire to real delivery aggregator or /visit#delivery */}
          <Button href="/visit" variant="primary" className="hidden sm:inline-flex">
            Order / Visit
          </Button>
          {/* TODO: <MobileNav /> for small screens */}
          <span className="text-xs opacity-50 md:hidden">Menu TODO</span>
        </div>
      </Container>
    </header>
  );
}
