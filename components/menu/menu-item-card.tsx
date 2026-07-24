"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Scale, HelpCircle } from "lucide-react";
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
  const isCw =
    item.pricingMode === "catch-weight" || Boolean(item.isCatchWeight);
  const isEnquiry = item.pricingMode === "enquiry" || item.payable === false;
  const canPay =
    enablePay &&
    item.payable !== false &&
    item.available !== false &&
    !isEnquiry;
  const isPublicMenu = paySource === "menu";

  return (
    <>
      <article
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xs transition-all duration-300",
          "hover:border-[var(--brand-primary)]/40 hover:shadow-lg",
        )}
      >
        {/* Card Image Header */}
        {item.imageSrc ? (
          <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-stone-900 shrink-0">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {item.badge ? (
              <span className="absolute top-3 left-3 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wider text-black uppercase shadow-md border border-amber-300/30">
                {item.badge}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Card Content Body */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Header & Fallback Badge */}
          <div className="flex items-start justify-between gap-2.5">
            <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
              {item.name}
            </h3>
            {!item.imageSrc && item.badge ? (
              <span className="shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-700 dark:text-amber-300 uppercase">
                {item.badge}
              </span>
            ) : null}
          </div>

          {/* Item Description */}
          {item.description ? (
            <p className="mt-2 flex-1 text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-2 sm:line-clamp-3">
              {item.description}
            </p>
          ) : (
            <div className="flex-1 min-h-[0.5rem]" />
          )}

          {/* Pricing & Actions Footer */}
          <div className="mt-3 sm:mt-4 pt-3 border-t border-[var(--border)]/60 flex flex-col justify-end">
            {showPrices ? (
              <div className="space-y-0.5">
                {isCw && item.pricePerKgKes != null ? (
                  <div>
                    <p className="text-sm sm:text-base font-bold text-[var(--foreground)] flex items-center gap-1">
                      <span>{formatKes(item.pricePerKgKes)}</span>
                      <span className="text-xs font-semibold text-[var(--brand-primary)]">
                        / kg
                      </span>
                    </p>
                    <p className="text-[11px] text-[var(--muted)] flex items-center gap-1 mt-0.5">
                      <Scale className="h-3 w-3 text-amber-500 shrink-0" />
                      <span>Sized at kitchen · billed by weight</span>
                    </p>
                  </div>
                ) : null}

                {!isCw && !isEnquiry && item.priceKes != null ? (
                  <p className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                    {formatKes(item.priceKes)}
                  </p>
                ) : null}

                {isEnquiry ? (
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[var(--muted)]">
                    <HelpCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>
                      On enquiry
                      {item.priceKes != null
                        ? ` · from ${formatKes(item.priceKes)}`
                        : ""}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : item.isCatchWeight || isCw ? (
              <p className="text-xs sm:text-sm font-semibold text-[var(--brand-primary)] flex items-center gap-1">
                <Scale className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Sized at kitchen · ask for today&apos;s portions</span>
              </p>
            ) : null}

            {/* M-Pesa Action Button */}
            {canPay ? (
              <button
                type="button"
                onClick={() => setPayOpen(true)}
                className={cn(
                  "mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3",
                  "text-xs sm:text-sm font-bold min-h-[44px]",
                  "shadow-xs transition-all duration-200 active:scale-[0.98]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  isPublicMenu
                    ? [
                        "bg-[var(--brand-primary)] text-white",
                        "hover:opacity-95",
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
                <span>Pay with M-Pesa</span>
              </button>
            ) : null}

            {enablePay && isEnquiry ? (
              <p className="mt-3 text-center text-[11px] font-medium text-[var(--muted)]">
                Catering package — enquire with staff
              </p>
            ) : null}
          </div>
        </div>
      </article>

      {/* Payment Modal Container */}
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
