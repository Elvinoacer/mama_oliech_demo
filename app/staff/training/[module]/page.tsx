import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { getTrainingModule, TRAINING_MODULES } from "@/lib/data/training";
import { cn } from "@/lib/utils/cn";

type Props = { params: Promise<{ module: string }> };

const MODULE_IMAGES: Record<string, string> = {
  founders:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  "menu-mastery":
    "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1200&q=80",
  hospitality:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  "digital-tools":
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
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
  const next =
    idx < TRAINING_MODULES.length - 1 ? TRAINING_MODULES[idx + 1] : null;
  const bannerImg = MODULE_IMAGES[mod];

  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Navigation & Hub Link */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/staff"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors min-h-[40px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Staff Portal</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>
            Module {idx + 1} of {TRAINING_MODULES.length}
          </span>
        </span>
      </div>

      {/* Hero Banner Header */}
      {bannerImg ? (
        <div className="relative aspect-[16/8] sm:aspect-[21/8] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-md group">
          <Image
            src={bannerImg}
            alt={data.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Mama Oliech Excellence Training</span>
            </span>
          </div>
        </div>
      ) : null}

      {/* Module Overview Header */}
      <div className="space-y-3">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
          {data.title}
        </h1>
        <p className="type-lead text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          {data.summary}
        </p>
        <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[var(--muted)]">
          <BookOpen className="h-4 w-4 text-[var(--brand-primary)]" />
          <span>
            {data.sections.length} core learning topics in this module
          </span>
        </div>
      </div>

      {/* Module Content Sections */}
      <div className="space-y-4 sm:space-y-6">
        {data.sections.map((section, sIdx) => (
          <section
            key={section.heading}
            className="group rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-7 shadow-2xs transition-all duration-200 hover:border-[var(--brand-primary)]/40"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 text-xs font-black text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 mt-0.5">
                {String(sIdx + 1).padStart(2, "0")}
              </span>
              <div className="space-y-2 flex-1">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {section.heading}
                </h2>
                <p className="type-body text-xs sm:text-sm text-[var(--muted)] leading-relaxed sm:leading-loose whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Module Completion Banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
          Review these guidelines with your supervisor or team lead during your
          daily shift briefing.
        </p>
      </div>

      {/* Next / Prev Step Navigation */}
      <nav
        aria-label="Module navigation"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-[var(--border)] pt-6"
      >
        {prev ? (
          <Link
            href={`/staff/training/${prev.slug}`}
            className={cn(
              "group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition-all duration-200 min-h-[72px]",
              "hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface)] active:scale-[0.99]",
            )}
          >
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Module</span>
            </span>
            <span className="mt-1 font-display text-sm sm:text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/staff/training/${next.slug}`}
            className={cn(
              "group flex flex-col justify-between items-end text-right rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition-all duration-200 min-h-[72px]",
              "hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface)] active:scale-[0.99]",
            )}
          >
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              <span>Next Module</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-1 font-display text-sm sm:text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] line-clamp-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/staff"
            className={cn(
              "group flex flex-col justify-between items-end text-right rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 transition-all duration-200 min-h-[72px]",
              "hover:bg-amber-500/20 active:scale-[0.99]",
            )}
          >
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Finish Training</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 font-display text-sm sm:text-base font-bold text-[var(--foreground)]">
              Return to Portal Hub
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
