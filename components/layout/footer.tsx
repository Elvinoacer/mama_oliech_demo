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
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] py-14 sm:py-16">
      <Container className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-amber-500/30 shadow-md">
              <Image
                src="/images/logo.svg"
                alt={`${BRAND.name} Logo`}
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <p className="font-display text-2xl font-semibold text-[var(--brand-primary)]">
              {BRAND.name}
            </p>
          </div>
          <p className="type-body max-w-sm">{BRAND.tagline}</p>
          <p className="type-caption mt-4 leading-relaxed">{BRAND.socialProofFooter}</p>

          {/* Delivery Partner Badges */}
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
              Official Delivery Partners
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={EXTERNAL_LINKS.uberEats}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-black text-white px-3 py-1.5 text-xs font-bold shadow-sm hover:bg-stone-800 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Uber Eats</span>
              </a>
              <a
                href={EXTERNAL_LINKS.boltFood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-xs font-bold shadow-sm hover:bg-emerald-500 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-200" />
                <span>Bolt Food</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="text-base font-semibold">Quick links</p>
          <ul className="type-body mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold">Locations</p>
          <ul className="type-body mt-4 space-y-2.5">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/locations/${b.slug}`}
                  className="hover:text-foreground hover:underline"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold">Connect</p>
          {connect.length > 0 ? (
            <ul className="type-body mt-4 space-y-2.5">
              {connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-foreground hover:underline"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-body mt-4">
              <Link href="/contact" className="underline underline-offset-2">
                Send a message
              </Link>
            </p>
          )}
          <p className="mt-5 text-base">
            <Link
              href="/table"
              className="font-medium text-[var(--brand-primary)] underline-offset-2 hover:underline"
            >
              Table QR portal
            </Link>
          </p>
        </div>
      </Container>

      <Container className="type-caption mt-12">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
