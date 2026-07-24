import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { TRAINING_MODULES } from "@/lib/data/training";
import { cn } from "@/lib/utils/cn";

const MODULE_IMAGES: Record<string, string> = {
  founders:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  "menu-mastery":
    "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
  hospitality:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=500&q=80",
  "digital-tools":
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=80",
};

export default function StaffHomePage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome & Overview Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)]">
              Welcome to Staff Onboarding
            </h2>
            <p className="type-body text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Complete each module prior to shift service. Content covers our
              brand history, menu mastery, guest hospitality standards, and
              digital POS tools.
            </p>
          </div>
        </div>
      </div>

      {/* Module Navigation List */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-amber-500" />
          <span>Core Training Modules ({TRAINING_MODULES.length})</span>
        </h3>

        <ul className="space-y-3 sm:space-y-4" role="list">
          {TRAINING_MODULES.map((m, idx) => {
            const imageSrc =
              MODULE_IMAGES[m.slug] ??
              "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80";

            return (
              <li key={m.slug}>
                <Link
                  href={`/staff/training/${m.slug}`}
                  className={cn(
                    "group flex items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5 shadow-2xs transition-all duration-200",
                    "hover:border-[var(--brand-primary)]/50 hover:shadow-md active:scale-[0.99]",
                  )}
                >
                  {/* Module Thumbnail */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-stone-900 border border-[var(--border)]">
                    <Image
                      src={imageSrc}
                      alt={m.title}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-white/10">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content Details */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Module {idx + 1}
                    </span>
                    <h4 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1 leading-snug">
                      {m.title}
                    </h4>
                    <p className="type-body text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  {/* Action Arrow Icon */}
                  <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--muted)] group-hover:bg-[var(--brand-primary)]/10 group-hover:text-[var(--brand-primary)] transition-all">
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
