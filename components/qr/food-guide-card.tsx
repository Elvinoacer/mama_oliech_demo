/**
 * Cultural food guide card (managu, osuga, ugali etiquette, etc.).
 * Ops doc: educate tourists while they wait; reduce pressure on waitstaff.
 *
 * TODO: illustrations / short video loops; nutrition notes from approved sources.
 */

import type { HeritageFact } from "@/lib/types/story";

export function FoodGuideCard({ fact }: { fact: HeritageFact }) {
  return (
    <article className="rounded-xl border border-foreground/10 p-4">
      <h3 className="font-medium">{fact.title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{fact.body}</p>
    </article>
  );
}
