import Image from "next/image";
import { BRAND, EXTERNAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Sparkles,
  Star,
  Award,
  Flame,
} from "lucide-react";
import { CELEBRITY_IMAGES } from "@/lib/data/unsplash";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#25150d] via-[#1a0f09] to-[#120905] text-[#fffdf9] py-10 sm:py-16 lg:py-24">
      {/* Ambient background glows - performance-optimized blur sizes on mobile */}
      <div
        className="pointer-events-none absolute -top-30 right-0 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-[var(--brand-accent)] opacity-20 blur-[80px] sm:blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-100px] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[var(--brand-primary)] opacity-30 blur-[100px] sm:blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0 animate-bounce" />
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide sm:tracking-wider text-amber-300 uppercase truncate">
                Nairobi's Culinary Institution · Est. 1980s
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08] text-balance">
              Taste the World-Famous{" "}
              <span className="text-gold-gradient inline-block">
                Lake Victoria Tilapia
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-amber-100/80 max-w-2xl leading-relaxed font-normal">
              Golden deep-fried whole fish, slow-simmered wet-fry in rich tomato
              curry, fluffy ugali, and authentic traditional greens cooked the
              way Mama Oliech always made it.
            </p>

            {/* Responsive Action Buttons */}
            <div className="pt-1 sm:pt-2 w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Primary Action - Full width on Mobile */}
              <Button
                href="/menu"
                size="lg"
                className="w-full sm:w-auto justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-600/30 border-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <UtensilsCrossed className="h-5 w-5 mr-1.5 shrink-0" />
                Explore Food Menu
              </Button>

              {/* Secondary Actions - 2 Column Grid on Mobile, Flex on Desktop */}
              <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center sm:gap-4">
                <Button
                  href={EXTERNAL_LINKS.uberEats}
                  external
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-bold text-xs sm:text-sm px-3 sm:px-6"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5 text-amber-400 shrink-0" />
                  <span>Delivery</span>
                </Button>

                <Button
                  href="/locations"
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold text-xs sm:text-sm px-3 sm:px-6"
                >
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5 text-amber-400 shrink-0" />
                  <span>Branches</span>
                </Button>
              </div>
            </div>

            {/* Social Proof / Celebrities ticker */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-2.5">
                <Award className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-200/70 font-semibold">
                  Global Acclaim & Celebrity Visits
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2.5 sm:-space-x-3 shrink-0">
                  {Object.entries(CELEBRITY_IMAGES).map(([name, img]) => (
                    <div
                      key={name}
                      className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-lg transition-transform hover:scale-110 hover:z-10"
                      title={name}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-amber-100/80 font-medium italic leading-snug">
                  "{BRAND.trustBar}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back Glow behind image */}
              <div className="absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 to-amber-700 opacity-40 sm:opacity-50 blur-lg sm:blur-xl animate-pulse-glow" />

              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 sm:border-2 shadow-2xl shadow-black/80">
                <Image
                  src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80"
                  alt="Authentic Lake Victoria Whole Fried Tilapia Feast at Mama Oliech"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass-panel-dark px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-amber-500/40 text-[10px] sm:text-xs font-semibold text-amber-300 shadow-lg backdrop-blur-md">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 animate-spin" />
                  <span>Fresh Catch Daily</span>
                </div>

                {/* Floating Bottom Card - Scaled for compact mobile viewports */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 glass-panel-dark p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-500/30 text-white shadow-xl flex items-center justify-between gap-2 sm:gap-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex -space-x-2 shrink-0">
                      <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center font-bold text-[10px] sm:text-xs text-white">
                        MO
                      </div>
                      <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-amber-500 border-2 border-amber-300 flex items-center justify-center text-[10px] sm:text-xs">
                        🐟
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-amber-200 truncate">
                        Signature Tilapia Feast
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-100/70 truncate">
                        Ugali + Kachumbari + Greens
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-amber-400/30 shrink-0">
                    <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] sm:text-xs font-bold text-amber-300">
                      4.9/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
