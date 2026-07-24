import Image from "next/image";
import { Utensils } from "lucide-react";
import type { HeritageFact } from "@/lib/types/story";
import { FOOD_GUIDE_IMAGES } from "@/lib/data/unsplash";

export function FoodGuideCard({ fact }: { fact: HeritageFact }) {
  const img = FOOD_GUIDE_IMAGES[fact.id];

  return (
    <article className="group flex flex-col sm:flex-row gap-5 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-amber-500/40">
      {img ? (
        <div className="relative aspect-[16/9] sm:aspect-square h-auto sm:h-32 w-full sm:w-32 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 shadow-inner">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
          />
        </div>
      ) : null}

      <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Utensils className="h-3.5 w-3.5 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Heritage Detail
          </span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
          {fact.title}
        </h3>

        <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
          {fact.body}
        </p>
      </div>
    </article>
  );
}
