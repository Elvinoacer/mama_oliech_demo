/**
 * QR landing — hub for story, celebrity wall, food guide, menu.
 * Ops doc § “Promoting Brand Heritage via Table QR Codes”
 *
 * TODO:
 * - Read ?branch= to personalize hours / menu PDF / WhatsApp.
 * - Engaging hero image optimized for mobile LCP.
 * - Staff script: “Scan to learn our story while we prepare your fish.”
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Welcome to the table",
  description: `Heritage portal for guests at ${BRAND.name}.`,
  // TODO: robots — decide if table portal should be indexed
};

const CARDS = [
  {
    href: "/table/story",
    title: "Founder's story",
    body: "Mary Auma Oliech and the recipes that built a Nairobi institution.",
  },
  {
    href: "/table/celebrities",
    title: "Guest wall",
    body: "Obama, Zuckerberg, Bourdain, Elba — and neighbors every day.",
  },
  {
    href: "/table/food-guide",
    title: "Cultural food guide",
    body: "Ugali, greens, and how we prepare Lake Victoria fish.",
  },
  {
    href: "/table/menu",
    title: "Browse the menu",
    body: "Signature fish, heritage dishes, and sides.",
  },
] as const;

export default function TableHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Karibu — welcome
        </h1>
        <p className="mt-2 text-sm leading-relaxed opacity-80">
          While your order is prepared, explore the story behind Mama Oliech and
          the food of Western Kenya.
        </p>
        <p className="mt-2 text-xs opacity-50">
          TODO: honor <code>?branch=</code> query for multi-location QR codes
        </p>
      </div>

      <ul className="space-y-3">
        {CARDS.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block rounded-2xl border border-foreground/10 p-4 transition hover:bg-foreground/[0.03]"
            >
              <p className="font-medium">{card.title}</p>
              <p className="mt-1 text-sm opacity-70">{card.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
