import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Star, Quote, CheckCircle } from "lucide-react";
import { TESTIMONIAL_IMAGES } from "@/lib/data/unsplash";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional brand mark for press cards (e.g. CNN) */
  brandLabel?: string;
}

const REVIEWS: Testimonial[] = [
  {
    name: "Mark Zuckerberg",
    role: "CEO, Meta",
    quote:
      "I ate lunch at Mama Oliech Restaurant in Nairobi — had whole fried tilapia with ugali and traditional greens, ate it with my hands like a true Kenyan. Delicious!",
    rating: 5,
    location: "Global Guest",
    imageSrc: TESTIMONIAL_IMAGES.zuckerberg.src,
    imageAlt: TESTIMONIAL_IMAGES.zuckerberg.alt,
  },
  {
    name: "CNN Travel & Food",
    role: "International Press Feature",
    quote:
      "Mama Oliech is a legendary Nairobi culinary sanctuary where whole Lake Victoria tilapia is fried to golden perfection, served with steaming ugali and authentic local greens.",
    rating: 5,
    location: "Nairobi Guide",
    imageSrc: TESTIMONIAL_IMAGES.cnn.src,
    imageAlt: TESTIMONIAL_IMAGES.cnn.alt,
    brandLabel: "CNN",
  },
  {
    name: "Chef & Food Critic",
    role: "East Africa Gourmet Review",
    quote:
      "The wet-fry tilapia in tomato-garlic stew is easily one of the top 5 seafood experiences in Kenya. Unmatched flavor, generosity, and cultural pride.",
    rating: 5,
    location: "Hurlingham Branch",
    imageSrc: TESTIMONIAL_IMAGES.chef.src,
    imageAlt: TESTIMONIAL_IMAGES.chef.alt,
  },
];

export function TestimonialsSection() {
  return (
    <Section
      eyebrow="What Guests Say"
      title="Loved by World Leaders & Local Foodies"
      className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--surface)] py-12 sm:py-20 lg:py-24"
    >
      {/* Mobile Touch Snap Carousel -> Tablet & Desktop Grid */}
      <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 sm:gap-6 md:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none pb-4 md:pb-0">
        {REVIEWS.map((rev) => (
          <article
            key={rev.name}
            className="snap-center shrink-0 w-[85vw] max-w-[340px] md:w-auto flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-white p-4 sm:p-6 lg:p-7 shadow-sm transition-all duration-300 hover:border-[var(--brand-accent)]/40 hover:shadow-md"
          >
            <div>
              {/* Header: Avatar, Brand Badge, Stars & Quote Icon */}
              <div className="mb-4 sm:mb-5 flex items-start justify-between gap-3">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                  <Image
                    src={rev.imageSrc}
                    alt={rev.imageAlt}
                    fill
                    sizes="(max-width: 640px) 48px, 56px"
                    className="object-cover"
                  />
                  {rev.brandLabel ? (
                    <span className="absolute inset-x-0 bottom-0 bg-red-600 py-0.5 text-center text-[8px] sm:text-[9px] font-black tracking-wide text-white uppercase">
                      {rev.brandLabel}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 shrink-0"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500/20 shrink-0" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[var(--foreground)] italic">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            {/* Footer: Author Info & Verified Location Pill */}
            <div className="mt-5 sm:mt-6 flex items-center justify-between gap-2.5 border-t border-stone-100 pt-3.5 sm:pt-4">
              <div className="min-w-0">
                <h4 className="font-display text-xs sm:text-sm lg:text-base font-bold text-[var(--brand-primary)] truncate">
                  {rev.name}
                </h4>
                <p className="text-[11px] sm:text-xs font-medium text-[var(--muted)] truncate">
                  {rev.role}
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                <CheckCircle className="h-3 w-3 shrink-0" />
                <span className="truncate">{rev.location}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
