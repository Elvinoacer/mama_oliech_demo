import type { Metadata } from "next";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { MenuCategory } from "@/components/menu/menu-category";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Lake Victoria tilapia, traditional greens, heritage dishes, and group menus at Mama Oliech.",
};

export default function MenuPage() {
  const branchesWithPdf = getActiveBranches().filter((b) => b.menuPdfPath);

  return (
    <Section eyebrow="Menu" title="What we cook">
      <p className="type-lead mb-8">
        Descriptions of our dishes. For today&apos;s portions and prices, ask in
        house — fish is catch-weight, and prices can vary by size and branch.
      </p>

      <nav className="mb-10 flex flex-wrap gap-2.5" aria-label="Menu categories">
        {MENU_CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--muted)] hover:border-[var(--brand-accent)] hover:text-foreground"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mb-12 flex flex-wrap gap-3">
        {branchesWithPdf.length > 0 ? (
          branchesWithPdf.map((b) => (
            <Button key={b.slug} href={b.menuPdfPath!} variant="secondary" external>
              {b.label ?? b.name} PDF
            </Button>
          ))
        ) : (
          <p className="type-caption">
            Downloadable PDF menus can be added under{" "}
            <code className="text-[0.9em]">public/menus/</code> (see{" "}
            <code className="text-[0.9em]">docs/ASSET_CHECKLIST.md</code>).
          </p>
        )}
        <Button href="/catering" variant="ghost">
          Group & catering
        </Button>
      </div>

      <div className="space-y-16">
        {MENU_CATEGORIES.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
