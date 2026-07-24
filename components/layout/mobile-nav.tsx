"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { ShoppingBag, ChevronRight, X, Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close navigation drawer automatically on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle ESC key press & lock body scroll when open
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
      {/* Trigger Button */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-900/50 bg-[#1f120a] text-amber-300 hover:bg-amber-900/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95 transition-all shadow-md [-webkit-tap-highlight-color:transparent]"
      >
        {open ? (
          <X className="h-5 w-5 text-amber-300" />
        ) : (
          <Menu className="h-5 w-5 text-amber-300" />
        )}
      </button>

      {/* Slide-over Portal with createPortal to escape header containing block */}
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex md:hidden isolate">
          {/* Dark Blurred Backdrop using fixed positioning */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Navigation Panel */}
          <nav
            id={panelId}
            aria-label="Mobile Navigation"
            className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col justify-between border-l border-amber-900/50 bg-[#160c07] text-amber-50 shadow-2xl z-10 overflow-y-auto"
          >
            <div>
              {/* Drawer Top Bar */}
              <div className="flex h-16 items-center justify-between border-b border-amber-900/40 bg-[#120804] px-5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 focus-visible:outline-none"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-amber-500/40 shadow-sm">
                    <Image
                      src="/images/logo.svg"
                      alt={`${BRAND.name} Logo`}
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-display font-bold text-base text-white tracking-tight">
                    {BRAND.shortName}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/50 bg-[#1f120a] text-amber-300 hover:text-white active:scale-95 transition-all [-webkit-tap-highlight-color:transparent]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="p-4 space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-amber-500/80 mb-2">
                  Navigation
                </p>
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all [-webkit-tap-highlight-color:transparent]",
                            active
                              ? "bg-amber-500/20 text-amber-300 border-l-4 border-amber-400 pl-3"
                              : "text-amber-100/90 active:bg-amber-500/20 hover:bg-amber-500/10 hover:text-white",
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              active ? "text-amber-400" : "text-amber-500/40",
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-amber-900/50 bg-[#120804] p-5 space-y-3">
              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-600/20 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] transition-all [-webkit-tap-highlight-color:transparent]"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>Order / Visit Us</span>
              </Link>

              <p className="text-center text-[10px] text-amber-300/60 font-medium uppercase tracking-wider">
                Authentic Lake Victoria Tilapia
              </p>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
}
