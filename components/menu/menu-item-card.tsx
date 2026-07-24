"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import type { MenuItem } from "@/lib/types/menu";
import {
  ItemPayModal,
  type PayBranchOption,
  type PayModalSource,
} from "@/components/qr/item-pay-modal";
import { cn } from "@/lib/utils/cn";

function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

/**
 * @param showPrices — show reference prices (table QR + payable marketing menu).
 * @param enablePay — show Pay on each card and open confirmation → M-Pesa modal.
 * @param paySource — `table` (in-house QR) vs `menu` (public marketing page).
 * @param branches — active branches for public-menu branch picker.
 */
export function MenuItemCard({
  item,
  showPrices = false,
  enablePay = false,
  branchSlug = "hurlingham",
  paySource = "table",
  branches,
}: {
  item: MenuItem;
  showPrices?: boolean;
  enablePay?: boolean;
  branchSlug?: string;
  paySource?: PayModalSource;
  branches?: PayBranchOption[];
}) {
  const [payOpen, setPayOpen] = useState(false);
  const isCw = item.pricingMode === "catch-weight" || item.isCatchWeight;
  const isEnquiry = item.pricingMode === "enquiry" || item.payable === false;
  const canPay =
    enablePay && item.payable !== false && item.available !== false && !isEnquiry;
  const isPublicMenu = paySource === "menu";

  return (
    <>
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition",
          "border-[var(--border)] bg-[var(--surface-elevated)]",
          "hover:border-[var(--brand-accent)]/40 hover:shadow-md",
        )}
      >
        {item.imageSrc ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color-mix(in_srgb,var(--brand-primary)_8%,var(--surface))] sm:aspect-[4/3]">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
            {item.badge ? (
              <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-100 uppercase shadow-sm backdrop-blur-sm sm:text-xs">
                {item.badge}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl md:text-[1.35rem]">
              {item.name}
            </h3>
            {!item.imageSrc && item.badge ? (
              <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
                {item.badge}
              </span>
            ) : null}
          </div>

          {item.description ? (
            <p className="type-body mt-2 line-clamp-3 flex-1 text-sm sm:mt-3 sm:text-base sm:line-clamp-4">
              {item.description}
            </p>
          ) : (
            <div className="flex-1" />
          )}

          {showPrices ? (
            <div className="mt-3 space-y-0.5 sm:mt-4">
              {isCw && item.pricePerKgKes != null ? (
                <p className="text-sm font-semibold text-[var(--brand-accent)] sm:text-base">
                  {formatKes(item.pricePerKgKes)}/kg
                  <span className="ml-1.5 text-xs font-medium text-[var(--muted)]">
                    catch-weight
                  </span>
                </p>
              ) : null}
              {!isCw && !isEnquiry && item.priceKes != null ? (
                <p className="text-sm font-semibold text-[var(--brand-accent)] sm:text-base">
                  {formatKes(item.priceKes)}
                </p>
              ) : null}
              {isEnquiry ? (
                <p className="text-sm font-semibold text-[var(--muted)]">
                  On enquiry
                  {item.priceKes != null
                    ? ` · from ${formatKes(item.priceKes)}`
                    : ""}
                </p>
              ) : null}
              {isCw ? (
                <p className="text-xs text-[var(--muted)]">
                  Sized at the kitchen · billed by weight
                </p>
              ) : null}
            </div>
          ) : item.isCatchWeight || isCw ? (
            <p className="mt-3 text-sm font-semibold text-[var(--brand-accent)] sm:mt-4">
              Sized at the kitchen · ask for today&apos;s portions
            </p>
          ) : null}

          {canPay ? (
            <button
              type="button"
              onClick={() => setPayOpen(true)}
              className={cn(
                "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3",
                "text-sm font-bold sm:mt-5 sm:text-[0.95rem]",
                "min-h-[2.75rem] shadow-md transition active:scale-[0.99]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                isPublicMenu
                  ? [
                      "bg-[var(--brand-primary)] text-[var(--surface)]",
                      "hover:bg-[var(--brand-primary-hover)]",
                      "shadow-[var(--brand-primary)]/15",
                      "focus-visible:outline-[var(--brand-primary)]",
                    ]
                  : [
                      "text-slate-950",
                      "bg-gradient-to-r from-amber-500 to-amber-600",
                      "shadow-amber-900/10",
                      "hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/20",
                      "focus-visible:outline-amber-400",
                    ],
              )}
            >
              <CreditCard className="h-4 w-4 shrink-0" />
              Pay with M-Pesa
            </button>
          ) : null}

          {enablePay && isEnquiry ? (
            <p className="mt-4 text-center text-xs font-medium text-[var(--muted)]">
              Catering package — enquire with staff
            </p>
          ) : null}
        </div>
      </article>

      {canPay && payOpen ? (
        <ItemPayModal
          item={item}
          open={payOpen}
          onClose={() => setPayOpen(false)}
          branchSlug={branchSlug}
          source={paySource}
          branches={branches}
        />
      ) : null}
    </>
  );
}
