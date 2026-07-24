/**
 * Static menu seed for marketing + QR portal + bill payments.
 *
 * In-store reference prices derived from ops research (Uber Eats / in-store
 * ranges in docs/mama_oliech_more_info.md). Catch-weight fish uses KES/kg so
 * bills scale with actual portion weight — not flat delivery markup prices.
 *
 * Photos: Unsplash demo URLs via lib/data/unsplash.ts
 */

import type { MenuCategory, PortionTier } from "@/lib/types/menu";
import { MENU_IMAGES } from "@/lib/data/unsplash";

function img(id: keyof typeof MENU_IMAGES, alt: string) {
  return { imageSrc: MENU_IMAGES[id], imageAlt: alt };
}

/** Shared portion tiers for whole tilapia (kitchen labels) */
const FISH_PORTIONS: PortionTier[] = [
  { id: "small", label: "Small", weightKg: 0.6 },
  { id: "medium", label: "Medium", weightKg: 0.9 },
  { id: "large", label: "Large", weightKg: 1.2 },
  { id: "xl", label: "XL / Zuckerberg", weightKg: 1.5 },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "fish",
    title: "Fish",
    intro:
      "Whole Lake Victoria tilapia — the house signature. Sized in the kitchen; billed by weight (KES/kg).",
    items: [
      {
        id: "tilapia-fried",
        name: "Whole Fried Tilapia",
        description:
          "Deep-fried until crisp. Served with ugali, kachumbari, and traditional greens.",
        badge: "Signature",
        isCatchWeight: true,
        pricingMode: "catch-weight",
        pricePerKgKes: 900,
        defaultWeightKg: 0.9,
        minWeightKg: 0.4,
        maxWeightKg: 2.5,
        portionTiers: FISH_PORTIONS,
        taxCategory: "standard-food",
        payable: true,
        station: "fry",
        available: true,
        ...img("tilapia-fried", "Whole fried fish plated with sides"),
      },
      {
        id: "tilapia-wet-fry",
        name: "Wet-Fry Tilapia (Stew Style)",
        description:
          "Gently wet-fried in a rich tomato and onion sauce — comforting and saucy.",
        isCatchWeight: true,
        pricingMode: "catch-weight",
        pricePerKgKes: 900,
        defaultWeightKg: 0.9,
        minWeightKg: 0.4,
        maxWeightKg: 2.5,
        portionTiers: FISH_PORTIONS,
        taxCategory: "standard-food",
        payable: true,
        station: "fry",
        available: true,
        ...img("tilapia-wet-fry", "Fish in tomato stew sauce"),
      },
      {
        id: "zuckerberg-special",
        name: "Zuckerberg Special",
        description:
          "Premium whole tilapia — named for a memorable lunch guest. Ask staff for today’s size.",
        badge: "Celebrity favorite",
        isCatchWeight: true,
        pricingMode: "catch-weight",
        // Premium rate vs standard fry
        pricePerKgKes: 1100,
        defaultWeightKg: 1.5,
        minWeightKg: 0.8,
        maxWeightKg: 3,
        portionTiers: [
          { id: "medium", label: "Medium", weightKg: 1.0 },
          { id: "large", label: "Large", weightKg: 1.2 },
          { id: "xl", label: "XL / Zuckerberg", weightKg: 1.5 },
        ],
        taxCategory: "standard-food",
        payable: true,
        station: "fry",
        available: true,
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
        pricingMode: "fixed",
        priceKes: 850,
        taxCategory: "standard-food",
        payable: true,
        station: "pass",
        available: true,
        ...img("aliya", "Sautéed beef dish"),
      },
      {
        id: "omena",
        name: "Omena",
        description:
          "Small dried lake fish — a classic Western Kenyan protein when available.",
        pricingMode: "fixed",
        priceKes: 650,
        taxCategory: "standard-food",
        payable: true,
        station: "pass",
        available: true,
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
        pricingMode: "fixed",
        priceKes: 350,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("managu", "Fresh leafy greens"),
      },
      {
        id: "osuga",
        name: "Osuga (with cream)",
        description: "Bitter greens mellowed with cream — a house favorite.",
        pricingMode: "fixed",
        priceKes: 400,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("osuga", "Creamy greens bowl"),
      },
      {
        id: "kunde",
        name: "Kunde",
        description: "Cowpea leaves — earthy and nourishing.",
        pricingMode: "fixed",
        priceKes: 350,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("kunde", "Cooked traditional greens"),
      },
      {
        id: "mito",
        name: "Mito / Mitoo",
        description: "Traditional local greens, prepared simply.",
        pricingMode: "fixed",
        priceKes: 350,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("mito", "Green vegetables"),
      },
      {
        id: "plantains",
        name: "Plantains",
        description: "Ripe plantains, a soft sweet side for fish plates.",
        pricingMode: "fixed",
        priceKes: 250,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("plantains", "Cooked plantains"),
      },
      {
        id: "ugali",
        name: "Ugali (white or brown)",
        description: "Corn or millet ugali — guest’s choice.",
        pricingMode: "fixed",
        priceKes: 150,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("ugali", "Maize meal staple"),
      },
      {
        id: "kachumbari",
        name: "Kachumbari",
        description: "Fresh tomato and onion salad.",
        pricingMode: "fixed",
        priceKes: 150,
        taxCategory: "standard-food",
        payable: true,
        station: "pass",
        available: true,
        ...img("kachumbari", "Fresh tomato and onion salad"),
      },
      {
        id: "chips",
        name: "Chips",
        description: "Crisp potato chips — a popular side for mixed tables.",
        pricingMode: "fixed",
        priceKes: 300,
        taxCategory: "standard-food",
        payable: true,
        station: "starch-greens",
        available: true,
        ...img("chips", "Crispy potato fries"),
      },
    ],
  },
  {
    id: "group-catering",
    title: "Group & Catering Menus",
    intro:
      "Packages for celebrations and office lunches. Pricing on enquiry — not payable via table STK; contact catering.",
    items: [
      {
        id: "group-mbuzi",
        name: "Group Menu 1 — Whole mbuzi package",
        description:
          "Whole goat with kachumbari, ugali, and samosas — ideal for about 10–12 guests.",
        pricingMode: "enquiry",
        // Reference package price (enquiry only — not STK from table QR)
        priceKes: 23000,
        taxCategory: "catering",
        payable: false,
        available: true,
        ...img("group-mbuzi", "Roast meat feast for a group"),
      },
      {
        id: "group-fish-pilau",
        name: "Group Menu 2 — Fish, pilau & more",
        description:
          "Large-format spread with fish, pilau, chapati, beef, and mixed vegetables — ideal for about 15 guests.",
        pricingMode: "enquiry",
        priceKes: 32500,
        taxCategory: "catering",
        payable: false,
        available: true,
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
        pricingMode: "fixed",
        priceKes: 350,
        taxCategory: "alcohol",
        payable: true,
        station: "bar",
        available: true,
        ...img("local-beers", "Glasses of beer"),
      },
      {
        id: "dawa",
        name: "Dawa cocktails",
        description: "The classic Kenyan vodka, honey, and lime cocktail.",
        pricingMode: "fixed",
        priceKes: 550,
        taxCategory: "alcohol",
        payable: true,
        station: "bar",
        available: true,
        ...img("dawa", "Citrus cocktail"),
      },
      {
        id: "soft-drinks",
        name: "Soft drinks & water",
        description: "Sodas, juices, and bottled water.",
        pricingMode: "fixed",
        priceKes: 200,
        taxCategory: "non-alcoholic",
        payable: true,
        station: "bar",
        available: true,
        ...img("soft-drinks", "Fresh juice drink"),
      },
    ],
  },
];

export function getCategory(id: MenuCategory["id"]) {
  return MENU_CATEGORIES.find((c) => c.id === id);
}

/** Flat lookup of every menu item by id */
export function getMenuItemById(id: string) {
  for (const category of MENU_CATEGORIES) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}

/** Items that can be added to a table bill and paid via M-Pesa */
export function getPayableMenuItems() {
  return MENU_CATEGORIES.flatMap((c) =>
    c.items
      .filter((item) => item.payable !== false && item.available !== false)
      .map((item) => ({ categoryId: c.id, categoryTitle: c.title, item })),
  );
}
