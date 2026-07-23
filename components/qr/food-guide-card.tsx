import Image from "next/image";
import type { HeritageFact } from "@/lib/types/story";
import { FOOD_GUIDE_IMAGES } from "@/lib/data/unsplash";

export function FoodGuideCard({ fact }: { fact: HeritageFact }) {
  const img = FOOD_GUIDE_IMAGES[fact.id];

  return (
    <article className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6 transition-all hover:shadow-md hover:border-[var(--brand-accent)]/30">
      {img ? (
        <div className="relative aspect-[4/3] sm:aspect-square h-auto sm:h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl font-semibold text-[var(--brand-primary)]">
          {fact.title}
        </h3>
        <p className="type-body mt-2 leading-relaxed text-sm sm:text-base">{fact.body}</p>
      </div>
    </article>
  );
}
