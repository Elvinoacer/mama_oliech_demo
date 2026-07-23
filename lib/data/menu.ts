/**
 * Static menu seed for marketing + QR portal.
 * Photos: Unsplash demo URLs via lib/data/unsplash.ts
 */

import type { MenuCategory } from "@/lib/types/menu";
import { MENU_IMAGES } from "@/lib/data/unsplash";

function img(id: keyof typeof MENU_IMAGES, alt: string) {
  return { imageSrc: MENU_IMAGES[id], imageAlt: alt };
}

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
        ...img("tilapia-fried", "Whole fried fish plated with sides"),
      },
      {
        id: "tilapia-wet-fry",
        name: "Wet-Fry Tilapia (Stew Style)",
        description:
          "Gently wet-fried in a rich tomato and onion sauce — comforting and saucy.",
        isCatchWeight: true,
        station: "fry",
        ...img("tilapia-wet-fry", "Fish in tomato stew sauce"),
      },
      {
        id: "zuckerberg-special",
        name: "Zuckerberg Special",
        description:
          "Premium whole tilapia — named for a memorable lunch guest. Ask staff for today’s size.",
        badge: "Celebrity favorite",
        isCatchWeight: true,
        station: "fry",
        ...img("zuckerberg-special", "Premium plated whole fish"),
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
        ...img("aliya", "Sautéed beef dish"),
      },
      {
        id: "omena",
        name: "Omena",
        description:
          "Small dried lake fish — a classic Western Kenyan protein when available.",
        station: "pass",
        ...img("omena", "Small fried lake fish"),
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
        ...img("managu", "Fresh leafy greens"),
      },
      {
        id: "osuga",
        name: "Osuga (with cream)",
        description: "Bitter greens mellowed with cream — a house favorite.",
        station: "starch-greens",
        ...img("osuga", "Creamy greens bowl"),
      },
      {
        id: "kunde",
        name: "Kunde",
        description: "Cowpea leaves — earthy and nourishing.",
        station: "starch-greens",
        ...img("kunde", "Cooked traditional greens"),
      },
      {
        id: "mito",
        name: "Mito / Mitoo",
        description: "Traditional local greens, prepared simply.",
        station: "starch-greens",
        ...img("mito", "Green vegetables"),
      },
      {
        id: "plantains",
        name: "Plantains",
        description: "Ripe plantains, a soft sweet side for fish plates.",
        station: "starch-greens",
        ...img("plantains", "Cooked plantains"),
      },
      {
        id: "ugali",
        name: "Ugali (white or brown)",
        description: "Corn or millet ugali — guest’s choice.",
        station: "starch-greens",
        ...img("ugali", "Maize meal staple"),
      },
      {
        id: "kachumbari",
        name: "Kachumbari",
        description: "Fresh tomato and onion salad.",
        station: "pass",
        ...img("kachumbari", "Fresh tomato and onion salad"),
      },
      {
        id: "chips",
        name: "Chips",
        description: "Crisp potato chips — a popular side for mixed tables.",
        station: "starch-greens",
        ...img("chips", "Crispy potato fries"),
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
        ...img("group-mbuzi", "Roast meat feast for a group"),
      },
      {
        id: "group-fish-pilau",
        name: "Group Menu 2 — Fish, pilau & more",
        description:
          "Large-format spread with fish, pilau, chapati, beef, and mixed vegetables — ideal for about 15 guests.",
        ...img("group-fish-pilau", "Large banquet food spread"),
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
        ...img("local-beers", "Glasses of beer"),
      },
      {
        id: "dawa",
        name: "Dawa cocktails",
        description: "The classic Kenyan vodka, honey, and lime cocktail.",
        station: "bar",
        ...img("dawa", "Citrus cocktail"),
      },
      {
        id: "soft-drinks",
        name: "Soft drinks & water",
        description: "Sodas, juices, and bottled water.",
        station: "bar",
        ...img("soft-drinks", "Fresh juice drink"),
      },
    ],
  },
];

export function getCategory(id: MenuCategory["id"]) {
  return MENU_CATEGORIES.find((c) => c.id === id);
}
