/**
 * Brand story / heritage content types.
 * Source: website content doc §2 and ops doc heritage portal sections.
 *
 * TODO:
 * - Replace placeholder copy with approved family narrative.
 * - Add real photo assets + alt text for accessibility and SEO.
 * - Optional: short anecdotes per celebrity visit if documented.
 */

export interface PersonProfile {
  name: string;
  role: string;
  summary: string;
  imageSrc?: string;
}

export interface CelebrityVisit {
  name: string;
  title?: string;
  note?: string;
  /** Link to order "their" meal if productized later */
  relatedMenuItemId?: string;
}

export interface HeritageFact {
  id: string;
  title: string;
  body: string;
}

export interface StoryContent {
  founder: PersonProfile;
  family: PersonProfile[];
  celebrities: CelebrityVisit[];
  heritageFacts: HeritageFact[];
}
