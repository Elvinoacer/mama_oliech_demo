import type { Metadata } from "next";
import { EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Reservations, delivery, and how to plan your trip to Mama Oliech Restaurant in Nairobi.",
};

export default function VisitPage() {
  const branches = getActiveBranches();
  const hasPhone = isLiveLink(EXTERNAL_LINKS.phone);
  const hasWhatsApp = isLiveLink(EXTERNAL_LINKS.whatsapp);

  return (
    <>
      <Section eyebrow="Visit" title="Make a reservation">
        <p className="type-lead">
          Call or WhatsApp the branch you plan to visit. For large groups, use
          the catering enquiry form so the kitchen can prepare.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {hasPhone ? <Button href={EXTERNAL_LINKS.phone} size="lg">Call</Button> : null}
          {hasWhatsApp ? (
            <Button href={EXTERNAL_LINKS.whatsapp} variant="secondary" size="lg">
              WhatsApp
            </Button>
          ) : null}
          {!hasPhone && !hasWhatsApp ? (
            <Button href="/contact" size="lg">
              Send a message
            </Button>
          ) : null}
        </div>
        {!hasPhone && !hasWhatsApp ? (
          <p className="type-caption mt-4">
            Phone and WhatsApp will appear here once added to{" "}
            <code className="text-[0.9em]">lib/constants.ts</code>.
          </p>
        ) : null}
      </Section>

      <Section
        id="delivery"
        eyebrow="Delivery & takeaway"
        title="Order online"
        className="bg-[var(--surface)]"
      >
        <p className="type-lead">
          Prefer calling ahead for pickup if an app listing looks stale. Live
          storefronts we know about:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {isLiveLink(EXTERNAL_LINKS.uberEats) ? (
            <Button href={EXTERNAL_LINKS.uberEats} variant="secondary" external size="lg">
              Uber Eats (flagship)
            </Button>
          ) : null}
          {isLiveLink(EXTERNAL_LINKS.boltFood) ? (
            <Button href={EXTERNAL_LINKS.boltFood} variant="secondary" external size="lg">
              Bolt Food
            </Button>
          ) : null}
        </div>
        <ul className="mt-10 space-y-4">
          {branches.map((b) => {
            const links = Object.entries(b.deliveryLinks ?? {}).filter(([, u]) =>
              isLiveLink(u),
            );
            return (
              <li
                key={b.slug}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6"
              >
                <p className="font-display text-xl font-semibold text-foreground">
                  {b.name}
                </p>
                <p className="type-body mt-1">{b.addressLine}</p>
                {links.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-4 text-base font-semibold">
                    {links.map(([ch, url]) => (
                      <a
                        key={ch}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--brand-primary)] underline-offset-2 hover:underline"
                      >
                        {ch === "uber-eats"
                          ? "Uber Eats"
                          : ch === "bolt-food"
                            ? "Bolt Food"
                            : ch}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="type-caption mt-2">No delivery link on file</p>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section eyebrow="Groups" title="Private events & catering">
        <p className="type-lead">
          Family gatherings, office lunches, celebrations — group packages from
          about 10 guests upward.
        </p>
        <div className="mt-8">
          <Button href="/catering" size="lg">
            Enquire about catering
          </Button>
        </div>
      </Section>
    </>
  );
}
