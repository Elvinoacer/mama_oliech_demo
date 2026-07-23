/**
 * Story / heritage content — from website content + ops docs.
 * Celebrity photos: Unsplash demo stock (not official likenesses).
 */

import type { StoryContent } from "@/lib/types/story";
import { CELEBRITY_IMAGES } from "@/lib/data/unsplash";

export const STORY: StoryContent = {
  founder: {
    name: "Mary Auma Oliech",
    role: "Founder — “Mama Oliech”",
    summary:
      "Before it was visited by world leaders, tech titans, and global icons, Mama Oliech was built on a single sacred rule: serve whole Lake Victoria tilapia the way nature intended — golden, crackling, and infused with the soul of Western Kenya. From a humble lakeside kitchen recipe to Nairobi’s most iconic dining institution, Mary Auma Oliech created a cultural sanctuary where world presidents and neighborhood regulars sit side-by-side to break ugali with their hands.",
  },
  family: [
    {
      name: "Dennis Oliech",
      role: "Son · Harambee Stars legend",
      summary:
        "76 caps for Kenya and 34 international goals — a national record bettered only by William Ouma. He scored the historic goal against Cape Verde that sent the Harambee Stars to the 2004 Africa Cup of Nations, and played in France’s Ligue 1 with Auxerre (25 goals in 165 appearances). Football earnings helped fund restaurant expansion, including the Hurlingham flagship on Marcus Garvey Road.",
    },
    {
      name: "Lilian",
      role: "Daughter · Flagship leadership",
      summary:
        "Since Mary Auma’s passing in 2018, Lilian has led the Hurlingham location — keeping her mother’s recipes and her mother’s warmth alive for a new generation of guests.",
    },
  ],
  celebrities: [
    {
      name: "Barack Obama",
      title: "Former U.S. President",
      note: "One of the world leaders who has shared a table at Mama Oliech’s.",
      imageSrc: CELEBRITY_IMAGES["Barack Obama"].src,
      imageAlt: CELEBRITY_IMAGES["Barack Obama"].alt,
    },
    {
      name: "Mark Zuckerberg",
      title: "Founder, Facebook",
      note: "His visit inspired the house “Zuckerberg Special” — a premium whole tilapia.",
      relatedMenuItemId: "zuckerberg-special",
      imageSrc: CELEBRITY_IMAGES["Mark Zuckerberg"].src,
      imageAlt: CELEBRITY_IMAGES["Mark Zuckerberg"].alt,
    },
    {
      name: "Anthony Bourdain",
      title: "Chef & storyteller",
      note: "Celebrated authentic kitchens around the world — including this one.",
      imageSrc: CELEBRITY_IMAGES["Anthony Bourdain"].src,
      imageAlt: CELEBRITY_IMAGES["Anthony Bourdain"].alt,
    },
    {
      name: "Idris Elba",
      title: "Actor",
      note: "Among the cultural figures who have pulled up a chair.",
      imageSrc: CELEBRITY_IMAGES["Idris Elba"].src,
      imageAlt: CELEBRITY_IMAGES["Idris Elba"].alt,
    },
  ],
  heritageFacts: [
    {
      id: "lake-victoria",
      title: "Lake Victoria fish",
      body: "Our signature is whole tilapia sourced with care and prepared the traditional way — deep-fried until crisp, or wet-fried in a rich tomato and onion sauce.",
    },
    {
      id: "ugali",
      title: "Ugali, the right way",
      body: "Choose white or brown corn/millet ugali. It’s the backbone of the plate — use your hands, pinch, and scoop greens and fish the way Western Kenyan families do at home.",
    },
    {
      id: "greens",
      title: "Traditional greens",
      body: "Managu, osuga (often with cream), kunde, and mito are not garnish. They are core Western Kenyan cuisine — bitter, nourishing, and essential to the meal.",
    },
    {
      id: "kachumbari",
      title: "Kachumbari",
      body: "Fresh tomato-onion salad that cuts through rich fried fish. A bright, sharp counterpoint on almost every classic plate.",
    },
    {
      id: "aliya",
      title: "Aliya",
      body: "Salted, sundried beef fried with tomatoes — a heritage specialty that travels from Luo tables to Nairobi.",
    },
    {
      id: "football-crossover",
      title: "Sport meets the kitchen",
      body: "Dennis Oliech’s football career helped fund expansion. Few restaurants anywhere carry such a direct link between national sporting pride and family cooking.",
    },
    {
      id: "wood-fire",
      title: "Wood-fired character",
      body: "Firewood remains part of the kitchen’s traditional flavor profile — technology should support the cooks, not replace the smoke and skill.",
    },
    {
      id: "every-guest",
      title: "Every guest is family",
      body: "Presidents and neighbors get the same hospitality. That standard is the brand: warm service, honest portions, and food that tastes like home.",
    },
  ],
};
