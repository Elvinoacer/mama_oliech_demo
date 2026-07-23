/**
 * Celebrity guest wall for QR portal.
 *
 * TODO:
 * - Photos / press stills with rights clearance.
 * - Optional "order their meal" deep-link via relatedMenuItemId.
 */

import type { CelebrityVisit } from "@/lib/types/story";

export function CelebrityWall({ guests }: { guests: CelebrityVisit[] }) {
  return (
    <ul className="grid gap-3">
      {guests.map((guest) => (
        <li
          key={guest.name}
          className="rounded-xl border border-foreground/10 p-4"
        >
          <p className="font-medium">{guest.name}</p>
          {guest.title ? (
            <p className="text-sm opacity-70">{guest.title}</p>
          ) : null}
          {guest.note ? (
            <p className="mt-2 text-sm opacity-80">{guest.note}</p>
          ) : (
            <p className="mt-2 text-xs opacity-50">
              TODO: short visit anecdote if documented
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
