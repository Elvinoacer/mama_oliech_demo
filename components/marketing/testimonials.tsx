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
      className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--surface)] py-16 sm:py-24"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((rev) => (
          <div
            key={rev.name}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[var(--brand-accent)]/40 hover:shadow-md"
          >
            <div>
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                  <Image
                    src={rev.imageSrc}
                    alt={rev.imageAlt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  {rev.brandLabel ? (
                    <span className="absolute inset-x-0 bottom-0 bg-red-600 py-0.5 text-center text-[9px] font-black tracking-wide text-white">
                      {rev.brandLabel}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-amber-500/20" />
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[var(--foreground)] italic sm:text-base">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
              <div className="min-w-0">
                <h4 className="font-display text-base font-bold text-[var(--brand-primary)]">
                  {rev.name}
                </h4>
                <p className="text-xs font-medium text-[var(--muted)]">{rev.role}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircle className="h-3 w-3" />
                {rev.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
