/**
 * Demo photography from Unsplash (remote).
 * Swap for real Mama Oliech kitchen / guest photos before production launch.
 *
 * Format: images.unsplash.com with auto=format for Next/Image optimization.
 */

const q = "auto=format&fit=crop&w=900&q=80";

function u(photoId: string, extra = "") {
  return `https://images.unsplash.com/${photoId}?${q}${extra ? `&${extra}` : ""}`;
}

/** Menu food photography by dish id */
export const MENU_IMAGES = {
  // Fish
  "tilapia-fried": u("photo-1580476262798-bddd9f4b7369"), // whole fried fish
  "tilapia-wet-fry": u("photo-1559339352-11d035aa65de"), // saucy fish dish
  "zuckerberg-special": u("photo-1467003909585-2f8a72700288"), // premium plated fish
  // Heritage / beef & lake protein
  aliya: u("photo-1529692236671-f1f6cf9683ba"), // grilled beef
  omena: u("photo-1551248429-40975aa4de74"), // small fried fish
  // Greens & sides
  managu: u("photo-1540420773420-3366772f4999"), // leafy greens
  osuga: u("photo-1512621776951-a57141f2eefd"), // salad / greens bowl
  kunde: u("photo-1547592166-23ac45744acd"), // cooked greens
  mito: u("photo-1576045057995-568f588f82fb"), // green vegetables
  plantains: u("photo-1603833665858-e61d17a86224"), // plantains
  ugali: u("photo-1604329760661-e71dc83f8f26"), // maize / starch staple
  kachumbari: u("photo-1625944230945-1b7dd3b949ab"), // tomato onion salad
  chips: u("photo-1573080496219-bb080dd4f877"), // fries
  // Group / catering
  "group-mbuzi": u("photo-1529042410759-befb1204b468"), // roast meat feast
  "group-fish-pilau": u("photo-1555939594-58d7cb561ad1"), // banquet spread
  // Drinks
  "local-beers": u("photo-1608270586620-248524c67de9"), // beer glasses
  dawa: u("photo-1514362545857-3bc16c4c7d1b"), // cocktail
  "soft-drinks": u("photo-1544145945-f90425340c7e"), // juice / soft drink
} as const;

/** Celebrity wall — stock portraits used as demo stand-ins (not official likenesses) */
export const CELEBRITY_IMAGES = {
  "Barack Obama": {
    src: u("photo-1560250097-0b93528c311a"), // professional portrait
    alt: "Portrait placeholder for distinguished guest feature (demo stock)",
  },
  "Mark Zuckerberg": {
    src: u("photo-1472099645785-5658abf4ff4e"),
    alt: "Portrait placeholder for tech founder guest feature (demo stock)",
  },
  "Anthony Bourdain": {
    src: u("photo-1577219491135-ce391730fb2c"), // chef portrait
    alt: "Portrait placeholder for chef guest feature (demo stock)",
  },
  "Idris Elba": {
    src: u("photo-1506794778202-cad84cf45f1d"),
    alt: "Portrait placeholder for actor guest feature (demo stock)",
  },
} as const;

/** Testimonials avatars / brand marks */
export const TESTIMONIAL_IMAGES = {
  zuckerberg: {
    src: u("photo-1472099645785-5658abf4ff4e"),
    alt: "Guest portrait placeholder",
  },
  cnn: {
    // Newsroom / broadcast aesthetic for press feature card
    src: u("photo-1495020689067-958852a7765e"),
    alt: "Press and media feature imagery",
  },
  chef: {
    src: u("photo-1583394293214-28ded15ee548"),
    alt: "Chef portrait placeholder",
  },
} as const;

