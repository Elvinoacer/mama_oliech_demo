import Link from "next/link";
import type { CelebrityVisit } from "@/lib/types/story";

export function CelebrityWall({ guests }: { guests: CelebrityVisit[] }) {
  return (
    <ul className="grid gap-4">
      {guests.map((guest) => (
        <li
          key={guest.name}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6"
        >
          <p className="font-display text-xl font-semibold text-[var(--brand-primary)]">
            {guest.name}
          </p>
          {guest.title ? (
            <p className="type-body mt-1 !text-[length:var(--step-0)]">{guest.title}</p>
          ) : null}
          {guest.note ? (
            <p className="type-body mt-3">{guest.note}</p>
          ) : null}
          {guest.relatedMenuItemId === "zuckerberg-special" ? (
            <Link
              href="/menu#fish"
              className="mt-4 inline-block text-base font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
            >
              See the Zuckerberg Special →
            </Link>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
