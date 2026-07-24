import type { Metadata } from "next";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  Mail,
  Truck,
  MapPin,
  ExternalLink,
  Users,
  UtensilsCrossed,
  ArrowRight,
  Clock,
} from "lucide-react";
import { EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

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
      {/* SECTION 1: RESERVATIONS & LOCATION */}
      <Section eyebrow="Visit" title="Make a reservation">
        {/* Ambiance Hero Banner */}
        <div className="relative mb-8 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-lg group">
          <Image
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
            alt="Warm candlelit dining atmosphere at Mama Oliech Restaurant"
            fill
            sizes="100vw"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>Marcus Garvey Road · Flagship Store</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-white/80 backdrop-blur-sm bg-black/40 px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Open Daily: 10:00 AM – 10:00 PM</span>
            </span>
          </div>
        </div>

        <p className="type-lead">
          Call or WhatsApp the branch you plan to visit. For large groups or
          special events, use our catering enquiry form so the kitchen can
          prepare.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {hasPhone ? (
            <Button href={EXTERNAL_LINKS.phone} size="lg" className="gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>Call Branch</span>
            </Button>
          ) : null}

          {hasWhatsApp ? (
            <Button
              href={EXTERNAL_LINKS.whatsapp}
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>WhatsApp Us</span>
            </Button>
          ) : null}

          {!hasPhone && !hasWhatsApp ? (
            <Button href="/contact" size="lg" className="gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>Send a message</span>
            </Button>
          ) : null}
        </div>

        {!hasPhone && !hasWhatsApp ? (
          <p className="type-caption mt-4">
            Phone and WhatsApp numbers will appear here once configured in{" "}
            <code className="text-[0.9em] rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 border border-[var(--border)]">
              lib/constants.ts
            </code>
            .
          </p>
        ) : null}
      </Section>

      {/* SECTION 2: DELIVERY & ONLINE ORDERS */}
      <Section
        id="delivery"
        eyebrow="Delivery & takeaway"
        title="Order online"
        className="bg-[var(--surface)]"
      >
        <p className="type-lead">
          We recommend calling ahead for direct pickup. You can also order
          online through our verified partner delivery storefronts below:
        </p>

        {/* Primary Partner Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {isLiveLink(EXTERNAL_LINKS.uberEats) ? (
            <a
              href={EXTERNAL_LINKS.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-black text-white px-6 py-3.5 text-sm font-bold shadow-md hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-500 min-h-[48px]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Uber Eats (Flagship)</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          ) : null}

          {isLiveLink(EXTERNAL_LINKS.boltFood) ? (
            <a
              href={EXTERNAL_LINKS.boltFood}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 text-white px-6 py-3.5 text-sm font-bold shadow-md hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-500 min-h-[48px]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
              <span>Bolt Food</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          ) : null}
        </div>

        {/* Branch Delivery Status List */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6">
          {branches.map((b) => {
            const links = Object.entries(b.deliveryLinks ?? {}).filter(
              ([, u]) => isLiveLink(u),
            );
            return (
              <div
                key={b.slug}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 shadow-2xs transition-all duration-200 hover:border-amber-500/30",
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--brand-primary)] shrink-0" />
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                      {b.name}
                    </h3>
                  </div>
                  <p className="type-body text-xs sm:text-sm text-[var(--muted)] pl-6">
                    {b.addressLine}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  {links.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                      {links.map(([ch, url]) => (
                        <a
                          key={ch}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--surface-elevated)] transition-all min-h-[40px]"
                        >
                          <Truck className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {ch === "uber-eats"
                              ? "Uber Eats"
                              : ch === "bolt-food"
                                ? "Bolt Food"
                                : ch}
                          </span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] bg-[var(--surface)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
                      <UtensilsCrossed className="h-3.5 w-3.5 shrink-0" />
                      <span>Takeaway via Direct Call</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SECTION 3: GROUPS & CATERING */}
      <Section eyebrow="Groups" title="Private events & catering">
        <div className="rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--surface-elevated)] p-6 sm:p-8 md:p-10 shadow-md">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Users className="h-3.5 w-3.5" />
              <span>10 to 200+ Guests</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              Host your next celebration with authentic lakeside dining
            </h3>
            <p className="type-lead text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              Family gatherings, office lunches, or corporate celebrations — we
              tailor group fish platters, traditional sides, and dedicated
              service for memorable dining events.
            </p>
            <div className="pt-2">
              <Button href="/catering" size="lg" className="gap-2">
                <span>Enquire about catering</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
