/**
 * Segment error boundary (client).
 * TODO: log to monitoring; friendlier recovery UI.
 */

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-lg px-6 py-24">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm opacity-70">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full border border-foreground/20 px-4 py-2 text-sm"
      >
        Try again
      </button>
    </main>
  );
}
