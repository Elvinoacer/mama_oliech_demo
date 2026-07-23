"use client";

import { useEffect } from "react";
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
    <main className="mx-auto max-w-lg px-6 py-24">
      <p className="type-eyebrow">Error</p>
      <h1 className="type-page-title mt-2">Something went wrong</h1>
      <p className="type-lead mt-4 !max-w-none">
        Please try again. If it keeps happening, contact the team.
      </p>
      <div className="mt-8">
        <Button type="button" size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
