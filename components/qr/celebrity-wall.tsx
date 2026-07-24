import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, Utensils } from "lucide-react";
import type { CelebrityVisit } from "@/lib/types/story";
import { cn } from "@/lib/utils/cn";

export function CelebrityWall({ guests }: { guests: CelebrityVisit[] }) {
  if (!guests || guests.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2" role="list">
      {guests.map((guest) => {
        const isZuckerberg = guest.relatedMenuItemId === "zuckerberg-special";

        return (
          <li
            key={guest.name}
            className={cn(
              "group relative flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-6 shadow-2xs transition-all duration-300",
              "hover:border-amber-500/40 hover:shadow-md",
            )}
          >
            {/* Image / Avatar */}
            {guest.imageSrc ? (
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--border)] bg-stone-900 shadow-2xs">
                <Image
                  src={guest.imageSrc}
                  alt={guest.imageAlt ?? guest.name}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500 font-display text-2xl font-bold">
                {guest.name.charAt(0)}
              </div>
            )}

            {/* Content Details */}
            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <p className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors leading-tight">
                  {guest.name}
                </p>
                {guest.title ? (
                  <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1">
                    {guest.title}
                  </span>
                ) : null}
              </div>

              {/* Quote / Note */}
              {guest.note ? (
                <div className="relative rounded-xl bg-[var(--surface)] p-3 border border-[var(--border)]/50 my-2">
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed italic flex items-start gap-1.5">
                    <Quote className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>&ldquo;{guest.note}&rdquo;</span>
                  </p>
                </div>
              ) : null}

              {/* Special CTA */}
              {isZuckerberg ? (
                <div className="pt-1">
                  <Link
                    href="/table/menu#fish"
                    className="group/link inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all duration-200 min-h-[40px]"
                  >
                    <Utensils className="h-3.5 w-3.5 shrink-0" />
                    <span>See the Zuckerberg Special</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
