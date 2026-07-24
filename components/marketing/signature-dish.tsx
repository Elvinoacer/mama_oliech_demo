"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  Sparkles,
  Utensils,
  CheckCircle2,
  ArrowRight,
  Flame,
  HeartHandshake,
} from "lucide-react";

interface DishItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  pairings: string[];
  image: string;
  highlight: string;
}

const FEATURED_DISHES: DishItem[] = [
  {
    id: "fried-tilapia",
    name: "Whole Crisp-Fried Tilapia",
    badge: "House Signature",
    description:
      "Lake Victoria whole tilapia deep-fried in sizzling oil until golden and crispy on the outside, moist and tender on the inside. Served with steaming ugali, fresh kachumbari, and indigenous greens.",
    pairings: [
      "White or Brown Millet Ugali",
      "Spicy Kachumbari",
      "Sautéed Managu",
    ],
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
    highlight: "Sized fresh in kitchen daily · Catch-weight",
  },
  {
    id: "wet-fry-tilapia",
    name: "Wet-Fry Tilapia Stew",
    badge: "Saucy Favorite",
    description:
      "Gently deep-fried whole fish simmered in a fragrant, thick tomato, onion, sweet pepper, garlic & coriander gravy. Rich, comforting, and packed with Western Kenyan home flavors.",
    pairings: ["Warm Corn Ugali", "Osuga with Cream", "Cold Local Lager"],
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
    highlight: "Simmered to order in tomato reduction",
  },
  {
    id: "greens-ugali",
    name: "Traditional Indigenous Greens & Ugali",
    badge: "Cultural Staples",
    description:
      "Authentic Western Kenyan greens cooked with heritage techniques: bitter Osuga mellowed with rich cream, dark Managu, Kunde, and Mitoo served alongside soft brown millet or corn ugali.",
    pairings: ["Creamy Osuga", "Nightshade Managu", "Cowpea Kunde"],
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    highlight: "Sourced directly from local farmers",
  },
  {
    id: "beef-aliya",
    name: "Aliya (Sun-Dried Fried Beef)",
    badge: "Luo Heritage",
    description:
      "Traditional Luo delicacy: salt-cured and sun-dried beef strips pan-fried with caramelized onions and vine-ripened tomatoes until deeply savory and tender.",
    pairings: ["Hot Ugali", "Fresh Chili Slaw", "Dawa Cocktail"],
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80",
    highlight: "Heritage curing technique passed down generations",
  },
  {
    id: "dawa-cocktail",
    name: "Kenyan Dawa & Crafted Refreshers",
    badge: "Bar Favorite",
    description:
      "The classic Kenyan Dawa cocktail made with premium vodka, fresh lime wedges, honey stick, and crushed ice, alongside fresh passionfruit juices and ice-cold local beers.",
    pairings: ["Tusker Lager", "Fresh Passion Juice", "Ginger Dawa"],
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    highlight: "Hand-muddled with natural honey & fresh lime",
  },
];

export function SignatureDish() {
  const [activeDish, setActiveDish] = useState<DishItem>(FEATURED_DISHES[0]);

  return (
    <Section
      eyebrow="A Taste of Authentic Perfection"
      title="Our Signature Culinary Creations"
      className="bg-gradient-to-b from-[var(--surface)] via-[#fdf8f2] to-[var(--background)] py-12 sm:py-20 lg:py-24"
    >
      {/* Dish Selector Tabs - Mobile Edge Bleed & Snap Scrolling */}
      <div className="relative mb-8 sm:mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-[var(--border)]">
          {FEATURED_DISHES.map((dish) => {
            const isActive = activeDish.id === dish.id;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveDish(dish)}
                className={`snap-start shrink-0 inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-primary)]/20 ring-2 ring-[var(--brand-primary)]/30"
                    : "bg-white text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-slate-50 border border-[var(--border)]"
                }`}
              >
                <div className="relative h-5 w-5 sm:h-6 sm:w-6 shrink-0 overflow-hidden rounded-full border border-white/40 shadow-sm">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span>{dish.name}</span>
                {isActive && (
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-300 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Display Grid */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center xl:gap-12">
        {/* Left: Interactive Image Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border)] shadow-xl sm:shadow-2xl group">
            <Image
              key={activeDish.id}
              src={activeDish.image}
              alt={activeDish.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />

            {/* Badge on Image */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-amber-500 text-slate-950 font-bold text-[10px] sm:text-xs uppercase px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5">
              <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950 shrink-0" />
              <span>{activeDish.badge}</span>
            </div>

            {/* Bottom Highlight */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-black/65 backdrop-blur-md border border-white/20 p-2.5 sm:p-3.5 rounded-xl text-white">
              <p className="text-[11px] sm:text-xs text-amber-300 font-semibold flex items-center gap-1.5 leading-snug">
                <HeartHandshake className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">{activeDish.highlight}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Dish Specs & Narrative */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)]">
              Featured Specialty
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--brand-primary)] mt-1 leading-tight">
              {activeDish.name}
            </h3>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-[var(--muted)] leading-relaxed">
            {activeDish.description}
          </p>

          {/* Key Pairings */}
          <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <Utensils className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--brand-accent)] shrink-0" />
              Recommended Pairings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeDish.pairings.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-[var(--border)] shadow-sm text-xs font-medium text-[var(--foreground)]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              href="/menu"
              size="lg"
              className="w-full sm:w-auto justify-center shadow-md"
            >
              <span>View Full Menu</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>

            <Button
              href="/visit#delivery"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto justify-center"
            >
              Order This Dish
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
