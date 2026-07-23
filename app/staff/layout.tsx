import Link from "next/link";
import { cookies } from "next/headers";
import { FEATURES, STAFF_COOKIE } from "@/lib/constants";
import { StaffGateForm } from "@/components/staff/staff-gate-form";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!FEATURES.enableStaffPortal) {
    return (
      <main className="type-body mx-auto max-w-md px-4 py-16">
        Staff portal disabled via FEATURES.enableStaffPortal.
      </main>
    );
  }

  const password = process.env.STAFF_PORTAL_PASSWORD;
  if (password) {
    const jar = await cookies();
    const unlocked = jar.get(STAFF_COOKIE)?.value === "1";
    if (!unlocked) {
      return (
        <main className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-16">
          <h1 className="type-page-title !text-[length:var(--step-4)]">
            Staff access
          </h1>
          <p className="type-body mt-3">Enter the training portal password.</p>
          <div className="mt-8">
            <StaffGateForm />
          </div>
        </main>
      );
    }
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-10">
      <header className="mb-10 border-b border-[var(--border)] pb-6">
        <p className="type-eyebrow">Internal</p>
        <h1 className="type-page-title mt-2 !text-[length:var(--step-4)]">
          Staff training
        </h1>
        {!password ? (
          <p className="type-caption mt-3">
            No STAFF_PORTAL_PASSWORD set — portal is open in this environment.
          </p>
        ) : null}
        <nav className="mt-5 flex flex-wrap gap-5 text-base font-semibold">
          <Link href="/staff" className="underline-offset-2 hover:underline">
            Home
          </Link>
          <Link
            href="/staff/training/founders"
            className="underline-offset-2 hover:underline"
          >
            Modules
          </Link>
          <Link
            href="/"
            className="font-medium text-[var(--muted)] underline-offset-2 hover:underline"
          >
            Public site
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
