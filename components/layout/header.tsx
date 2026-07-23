import Link from "next/link";
import Image from "next/image";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HeaderNavLink } from "@/components/layout/header-nav-link";
import { ShoppingBag } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/40 bg-[#160c07]/95 text-amber-50 backdrop-blur-md shadow-xl transition-all">
      <Container className="flex h-20 items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.svg"
              alt={`${BRAND.name} Logo`}
              fill
              sizes="44px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              {BRAND.shortName}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 hidden sm:block">
              Authentic Lake Victoria Tilapia
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          className="hidden items-center gap-1 text-base md:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <HeaderNavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Call to action */}
        <div className="flex items-center gap-3">
          <Button
            href="/visit"
            variant="primary"
            className="hidden sm:inline-flex bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-600/30 border-none transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Order / Visit</span>
          </Button>
          <MobileNav />
        </div>

      </Container>
    </header>
  );
}


