/**
 * Brand-level constants for Mama Oliech Restaurant.
 *
 * TODO:
 * - Confirm legal business name vs trading name for receipts / eTIMS.
 * - Replace placeholder phones, WhatsApp, social URLs with verified contacts.
 * - Keep delivery deep-links up to date (platforms often change store IDs).
 * - Do NOT hardcode M-Pesa Till / Paybill here if secrets belong in env vars.
 */

export const BRAND = {
  name: "Mama Oliech Restaurant",
  shortName: "Mama Oliech",
  tagline: "Authentic Western Kenyan Cooking, Served with Heart",
  // Homepage hero options — pick one or A/B test later
  heroHeadlines: [
    "Nairobi's Home of Authentic Lake Victoria Fish",
    "Where Presidents, Football Legends, and Neighbors Share a Table",
    "Traditional Western Kenyan Cooking",
  ],
  heroSubheadline:
    "Whole fried and wet-fry tilapia, slow-cooked traditional greens, and ugali made the way Mama Oliech always made it — a Nairobi institution loved by locals and visited by guests from around the world.",
  trustBar:
    "As enjoyed by Barack Obama, Mark Zuckerberg, Anthony Bourdain, and Idris Elba",
  socialProofFooter:
    "As featured in international press coverage and visited by world leaders, athletes, and celebrities.",
} as const;

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "Our Story" },
  { href: "/visit", label: "Visit Us" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * External order / contact channels.
 * TODO: verify each link is live before launch; hide dead channels.
 */
export const EXTERNAL_LINKS = {
  // TODO: real Uber Eats / Bolt Food storefront URLs per active branch
  uberEats: "#",
  boltFood: "#",
  // TODO: WhatsApp business number (wa.me format)
  whatsapp: "#",
  // TODO: primary booking phone
  phone: "tel:+254700000000",
  email: "mailto:hello@example.com",
  // TODO: social handles
  instagram: "#",
  facebook: "#",
} as const;

/**
 * Feature flags for demo vs production.
 * Toggle integrations on only when credentials + backends exist.
 */
export const FEATURES = {
  enableMpesaStk: false,
  enableEtims: false,
  enableDeliveryAggregator: false,
  enableStaffPortal: true,
  enableTableOrdering: false, // QR portal is heritage-first; ordering is later
} as const;
