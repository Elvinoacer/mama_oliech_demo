import { MENU_CATEGORIES } from "@/lib/data/menu";
import { MenuCategory } from "@/components/menu/menu-category";

export default function TableMenuPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl mb-2">
          Menu
        </h1>
        <div className="h-1 w-16 sm:w-20 rounded-full bg-amber-500" />
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75 sm:mt-4 sm:text-lg">
          Tap{" "}
          <strong className="font-semibold text-amber-400">Pay with M-Pesa</strong>{" "}
          on a dish, confirm the portion and amount, then enter your phone for an
          STK prompt. Whole fish is priced by weight (KES/kg).
        </p>
      </header>

      <nav
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin sm:flex-wrap sm:overflow-visible"
        aria-label="Categories"
      >
        {MENU_CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-500/40 hover:text-amber-200"
          >
            {c.title}
          </a>
        ))}
      </nav>

      <div className="space-y-10 sm:space-y-12">
        {MENU_CATEGORIES.map((category) => (
          <MenuCategory
            key={category.id}
            category={category}
            showPrices
            enablePay
          />
        ))}
      </div>
    </div>
  );
}
