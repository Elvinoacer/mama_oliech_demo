import { STORY } from "@/lib/data/story";

export default function TableStoryPage() {
  return (
    <article className="space-y-8">
      <h1 className="type-page-title !text-[length:var(--step-4)]">
        The founder&apos;s story
      </h1>
      <section>
        <h2 className="font-display text-2xl font-semibold text-[var(--brand-primary)]">
          {STORY.founder.name}
        </h2>
        <p className="type-body mt-1">{STORY.founder.role}</p>
        <p className="type-lead mt-4 !max-w-none">{STORY.founder.summary}</p>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Family</h2>
        {STORY.family.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="font-display text-xl font-semibold">{p.name}</p>
            <p className="type-caption mt-1">{p.role}</p>
            <p className="type-body mt-3">{p.summary}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
