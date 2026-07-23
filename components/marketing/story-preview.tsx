import Image from "next/image";
import { STORY } from "@/lib/data/story";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Globe2, ArrowRight, Award, Flame } from "lucide-react";

export function StoryPreview() {
  return (
    <section className="relative bg-[#140b06] text-white overflow-hidden">

      {/* ── Full-width cinematic image banner ── */}
      <div className="relative w-full h-[50vh] min-h-[360px] max-h-[520px]">
        <Image
          src="/images/locations/restaurant-dining-vibe.jpg"
          alt="The warm, candlelit dining room at Mama Oliech Restaurant"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Gradient fade into content area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#140b06]" />

        {/* Badge overlay */}
        <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full glass-panel-dark px-4 py-2 border border-amber-500/40 text-xs font-bold text-amber-300 shadow-xl">
          <Award className="h-4 w-4 text-amber-400" />
          <span>Nairobi Hospitality Legend</span>
        </div>

        {/* Zuckerberg quote — overlapping bottom edge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl translate-y-1/2 z-10">
          <div className="glass-panel-dark p-5 rounded-2xl border border-amber-500/40 shadow-2xl flex items-start gap-4">
            <Globe2 className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">Celebrity Visit</p>
              <p className="text-sm text-amber-100/90 leading-relaxed italic">
                "When Mark Zuckerberg visited Nairobi, he came to Mama Oliech and ate whole tilapia with his hands — calling it the best meal of his African tour."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <Container className="relative z-10 pt-24 pb-16 sm:pb-20">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-amber-600/10 blur-[100px]" />

        {/* Eyebrow + Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-amber-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 flex items-center justify-center gap-2">
            <Flame className="h-4 w-4 text-amber-500" />
            Our Heritage & Legacy
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            The Woman Behind Nairobi&apos;s Greatest Taste
          </h2>
        </div>

        {/* Two-column compact text + stats */}
        <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">

          {/* Left: Story narrative */}
          <div className="space-y-4">
            <p className="text-base text-amber-50/95 leading-relaxed">
              {STORY.founder.summary}
            </p>
            <p className="text-sm text-amber-100/75 leading-relaxed">
              Nurtured alongside her son, Harambee Stars football legend Dennis Oliech, the restaurant remains a living cultural sanctuary — a place where heads of state, global tech leaders, and local families gather to pinch ugali and share the exact same table.
            </p>
          </div>

          {/* Right: Stats + CTA */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "40+", label: "Years of Heritage" },
                { value: "1M+", label: "Fish Served" },
                { value: "100%", label: "Lake Victoria Catch" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white/5 border border-amber-500/20 rounded-2xl p-4">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-[11px] text-amber-200/70 font-semibold mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button
              href="/about"
              size="lg"
              className="w-full sm:w-auto bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-xl shadow-amber-500/20 border-none transition-all duration-300"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}
