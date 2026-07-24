import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Compass,
  UtensilsCrossed,
  MapPin,
  Sparkles,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getBranchBySlug } from "@/lib/data/locations";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Welcome to the table",
  description: `Heritage portal for guests at ${BRAND.name}.`,
  robots: { index: true, follow: true },
};

const CARDS = [
  {
    href: "/table/story",
    title: "Founder's Story",
    body: "Mary Auma Oliech & the recipes that built a Nairobi institution.",
    imageSrc:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    icon: BookOpen,
  },
  {
    href: "/table/celebrities",
    title: "Guest Wall",
    body: "Obama, Zuckerberg, Bourdain, Elba — and neighbors.",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    icon: Users,
  },
  {
    href: "/table/food-guide",
    title: "Cultural Guide",
    body: "Ugali, greens, and how we prepare Lake Victoria fish.",
    imageSrc:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    icon: Compass,
  },
  {
    href: "/table/menu",
    title: "Browse Menu",
    body: "Signature fish, heritage dishes, and sides.",
    imageSrc:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
    icon: UtensilsCrossed,
  },
] as const;

type Props = { searchParams: Promise<{ branch?: string }> };

export default async function TableHomePage({ searchParams }: Props) {
  const { branch: branchSlug } = await searchParams;
  const branch =
    branchSlug && getBranchBySlug(branchSlug)?.status === "active"
      ? getBranchBySlug(branchSlug)
      : undefined;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      {/* Table Welcome Hero Banner */}
      <div className="relative aspect-[4/5] sm:aspect-[21/10] w-full overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl group">
        <Image
          src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1200&q=80"
          alt="Fresh Lake Victoria Tilapia Feast at Mama Oliech"
          fill
          sizes="100vw"
          priority
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay" />

        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white space-y-3">
          {branch ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 backdrop-blur-md border border-white/20 self-start shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-white/90">
                Checked in at {branch.name}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 backdrop-blur-md border border-amber-500/30 self-start">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Table QR Portal
              </span>
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
            Karibu —<br />
            welcome to <span className="text-amber-500">{BRAND.name}</span>
          </h1>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md">
            While your meal is prepared, explore our founder&apos;s heritage,
            cultural food guides, and signature Lake Victoria dishes.
          </p>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {CARDS.map((card, idx) => {
          const IconComponent = card.icon;
          const targetUrl = branch
            ? `${card.href}?branch=${encodeURIComponent(branch.slug)}`
            : card.href;

          return (
            <Link
              key={card.href}
              href={targetUrl}
              className={cn(
                "group relative flex flex-col justify-end aspect-square rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/10 bg-stone-900/80 p-4 sm:p-5 transition-all duration-300",
                "hover:border-amber-500/50 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] active:scale-[0.98]",
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Image
                src={card.imageSrc}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-amber-500 group-hover:text-slate-950">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                </div>

                <h2 className="font-display text-base sm:text-lg font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                  {card.title}
                </h2>

                <p className="text-white/70 text-[11px] sm:text-xs line-clamp-2 leading-relaxed">
                  {card.body}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
