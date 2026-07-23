/**
 * Static menu seed for marketing + QR portal.
 * Prices intentionally omitted on marketing surfaces (vary by branch/platform).
 */

import type { MenuCategory } from "@/lib/types/menu";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "fish",
    title: "Fish",
    intro:
      "Whole Lake Victoria tilapia — the house signature. Sized in the kitchen; ask for today’s portions.",
    items: [
      {
        id: "tilapia-fried",
        name: "Whole Fried Tilapia",
        description:
          "Deep-fried until crisp. Served with ugali, kachumbari, and traditional greens.",
        badge: "Signature",
        isCatchWeight: true,
        station: "fry",
      },
      {
        id: "tilapia-wet-fry",
        name: "Wet-Fry Tilapia (Stew Style)",
        description:
          "Gently wet-fried in a rich tomato and onion sauce — comforting and saucy.",
        isCatchWeight: true,
        station: "fry",
      },
      {
        id: "zuckerberg-special",
        name: "Zuckerberg Special",
        description:
          "Premium whole tilapia — named for a memorable lunch guest. Ask staff for today’s size.",
        badge: "Celebrity favorite",
        isCatchWeight: true,
        station: "fry",
      },
    ],
  },
  {
    id: "heritage",
    title: "Heritage & Specialty Dishes",
    intro: "Dishes that carry Luo and broader Kenyan home-cooking traditions.",
    items: [
      {
        id: "aliya",
        name: "Aliya",
        description: "Salted, sundried beef fried with tomatoes.",
        station: "pass",
      },
      {
        id: "omena",
        name: "Omena",
        description:
          "Small dried lake fish — a classic Western Kenyan protein when available.",
        station: "pass",
      },
    ],
  },
  {
    id: "greens-sides",
    title: "Traditional Greens & Sides",
    intro: "Western Kenyan greens are part of the meal — not just garnish.",
    items: [
      {
        id: "managu",
        name: "Managu",
        description: "Leafy African nightshade greens, cooked traditional-style.",
        station: "starch-greens",
      },
      {
        id: "osuga",
        name: "Osuga (with cream)",
        description: "Bitter greens mellowed with cream — a house favorite.",
        station: "starch-greens",
      },
      {
        id: "kunde",
        name: "Kunde",
        description: "Cowpea leaves — earthy and nourishing.",
        station: "starch-greens",
      },
      {
        id: "mito",
        name: "Mito / Mitoo",
        description: "Traditional local greens, prepared simply.",
        station: "starch-greens",
      },
      {
        id: "plantains",
        name: "Plantains",
        description: "Ripe plantains, a soft sweet side for fish plates.",
        station: "starch-greens",
      },
      {
        id: "ugali",
        name: "Ugali (white or brown)",
        description: "Corn or millet ugali — guest’s choice.",
        station: "starch-greens",
      },
      {
        id: "kachumbari",
        name: "Kachumbari",
        description: "Fresh tomato and onion salad.",
        station: "pass",
      },
      {
        id: "chips",
        name: "Chips",
        description: "Crisp potato chips — a popular side for mixed tables.",
        station: "starch-greens",
      },
    ],
  },
  {
    id: "group-catering",
    title: "Group & Catering Menus",
    intro:
      "Packages for celebrations and office lunches. Pricing on enquiry — menus vary by season and guest count.",
    items: [
      {
        id: "group-mbuzi",
        name: "Group Menu 1 — Whole mbuzi package",
        description:
          "Whole goat with kachumbari, ugali, and samosas — ideal for about 10–12 guests.",
      },
      {
        id: "group-fish-pilau",
        name: "Group Menu 2 — Fish, pilau & more",
        description:
          "Large-format spread with fish, pilau, chapati, beef, and mixed vegetables — ideal for about 15 guests.",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    intro: "Local beers, house cocktails, and soft drinks. Full bar list available in house.",
    items: [
      {
        id: "local-beers",
        name: "Local beers",
        description: "Kenyan favorites on offer — ask for today’s selection.",
        station: "bar",
      },
      {
        id: "dawa",
        name: "Dawa cocktails",
        description: "The classic Kenyan vodka, honey, and lime cocktail.",
        station: "bar",
      },
      {
        id: "soft-drinks",
        name: "Soft drinks & water",
        description: "Sodas, juices, and bottled water.",
        station: "bar",
      },
    ],
  },
];

export function getCategory(id: MenuCategory["id"]) {
  return MENU_CATEGORIES.find((c) => c.id === id);
}
