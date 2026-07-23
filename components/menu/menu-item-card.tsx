import type { MenuItem } from "@/lib/types/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-[1.35rem]">
          {item.name}
        </h3>
        {item.badge ? (
          <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
            {item.badge}
          </span>
        ) : null}
      </div>
      {item.description ? (
        <p className="type-body mt-3">{item.description}</p>
      ) : null}
      {item.isCatchWeight ? (
        <p className="mt-4 text-sm font-semibold text-[var(--brand-accent)]">
          Sized at the kitchen · ask for today&apos;s portions
        </p>
      ) : null}
    </article>
  );
}
