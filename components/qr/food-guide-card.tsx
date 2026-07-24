import Image from "next/image";
import type { HeritageFact } from "@/lib/types/story";
import { FOOD_GUIDE_IMAGES } from "@/lib/data/unsplash";

export function FoodGuideCard({ fact }: { fact: HeritageFact }) {
  const img = FOOD_GUIDE_IMAGES[fact.id];

  return (
    <article className="group flex flex-col sm:flex-row gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6 transition-all duration-300 hover:bg-white/10 hover:border-amber-500/30">
      {img ? (
        <div className="relative aspect-[4/3] sm:aspect-square h-auto sm:h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-white/5 border border-white/10">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : null}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
          {fact.title}
        </h3>
        <p className="text-white/80 mt-2 leading-relaxed text-sm sm:text-base">{fact.body}</p>
      </div>
    </article>
  );
}
