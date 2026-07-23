/**
 * Public menu page — categories, not volatile multi-platform prices.
 * Source: website content §3 + pricing note.
 *
 * TODO:
 * - Link to downloadable PDF(s) under public/menus/ once designed.
 * - Branch switcher if menus diverge (Hurlingham vs Kiambu).
 * - Anchor nav for categories on long pages.
 */

import type { Metadata } from "next";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { Section } from "@/components/ui/section";
import { MenuCategory } from "@/components/menu/menu-category";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Lake Victoria tilapia, traditional greens, heritage dishes, and group menus at Mama Oliech.",
};

export default function MenuPage() {
  return (
    <Section
      eyebrow="Menu"
      title="What we cook"
      className="pb-8"
    >
      <p className="mb-8 max-w-2xl text-sm opacity-70">
        {/* Content rule: avoid platform price mismatches on marketing pages */}
        Descriptions of our dishes. For today&apos;s portions and prices, ask in
        house or download the branch menu when available.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        {/* TODO: real PDF paths per active branch */}
        <Button href="/menus/hurlingham.pdf" variant="secondary">
          Flagship PDF (TODO)
        </Button>
        <Button href="/catering" variant="ghost">
          Group & catering
        </Button>
      </div>

      <div className="space-y-12">
        {MENU_CATEGORIES.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
