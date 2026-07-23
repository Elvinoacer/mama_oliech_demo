import Image from "next/image";
import { BRAND, EXTERNAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { UtensilsCrossed, ShoppingBag, MapPin, Sparkles, Star, Award, Flame } from "lucide-react";
import { CELEBRITY_IMAGES } from "@/lib/data/unsplash";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#25150d] via-[#1a0f09] to-[#120905] text-[#fffdf9] py-16 lg:py-24">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[var(--brand-accent)] opacity-20 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-100px] h-[500px] w-[500px] rounded-full bg-[var(--brand-primary)] opacity-30 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
              <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-300 uppercase">
                Nairobi's Culinary Institution · Est. 1980s
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Taste the World-Famous <br />
              <span className="text-gold-gradient">Lake Victoria Tilapia</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl leading-relaxed font-normal">
              Golden deep-fried whole fish, slow-simmered wet-fry in rich tomato curry, fluffy ugali, and authentic traditional greens cooked the way Mama Oliech always made it.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                href="/menu"
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-600/30 border-none transition-all duration-300 hover:scale-105"
              >
                <UtensilsCrossed className="h-5 w-5" />
                Explore Food Menu
              </Button>

              <Button
                href={EXTERNAL_LINKS.uberEats}
                external
                size="lg"
                className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:scale-105 font-bold"
              >
                <ShoppingBag className="h-5 w-5 text-amber-400" />
                Order Delivery
              </Button>

              <Button
                href="/locations"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 font-semibold"
              >
                <MapPin className="h-5 w-5 text-amber-400" />
                Find Branches
              </Button>
            </div>


            {/* Social Proof / Celebrities ticker */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-4 w-4 text-amber-400" />
                <span className="text-xs uppercase tracking-widest text-amber-200/70 font-semibold">
                  Global Acclaim & Celebrity Visits
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {Object.entries(CELEBRITY_IMAGES).map(([name, img]) => (
                    <div
                      key={name}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-lg transition-transform hover:scale-110 hover:z-10"
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
                <p className="text-sm text-amber-100/80 font-medium italic">
                  "{BRAND.trustBar}"
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Glow behind image */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-700 opacity-50 blur-xl animate-pulse-glow" />

              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-black/80">
                <Image
                  src="/images/food/hero-tilapia-feast.jpg"
                  alt="Authentic Lake Victoria Whole Fried Tilapia Feast at Mama Oliech"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full glass-panel-dark px-3.5 py-1.5 border border-amber-500/40 text-xs font-semibold text-amber-300 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                  <span>Fresh Catch Daily</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel-dark p-4 rounded-2xl border border-amber-500/30 text-white shadow-xl flex items-center justify-between gap-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="h-9 w-9 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center font-bold text-xs">
                        MO
                      </div>
                      <div className="h-9 w-9 rounded-full bg-amber-500 border-2 border-amber-300 flex items-center justify-center text-xs">
                        🐟
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-200">Signature Tilapia Feast</p>
                      <p className="text-xs text-amber-100/70">Ugali + Kachumbari + Greens</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">4.9/5</span>
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

