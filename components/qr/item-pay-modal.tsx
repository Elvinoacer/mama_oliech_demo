"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  X,
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Minus,
  Plus,
  Fish,
  ChevronLeft,
  ShieldCheck,
  Smartphone,
  Receipt,
  Building2,
} from "lucide-react";
import type { MenuItem } from "@/lib/types/menu";
import type { BillLineInput } from "@/lib/types/orders";
import { cn } from "@/lib/utils/cn";

type Step = "configure" | "confirm" | "phone" | "result";

type PublicBill = {
  id: string;
  tableLabel: string;
  totalKes: number;
  status: string;
  lines: Array<{
    name: string;
    quantity: number;
    weightKg?: number;
    lineTotalKes: number;
    pricingMode: string;
    portionLabel?: string;
    unitPriceKes: number;
  }>;
  mpesaReceiptNumber?: string;
  checkoutRequestId?: string;
  etims?: { fiscalInvoiceNumber: string; qrPayload: string };
  providerMessage?: string;
};

const STEPS: { id: Step; label: string }[] = [
  { id: "configure", label: "Details" },
  { id: "confirm", label: "Confirm" },
  { id: "phone", label: "Pay" },
  { id: "result", label: "Done" },
];

function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

function isCatchWeight(item: MenuItem) {
  return item.pricingMode === "catch-weight" || Boolean(item.isCatchWeight);
}

function estimateTotal(
  item: MenuItem,
  opts: { quantity: number; weightKg: number },
): number {
  if (isCatchWeight(item)) {
    const rate = item.pricePerKgKes ?? 0;
    return Math.max(1, Math.round(rate * opts.weightKg));
  }
  return (item.priceKes ?? 0) * opts.quantity;
}

function stepIndex(step: Step) {
  return STEPS.findIndex((s) => s.id === step);
}

export type PayModalSource = "table" | "menu";

export type PayBranchOption = {
  slug: string;
  label: string;
};

