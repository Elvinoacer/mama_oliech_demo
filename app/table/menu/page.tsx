/**
 * Mobile menu for table QR.
 * Reuses lib/data/menu — same source as marketing site.
 *
 * TODO:
 * - Branch-specific availability.
 * - Later: table ordering (FEATURES.enableTableOrdering) → POS handheld flow,
 *   not necessarily this web UI.
 */

import { MENU_CATEGORIES } from "@/lib/data/menu";
import { MenuCategory } from "@/components/menu/menu-category";

export default function TableMenuPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold">Menu</h1>
        <p className="mt-1 text-sm opacity-70">
          Ask your waiter for today&apos;s fish sizes and prices.
        </p>
      </div>
      {MENU_CATEGORIES.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
    </div>
  );
}
