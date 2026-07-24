import Image from "next/image";
import Link from "next/link";
import type { CelebrityVisit } from "@/lib/types/story";

export function CelebrityWall({ guests }: { guests: CelebrityVisit[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {guests.map((guest) => (
        <li
          key={guest.name}
          className="group flex gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:p-5 hover:border-amber-500/30"
        >
          {guest.imageSrc ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:h-24 sm:w-24">
              <Image
                src={guest.imageSrc}
                alt={guest.imageAlt ?? guest.name}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
              {guest.name}
            </p>
            {guest.title ? (
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-1">
                {guest.title}
              </p>
            ) : null}
            {guest.note ? (
              <p className="text-white/80 mt-3 text-sm leading-relaxed">{guest.note}</p>
            ) : null}
            {guest.relatedMenuItemId === "zuckerberg-special" ? (
              <Link
                href="/table/menu#fish"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors"
              >
                See the Zuckerberg Special <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
