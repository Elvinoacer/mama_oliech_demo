import type { Metadata } from "next";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { LocationCard } from "@/components/locations/location-card";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Mama Oliech Restaurant branches in Nairobi — Hurlingham and Kiambu Road.",
};

export default function LocationsPage() {
  const branches = getActiveBranches();

  return (
    <Section eyebrow="Locations" title="Our branches">
      <p className="type-lead mb-10">
        Only open locations are listed. Hours and delivery partners can change —
        confirm before you travel.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {branches.map((branch) => (
          <LocationCard key={branch.slug} branch={branch} />
        ))}
      </div>
    </Section>
  );
}
