import { MENU_CATEGORIES } from "@/lib/data/menu";
import { MenuCategory } from "@/components/menu/menu-category";

export default function TableMenuPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
          Menu
        </h1>
        <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
        <p className="text-white/80 text-lg leading-relaxed mt-4 max-w-lg">
          Ask your waiter for today&apos;s fish sizes and prices.
        </p>
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="Categories">
        {MENU_CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-[var(--border)] px-3.5 py-2 text-sm font-semibold text-[var(--muted)]"
          >
            {c.title}
          </a>
        ))}
      </nav>
      {MENU_CATEGORIES.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
    </div>
  );
}
