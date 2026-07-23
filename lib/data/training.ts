/**
 * Staff training module content.
 * Source: ops doc — Digital Heritage Training Portal + service scripts.
 */

export type TrainingModule = {
  slug: string;
  title: string;
  summary: string;
  sections: Array<{ heading: string; body: string }>;
};

export const TRAINING_MODULES: TrainingModule[] = [
  {
    slug: "founders",
    title: "Founders & football",
    summary:
      "Mary Auma, Dennis Oliech, and why the brand story matters on the floor.",
    sections: [
      {
        heading: "Mama Oliech",
        body: "Mary Auma Oliech built the brand on authentic Western Kenyan fish cookery and treating every guest like family. Lead with that warmth.",
      },
      {
        heading: "Dennis Oliech",
        body: "76 caps, 34 international goals, AFCON 2004 qualifier hero, Auxerre in Ligue 1. Football earnings helped fund Hurlingham and earlier expansion. Guests love this story — keep it brief and proud.",
      },
      {
        heading: "Lilian & today",
        body: "Since 2018 the flagship has been family-led under Lilian. Recipes and hospitality standards continue; technology should support service, not replace it.",
      },
    ],
  },
  {
    slug: "menu-mastery",
    title: "Menu mastery",
    summary: "Fish styles, greens, ugali, group packages.",
    sections: [
      {
        heading: "Fish styles",
        body: "Whole fried = crisp deep-fried. Wet-fry = stew-style in tomato/onion sauce. Zuckerberg Special = premium whole tilapia. Portions are catch-weight — never guess weight; kitchen sizes the fish.",
      },
      {
        heading: "Greens & sides",
        body: "Managu, osuga (often with cream), kunde, mito are core dishes, not garnish. Offer white or brown ugali. Kachumbari cuts richness.",
      },
      {
        heading: "Groups",
        body: "Group packages (mbuzi ~10–12; fish/pilau ~15) need advance notice. Direct large bookings to catering enquiry; don’t invent package prices on delivery apps.",
      },
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality standards",
    summary: "Greeting, QR intro, clean tables, billing language.",
    sections: [
      {
        heading: "The greeting",
        body: "“Welcome to Mama Oliech Restaurant. We are proud to share our authentic Lake Victoria fish recipes, enjoyed by guests from all over the world.”",
      },
      {
        heading: "The QR intro",
        body: "“You can scan this wooden block to browse our menu, learn about our founder, or explore how we prepare fresh catches.”",
      },
      {
        heading: "Floor standards",
        body: "Clear dirty tables quickly, keep menus available, check back after food drops, never leave guests waiting for the bill without explanation.",
      },
      {
        heading: "The billing (future STK)",
        body: "When M-Pesa STK is live: “I am sending an M-Pesa payment request to your phone. Once you enter your PIN, your receipt with a KRA tax code will print.” Until then, follow current cash/Till procedure carefully.",
      },
    ],
  },
  {
    slug: "digital-tools",
    title: "Digital tools",
    summary: "Handheld POS, M-Pesa STK, and when to escalate.",
    sections: [
      {
        heading: "What exists today",
        body: "This website includes marketing pages, table QR heritage portal, and form enquiries. Full handheld POS and live STK are not enabled until credentials and devices are ready.",
      },
      {
        heading: "Coming integrations",
        body: "Safaricom Daraja STK Push, KRA eTIMS fiscal receipts, delivery menu sync. Feature flags live in lib/constants.ts — do not tell guests a feature is live until ops confirms.",
      },
      {
        heading: "Escalate when",
        body: "Payment disputes, allergen needs, large group timing conflicts, or system outages — call the shift lead immediately.",
      },
    ],
  },
];

export function getTrainingModule(slug: string) {
  return TRAINING_MODULES.find((m) => m.slug === slug);
}
