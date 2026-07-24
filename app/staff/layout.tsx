import Link from "next/link";
import { cookies } from "next/headers";
import {
  ShieldAlert,
  Lock,
  BookOpen,
  Home,
  Globe,
  GraduationCap,
  Unlock,
} from "lucide-react";
import { FEATURES, STAFF_COOKIE } from "@/lib/constants";
import { StaffGateForm } from "@/components/staff/staff-gate-form";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Feature Flag Check
  if (!FEATURES.enableStaffPortal) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="font-display text-2xl font-bold text-[var(--foreground)]">
          Staff Portal Disabled
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
          The internal staff portal is currently disabled. Enable{" "}
          <code className="rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 border border-[var(--border)] text-xs font-mono">
            FEATURES.enableStaffPortal
          </code>{" "}
          in your configuration to access training materials.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-xs font-bold text-[var(--foreground)] hover:border-[var(--brand-primary)] transition-all min-h-[44px]"
        >
          <Globe className="h-4 w-4 text-[var(--brand-primary)]" />
          <span>Return to Public Site</span>
        </Link>
      </main>
    );
  }

  // 2. Password Protection Gate Check
  const password = process.env.STAFF_PORTAL_PASSWORD;
  if (password) {
    const jar = await cookies();
    const unlocked = jar.get(STAFF_COOKIE)?.value === "1";

    if (!unlocked) {
      return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-12 sm:py-16">
          <div className="rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-8 shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6">
              <Lock className="h-7 w-7" />
            </div>
            <div className="text-center space-y-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Restricted Area
              </span>
              <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Staff Access
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Enter the internal password to unlock Mama Oliech staff training
                modules.
              </p>
            </div>
            <div className="mt-6">
              <StaffGateForm />
            </div>
          </div>
        </main>
      );
    }
  }

  // 3. Unlocked Main Staff Layout
  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 sm:px-6 py-8 sm:py-10">
      <header className="mb-8 border-b border-[var(--border)] pb-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Internal Portal</span>
          </span>

          {!password ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <Unlock className="h-3 w-3" />
              <span>Open Access (Dev)</span>
            </span>
          ) : null}
        </div>

        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Staff Training Hub
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted)]">
            Standard operating procedures, hospitality standards & kitchen
            onboarding.
          </p>
        </div>

        {/* Navigation Bar */}
        <nav
          aria-label="Staff Portal Navigation"
          className="flex flex-wrap items-center gap-2 pt-2 text-xs sm:text-sm font-semibold"
        >
          <Link
            href="/staff"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-[var(--foreground)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all min-h-[40px]"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span>Home</span>
          </Link>

          <Link
            href="/staff/training/founders"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-[var(--foreground)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all min-h-[40px]"
          >
            <BookOpen className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Modules</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border)] transition-all min-h-[40px] ml-auto"
          >
            <Globe className="h-4 w-4 shrink-0" />
            <span>Public Site</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
