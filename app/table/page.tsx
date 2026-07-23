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
    body: "Mary Auma Oliech and the recipes that built a Nairobi institution.",
    imageSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  },
  {
    href: "/table/celebrities",
    title: "Guest wall",
    body: "Obama, Zuckerberg, Bourdain, Elba — and neighbors every day.",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    href: "/table/food-guide",
    title: "Cultural food guide",
    body: "Ugali, greens, and how we prepare Lake Victoria fish.",
    imageSrc: "/images/food/traditional-greens-ugali.jpg",
  },
  {
    href: "/table/menu",
    title: "Browse the menu",
    body: "Signature fish, heritage dishes, and sides.",
    imageSrc: "/images/food/hero-tilapia-feast.jpg",
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
    <div className="space-y-7">
      {/* Table Welcome Banner */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-[var(--border)] shadow-md">
        <Image
          src="/images/food/hero-tilapia-feast.jpg"
          alt="Fresh Lake Victoria Tilapia Feast"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 text-white">
          <span className="inline-block rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-950 shadow-md mb-1">
            Table Experience
          </span>
          <p className="font-display text-xl sm:text-2xl font-bold">Welcome to Mama Oliech</p>
        </div>
      </div>

      <div>
        <h1 className="type-page-title !text-[length:var(--step-4)]">
          Karibu — welcome
        </h1>
        {branch ? (
          <p className="mt-2 text-base font-semibold text-[var(--brand-accent)]">
            You&apos;re at {branch.name}
          </p>
        ) : null}
        <p className="type-lead mt-3 !max-w-none">
          While your order is prepared, explore the story behind Mama Oliech and
          the food of Western Kenya.
        </p>
      </div>

      <ul className="space-y-3">
        {CARDS.map((card) => (
          <li key={card.href}>
            <Link
              href={
                branch
                  ? `${card.href}${card.href.includes("?") ? "&" : "?"}branch=${branch.slug}`
                  : card.href
              }
              className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-sm transition hover:border-[var(--brand-accent)] sm:p-5 group"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-[var(--border)]">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                  {card.title}
                </p>
                <p className="type-body mt-1 text-xs sm:text-sm text-[var(--muted)]">{card.body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
