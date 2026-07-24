import type { Metadata } from "next";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { MenuCategory } from "@/components/menu/menu-category";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Lake Victoria tilapia, traditional greens, heritage dishes, and group menus at Mama Oliech. Pay per dish with M-Pesa.",
};

export default function MenuPage() {
  const activeBranches = getActiveBranches();
  const branchesWithPdf = activeBranches.filter((b) => b.menuPdfPath);
  const payBranches = activeBranches.map((b) => ({
    slug: b.slug,
    label: b.label ?? b.area ?? b.name,
  }));
  const defaultBranch = activeBranches[0]?.slug ?? "hurlingham";

  return (
    <Section eyebrow="Menu" title="What we cook">
      <p className="type-lead mb-4 max-w-2xl">
        Browse dishes with reference prices, then pay a single item with{" "}
        <strong className="font-semibold text-foreground">M-Pesa</strong> —
        choose portion, confirm the amount, and enter your phone for an STK
        prompt. Whole fish is priced by weight (KES/kg).
      </p>
      <p className="type-caption mb-8 max-w-2xl">
        Prices can vary slightly by size and branch. For large groups or full
        table bills, ask staff or use the in-house table QR.
      </p>

      <nav
        className="mb-10 -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
        aria-label="Menu categories"
      >
        {MENU_CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--muted)] hover:border-[var(--brand-accent)] hover:text-foreground"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="mb-12 flex flex-wrap items-center gap-3">
        {branchesWithPdf.length > 0 ? (
          branchesWithPdf.map((b) => (
            <Button key={b.slug} href={b.menuPdfPath!} variant="secondary" external>
              {b.label ?? b.name} PDF
            </Button>
          ))
        ) : null}
        <Button href="/catering" variant="ghost">
          Group & catering
        </Button>
        <Button href="/table/menu" variant="secondary">
          Table QR menu
        </Button>
      </div>

      <div className="space-y-16">
        {MENU_CATEGORIES.map((category) => (
          <MenuCategory
            key={category.id}
            category={category}
            showPrices
            enablePay
            paySource="menu"
            branchSlug={defaultBranch}
            branches={payBranches}
          />
        ))}
      </div>
    </Section>
  );
}
