/**
 * Homepage strip of active branches only.
 *
 * TODO: map embed or photo per branch; live hours from lib/data.
 */

import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { LocationCard } from "@/components/locations/location-card";
import { Button } from "@/components/ui/button";

export function LocationsPreview() {
  const branches = getActiveBranches();

  return (
    <Section eyebrow="Locations" title="Find a table">
      <div className="grid gap-4 sm:grid-cols-2">
        {branches.map((branch) => (
          <LocationCard key={branch.slug} branch={branch} />
        ))}
      </div>
      <div className="mt-6">
        <Button href="/locations" variant="secondary">
          All locations
        </Button>
      </div>
    </Section>
  );
}
