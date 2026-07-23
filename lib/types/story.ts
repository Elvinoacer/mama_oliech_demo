/**
 * Brand story / heritage content types.
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
  relatedMenuItemId?: string;
  imageSrc?: string;
  imageAlt?: string;
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
