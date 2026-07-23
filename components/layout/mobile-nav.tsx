"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="flex flex-col gap-1.5">
          <span
            className={cn(
              "block h-0.5 w-4 bg-foreground transition",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-4 bg-foreground transition",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-4 bg-foreground transition",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id={panelId}
            className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col bg-[var(--surface-elevated)] p-6 shadow-xl"
            aria-label="Mobile"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-semibold">Menu</p>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-sm opacity-70 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-xl px-3 py-3.5 text-lg font-medium",
                        active
                          ? "bg-[var(--accent-soft)] text-[var(--brand-primary)]"
                          : "hover:bg-foreground/5",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/visit"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3.5 text-base font-semibold text-[var(--surface)]"
            >
              Order / Visit
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
