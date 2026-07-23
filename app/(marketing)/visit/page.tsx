import type { Metadata } from "next";
import Image from "next/image";
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
        {/* Ambiance Hero Banner */}
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-[var(--border)] shadow-lg">
          <Image
            src="/images/locations/restaurant-dining-vibe.jpg"
            alt="Warm candlelit dining atmosphere at Mama Oliech"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block rounded-full bg-amber-500/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md">
              Warm Dining Atmosphere · Marcus Garvey Road
            </span>
          </div>
        </div>

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
            <a
              href={EXTERNAL_LINKS.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-3 text-sm font-bold shadow-md hover:bg-stone-800 transition-all hover:scale-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Uber Eats (Flagship Store)</span>
            </a>
          ) : null}
          {isLiveLink(EXTERNAL_LINKS.boltFood) ? (
            <a
              href={EXTERNAL_LINKS.boltFood}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-3 text-sm font-bold shadow-md hover:bg-emerald-500 transition-all hover:scale-105"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
              <span>Bolt Food</span>
            </a>
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
