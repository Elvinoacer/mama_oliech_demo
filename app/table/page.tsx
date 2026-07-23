import type { Metadata } from "next";
import Link from "next/link";
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
  },
  {
    href: "/table/celebrities",
    title: "Guest wall",
    body: "Obama, Zuckerberg, Bourdain, Elba — and neighbors every day.",
  },
  {
    href: "/table/food-guide",
    title: "Cultural food guide",
    body: "Ugali, greens, and how we prepare Lake Victoria fish.",
  },
  {
    href: "/table/menu",
    title: "Browse the menu",
    body: "Signature fish, heritage dishes, and sides.",
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
              className="block rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm transition hover:border-[var(--brand-accent)] sm:p-6"
            >
              <p className="font-display text-xl font-semibold text-foreground">
                {card.title}
              </p>
              <p className="type-body mt-2">{card.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
