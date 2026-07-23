/**
 * Founder's story — QR portal version (shorter, mobile).
 */

import { STORY } from "@/lib/data/story";

export default function TableStoryPage() {
  return (
    <article className="space-y-6">
      <h1 className="text-xl font-semibold">The founder&apos;s story</h1>
      <section>
        <h2 className="font-medium">{STORY.founder.name}</h2>
        <p className="text-sm opacity-60">{STORY.founder.role}</p>
        <p className="mt-3 text-sm leading-relaxed opacity-90">
          {STORY.founder.summary}
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="font-medium">Family</h2>
        {STORY.family.map((p) => (
          <div key={p.name}>
            <p className="font-medium">{p.name}</p>
            <p className="text-xs opacity-60">{p.role}</p>
            <p className="mt-1 text-sm opacity-80">{p.summary}</p>
          </div>
        ))}
      </section>
      <p className="text-xs opacity-50">
        TODO: short video module for staff training reuses this narrative.
      </p>
    </article>
  );
}
