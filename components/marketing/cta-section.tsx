import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar, PhoneCall, Sparkles } from "lucide-react";
import { CTA_IMAGE } from "@/lib/data/unsplash";

export function CtaSection() {
  return (
    <Section className="relative overflow-hidden bg-[#120804] text-white py-14 sm:py-20 lg:py-28 border-t border-amber-900/50">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={CTA_IMAGE.src}
          alt={CTA_IMAGE.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#180e08] via-[#140b06]/95 to-[#0e0603]" />
      </div>

      {/* Ambient Glow Effect */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-amber-500/20 blur-[80px] sm:blur-[120px]" />

      <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/40 px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 shadow-md backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 shrink-0" />
          <span>Unforgettable Dining Awaits</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight sm:leading-[1.1] text-balance">
          Ready to Experience Nairobi’s Legendary{" "}
          <span className="text-amber-400 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Tilapia Feast
          </span>
          ?
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-base lg:text-lg text-amber-100/90 leading-relaxed font-normal">
          Whether you’re joining us for lunch at Hurlingham, hosting a family
          celebration, or ordering fresh hot fish delivered right to your door —
          we’re ready to serve you with heart.
        </p>

        {/* Responsive Action Buttons Stack */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <Button
            href="/visit"
            size="lg"
            className="w-full sm:w-auto justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/20 border-none transition-all duration-300"
          >
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span>Plan Your Visit</span>
          </Button>

          <Button
            href="/catering"
            size="lg"
            variant="outline"
            className="w-full sm:w-auto justify-center border-amber-500/40 text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 font-bold"
          >
            <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
            <span>Catering & Groups</span>
          </Button>

          <Button
            href="/contact"
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto justify-center border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold"
          >
            <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
            <span>Get in Touch</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
