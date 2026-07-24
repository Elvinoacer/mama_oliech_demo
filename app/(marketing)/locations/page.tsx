import type { Metadata } from "next";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { LocationCard } from "@/components/locations/location-card";
import { MapPin, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Mama Oliech Restaurant branches in Nairobi — Hurlingham and Kiambu Road.",
};

export default function LocationsPage() {
  const branches = getActiveBranches();

  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      <Section eyebrow="Locations" title="Our branches">
        {/* Lead Text & Dynamic Tip */}
        <div className="space-y-4 mb-8 sm:mb-10 max-w-3xl">
          <p className="type-lead text-base sm:text-lg text-[var(--foreground)]/90 leading-relaxed !max-w-none">
            Only currently active locations are listed below. Operating hours,
            sit-down capacity, and delivery partners can vary by branch—please
            confirm before travelling.
          </p>

          <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-xs font-medium text-[var(--muted)] shadow-xs">
            <Info className="h-4 w-4 text-[var(--brand-primary)] shrink-0" />
            <span>
              Select any branch card below for interactive maps, contact info,
              and delivery links.
            </span>
          </div>
        </div>

        {/* Branch Cards Grid */}
        {branches.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {branches.map((branch) => (
              <LocationCard key={branch.slug} branch={branch} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center space-y-2">
            <MapPin className="h-8 w-8 text-[var(--muted)] mx-auto" />
            <p className="text-sm font-semibold text-[var(--foreground)]">
              No active branches found
            </p>
            <p className="text-xs text-[var(--muted)]">
              Please check back later or reach out to our direct customer
              support.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
