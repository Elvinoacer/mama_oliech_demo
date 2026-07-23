/**
 * About / Our Story page.
 * Source: website content §2
 *
 * TODO:
 * - Family-approved long-form copy + photos.
 * - Timeline component (founding → expansion → Lilian leadership).
 * - Celebrity section with rights-cleared imagery.
 */

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
        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-4 text-base leading-relaxed opacity-90">
            <p>{STORY.founder.summary}</p>
            <p className="text-sm opacity-60">
              TODO: warm anecdote — how Mama Oliech got her start / favorite guest phrase.
            </p>
          </div>
          <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-foreground/20 text-sm opacity-50">
            {/* TODO: founder portrait */}
            Portrait placeholder
          </div>
        </div>
      </Section>

      <Section eyebrow="Family" title="A legacy on and off the pitch">
        <ul className="grid gap-4 sm:grid-cols-2">
          {STORY.family.map((person) => (
            <li
              key={person.name}
              className="rounded-xl border border-foreground/10 p-5"
            >
              <h3 className="font-semibold">{person.name}</h3>
              <p className="text-sm opacity-60">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                {person.summary}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Guests" title="Who's pulled up a chair">
        <CelebrityWall guests={STORY.celebrities} />
      </Section>
    </>
  );
}
