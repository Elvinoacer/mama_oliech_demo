/**
 * Homepage hero.
 * Source: website content §1
 *
 * TODO:
 * - Hero photography (fish / dining room / wood interior) — not stock.
 * - A/B headline from BRAND.heroHeadlines.
 * - Strong CTAs: Menu | Locations | Order Delivery.
 * - Trust bar under CTAs with celebrity line.
 */

import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <div className="border-b border-foreground/10 py-16 sm:py-24">
      <Container className="max-w-3xl">
        {/* TODO: background image layer */}
        <p className="text-sm font-medium tracking-wide uppercase opacity-70">
          Nairobi · Western Kenyan cuisine
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {BRAND.heroHeadlines[0]}
        </h1>
        <p className="mt-5 text-lg opacity-80">{BRAND.heroSubheadline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/menu">View Our Menu</Button>
          <Button href="/locations" variant="secondary">
            Find a Branch
          </Button>
          <Button href="/visit" variant="ghost">
            Order Delivery
          </Button>
        </div>

        <p className="mt-6 text-sm opacity-60">{BRAND.trustBar}</p>
      </Container>
    </div>
  );
}
