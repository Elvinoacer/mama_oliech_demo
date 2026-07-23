/**
 * Global 404.
 * TODO: brand illustration + links back to Menu / Locations / Home.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-start justify-center gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="opacity-70">
        That page isn&apos;t on the menu. Head back home or browse locations.
      </p>
      <div className="flex gap-4 text-sm underline underline-offset-4">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/locations">Locations</Link>
      </div>
    </main>
  );
}
