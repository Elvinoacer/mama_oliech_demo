/**
 * Staff training portal shell (internal).
 * Ops doc § “Digital Heritage Training Portal”
 *
 * TODO:
 * - Auth (simple PIN / magic link / SSO) before production use.
 * - robots noindex; maybe separate subdomain later.
 * - Progress tracking per staff member (requires DB).
 */

import Link from "next/link";
import { FEATURES } from "@/lib/constants";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!FEATURES.enableStaffPortal) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-sm">
        Staff portal disabled via FEATURES.enableStaffPortal.
      </main>
    );
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8">
      <header className="mb-8 border-b border-foreground/10 pb-4">
        <p className="text-xs uppercase tracking-wide opacity-60">Internal</p>
        <h1 className="text-lg font-semibold">Staff training</h1>
        <nav className="mt-3 flex gap-4 text-sm">
          <Link href="/staff" className="underline-offset-2 hover:underline">
            Home
          </Link>
          <Link
            href="/staff/training/founders"
            className="underline-offset-2 hover:underline"
          >
            Modules
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
