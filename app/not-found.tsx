import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-start justify-center gap-5 px-6 py-24">
      <p className="type-eyebrow">404</p>
      <h1 className="type-page-title">Page not found</h1>
      <p className="type-lead !max-w-none">
        That page isn&apos;t on the menu. Head back home or browse locations.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <Button href="/" size="lg">
          Home
        </Button>
        <Button href="/menu" variant="secondary" size="lg">
          Menu
        </Button>
        <Button href="/locations" variant="ghost" size="lg">
          Locations
        </Button>
      </div>
      <p className="mt-4 text-base">
        <Link
          href="/contact"
          className="font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
        >
          Need help? Contact us
        </Link>
      </p>
    </main>
  );
}
