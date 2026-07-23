import Image from "next/image";
import Link from "next/link";
import type { CelebrityVisit } from "@/lib/types/story";

export function CelebrityWall({ guests }: { guests: CelebrityVisit[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {guests.map((guest) => (
        <li
          key={guest.name}
          className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-sm sm:p-5"
        >
          {guest.imageSrc ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[var(--surface)] sm:h-24 sm:w-24">
              <Image
                src={guest.imageSrc}
                alt={guest.imageAlt ?? guest.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-semibold text-[var(--brand-primary)]">
              {guest.name}
            </p>
            {guest.title ? (
              <p className="type-body mt-0.5 !text-[length:var(--step-0)]">
                {guest.title}
              </p>
            ) : null}
            {guest.note ? (
              <p className="type-body mt-2 text-sm sm:text-base">{guest.note}</p>
            ) : null}
            {guest.relatedMenuItemId === "zuckerberg-special" ? (
              <Link
                href="/menu#fish"
                className="mt-3 inline-block text-base font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
              >
                See the Zuckerberg Special →
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
