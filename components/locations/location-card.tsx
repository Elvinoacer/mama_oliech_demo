/**
 * Branch card for listings and homepage preview.
 * Never pass closed branches into public UIs.
 *
 * TODO: hours chip, delivery badges, directions button, branch photo.
 */

import Link from "next/link";
import type { Branch } from "@/lib/types/location";

export function LocationCard({ branch }: { branch: Branch }) {
  return (
    <article className="rounded-xl border border-foreground/10 p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{branch.name}</h3>
        {branch.label ? (
          <span className="text-xs uppercase tracking-wide opacity-60">
            {branch.label}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm opacity-70">
        {branch.addressLine}
        <br />
        {branch.area}, {branch.city}
      </p>
      {branch.hours?.[0] ? (
        <p className="mt-3 text-sm opacity-60">
          {branch.hours[0].days}: {branch.hours[0].open}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href={`/locations/${branch.slug}`} className="underline underline-offset-4">
          Details
        </Link>
        {/* TODO: mapUrl, phone, delivery deep links */}
      </div>
    </article>
  );
}
