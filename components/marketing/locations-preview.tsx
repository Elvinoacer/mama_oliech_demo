import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { LocationCard } from "@/components/locations/location-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function LocationsPreview() {
  const branches = getActiveBranches();

  return (
    <Section
      eyebrow="Our Locations"
      title="Find a Table Near You"
      className="py-12 sm:py-20 lg:py-24 bg-[var(--surface-elevated)] border-b border-[var(--border)]"
    >
      {/* Locations Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {branches.map((branch) => (
          <LocationCard key={branch.slug} branch={branch} />
        ))}
      </div>

      {/* Centered Responsive CTA */}
      <div className="mt-8 sm:mt-12 flex justify-center">
        <Button
          href="/locations"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto justify-center shadow-sm hover:shadow-md transition-all text-xs sm:text-sm font-bold"
        >
          <MapPin className="h-4 w-4 mr-1.5 text-[var(--brand-accent)] shrink-0" />
          <span>View All Locations & Hours</span>
          <ArrowRight className="h-4 w-4 ml-1.5 shrink-0" />
        </Button>
      </div>
    </Section>
  );
}
