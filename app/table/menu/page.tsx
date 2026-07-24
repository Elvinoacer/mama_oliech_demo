import { MenuCategory } from "@/components/menu/menu-category";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { Smartphone, UtensilsCrossed } from "lucide-react";

export default function TableMenuPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      {/* Header & Instructions */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <UtensilsCrossed className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Table Dining & Direct Pay</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Menu
          </h1>
          <div className="mt-2.5 h-1 w-16 sm:w-20 rounded-full bg-amber-500" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5">
              <Smartphone className="h-4 w-4" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-white/80">
              Tap{" "}
              <strong className="font-bold text-amber-400">
                Pay with M-Pesa
              </strong>{" "}
              on any dish, confirm your portion, and enter your phone number for
              an instant STK prompt.{" "}
              <span className="text-white/60">
                Whole fish is priced by weight (KES/kg).
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Sticky Horizontal Category Navigation */}
      <nav
        className="sticky top-0 z-30 -mx-5 px-5 py-3 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/10 shadow-lg"
        aria-label="Menu categories"
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-0.5">
          {MENU_CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-white/80 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 active:scale-95 min-h-[38px] flex items-center"
            >
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Category Listings */}
      <div className="space-y-12 sm:space-y-16 pt-2">
        {MENU_CATEGORIES.map((category) => (
          <div key={category.id} id={category.id} className="scroll-mt-24">
            <MenuCategory category={category} showPrices enablePay />
          </div>
        ))}
      </div>
    </div>
  );
}
