import { MENU_CATEGORIES } from "@/lib/data/menu";
import { MenuCategory } from "@/components/menu/menu-category";

export default function TableMenuPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="type-page-title !text-[length:var(--step-4)]">Menu</h1>
        <p className="type-lead mt-2 !max-w-none">
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
