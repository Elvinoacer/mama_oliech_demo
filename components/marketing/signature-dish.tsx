/**
 * Signature dish spotlight for homepage / menu intro.
 *
 * TODO:
 * - High-quality whole tilapia photo (fry + wet-fry variants).
 * - Link to menu fish category + PDF for current pricing.
 */

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function SignatureDish() {
  return (
    <Section eyebrow="The food" title="Whole Lake Victoria Tilapia">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          {/* TODO: next/image with real asset */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-foreground/20 text-sm opacity-50">
            Photo placeholder — signature fish
          </div>
        </div>
        <div>
          <p className="text-base leading-relaxed opacity-80">
            Fried crisp or wet-fry in tomato and onion sauce. Served with white or
            brown ugali, kachumbari, and traditional greens — the way Mama Oliech
            always made it.
          </p>
          <div className="mt-6">
            <Button href="/menu">Explore the menu</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
