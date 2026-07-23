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
    <>
      <Section eyebrow="About" title="The woman behind the name">
        <div className="grid gap-10 md:grid-cols-[1fr_300px] md:items-start">
          <div className="prose-measure-wide space-y-5">
            <p className="type-lead !max-w-none">{STORY.founder.summary}</p>
            <p className="type-body">
              Her kitchen became a meeting place for neighbors, football fans,
              tourists, and world figures — all drawn by the same promise of
              honest Western Kenyan cooking.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--border)] shadow-lg">
            <Image
              src={ABOUT_IMAGES.founder.src}
              alt={ABOUT_IMAGES.founder.alt}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-display text-2xl font-semibold text-white">
                {STORY.founder.name}
              </p>
              <p className="text-sm text-amber-200/90 mt-1">{STORY.founder.role}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Family"
        title="A legacy on and off the pitch"
        className="bg-[var(--surface)]"
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          {STORY.family.map((person, idx) => {
            const img = idx === 0 ? ABOUT_IMAGES.dennisOliech : ABOUT_IMAGES.lilian;
            return (
              <li
                key={person.name}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="type-card-title">{person.name}</h3>
                  <p className="type-body mt-1">{person.role}</p>
                  <p className="type-body mt-4">{person.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section eyebrow="Heritage" title="Decades of fire & flavour">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src={ABOUT_IMAGES.kitchenAction.src}
              alt={ABOUT_IMAGES.kitchenAction.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 font-display text-lg font-semibold text-white">
              The kitchen where traditions live
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src={ABOUT_IMAGES.historicRestaurant.src}
              alt={ABOUT_IMAGES.historicRestaurant.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 font-display text-lg font-semibold text-white">
              Where every guest is family
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Guests" title="Who's pulled up a chair">
        <p className="type-lead mb-8">
          Over the years, Mama Oliech&apos;s has welcomed remarkable visitors —
          and the same hospitality for every regular who walks through the door.
        </p>
        <CelebrityWall guests={STORY.celebrities} />
      </Section>
    </>
  );
}
