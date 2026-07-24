import type { Metadata } from "next";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { MenuCategory } from "@/components/menu/menu-category";
import { Button } from "@/components/ui/button";
import { FileText, QrCode, Users, Info } from "lucide-react";

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
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      <Section eyebrow="Menu" title="What we cook">
        {/* Header Lead & Pricing Info */}
        <div className="space-y-4 mb-6 sm:mb-8 max-w-3xl">
          <p className="type-lead text-base sm:text-lg text-[var(--foreground)]/90 leading-relaxed !max-w-none">
            Browse authentic dishes with reference prices. Pay directly per dish
            via{" "}
            <strong className="font-bold text-emerald-600 dark:text-emerald-400">
              M-Pesa
            </strong>{" "}
            — choose your portion, confirm the amount, and receive an instant
            STK prompt on your phone.
          </p>

          <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3.5 text-xs text-[var(--muted)] leading-relaxed shadow-2xs">
            <Info className="h-4 w-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
            <p>
              Whole fish is fresh daily and priced by weight (KES/kg). Prices
              may vary slightly by size and branch. For group dining or full
              table bills, ask our staff or scan the in-house QR code.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mb-8 flex flex-wrap items-center gap-2.5">
          {branchesWithPdf.length > 0
            ? branchesWithPdf.map((b) => (
                <Button
                  key={b.slug}
                  href={b.menuPdfPath!}
                  variant="secondary"
                  external
                  className="font-semibold text-xs sm:text-sm min-h-[40px] gap-2 active:scale-[0.98]"
                >
                  <FileText className="h-4 w-4 text-[var(--brand-primary)] shrink-0" />
                  <span>{b.label ?? b.name} PDF Menu</span>
                </Button>
              ))
            : null}

          <Button
            href="/table/menu"
            variant="secondary"
            className="font-semibold text-xs sm:text-sm min-h-[40px] gap-2 active:scale-[0.98]"
          >
            <QrCode className="h-4 w-4 text-[var(--brand-primary)] shrink-0" />
            <span>Table QR Menu</span>
          </Button>

          <Button
            href="/catering"
            variant="ghost"
            className="font-semibold text-xs sm:text-sm min-h-[40px] gap-2 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
          >
            <Users className="h-4 w-4 shrink-0" />
            <span>Group & Catering</span>
          </Button>
        </div>

        {/* Sticky Category Navigation Bar */}
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-10 sm:mb-12 bg-[var(--background)]/85 backdrop-blur-md border-y border-[var(--border)]/60 shadow-2xs">
          <nav
            className="flex gap-2 overflow-x-auto scrollbar-none scroll-smooth py-0.5"
            aria-label="Menu categories"
          >
            {MENU_CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[var(--foreground)]/80 transition-all hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--surface)] active:scale-95"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Menu Categories List */}
        <div className="space-y-12 sm:space-y-16">
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
    </div>
  );
}
