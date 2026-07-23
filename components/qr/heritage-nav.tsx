/**
 * In-portal nav for table QR experience.
 * Ops doc: wooden block QR → story, celebrity wall, cultural food guide, menu.
 *
 * TODO:
 * - Large touch targets for mobile dining-table use.
 * - Optional branch context from ?branch= query.
 * - Offline-friendly caching if used in low-signal dining rooms.
 */

import Link from "next/link";

const QR_LINKS = [
  { href: "/table", label: "Home" },
  { href: "/table/story", label: "Founder's story" },
  { href: "/table/celebrities", label: "Guest wall" },
  { href: "/table/food-guide", label: "Food guide" },
  { href: "/table/menu", label: "Menu" },
] as const;

export function HeritageNav() {
  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 text-sm"
      aria-label="Table portal"
    >
      {QR_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="shrink-0 rounded-full border border-foreground/15 px-3 py-1.5"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
