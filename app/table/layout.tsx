import Link from "next/link";
import { HeritageNav } from "@/components/qr/heritage-nav";
import { BRAND } from "@/lib/constants";

export default function TablePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col px-4 py-7 sm:px-5">
      <header className="mb-6">
        <p className="type-eyebrow">Table portal</p>
        <Link
          href="/table"
          className="font-display mt-1 block text-2xl font-semibold text-[var(--brand-primary)] sm:text-3xl"
        >
          {BRAND.shortName}
        </Link>
        <div className="mt-5">
          <HeritageNav />
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="type-caption mt-12 border-t border-[var(--border)] pt-5">
        <Link
          href="/"
          className="font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
        >
          Full website
        </Link>
        <span className="mx-2">·</span>
        <Link href="/visit" className="underline-offset-2 hover:underline">
          Visit & delivery
        </Link>
      </footer>
    </div>
  );
}
