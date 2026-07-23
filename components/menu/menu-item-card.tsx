/**
 * Single menu item presentation.
 * Intentionally omits price by default (website content guidance).
 *
 * TODO:
 * - Photo thumbnails for signature items.
 * - Dietary tags if kitchen can support them accurately.
 * - Catch-weight note for whole fish ("priced by size").
 */

import type { MenuItem } from "@/lib/types/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="rounded-xl border border-foreground/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">{item.name}</h3>
        {item.badge ? (
          <span className="shrink-0 rounded-full bg-foreground/5 px-2 py-0.5 text-xs">
            {item.badge}
          </span>
        ) : null}
      </div>
      {item.description ? (
        <p className="mt-2 text-sm opacity-70">{item.description}</p>
      ) : null}
      {item.isCatchWeight ? (
        <p className="mt-2 text-xs opacity-50">
          {/* TODO: copy for portion sizes / scale pricing */}
          Sized at the kitchen · ask staff for today&apos;s portions
        </p>
      ) : null}
      {/* Prices: add only when synced from a single menu source */}
    </article>
  );
}
