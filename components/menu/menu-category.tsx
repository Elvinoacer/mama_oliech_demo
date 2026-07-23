/**
 * Renders one menu category block.
 *
 * TODO:
 * - Collapsible on mobile for long menus.
 * - Optional price column only when single source of truth is ready.
 * - Filter by branch availability when multi-branch menus diverge.
 */

import type { MenuCategory as MenuCategoryType } from "@/lib/types/menu";
import { MenuItemCard } from "./menu-item-card";

export function MenuCategory({ category }: { category: MenuCategoryType }) {
  return (
    <div className="scroll-mt-24" id={category.id}>
      <h2 className="text-xl font-semibold tracking-tight">{category.title}</h2>
      {category.intro ? (
        <p className="mt-2 max-w-2xl text-sm opacity-70">{category.intro}</p>
      ) : null}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
