import type { Metadata } from "next";
import { STORY } from "@/lib/data/story";
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
          <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="font-display text-2xl font-semibold text-[var(--brand-primary)]">
              {STORY.founder.name}
            </p>
            <p className="type-body mt-3">{STORY.founder.role}</p>
            <p className="type-caption mt-8">
              Portrait photo · add to{" "}
              <code className="text-[0.85em]">public/images/people/</code>
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Family"
        title="A legacy on and off the pitch"
        className="bg-[var(--surface)]"
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          {STORY.family.map((person) => (
            <li
              key={person.name}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-sm sm:p-7"
            >
              <h3 className="type-card-title">{person.name}</h3>
              <p className="type-body mt-1">{person.role}</p>
              <p className="type-body mt-4">{person.summary}</p>
            </li>
          ))}
        </ul>
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
