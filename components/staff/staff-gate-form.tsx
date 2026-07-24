"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function StaffGateForm() {
  const router = useRouter();
  const errorId = useId();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");

    try {
      const res = await fetch("/api/staff/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { message?: string };
        setError(json.message ?? "Incorrect password. Please try again.");
        setLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <div
          id={errorId}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-3 text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 animate-in fade-in-0 duration-150"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <span className="leading-relaxed">{error}</span>
        </div>
      ) : null}

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
        >
          Staff Password
        </label>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            disabled={loading}
            autoComplete="current-password"
            placeholder="Enter portal password…"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-3 text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--muted)]/60 outline-none transition",
              "focus-visible:border-amber-500/80 focus-visible:ring-2 focus-visible:ring-amber-500/30",
              "disabled:opacity-50 min-h-[44px]",
            )}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full gap-2 min-h-[48px] font-bold"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying Password…</span>
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>Unlock Portal</span>
          </>
        )}
      </Button>
    </form>
  );
}
