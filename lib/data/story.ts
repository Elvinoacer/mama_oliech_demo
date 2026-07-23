/**
 * Story / heritage seed content.
 * Source: docs/mama-oliech-website-content.md §2, §6
 *          docs/mama_oliech_more_info.md (founder, football, celebrity guests)
 *
 * TODO:
 * - Get family-approved wording before public launch.
 * - Pair each section with real photos under public/images/people|heritage.
 * - Table QR portal reuses this same object — keep single source of truth.
 */

import type { StoryContent } from "@/lib/types/story";

export const STORY: StoryContent = {
  founder: {
    name: "Mary Auma Oliech",
    role: "Founder — “Mama Oliech”",
    summary:
      "Mama Oliech built her name on one promise: cook the fish the way it's meant to be cooked, with the traditional flavors of Western Kenya, and treat every guest — neighbor or head of state — like family.",
    // TODO: portrait path
    imageSrc: undefined,
  },
  family: [
    {
      name: "Dennis Oliech",
      role: "Son · Harambee Stars legend",
      summary:
        "76 caps, 34 international goals. Historic AFCON 2004 qualifier goal vs Cape Verde; Ligue 1 career with Auxerre. Football earnings helped fund restaurant expansion, including the Hurlingham flagship.",
    },
    {
      name: "Lilian",
      role: "Daughter · Flagship leadership",
      summary:
        "Since Mary Auma's passing in 2018, Lilian has led the Hurlingham location — keeping recipes and hospitality alive.",
    },
  ],
  celebrities: [
    { name: "Barack Obama", title: "Former U.S. President" },
    { name: "Mark Zuckerberg", title: "Founder, Facebook", relatedMenuItemId: "zuckerberg-special" },
    { name: "Anthony Bourdain", title: "Chef & storyteller" },
    { name: "Idris Elba", title: "Actor" },
  ],
  heritageFacts: [
    {
      id: "lake-victoria",
      title: "Lake Victoria fish",
      body: "Fish is sourced from Lake Victoria and prepared using family recipes.",
    },
    {
      id: "greens",
      title: "Traditional greens",
      body: "Managu, osuga and kin are core Western Kenyan cuisine — flavor and nutrition, not just sides.",
    },
    {
      id: "football-crossover",
      title: "Sport meets the kitchen",
      body: "Dennis Oliech's football earnings helped fund expansion — a rare Kenyan sport-and-food story.",
    },
  ],
};
