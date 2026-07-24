import Link from "next/link";
import Image from "next/image";
import { BRAND, NAV_LINKS, EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Container } from "@/components/ui/container";

export function Footer() {
  const branches = getActiveBranches();
  const connect: Array<{ href: string; label: string }> = [];

  if (isLiveLink(EXTERNAL_LINKS.phone)) {
    connect.push({ href: EXTERNAL_LINKS.phone, label: "Phone" });
  }
  if (isLiveLink(EXTERNAL_LINKS.whatsapp)) {
    connect.push({ href: EXTERNAL_LINKS.whatsapp, label: "WhatsApp" });
  }
  if (isLiveLink(EXTERNAL_LINKS.email)) {
    connect.push({ href: EXTERNAL_LINKS.email, label: "Email" });
  }
  if (isLiveLink(EXTERNAL_LINKS.instagram)) {
    connect.push({ href: EXTERNAL_LINKS.instagram, label: "Instagram" });
  }
  if (isLiveLink(EXTERNAL_LINKS.facebook)) {
    connect.push({ href: EXTERNAL_LINKS.facebook, label: "Facebook" });
  }
  if (isLiveLink(EXTERNAL_LINKS.uberEats)) {
    connect.push({ href: EXTERNAL_LINKS.uberEats, label: "Uber Eats" });
  }
  if (isLiveLink(EXTERNAL_LINKS.boltFood)) {
    connect.push({ href: EXTERNAL_LINKS.boltFood, label: "Bolt Food" });
  }

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10 lg:space-y-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border border-amber-500/30 shadow-sm">
                <Image
                  src="/images/logo.svg"
                  alt={`${BRAND.name} Logo`}
                  fill
                  sizes="(max-width: 640px) 44px, 48px"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[var(--brand-primary)]">
                {BRAND.name}
              </span>
            </div>

            <p className="type-body text-sm sm:text-base max-w-sm text-[var(--foreground)]/80 leading-relaxed">
              {BRAND.tagline}
            </p>

            {BRAND.socialProofFooter && (
              <p className="type-caption text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {BRAND.socialProofFooter}
              </p>
            )}

            {/* Official Delivery Partners */}
            <div className="pt-4 border-t border-[var(--border)]/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                Official Delivery Partners
              </p>
              <div className="flex flex-wrap gap-2.5">
                {isLiveLink(EXTERNAL_LINKS.uberEats) && (
                  <a
                    href={EXTERNAL_LINKS.uberEats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-stone-800 active:scale-95 shadow-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Uber Eats</span>
                  </a>
                )}
                {isLiveLink(EXTERNAL_LINKS.boltFood) && (
                  <a
                    href={EXTERNAL_LINKS.boltFood}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-emerald-500 active:scale-95 shadow-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-200 animate-pulse" />
                    <span>Bolt Food</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation & Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-8 pt-2 lg:pt-0">
            {/* Quick Links */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Quick links
              </p>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-[var(--foreground)]/80 hover:text-[var(--brand-primary)] hover:translate-x-0.5 transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Locations
              </p>
              <ul className="space-y-2 text-sm">
                {branches.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/locations/${b.slug}`}
                      className="inline-block py-1 text-[var(--foreground)]/80 hover:text-[var(--brand-primary)] hover:translate-x-0.5 transition-all duration-150"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Special Portals */}
            <div className="col-span-2 sm:col-span-1 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Connect
              </p>
              {connect.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {connect.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="inline-block py-1 text-[var(--foreground)]/80 hover:text-[var(--brand-primary)] hover:translate-x-0.5 transition-all duration-150"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">
                  <Link
                    href="/contact"
                    className="inline-block py-1 text-[var(--brand-primary)] underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    Send a message
                  </Link>
                </p>
              )}

              {/* Highlighted Table QR Badge */}
              <div className="pt-2">
                <Link
                  href="/table"
                  className="group inline-flex items-center gap-2 rounded-lg border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 px-3 py-2 text-xs font-medium text-[var(--brand-primary)] transition-all hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  <svg
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span>Table QR Portal</span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
