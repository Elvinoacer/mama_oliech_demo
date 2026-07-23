/**
 * Table QR guest portal layout.
 * Ops doc: wooden block QR → mobile web portal for heritage + menu education.
 *
 * Design goals (TODO):
 * - Mobile-first, large type, thumb-friendly nav.
 * - Minimal chrome (no full marketing footer noise).
 * - Optional branch context via searchParams on child pages.
 * - Works well on mid-range Android phones (common guest devices).
 *
 * NOTE: This is NOT full table ordering yet (FEATURES.enableTableOrdering).
 * Heritage first; ordering can plug in later without rewriting the portal.
 */

import { HeritageNav } from "@/components/qr/heritage-nav";
import { BRAND } from "@/lib/constants";
import Link from "next/link";

export default function TablePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col px-4 py-6">
      <header className="mb-4">
        <p className="text-xs font-medium tracking-wide uppercase opacity-60">
          Table portal
        </p>
        <Link href="/table" className="text-lg font-semibold">
          {BRAND.shortName}
        </Link>
        <div className="mt-4">
          <HeritageNav />
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="mt-10 border-t border-foreground/10 pt-4 text-xs opacity-50">
        {/* TODO: link to full marketing site + branch phone */}
        <Link href="/" className="underline underline-offset-2">
          Full website
        </Link>
      </footer>
    </div>
  );
}
