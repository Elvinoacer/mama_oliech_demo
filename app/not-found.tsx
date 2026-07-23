import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center text-center px-6 py-20">
      <div className="relative mb-6 h-36 w-36 overflow-hidden rounded-full border-4 border-amber-500/30 shadow-xl">
        <Image
          src="/images/food/hero-tilapia-feast.jpg"
          alt="Mama Oliech 404 Fish"
          fill
          sizes="144px"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-2">
          <span className="text-xl font-bold text-amber-300">404</span>
        </div>
      </div>

      <p className="type-eyebrow">404 — Off the Menu</p>
      <h1 className="type-page-title mt-2">Page Not Found</h1>
      <p className="type-lead mt-3 max-w-md">
        Looks like this dish isn&apos;t on today&apos;s menu. Head back home or explore our delicious offerings.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">
          Home Page
        </Button>
        <Button href="/menu" variant="secondary" size="lg">
          Explore Menu
        </Button>
        <Button href="/locations" variant="ghost" size="lg">
          Find Locations
        </Button>
      </div>

      <p className="mt-6 text-sm">
        <Link
          href="/contact"
          className="font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
        >
          Need help? Contact our team →
        </Link>
      </p>
    </main>
  );
}
