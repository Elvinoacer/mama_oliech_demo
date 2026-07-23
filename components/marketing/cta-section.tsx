import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar, PhoneCall, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <Section className="relative overflow-hidden bg-[#120804] text-white py-20 lg:py-28 border-t border-amber-900/50">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/food/hero-tilapia-feast.jpg"
          alt="Mama Oliech Food Background"
          fill
          sizes="100vw"
          className="object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#180e08] via-[#140b06]/95 to-[#0e0603]" />
      </div>

      {/* Glow effect */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/20 blur-[130px] animate-pulse-glow" />

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-md backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
          <span>Unforgettable Dining Awaits</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Ready to Experience Nairobi’s Legendary <br />
          <span className="text-gold-gradient">Tilapia Feast</span>?
        </h2>

        <p className="text-lg sm:text-xl text-amber-100/90 leading-relaxed font-normal">
          Whether you’re joining us for lunch at Hurlingham, hosting a family celebration, or ordering fresh hot fish delivered right to your door — we’re ready to serve you with heart.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Button
            href="/visit"
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 border-none transition-all duration-300 hover:scale-105"
          >
            <Calendar className="h-5 w-5" />
            <span>Plan Your Visit</span>
          </Button>

          <Button
            href="/catering"
            size="lg"
            className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:scale-105 font-bold"
          >
            <Utensils className="h-5 w-5 text-amber-400" />
            <span>Catering & Groups</span>
          </Button>

          <Button
            href="/contact"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 font-semibold"
          >
            <PhoneCall className="h-5 w-5 text-amber-400" />
            <span>Get in Touch</span>
          </Button>
        </div>
      </div>
    </Section>
  );
}


