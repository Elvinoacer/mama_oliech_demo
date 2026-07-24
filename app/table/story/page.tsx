import { STORY } from "@/lib/data/story";

export default function TableStoryPage() {
  return (
    <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
          The founder&apos;s story
        </h1>
        <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
      </div>
      
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h2 className="font-display text-2xl font-semibold text-amber-500">
          {STORY.founder.name}
        </h2>
        <p className="text-white/60 text-sm mt-1 font-medium tracking-wide uppercase">{STORY.founder.role}</p>
        <p className="text-white/90 mt-4 leading-relaxed text-lg">{STORY.founder.summary}</p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-white pl-2">Family Legacy</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {STORY.family.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
            >
              <p className="font-display text-xl font-bold text-white">{p.name}</p>
              <p className="text-amber-500 text-xs mt-1 uppercase tracking-wider font-semibold">{p.role}</p>
              <p className="text-white/70 mt-3 leading-relaxed text-sm">{p.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