export function ItemPayModal({
  item,
  open,
  onClose,
  branchSlug = "hurlingham",
  defaultTable = "Table 5",
  source = "table",
  branches,
}: {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
  branchSlug?: string;
  defaultTable?: string;
  source?: PayModalSource;
  branches?: PayBranchOption[];
}) {
  const titleId = useId();
  const errorId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const catchWeight = isCatchWeight(item);
  const isPublicMenu = source === "menu";
  const defaultRef = isPublicMenu ? "Pickup" : defaultTable;

  // State management
  const [step, setStep] = useState<Step>("configure");
  const [table, setTable] = useState(defaultRef);
  const [selectedBranch, setSelectedBranch] = useState(branchSlug);
  const [quantity, setQuantity] = useState(1);
  const [weightKg, setWeightKg] = useState(item.defaultWeightKg ?? 0.9);
  const [portionTierId, setPortionTierId] = useState<string | undefined>();
  const [portionLabel, setPortionLabel] = useState<string | undefined>();
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bill, setBill] = useState<PublicBill | null>(null);
  const [resultOk, setResultOk] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // Body scroll lock + Escape + focus panel
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, loading]);

  const draftTotal = useMemo(
    () => estimateTotal(item, { quantity, weightKg }),
    [item, quantity, weightKg],
  );

  const selectTier = (tierId: string) => {
    const tier = item.portionTiers?.find((t) => t.id === tierId);
    if (!tier) return;
    setPortionTierId(tier.id);
    setPortionLabel(tier.label);
    setWeightKg(tier.weightKg);
  };

  const clearTierForCustomWeight = (kg: number) => {
    setPortionTierId(undefined);
    setPortionLabel(undefined);
    setWeightKg(kg);
  };

  const goConfirm = () => {
    setError(null);
    if (!table.trim()) {
      setError(
        isPublicMenu
          ? "Enter a name or order note so staff can match the payment."
          : "Enter your table number so staff can match the payment.",
      );
      return;
    }
    if (branches?.length && !selectedBranch) {
      setError("Select a branch.");
      return;
    }
    if (catchWeight) {
      const min = item.minWeightKg ?? 0.2;
      const max = item.maxWeightKg ?? 5;
      if (!Number.isFinite(weightKg) || weightKg < min || weightKg > max) {
        setError(`Weight must be between ${min} and ${max} kg.`);
        return;
      }
    } else if (quantity < 1 || quantity > 99) {
      setError("Quantity must be between 1 and 99.");
      return;
    }
    setConfirmed(false);
    setStep("confirm");
  };

  const createBillThenPhone = async () => {
    if (!confirmed) {
      setError("Tick the confirmation box to continue.");
      return;
    }
    setLoading(true);
    setError(null);

    const line: BillLineInput = catchWeight
      ? { menuItemId: item.id, weightKg, portionTierId }
      : { menuItemId: item.id, quantity };

    try {
      const res = await fetch("/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableLabel: table.trim(),
          branchSlug: selectedBranch || branchSlug,
          lines: [line],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create payment bill");
        return;
      }
      setBill(data as PublicBill);
      setStep("phone");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendStk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bill) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/bills/${bill.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok && res.status !== 202) {
        setError(
          data.error || data.payment?.providerMessage || "Payment failed",
        );
        if (data.bill) setBill(data.bill);
        return;
      }

      const nextBill = (data.bill ?? bill) as PublicBill;
      setBill(nextBill);
      const status = data.payment?.status as string | undefined;
      const ok =
        status === "completed" ||
        status === "pending" ||
        res.status === 202 ||
        res.ok;
      setResultOk(ok);
      setResultMessage(
        data.payment?.providerMessage ||
          (status === "completed"
            ? "Payment completed successfully."
            : "Check your phone and enter your M-Pesa PIN."),
      );
      setStep("result");
    } catch {
      setError("Network error initiating M-Pesa transaction.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const lineSummary = catchWeight
    ? `${item.name} · ${portionLabel ? `${portionLabel} · ` : ""}${weightKg} kg`
    : `${quantity}× ${item.name}`;

  const activeIdx = stepIndex(step);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4 md:p-6"
      role="presentation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close payment dialog"
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in-0 duration-200"
        onClick={() => !loading && onClose()}
      />

      {/* Panel: bottom sheet on mobile, dialog on tablet+ */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "table-dark-theme relative z-10 flex w-full flex-col outline-none",
          "max-h-[min(92dvh,920px)] sm:max-h-[min(88vh,720px)]",
          "bg-[#121214] text-white shadow-2xl shadow-black/80",
          "border border-white/12 animate-in slide-in-from-bottom-4 duration-200 sm:zoom-in-95",
          /* Mobile sheet styling */
          "rounded-t-[1.75rem] sm:rounded-3xl",
          "sm:max-w-lg md:max-w-xl",
          /* Safe area bottom inset for modern devices */
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        {/* Mobile Drag Affordance Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden>
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>

        {/* Header Section */}
        <header className="shrink-0 border-b border-white/10 px-4 pb-3 pt-1 sm:px-6 sm:pt-5 sm:pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2.5">
              {step !== "configure" && step !== "result" ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setError(null);
                    if (step === "phone") setStep("confirm");
                    else setStep("configure");
                  }}
                  className="mt-0.5 flex h-10 w-10 min-h-[40px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 active:scale-95 disabled:opacity-40"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : null}
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                  M-Pesa payment
                </p>
                <h2
                  id={titleId}
                  className="font-display mt-0.5 text-lg sm:text-xl font-bold leading-snug text-white truncate"
                >
                  {step === "result"
                    ? resultOk
                      ? bill?.status === "completed"
                        ? "Payment complete"
                        : "STK Prompt Sent"
                      : "Payment Failed"
                    : item.name}
                </h2>
              </div>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex h-10 w-10 min-h-[40px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15 active:scale-95 disabled:opacity-40"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Indicators */}
          {step !== "result" ? (
            <ol
              className="mt-4 grid grid-cols-3 gap-2"
              aria-label="Payment process steps"
            >
              {STEPS.filter((s) => s.id !== "result").map((s, i) => {
                const done = i < activeIdx;
                const current = i === activeIdx;
                return (
                  <li key={s.id} className="flex flex-col items-center gap-1.5">
                    <div className="flex w-full items-center">
                      {i > 0 ? (
                        <div
                          className={cn(
                            "h-0.5 flex-1 rounded-full transition-colors",
                            i <= activeIdx ? "bg-amber-500" : "bg-white/10",
                          )}
                          aria-hidden
                        />
                      ) : (
                        <div className="flex-1" aria-hidden />
                      )}
                      <span
                        className={cn(
                          "mx-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                          done && "bg-amber-500 text-slate-950",
                          current &&
                            "bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/60 font-black",
                          !done && !current && "bg-white/10 text-white/40",
                        )}
                      >
                        {i + 1}
                      </span>
                      {i < 2 ? (
                        <div
                          className={cn(
                            "h-0.5 flex-1 rounded-full transition-colors",
                            i < activeIdx ? "bg-amber-500" : "bg-white/10",
                          )}
                          aria-hidden
                        />
                      ) : (
                        <div className="flex-1" aria-hidden />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider transition-colors",
                        current ? "text-amber-300" : "text-white/40",
                      )}
                    >
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : null}
        </header>

        {/* Scrollable Modal Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 space-y-4">
          {error ? (
            <div
              id={errorId}
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-rose-400/35 bg-rose-500/15 px-3.5 py-3 text-xs sm:text-sm text-rose-50 animate-in fade-in-0 duration-150"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              <span className="leading-relaxed">{error}</span>
            </div>
          ) : null}

          {/* Item Quick Overview Banner */}
          {step !== "result" ? (
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
              {item.imageSrc ? (
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <Fish className="h-6 w-6" />
                </div>
              )}
              <div className="min-w-0 flex-1 self-center">
                <p className="truncate font-semibold text-sm sm:text-base leading-snug text-white">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-amber-400">
                  {catchWeight
                    ? `${formatKes(item.pricePerKgKes ?? 0)} / kg · catch-weight`
                    : `${formatKes(item.priceKes ?? 0)} each`}
                </p>
              </div>
            </div>
          ) : null}

          {/* STEP 1: CONFIGURE */}
          {step === "configure" ? (
            <div className="space-y-4 sm:space-y-5">
              {branches && branches.length > 0 ? (
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Select Branch</span>
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {branches.map((b) => {
                      const selected = selectedBranch === b.slug;
                      return (
                        <button
                          key={b.slug}
                          type="button"
                          onClick={() => setSelectedBranch(b.slug)}
                          className={cn(
                            "rounded-xl border px-3.5 py-3 text-left text-xs sm:text-sm font-semibold transition min-h-[44px] active:scale-[0.98]",
                            selected
                              ? "border-amber-500 bg-amber-500/15 text-amber-100 ring-1 ring-amber-500/50"
                              : "border-white/12 bg-white/[0.04] text-white/80 hover:border-white/25",
                          )}
                        >
                          {b.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <Field
                label={
                  isPublicMenu ? "Name / Order Note" : "Table / Seat Number"
                }
                htmlFor="pay-table"
              >
                <input
                  id="pay-table"
                  type="text"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  placeholder={
                    isPublicMenu ? "e.g. Jane · Pickup" : "e.g. Table 5"
                  }
                  autoComplete="off"
                  className={inputClass}
                />
              </Field>

              {catchWeight ? (
                <div className="space-y-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/60">
                    <Fish className="h-3.5 w-3.5 text-amber-400" />
                    <span>Portion Size</span>
                  </p>
                  {item.portionTiers?.length ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {item.portionTiers.map((tier) => {
                        const selected = portionTierId === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => selectTier(tier.id)}
                            className={cn(
                              "rounded-xl border px-3 py-2.5 text-left transition min-h-[44px] active:scale-[0.98]",
                              selected
                                ? "border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/50"
                                : "border-white/12 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]",
                            )}
                          >
                            <span className="block text-xs sm:text-sm font-bold text-white">
                              {tier.label}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-white/50">
                              {tier.weightKg} kg
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  <Field label="Exact Weight (kg)" htmlFor="pay-weight">
                    <input
                      id="pay-weight"
                      type="number"
                      inputMode="decimal"
                      min={item.minWeightKg ?? 0.2}
                      max={item.maxWeightKg ?? 5}
                      step={0.1}
                      value={Number.isFinite(weightKg) ? weightKg : ""}
                      onChange={(e) =>
                        clearTierForCustomWeight(Number(e.target.value))
                      }
                      className={inputClass}
                    />
                  </Field>
                  <p className="text-[11px] sm:text-xs leading-relaxed text-white/50">
                    Fish is billed by actual kitchen weight.
                    {isPublicMenu
                      ? " Confirm size with staff if you have specific portion needs."
                      : " Ask your waiter if you are unsure of today's size."}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
                    Quantity
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] p-1.5">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10 active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[3.5rem] text-center text-2xl font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10 active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-500/10 px-4 py-3.5">
                <span className="text-xs sm:text-sm font-semibold text-white/80">
                  Estimated Total
                </span>
                <span className="text-xl sm:text-2xl font-bold tabular-nums text-amber-300">
                  {formatKes(draftTotal)}
                </span>
              </div>
            </div>
          ) : null}

          {/* STEP 2: CONFIRM */}
          {step === "confirm" ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Review Details
                </p>
                <dl className="space-y-2.5 text-xs sm:text-sm">
                  <Row label="Item" value={lineSummary} />
                  {branches && branches.length > 0 ? (
                    <Row
                      label="Branch"
                      value={
                        branches.find((b) => b.slug === selectedBranch)
                          ?.label ?? selectedBranch
                      }
                    />
                  ) : null}
                  <Row
                    label={isPublicMenu ? "Name / Note" : "Table"}
                    value={table.trim()}
                  />
                  <Row
                    label={catchWeight ? "Rate" : "Unit Price"}
                    value={
                      catchWeight
                        ? `${formatKes(item.pricePerKgKes ?? 0)} / kg`
                        : formatKes(item.priceKes ?? 0)
                    }
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 mt-2">
                    <dt className="font-bold text-white text-sm">
                      Total to Pay
                    </dt>
                    <dd className="text-2xl font-bold tabular-nums text-amber-300">
                      {formatKes(draftTotal)}
                    </dd>
                  </div>
                </dl>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.03] p-3.5 sm:p-4 transition hover:border-white/20 active:scale-[0.99]">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => {
                    setConfirmed(e.target.checked);
                    setError(null);
                  }}
                  className="mt-0.5 h-5 w-5 min-h-[20px] min-w-[20px] shrink-0 rounded border-white/30 accent-amber-500"
                />
                <span className="text-xs sm:text-sm leading-relaxed text-white/85">
                  I confirm this item and price. An M-Pesa PIN prompt will be
                  sent for{" "}
                  <strong className="text-amber-300">
                    {formatKes(draftTotal)}
                  </strong>
                  {isPublicMenu ? " for pickup collection." : "."}
                </span>
              </label>

              <p className="flex items-start gap-2 text-[11px] sm:text-xs leading-relaxed text-white/50">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  Pricing is dynamically verified and locked against the
                  official menu database.
                </span>
              </p>
            </div>
          ) : null}

          {/* STEP 3: PHONE / STK */}
          {step === "phone" && bill ? (
            <form
              id="item-pay-stk-form"
              onSubmit={sendStk}
              className="space-y-4 sm:space-y-5"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mb-2">
                  <span className="font-semibold text-white/70">
                    {bill.tableLabel}
                  </span>
                  <span className="truncate font-mono text-[10px] text-white/40 max-w-[40%]">
                    Ref: {bill.id}
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {bill.lines.map((l, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="min-w-0 text-white/85 truncate">
                        {l.pricingMode === "catch-weight"
                          ? `${l.name} (${l.portionLabel ?? `${l.weightKg}kg`})`
                          : `${l.quantity}× ${l.name}`}
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums text-amber-300">
                        {formatKes(l.lineTotalKes)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="font-bold text-sm">Total Due</span>
                  <span className="text-2xl font-bold tabular-nums text-amber-300">
                    {formatKes(bill.totalKes)}
                  </span>
                </div>
              </div>

              <Field label="M-Pesa Phone Number" htmlFor="pay-phone">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    id="pay-phone"
                    type="tel"
                    required
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX or 2547…"
                    autoComplete="tel"
                    inputMode="tel"
                    className={cn(inputClass, "pl-11")}
                  />
                </div>
              </Field>
              <p className="flex items-start gap-2 text-[11px] sm:text-xs text-white/50">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  You will receive an automatic Safaricom STK prompt on your
                  mobile phone. Enter your M-Pesa PIN to complete payment.
                </span>
              </p>
            </form>
          ) : null}

          {/* STEP 4: RESULT */}
          {step === "result" ? (
            <div className="space-y-5 py-2 text-center animate-in fade-in-0 duration-200">
              {resultOk ? (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-400/30">
                    <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="mx-auto max-w-sm text-sm sm:text-base leading-relaxed font-semibold text-white">
                      {resultMessage}
                    </p>
                    <p className="text-xs text-white/50">
                      Payment prompt sent to {phone || "your phone"}
                    </p>
                  </div>

                  {bill ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-xs sm:text-sm space-y-2.5">
                      <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                        <span className="text-white/70 font-medium">
                          {lineSummary}
                        </span>
                        <span className="font-bold tabular-nums text-amber-300">
                          {formatKes(bill.totalKes)}
                        </span>
                      </div>

                      {bill.mpesaReceiptNumber ? (
                        <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-300/90">
                          <Receipt className="h-3.5 w-3.5 shrink-0" />
                          <span>Receipt: {bill.mpesaReceiptNumber}</span>
                        </div>
                      ) : null}

                      {bill.etims ? (
                        <p className="text-[11px] font-mono text-amber-300/80">
                          eTIMS Invoice: {bill.etims.fiscalInvoiceNumber}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 ring-2 ring-rose-400/30">
                    <AlertCircle className="h-9 w-9 text-rose-400" />
                  </div>
                  <p className="text-sm sm:text-base text-white/80 max-w-sm mx-auto">
                    {resultMessage ||
                      error ||
                      "Transaction failed or timed out."}
                  </p>
                </>
              )}
            </div>
          ) : null}
        </div>

        {/* Sticky Action Footer */}
        <footer className="shrink-0 border-t border-white/10 bg-[#121214]/95 px-4 py-3.5 backdrop-blur-md sm:px-6 sm:py-4">
          {step === "configure" ? (
            <PrimaryButton onClick={goConfirm}>
              Continue · {formatKes(draftTotal)}
            </PrimaryButton>
          ) : null}

          {step === "confirm" ? (
            <PrimaryButton
              disabled={loading || !confirmed}
              onClick={createBillThenPhone}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Preparing Order…</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" />
                  <span>Confirm & Continue</span>
                </>
              )}
            </PrimaryButton>
          ) : null}

          {step === "phone" && bill ? (
            <PrimaryButton
              type="submit"
              form="item-pay-stk-form"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Sending STK Prompt…</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-5 w-5" />
                  <span>Pay {formatKes(bill.totalKes)}</span>
                </>
              )}
            </PrimaryButton>
          ) : null}

          {step === "result" ? (
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 py-3.5 text-sm font-bold text-white transition hover:bg-white/15 min-h-[48px] active:scale-[0.98]"
            >
              Done
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/30 outline-none transition focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/30 min-h-[44px]";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/60"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-white/50">{label}</dt>
      <dd className="text-right font-medium text-white truncate max-w-[60%]">
        {value}
      </dd>
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  onClick,
  type = "button",
  form,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  form?: string;
}) {
  return (
    <button
      type={type}
      form={form}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold sm:text-base",
        "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950",
        "shadow-lg shadow-amber-900/30 transition-all",
        "hover:from-amber-400 hover:to-amber-500",
        "active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-40",
        "min-h-[48px]",
      )}
    >
      {children}
    </button>
  );
}
