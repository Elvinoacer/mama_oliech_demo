/**
 * Brand-level constants for Mama Oliech Restaurant.
 *
 * Contact phone / WhatsApp / social: not published in source docs.
 * Set real values here when the restaurant confirms them.
 * UI only renders channels that are non-empty and not "#".
 */

export const BRAND = {
  name: "Mama Oliech Restaurant",
  shortName: "Mama Oliech",
  tagline: "Nairobi's Culinary Monument · Authentic Western Kenyan Heritage",
  heroHeadlines: [
    "Nairobi's Home of Authentic Lake Victoria Fish",
    "Where Presidents, Tech Titans, and Neighbors Share a Table",
    "Four Decades of Traditional Luo Culinary Excellence",
  ],
  heroSubheadline:
    "Crisp golden Lake Victoria tilapia, rich tomato wet-fry stews, wood-smoke infused indigenous greens, and fluffy ugali — cooked the way Mama Oliech always made it. A living Nairobi institution where global icons and local families gather as equals.",
  trustBar:
    "As enjoyed by Barack Obama, Mark Zuckerberg, Anthony Bourdain, and Idris Elba",
  socialProofFooter:
    "As featured in international press coverage and visited by world leaders, tech innovators, and sports legends.",
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
 * Site-wide external channels.
 * Prefer branch-level delivery links in lib/data/locations.ts when they differ.
 * Empty string or "#" = hide in UI.
 */
export const EXTERNAL_LINKS = {
  // Flagship Uber Eats (from public storefront listings in ops research)
  uberEats:
    "https://www.ubereats.com/ke/store/mama-oliech-hurligham/4aQXycxHSlyHH_fbNdnuUw",
  boltFood: "https://food.bolt.eu/en/320-nairobi/p/67342-mama-oliech-restaurant/",
  // Confirm with restaurant before launch:
  whatsapp: "",
  phone: "",
  email: "",
  instagram: "",
  facebook: "",
} as const;

export function isLiveLink(href: string | undefined | null): href is string {
  return Boolean(href && href !== "#" && href.trim().length > 0);
}

/**
 * Feature flags.
 *
 * enableMpesaStk is env-driven so sandbox/production can toggle without a code
 * edit (see plan Task 7). Other flags stay hardcoded until their integrations land.
 *
 *   MPESA_ENABLED=true  in .env.local  → live Daraja client
 *   unset / anything else              → safe demo response from initiateStkPush
 */
export const FEATURES = {
  enableMpesaStk: process.env.MPESA_ENABLED === "true",
  enableEtims: false,
  enableDeliveryAggregator: false,
  enableStaffPortal: true,
  enableTableOrdering: false,
} as const;

/** Simple staff portal gate — set STAFF_PORTAL_PASSWORD in env for production */
export const STAFF_COOKIE = "mama_oliech_staff";
