import Image from "next/image";
import type { MenuCategory as MenuCategoryType } from "@/lib/types/menu";
import type {
  PayBranchOption,
  PayModalSource,
} from "@/components/qr/item-pay-modal";
import { CATEGORY_IMAGES } from "@/lib/data/unsplash";
import { MenuItemCard } from "./menu-item-card";

export function MenuCategory({
  category,
  showPrices = false,
  enablePay = false,
  branchSlug = "hurlingham",
  paySource = "table",
  branches,
}: {
  category: MenuCategoryType;
  /** Show reference prices on cards. */
  showPrices?: boolean;
  /** Pay with M-Pesa on each payable card. */
  enablePay?: boolean;
  branchSlug?: string;
  /** `table` QR portal vs public marketing `menu`. */
  paySource?: PayModalSource;
  /** Active branches for public-menu branch picker. */
  branches?: PayBranchOption[];
}) {
  const categoryImg = CATEGORY_IMAGES[category.id];

  return (
    <section className="scroll-mt-24 sm:scroll-mt-28" id={category.id}>
      {categoryImg ? (
        <div className="relative mb-5 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-md sm:mb-6 sm:aspect-[21/8] md:aspect-[21/6]">
          <Image
            src={categoryImg.src}
            alt={categoryImg.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:justify-center sm:p-6 md:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
              {category.title}
            </h2>
            {category.intro ? (
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-amber-50/90 sm:mt-1.5 sm:text-sm line-clamp-3 sm:line-clamp-none">
                {category.intro}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mb-5 sm:mb-6">
          <h2 className="type-card-title !text-[length:var(--step-3)]">{category.title}</h2>
          {category.intro ? (
            <p className="type-body mt-2 max-w-2xl sm:mt-3">{category.intro}</p>
          ) : null}
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {category.items.map((item) => (
          <li key={item.id} className="min-w-0">
            <MenuItemCard
              item={item}
              showPrices={showPrices}
              enablePay={enablePay}
              branchSlug={branchSlug}
              paySource={paySource}
              branches={branches}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
