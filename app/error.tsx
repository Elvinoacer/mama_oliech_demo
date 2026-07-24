"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RotateCcw, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center text-center px-6 py-16 sm:py-20"
    >
      {/* Visual Avatar with Theme Accent Ring */}
      <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-amber-500/40 shadow-lg group">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
          alt="Kitchen Error Graphic"
          fill
          sizes="112px"
          priority
          className="object-cover opacity-85 filter grayscale-[30%] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-amber-500/20 p-1 backdrop-blur-xs border border-amber-500/40 text-amber-400">
          <AlertTriangle className="h-4 w-4" />
        </div>
      </div>

      {/* Eyebrow & Title */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
        Kitchen Hiccup
      </span>

      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mt-3">
        Something Went Wrong
      </h1>

      <p className="type-lead mt-2.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-md">
        Our kitchen hit a temporary snag processing this request. Please try
        refreshing or return home.
      </p>

      {/* Optional Next.js Digest Reference */}
      {error.digest ? (
        <p className="mt-3 font-mono text-[11px] text-[var(--muted)]/70 bg-[var(--surface-elevated)] px-2.5 py-1 rounded-md border border-[var(--border)]">
          Error Reference:{" "}
          <span className="select-all font-semibold">{error.digest}</span>
        </p>
      ) : null}

      {/* Recovery Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
        <Button
          type="button"
          size="lg"
          onClick={reset}
          className="w-full sm:w-auto gap-2 font-bold min-h-[44px]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto gap-2 font-semibold min-h-[44px]"
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
