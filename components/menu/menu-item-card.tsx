import Image from "next/image";
import type { MenuItem } from "@/lib/types/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm transition hover:border-[var(--brand-accent)]/40 hover:shadow-md">
      {item.imageSrc ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color-mix(in_srgb,var(--brand-primary)_8%,var(--surface))]">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            className="object-cover transition duration-500 hover:scale-105"
          />
          {item.badge ? (
            <span className="absolute top-3 left-3 rounded-full bg-[var(--surface-elevated)]/95 px-2.5 py-1 text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase shadow-sm backdrop-blur-sm">
              {item.badge}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-foreground sm:text-[1.35rem]">
            {item.name}
          </h3>
          {!item.imageSrc && item.badge ? (
            <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              {item.badge}
            </span>
          ) : null}
        </div>
        {item.description ? (
          <p className="type-body mt-3 flex-1">{item.description}</p>
        ) : null}
        {item.isCatchWeight ? (
          <p className="mt-4 text-sm font-semibold text-[var(--brand-accent)]">
            Sized at the kitchen · ask for today&apos;s portions
          </p>
        ) : null}
      </div>
    </article>
  );
}
