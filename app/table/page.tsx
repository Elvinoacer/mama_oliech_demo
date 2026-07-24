import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { getBranchBySlug } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Welcome to the table",
  description: `Heritage portal for guests at ${BRAND.name}.`,
  robots: { index: true, follow: true },
};

const CARDS = [
  {
    href: "/table/story",
    title: "Founder's story",
    body: "Mary Auma Oliech & the recipes that built a Nairobi institution.",
    imageSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  },
  {
    href: "/table/celebrities",
    title: "Guest wall",
    body: "Obama, Zuckerberg, Bourdain, Elba — and neighbors.",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"
  },
  {
    href: "/table/food-guide",
    title: "Cultural guide",
    body: "Ugali, greens, and how we prepare Lake Victoria fish.",
    imageSrc: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  },
  {
    href: "/table/menu",
    title: "Browse the menu",
    body: "Signature fish, heritage dishes, and sides.",
    imageSrc: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
    icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Table Welcome Banner */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl group">
        <Image
          src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80"
          alt="Fresh Lake Victoria Tilapia Feast"
          fill
          sizes="100vw"
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay" />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          {branch ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/20 self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-medium text-white/90">
                Checked in at {branch.name}
              </span>
            </div>
          ) : null}
          
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight mb-3">
            Karibu —<br/>welcome to<br/><span className="text-amber-500">{BRAND.name}</span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
            While your order is prepared, explore the story behind our heritage and the food of Western Kenya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {CARDS.map((card, idx) => (
          <Link
            key={card.href}
            href={
              branch
                ? `${card.href}${card.href.includes("?") ? "&" : "?"}branch=${branch.slug}`
                : card.href
            }
            className="group relative flex flex-col justify-end aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 p-5 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <Image
              src={card.imageSrc}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
            
            <div className="relative z-10">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-500 transition-transform duration-500 group-hover:-translate-y-1 group-hover:bg-amber-500/20 group-hover:text-amber-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {card.icon.split(' M').map((d, i) => (
                    <path key={i} d={i === 0 ? d : `M${d}`} />
                  ))}
                </svg>
              </div>
              <h2 className="font-display text-lg font-bold text-white mb-1 leading-tight group-hover:text-amber-400 transition-colors">
                {card.title}
              </h2>
              <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                {card.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
