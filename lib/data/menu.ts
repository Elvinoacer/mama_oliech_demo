/**
 * Static menu seed data for the marketing site + QR portal.
 * Source outline: docs/mama-oliech-website-content.md §3
 *
 * TODO:
 * - Confirm dish names / availability with kitchen leadership.
 * - Add real descriptions and food photography IDs.
 * - Keep prices OFF this file for marketing (or load from one verified source).
 * - Later: generate this from POS / aggregator so Uber/Bolt/in-store stay in sync.
 */

import type { MenuCategory } from "@/lib/types/menu";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "fish",
    title: "Fish",
    intro:
      "Whole Lake Victoria tilapia — fried crisp or wet-fry style — the house signature.",
    items: [
      {
        id: "tilapia-fried",
        name: "Whole Fried Tilapia",
        description:
          "Deep-fried until crisp. Served with ugali, kachumbari, and greens.",
        badge: "Signature",
        isCatchWeight: true,
        station: "fry",
      },
      {
        id: "tilapia-wet-fry",
        name: "Wet-Fry Tilapia (Stew Style)",
        description:
          "Gently wet-fried in a rich tomato and onion sauce.",
        isCatchWeight: true,
        station: "fry",
      },
      {
        id: "zuckerberg-special",
        name: "Zuckerberg Special",
        description:
          "Premium whole tilapia — named for a memorable lunch guest.",
        badge: "Celebrity favorite",
        isCatchWeight: true,
        station: "fry",
      },
    ],
  },
  {
    id: "heritage",
    title: "Heritage & Specialty Dishes",
    items: [
      {
        id: "aliya",
        name: "Aliya",
        description: "Salted, sundried beef fried with tomatoes.",
        station: "pass",
      },
      // TODO: add more family recipes once approved for public menu
    ],
  },
  {
    id: "greens-sides",
    title: "Traditional Greens & Sides",
    intro:
      "Western Kenyan greens are part of the meal — not just garnish.",
    items: [
      { id: "managu", name: "Managu", station: "starch-greens" },
      { id: "osuga", name: "Osuga (with cream)", station: "starch-greens" },
      { id: "kunde", name: "Kunde", station: "starch-greens" },
      { id: "mito", name: "Mito / Mitoo", station: "starch-greens" },
      { id: "plantains", name: "Plantains", station: "starch-greens" },
      {
        id: "ugali",
        name: "Ugali (white or brown)",
        description: "Corn or millet ugali — guest choice.",
        station: "starch-greens",
      },
    ],
  },
  {
    id: "group-catering",
    title: "Group & Catering Menus",
    intro:
      "Packages for 10–15+ guests. Enquire for custom events — do not hardcode stale package prices here.",
    items: [
      {
        id: "group-mbuzi",
        name: "Group Menu 1 — Whole mbuzi package",
        description:
          "Whole goat with kachumbari, ugali, and samosas — ideal for ~10–12 guests.",
      },
      {
        id: "group-fish-pilau",
        name: "Group Menu 2 — Fish, pilau & more",
        description:
          "Large-format package with fish, pilau, chapati, beef, and mixed vegetables — ideal for ~15 guests.",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { id: "local-beers", name: "Local beers", station: "bar" },
      { id: "dawa", name: "Dawa cocktails", station: "bar" },
      // TODO: full bar list
    ],
  },
];

/** Helper for pages that need a single category */
export function getCategory(id: MenuCategory["id"]) {
  return MENU_CATEGORIES.find((c) => c.id === id);
}
