import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { Hero } from "@/components/marketing/hero";
import { SignatureDish } from "@/components/marketing/signature-dish";
import { MenuTicker } from "@/components/marketing/menu-ticker";
import { StoryPreview } from "@/components/marketing/story-preview";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { LocationsPreview } from "@/components/marketing/locations-preview";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: { absolute: `${BRAND.name} · Authentic Lake Victoria Tilapia in Nairobi` },
  description: BRAND.heroSubheadline,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureDish />
      <MenuTicker />
      <StoryPreview />
      <TestimonialsSection />
      <LocationsPreview />
      <CtaSection />
    </>
  );
}

