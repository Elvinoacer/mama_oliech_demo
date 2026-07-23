"use client";

import { useEffect } from "react";
import Image from "next/image";
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
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center px-6 py-20">
      <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-amber-500/40 shadow-lg">
        <Image
          src="/images/food/tilapia-wet-fry.jpg"
          alt="Kitchen Error"
          fill
          sizes="112px"
          className="object-cover opacity-80 filter grayscale-[40%]"
        />
      </div>

      <p className="type-eyebrow">Kitchen Hiccup</p>
      <h1 className="type-page-title mt-2">Something Went Wrong</h1>
      <p className="type-lead mt-3 max-w-md">
        Our kitchen hit a temporary snag processing this request. Please refresh or try again.
      </p>
      <div className="mt-6">
        <Button type="button" size="lg" onClick={reset}>
          Try Again
        </Button>
      </div>
    </main>
  );
}
