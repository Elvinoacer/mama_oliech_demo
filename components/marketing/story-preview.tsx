import Image from "next/image";
import { STORY } from "@/lib/data/story";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CELEBRITY_IMAGES, ABOUT_IMAGES } from "@/lib/data/unsplash";
import { ArrowRight, Award, Flame } from "lucide-react";

export function StoryPreview() {
  return (
    <section className="relative bg-[#140b06] text-white overflow-hidden">
      {/* ── Full-width cinematic image banner ── */}
      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[480px] sm:h-[50vh] sm:min-h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80"
          alt="The warm, candlelit dining room at Mama Oliech Restaurant"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Gradient fade into content area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#140b06]" />

        {/* Badge overlay */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass-panel-dark px-3 py-1.5 sm:px-4 sm:py-2 border border-amber-500/40 text-[10px] sm:text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
          <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" />
          <span>Nairobi Hospitality Legend</span>
        </div>

        {/* Zuckerberg quote — overlapping bottom edge with mobile-safe padding */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl translate-y-1/2 z-10">
          <div className="glass-panel-dark p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-500/40 shadow-2xl flex items-start gap-3 sm:gap-4 backdrop-blur-md">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-lg">
              <Image
                src={CELEBRITY_IMAGES["Mark Zuckerberg"].src}
                alt={CELEBRITY_IMAGES["Mark Zuckerberg"].alt}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 mb-0.5 sm:mb-1">
                Celebrity Visit
              </p>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-snug sm:leading-relaxed italic line-clamp-3 sm:line-clamp-none">
                "When Mark Zuckerberg visited Nairobi, he came to Mama Oliech
                and ate whole tilapia with his hands — calling it the best meal
                of his African tour."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <Container className="relative z-10 pt-20 sm:pt-28 pb-12 sm:pb-20">
        {/* Ambient glow - GPU performance optimized */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 sm:h-64 w-[300px] sm:w-[600px] rounded-full bg-amber-600/10 blur-[80px] sm:blur-[100px]" />

        {/* Eyebrow + Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <p className="text-amber-400 font-bold uppercase tracking-widest text-[11px] sm:text-sm mb-2 sm:mb-3 flex items-center justify-center gap-1.5 sm:gap-2">
            <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 shrink-0" />
            <span>Our Heritage & Legacy</span>
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            The Woman Behind Nairobi&apos;s Greatest Taste
          </h2>
        </div>

        {/* Two-column compact text + stats */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Left: Story narrative + founder portrait */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex gap-3.5 sm:gap-5 items-center">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-amber-500/30 shadow-lg">
                <Image
                  src={ABOUT_IMAGES.founder.src}
                  alt={ABOUT_IMAGES.founder.alt}
                  fill
                  sizes="(max-width: 640px) 64px, 96px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 mb-0.5 sm:mb-1">
                  Founder
                </p>
                <p className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                  Mary Auma Oliech
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-amber-50/95 leading-relaxed">
              {STORY.founder.summary}
            </p>
            <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed">
              Nurtured alongside her son, Harambee Stars football legend Dennis
              Oliech, the restaurant remains a living cultural sanctuary — a
              place where heads of state, global tech leaders, and local
              families gather to pinch ugali and share the exact same table.
            </p>
          </div>

          {/* Right: Stats + CTA */}
          <div className="space-y-5 sm:space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { value: "40+", label: "Years of Heritage" },
                { value: "1M+", label: "Fish Served" },
                { value: "100%", label: "Lake Victoria Catch" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-white/5 border border-amber-500/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 backdrop-blur-sm"
                >
                  <p className="font-display text-xl sm:text-3xl font-bold text-amber-400">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-amber-200/70 font-semibold mt-0.5 sm:mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                href="/about"
                size="lg"
                className="w-full sm:w-auto justify-center bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-xl shadow-amber-500/20 border-none transition-all duration-300 text-xs sm:text-sm"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1.5 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
