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
  const itemCount = category.items.length;

  return (
    <section
      className="scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
      id={category.id}
    >
      {categoryImg ? (
        /* Visual Category Header Banner */
        <div className="group relative mb-5 sm:mb-8 aspect-[16/9] sm:aspect-[21/8] md:aspect-[21/6] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-md bg-stone-900">
          <Image
            src={categoryImg.src}
            alt={categoryImg.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Dual-gradient overlay for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/50 sm:to-black/20" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:justify-center sm:p-6 md:p-8 space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-amber-400/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider border border-amber-400/30">
                {itemCount} {itemCount === 1 ? "Option" : "Options"}
              </span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {category.title}
            </h2>

            {category.intro ? (
              <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-stone-200/90 line-clamp-2 sm:line-clamp-none">
                {category.intro}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        /* Text-Only Header Fallback */
        <div className="mb-5 sm:mb-8 border-l-4 border-amber-500 pl-4 sm:pl-5 py-0.5">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {category.title}
            </h2>
            <span className="rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] px-2.5 py-0.5 text-xs font-semibold text-[var(--muted)]">
              {itemCount}
            </span>
          </div>

          {category.intro ? (
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              {category.intro}
            </p>
          ) : null}
        </div>
      )}

      {/* Category Dishes Grid */}
      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        role="list"
      >
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
