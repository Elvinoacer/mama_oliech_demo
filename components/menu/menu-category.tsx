import type { MenuCategory as MenuCategoryType } from "@/lib/types/menu";
import { MenuItemCard } from "./menu-item-card";

export function MenuCategory({ category }: { category: MenuCategoryType }) {
  return (
    <div className="scroll-mt-28" id={category.id}>
      <h2 className="type-card-title !text-[length:var(--step-3)]">{category.title}</h2>
      {category.intro ? (
        <p className="type-body mt-3 max-w-2xl">{category.intro}</p>
      ) : null}
      <ul className="mt-7 grid gap-4 sm:grid-cols-2">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