/** About page — founder, family, heritage imagery (demo stock) */
export const ABOUT_IMAGES = {
  founder: {
    src: u("photo-1531123897727-8f129e1688ce"), // African woman portrait
    alt: "Founder portrait placeholder — Mary Auma Oliech (demo stock)",
  },
  dennisOliech: {
    src: u("photo-1517466787929-bc90951d0974"), // football/soccer player
    alt: "Dennis Oliech portrait placeholder — Harambee Stars legend (demo stock)",
  },
  lilian: {
    src: u("photo-1589156280159-27698a70f29e"), // African woman professional
    alt: "Lilian portrait placeholder — daughter leading flagship (demo stock)",
  },
  kitchenAction: {
    src: u("photo-1556910103-1c02745aae4d"), // chef cooking in kitchen
    alt: "Kitchen action — chefs preparing signature dishes (demo stock)",
  },
  historicRestaurant: {
    src: u("photo-1517248135467-4c7edcad34c4"), // restaurant interior warm ambiance
    alt: "Restaurant heritage interior (demo stock)",
  },
} as const;

/** Location branch imagery (demo stock) */
export const LOCATION_IMAGES = {
  hurlingham: {
    src: u("photo-1555396273-367ea4eb4db5"), // restaurant exterior / dining area
    alt: "Hurlingham flagship restaurant exterior (demo stock)",
  },
  kiambuRoad: {
    src: u("photo-1552566626-52f8b828add9"), // restaurant interior cozy
    alt: "Kiambu Road branch interior (demo stock)",
  },
} as const;

/** Atmosphere / CTA background image (demo stock) */
export const CTA_IMAGE = {
  src: u("photo-1528605248644-14dd04022da1"), // crowded lively restaurant atmosphere
  alt: "Lively dining atmosphere at Mama Oliech",
};

/** Catering page hero spread image (demo stock) */
export const CATERING_HERO_IMAGE = {
  src: u("photo-1555244162-803834f70033"), // banquet / catering buffet feast spread
  alt: "Mama Oliech catering banquet spread",
};

/** Menu Category Banners by Category ID */
export const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  fish: {
    src: u("photo-1580476262798-bddd9f4b7369"),
    alt: "Fresh Lake Victoria Fish Category",
  },
  heritage: {
    src: u("photo-1529692236671-f1f6cf9683ba"),
    alt: "Heritage & Meat Dishes Category",
  },
  "greens-sides": {
    src: u("photo-1540420773420-3366772f4999"),
    alt: "Traditional Greens & African Sides Category",
  },
  "group-catering": {
    src: u("photo-1555244162-803834f70033"),
    alt: "Group Feasts & Catering Spread Category",
  },
  drinks: {
    src: u("photo-1514362545857-3bc16c4c7d1b"),
    alt: "Refreshing Drinks & Dawa Cocktails Category",
  },
};

/** Food Guide / Cultural Facts thumbnails by fact id */
export const FOOD_GUIDE_IMAGES: Record<string, { src: string; alt: string }> = {
  "lake-victoria": {
    src: u("photo-1580476262798-bddd9f4b7369"),
    alt: "Whole Tilapia Fish",
  },
  ugali: {
    src: u("photo-1604329760661-e71dc83f8f26"),
    alt: "Traditional Ugali",
  },
  greens: {
    src: u("photo-1540420773420-3366772f4999"),
    alt: "Traditional Indigenous Greens",
  },
  kachumbari: {
    src: u("photo-1625944230945-1b7dd3b949ab"),
    alt: "Fresh Kachumbari Salad",
  },
  aliya: {
    src: u("photo-1529692236671-f1f6cf9683ba"),
    alt: "Aliya Sundried Beef",
  },
  "football-crossover": {
    src: u("photo-1517466787929-bc90951d0974"),
    alt: "Football and Sports Legacy",
  },
  "wood-fire": {
    src: u("photo-1556910103-1c02745aae4d"),
    alt: "Wood-fired Kitchen Tradition",
  },
  "every-guest": {
    src: u("photo-1528605248644-14dd04022da1"),
    alt: "Warm Hospitality for Every Guest",
  },
};

