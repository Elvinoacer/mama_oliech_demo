import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTrainingModule, TRAINING_MODULES } from "@/lib/data/training";

type Props = { params: Promise<{ module: string }> };

const MODULE_IMAGES: Record<string, string> = {
  founders: "/images/locations/restaurant-dining-vibe.jpg",
  "menu-mastery": "/images/food/hero-tilapia-feast.jpg",
  hospitality: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  "digital-tools": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
};

export function generateStaticParams() {
  return TRAINING_MODULES.map((m) => ({ module: m.slug }));
}

export default async function TrainingModulePage({ params }: Props) {
  const { module: mod } = await params;
  const data = getTrainingModule(mod);
  if (!data) notFound();

  const idx = TRAINING_MODULES.findIndex((m) => m.slug === mod);
  const prev = idx > 0 ? TRAINING_MODULES[idx - 1] : null;
  const next = idx < TRAINING_MODULES.length - 1 ? TRAINING_MODULES[idx + 1] : null;
  const bannerImg = MODULE_IMAGES[mod];

  return (
    <article className="space-y-8">
      {bannerImg ? (
        <div className="relative aspect-[21/8] w-full overflow-hidden rounded-2xl border border-[var(--border)] shadow-md">
          <Image
            src={bannerImg}
            alt={data.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ) : null}

      <div>
        <p className="type-eyebrow">
          Module {idx + 1} of {TRAINING_MODULES.length}
        </p>
        <h2 className="type-page-title mt-2 !text-[length:var(--step-4)]">
          {data.title}
        </h2>
        <p className="type-lead mt-3 !max-w-none">{data.summary}</p>
      </div>

      <div className="space-y-4">
        {data.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          >
            <h3 className="font-display text-xl font-semibold">{section.heading}</h3>
            <p className="type-body mt-3">{section.body}</p>
          </section>
        ))}
      </div>

      <nav className="flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-6 text-base font-semibold">
        {prev ? (
          <Link
            href={`/staff/training/${prev.slug}`}
            className="text-[var(--brand-primary)] underline-offset-2 hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/staff/training/${next.slug}`}
            className="text-[var(--brand-primary)] underline-offset-2 hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <Link href="/staff" className="underline-offset-2 hover:underline">
            Back to modules
          </Link>
        )}
      </nav>
    </article>
  );
}
