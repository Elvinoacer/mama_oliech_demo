/**
 * Visit Us / Plan Your Trip.
 * Source: website content §5
 *
 * TODO:
 * - Booking: phone, WhatsApp, or reservation system embed.
 * - Delivery buttons only for live storefronts.
 * - Directions tips for flagship (Marcus Garvey Rd parking notes if any).
 */

import type { Metadata } from "next";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Visit Us",
  description: "Reservations, delivery, and how to plan your trip to Mama Oliech.",
};

export default function VisitPage() {
  const branches = getActiveBranches();

  return (
    <>
      <Section eyebrow="Visit" title="Make a reservation">
        <p className="max-w-2xl opacity-80">
          Call or WhatsApp the branch you plan to visit. Online booking can be
          wired here later.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={EXTERNAL_LINKS.phone}>Call (TODO)</Button>
          <Button href={EXTERNAL_LINKS.whatsapp} variant="secondary">
            WhatsApp (TODO)
          </Button>
        </div>
      </Section>

      <Section id="delivery" eyebrow="Delivery & takeaway" title="Order online">
        <p className="max-w-2xl text-sm opacity-70">
          {/* Ops note: fragmented delivery listings — only advertise live channels */}
          Prefer calling ahead for pickup if app listings look stale.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={EXTERNAL_LINKS.uberEats} variant="secondary">
            Uber Eats (TODO)
          </Button>
          <Button href={EXTERNAL_LINKS.boltFood} variant="secondary">
            Bolt Food (TODO)
          </Button>
        </div>
        <ul className="mt-8 space-y-2 text-sm opacity-70">
          {branches.map((b) => (
            <li key={b.slug}>
              {b.name}: channels TODO — {b.deliveryChannels?.join(", ")}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Groups" title="Private events & catering">
        <p className="max-w-2xl opacity-80">
          Family gatherings, office lunches, celebrations — group packages from
          ~10 guests upward.
        </p>
        <div className="mt-6">
          <Button href="/catering">Enquire about catering</Button>
        </div>
      </Section>
    </>
  );
}
