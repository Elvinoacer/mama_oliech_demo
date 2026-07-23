import type { HeritageFact } from "@/lib/types/story";

export function FoodGuideCard({ fact }: { fact: HeritageFact }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6">
      <h3 className="font-display text-xl font-semibold text-[var(--brand-primary)]">
        {fact.title}
      </h3>
      <p className="type-body mt-3">{fact.body}</p>
    </article>
  );
}
