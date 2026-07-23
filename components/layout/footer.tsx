/**
 * Marketing footer.
 * Source: website content §7
 *
 * TODO:
 * - Real social links, email, flagship address.
 * - Optional newsletter (only if ops wants it).
 * - Keep closed branches OFF the footer location list.
 */

import Link from "next/link";
import { BRAND, NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10 py-12">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-semibold">{BRAND.name}</p>
          <p className="mt-2 max-w-sm text-sm opacity-70">{BRAND.tagline}</p>
          <p className="mt-4 text-xs opacity-60">{BRAND.socialProofFooter}</p>
        </div>

        <div>
          <p className="text-sm font-medium">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Connect</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            {/* TODO: only show verified channels */}
            <li>
              <a href={EXTERNAL_LINKS.phone}>Phone (TODO)</a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.whatsapp}>WhatsApp (TODO)</a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.instagram}>Instagram (TODO)</a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.email}>Email (TODO)</a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-10 text-xs opacity-50">
        {/* TODO: legal entity name, year */}
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
