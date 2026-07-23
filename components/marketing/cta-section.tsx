/**
 * Closing CTA band — reservations, catering, delivery.
 * Source: website content §5
 *
 * TODO: WhatsApp deep-link once number confirmed.
 */

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <Section className="bg-foreground/[0.03]">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Plan your visit
        </h2>
        <p className="mt-3 opacity-80">
          Reserve a table, enquire about group catering, or order through your
          preferred delivery app.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/visit">Visit Us</Button>
          <Button href="/catering" variant="secondary">
            Catering enquiry
          </Button>
          <Button href="/contact" variant="ghost">
            Contact
          </Button>
        </div>
      </div>
    </Section>
  );
}
