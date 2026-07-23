import { Section } from "@/components/ui/section";
import { Star, Quote, CheckCircle } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
}

const REVIEWS: Testimonial[] = [
  {
    name: "Mark Zuckerberg",
    role: "CEO, Meta",
    quote: "I ate lunch at Mama Oliech Restaurant in Nairobi — had whole fried tilapia with ugali and traditional greens, ate it with my hands like a true Kenyan. Delicious!",
    rating: 5,
    location: "Global Guest",
  },
  {
    name: "CNN Travel & Food",
    role: "International Press Feature",
    quote: "Mama Oliech is a legendary Nairobi culinary sanctuary where whole Lake Victoria tilapia is fried to golden perfection, served with steaming ugali and authentic local greens.",
    rating: 5,
    location: "Nairobi Guide",
  },
  {
    name: "Chef & Food Critic",
    role: "East Africa Gourmet Review",
    quote: "The wet-fry tilapia in tomato-garlic stew is easily one of the top 5 seafood experiences in Kenya. Unmatched flavor, generosity, and cultural pride.",
    rating: 5,
    location: "Hurlingham Branch",
  },
];

export function TestimonialsSection() {
  return (
    <Section
      eyebrow="What Guests Say"
      title="Loved by World Leaders & Local Foodies"
      className="bg-gradient-to-b from-[var(--background)] to-[var(--surface)] py-16 sm:py-24 border-b border-[var(--border)]"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((rev, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--brand-accent)]/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-amber-500/20" />
              </div>

              <p className="text-sm sm:text-base text-[var(--foreground)] italic leading-relaxed">
                "{rev.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-[var(--brand-primary)] text-base">
                  {rev.name}
                </h4>
                <p className="text-xs text-[var(--muted)] font-medium">{rev.role}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
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
