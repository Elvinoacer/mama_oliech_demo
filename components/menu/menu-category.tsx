import Image from "next/image";
import type { MenuCategory as MenuCategoryType } from "@/lib/types/menu";
import { CATEGORY_IMAGES } from "@/lib/data/unsplash";
import { MenuItemCard } from "./menu-item-card";

export function MenuCategory({ category }: { category: MenuCategoryType }) {
  const categoryImg = CATEGORY_IMAGES[category.id];

  return (
    <div className="scroll-mt-28" id={category.id}>
      {categoryImg ? (
        <div className="relative mb-6 aspect-[21/6] w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-md">
          <Image
            src={categoryImg.src}
            alt={categoryImg.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 sm:p-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {category.title}
            </h2>
            {category.intro ? (
              <p className="mt-1 max-w-xl text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal">
                {category.intro}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <h2 className="type-card-title !text-[length:var(--step-3)]">{category.title}</h2>
          {category.intro ? (
            <p className="type-body mt-3 max-w-2xl">{category.intro}</p>
          ) : null}
        </>
      )}

      <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
