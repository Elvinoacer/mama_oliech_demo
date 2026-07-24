import type { Metadata } from "next";
import Image from "next/image";
import { STORY } from "@/lib/data/story";
import { ABOUT_IMAGES } from "@/lib/data/unsplash";
import { Section } from "@/components/ui/section";
import { CelebrityWall } from "@/components/qr/celebrity-wall";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Mary Auma Oliech, Dennis Oliech, and Nairobi's home of Lake Victoria fish.",
};

export default function AboutPage() {
  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      {/* Founder Section */}
      <Section eyebrow="About" title="The woman behind the name">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6">
            <p className="type-lead text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-[var(--foreground)]">
              {STORY.founder.summary}
            </p>
            <div className="space-y-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
              <p className="type-body">
                Her kitchen became a meeting place for neighbors, football fans,
                tourists, and world figures — all drawn by the same promise of
                honest Western Kenyan cooking.
              </p>
            </div>
          </div>

          {/* Founder Feature Card */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="group relative mx-auto max-w-sm lg:max-w-none aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-xl bg-[var(--surface-elevated)]">
              <Image
                src={ABOUT_IMAGES.founder.src}
                alt={ABOUT_IMAGES.founder.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-8 space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {STORY.founder.role}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {STORY.founder.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Family Section */}
      <Section
        eyebrow="Family"
        title="A legacy on and off the pitch"
        className="bg-[var(--surface)] border-y border-[var(--border)]/60 py-12 sm:py-16"
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {STORY.family.map((person, idx) => {
            const img =
              idx === 0 ? ABOUT_IMAGES.dennisOliech : ABOUT_IMAGES.lilian;
            return (
              <li
                key={person.name}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="type-card-title text-xl sm:text-2xl font-bold">
                        {person.name}
                      </h3>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                        {person.role}
                      </span>
                    </div>
                    <p className="type-body text-sm sm:text-base text-[var(--muted)] leading-relaxed mt-3">
                      {person.summary}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Heritage Section */}
      <Section eyebrow="Heritage" title="Decades of fire & flavour">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src={ABOUT_IMAGES.kitchenAction.src}
              alt={ABOUT_IMAGES.kitchenAction.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 font-display text-lg sm:text-xl font-semibold text-white drop-shadow-sm">
              The kitchen where traditions live
            </p>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src={ABOUT_IMAGES.historicRestaurant.src}
              alt={ABOUT_IMAGES.historicRestaurant.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 font-display text-lg sm:text-xl font-semibold text-white drop-shadow-sm">
              Where every guest is family
            </p>
          </div>
        </div>
      </Section>

      {/* Guests Section */}
      <Section eyebrow="Guests" title="Who's pulled up a chair">
        <p className="type-lead max-w-2xl text-base sm:text-lg text-[var(--muted)] mb-8 sm:mb-10 leading-relaxed">
          Over the years, Mama Oliech&apos;s has welcomed remarkable visitors —
          and the same hospitality for every regular who walks through the door.
        </p>
        <CelebrityWall guests={STORY.celebrities} />
      </Section>
    </div>
  );
}
