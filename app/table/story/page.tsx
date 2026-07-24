import { Sparkles, Heart, Users } from "lucide-react";
import { STORY } from "@/lib/data/story";

export default function TableStoryPage() {
  return (
    <article className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Heritage & Roots</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            The Founder&apos;s Story
          </h1>
          <div className="mt-2.5 h-1 w-16 sm:w-20 bg-amber-500 rounded-full" />
        </div>

        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
          Discover the culinary journey, family passion, and traditions behind
          Nairobi&apos;s beloved lakefront institution.
        </p>
      </div>

      {/* Founder Featured Card */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Heart className="h-4 w-4 fill-amber-400/20 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Our Matriarch
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-400">
          {STORY.founder.name}
        </h2>
        <p className="text-white/60 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-0.5">
          {STORY.founder.role}
        </p>

        <p className="text-white/90 mt-4 leading-relaxed text-sm sm:text-base">
          {STORY.founder.summary}
        </p>
      </section>

      {/* Family Legacy Grid */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-white">
          <Users className="h-5 w-5 text-amber-400 shrink-0" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Family Legacy
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {STORY.family.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-amber-500/40"
            >
              <p className="font-display text-lg sm:text-xl font-bold text-white">
                {p.name}
              </p>
              <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 mt-1">
                {p.role}
              </span>
              <p className="text-white/70 mt-3 leading-relaxed text-xs sm:text-sm">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
