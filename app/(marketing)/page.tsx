/**
 * Homepage — assembly of marketing sections.
 * Source order: website content §1 → story → food → locations → visit CTA.
 *
 * TODO:
 * - Real photography throughout.
 * - Performance: prioritize hero LCP image.
 * - Optional: JSON-LD LocalBusiness for flagship.
 */

import { Hero } from "@/components/marketing/hero";
import { StoryPreview } from "@/components/marketing/story-preview";
import { SignatureDish } from "@/components/marketing/signature-dish";
import { LocationsPreview } from "@/components/marketing/locations-preview";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryPreview />
      <SignatureDish />
      <LocationsPreview />
      <CtaSection />
    </>
  );
}
