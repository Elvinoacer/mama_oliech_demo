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
    image: "/images/food/hero-tilapia-feast.jpg",
    tag: "Fresh Daily",
  },
  {
    title: "Wet-Fry Tilapia Stew",
    category: "Kitchen Specialty",
    badge: "Chef's Choice",
    desc: "Simmered in rich red vine-ripe tomato, onion & coriander reduction gravy.",
    image: "/images/food/tilapia-wet-fry.jpg",
    tag: "Saucy & Rich",
  },
  {
    title: "Creamy Osuga & Managu Greens",
    category: "Indigenous Side",
    badge: "Heritage Recipe",
    desc: "Bitter African nightshade & Osuga mellowed with rich country cream.",
    image: "/images/food/traditional-greens-ugali.jpg",
    tag: "Nutrient-Packed",
  },
  {
    title: "Aliya Sun-Dried Beef",
    category: "Luo Heritage",
    badge: "Traditional",
    desc: "Cured sun-dried beef pan-seared with sweet onions and red tomatoes.",
    image: "/images/food/heritage-beef-aliya.jpg",
    tag: "Savory Delight",
  },
  {
    title: "Kenyan Dawa Cocktail",
    category: "Craft Drinks",
    badge: "Bar Favorite",
    desc: "Vodka, fresh lime wheels, honey stick stirrer, and crushed ice.",
    image: "/images/food/dawa-cocktail.jpg",
    tag: "Refreshing",
  },
];

export function MenuTicker() {
  return (
    <Section
      eyebrow="Nairobi's Favorite Dishes"
      title="Popular Culinary Delicacies"
      className="bg-[var(--surface-elevated)] py-16 sm:py-24 border-b border-[var(--border)]"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_ITEMS.map((item, index) => (
          <article
            key={index}
            className="group flex flex-col rounded-3xl border border-[var(--border)] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Header */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {item.badge && (
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {item.badge}
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 font-semibold">
                  {item.category}
                </span>
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {item.tag}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Button href="/menu" variant="ghost" className="text-xs font-bold text-[var(--brand-accent)] hover:text-[var(--brand-primary)] p-0">
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </article>
        ))}

        {/* Bonus CTA card in the grid */}
        <div className="relative overflow-hidden flex flex-col justify-center items-center text-center p-8 rounded-3xl bg-gradient-to-br from-[#25150d] to-[#120905] text-white border border-amber-900/40 shadow-xl space-y-4 group">
          <Image
            src="/images/food/hero-tilapia-feast.jpg"
            alt="Mama Oliech Menu Background"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover opacity-20 filter saturate-150 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#25150d]/80 via-[#180e08]/90 to-[#120905]" />

          <div className="relative z-10 space-y-4 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-lg">
              <Utensils className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Full Restaurant Menu</h3>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              Explore our complete offerings including catch-weight fish portions, traditional Luo indigenous greens, ugali varieties, cold drinks, and group packages.
            </p>
            <Button
              href="/menu"
              size="lg"
              className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 border-none transition-all w-full shadow-lg"
            >
              <span>Explore Complete Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
