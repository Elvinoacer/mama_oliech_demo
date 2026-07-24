import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Utensils, ArrowRight } from "lucide-react";

interface MenuItemCard {
  title: string;
  category: string;
  badge?: string;
  desc: string;
  image: string;
  tag: string;
}

const POPULAR_ITEMS: MenuItemCard[] = [
  {
    title: "Whole Deep-Fried Tilapia",
    category: "Catch of the Day",
    badge: "Most Popular",
    desc: "Crispy fried whole fish with salt & pepper crust, white ugali, kachumbari & greens.",
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
    tag: "Fresh Daily",
  },
  {
    title: "Wet-Fry Tilapia Stew",
    category: "Kitchen Specialty",
    badge: "Chef's Choice",
    desc: "Simmered in rich red vine-ripe tomato, onion & coriander reduction gravy.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
    tag: "Saucy & Rich",
  },
  {
    title: "Creamy Osuga & Managu Greens",
    category: "Indigenous Side",
    badge: "Heritage Recipe",
    desc: "Bitter African nightshade & Osuga mellowed with rich country cream.",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    tag: "Nutrient-Packed",
  },
  {
    title: "Aliya Sun-Dried Beef",
    category: "Luo Heritage",
    badge: "Traditional",
    desc: "Cured sun-dried beef pan-seared with sweet onions and red tomatoes.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80",
    tag: "Savory Delight",
  },
  {
    title: "Kenyan Dawa Cocktail",
    category: "Craft Drinks",
    badge: "Bar Favorite",
    desc: "Vodka, fresh lime wheels, honey stick stirrer, and crushed ice.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    tag: "Refreshing",
  },
];

export function MenuTicker() {
  return (
    <Section
      eyebrow="Nairobi's Favorite Dishes"
      title="Popular Culinary Delicacies"
      className="bg-[var(--surface-elevated)] py-12 sm:py-20 lg:py-24 border-b border-[var(--border)]"
    >
      {/* Mobile Horizontal Snap Carousel -> Desktop Grid */}
      <div className="flex sm:grid overflow-x-auto sm:overflow-visible gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {POPULAR_ITEMS.map((item, index) => (
          <article
            key={index}
            className="snap-center shrink-0 w-[82vw] max-w-[320px] sm:w-auto group flex flex-col rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Header */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {item.badge && (
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-amber-500 text-slate-950 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                  {item.badge}
                </div>
              )}

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[11px] sm:text-xs">
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-white/20 font-semibold truncate max-w-[60%]">
                  {item.category}
                </span>
                <span className="font-bold text-amber-300 flex items-center gap-1 shrink-0">
                  <Sparkles className="h-3 w-3" />
                  <span className="truncate">{item.tag}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <Button
                  href="/menu"
                  variant="ghost"
                  className="text-xs font-bold text-[var(--brand-accent)] hover:text-[var(--brand-primary)] p-1.5 h-auto -mr-1.5 rounded-lg hover:bg-amber-500/10 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </article>
        ))}

        {/* Bonus CTA card in the grid */}
        <div className="snap-center shrink-0 w-[82vw] max-w-[320px] sm:w-auto relative overflow-hidden flex flex-col justify-center items-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#25150d] to-[#120905] text-white border border-amber-900/40 shadow-xl space-y-3 sm:space-y-4 group">
          <Image
            src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80"
            alt="Mama Oliech Menu Background"
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-20 filter saturate-150 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#25150d]/80 via-[#180e08]/90 to-[#120905]" />

          <div className="relative z-10 space-y-3 sm:space-y-4 flex flex-col items-center">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-lg">
              <Utensils className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
              Full Restaurant Menu
            </h3>
            <p className="text-xs text-amber-100/80 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Explore our complete offerings including catch-weight fish
              portions, traditional Luo indigenous greens, ugali varieties, cold
              drinks, and group packages.
            </p>
            <Button
              href="/menu"
              size="lg"
              className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 border-none transition-all w-full shadow-lg text-xs sm:text-sm"
            >
              <span>Explore Complete Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
