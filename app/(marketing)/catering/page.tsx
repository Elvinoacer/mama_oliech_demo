import type { Metadata } from "next";
import Image from "next/image";
import { getCategory } from "@/lib/data/menu";
import { Section } from "@/components/ui/section";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { CateringForm } from "@/components/forms/catering-form";
import { CATERING_HERO_IMAGE } from "@/lib/data/unsplash";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Group menus and catering enquiries for Mama Oliech Restaurant — packages for 10–15+ guests.",
};

export default function CateringPage() {
  const group = getCategory("group-catering");

  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      {/* Hero & Intro Section */}
      <Section eyebrow="Catering" title="Feed the whole table">
        {/* Responsive Hero Image Banner */}
        <div className="relative mb-6 sm:mb-8 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-xl bg-stone-900">
          <Image
            src={CATERING_HERO_IMAGE.src}
            alt={CATERING_HERO_IMAGE.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 backdrop-blur-md shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
              Group Feasts & Event Banquets
            </span>
          </div>
        </div>

        {/* Lead Copy & Key Selling Points */}
        <div className="space-y-6">
          <p className="type-lead text-base sm:text-lg lg:text-xl text-[var(--foreground)]/90 leading-relaxed max-w-4xl">
            Whole mbuzi packages, large-format fish and pilau spreads, and
            custom menus for 10–15+ guests. Tell us the occasion — we&apos;ll
            propose a spread. Pricing is on enquiry so we can match season and
            headcount.
          </p>

          {/* Quick Perks / Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 sm:p-4 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Capacity
              </p>
              <p className="text-base sm:text-lg font-bold text-[var(--foreground)] mt-0.5">
                10 to 150+ Guests
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 sm:p-4 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Format
              </p>
              <p className="text-base sm:text-lg font-bold text-[var(--foreground)] mt-0.5">
                Buffet & Platter
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 sm:p-4 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Service
              </p>
              <p className="text-base sm:text-lg font-bold text-[var(--foreground)] mt-0.5">
                Pickup or On-site
              </p>
            </div>
          </div>
        </div>

        {/* Group Catering Packages */}
        {group && group.items.length > 0 ? (
          <div className="mt-10 sm:mt-14 space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Popular Catering Packages
            </h3>
            <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {group.items.map((item) => (
                <li key={item.id} className="h-full">
                  <MenuItemCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      {/* Interactive Enquiry Section */}
      <Section
        eyebrow="Enquire"
        title="Send a catering request"
        className="bg-[var(--surface)] border-t border-[var(--border)]/60 py-12 sm:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Catering Guidance & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                Planning an event?
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Fill out the request form and our events team will reach out
                within 24 hours to finalize your custom menu and quote.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">
                    Tailored Portions
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                    Customized per head to minimize food waste while ensuring
                    everyone leaves satisfied.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">
                    Fresh Lake Victoria Harvest
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                    Sourced daily to preserve iconic lakeside taste and
                    authentic flavor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">
                    Dietary Customizations
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                    Traditional traditional greens, ugali alternatives, and
                    spice levels catered to your group.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-8 shadow-sm">
            <CateringForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
