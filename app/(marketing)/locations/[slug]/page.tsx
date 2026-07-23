import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveBranches, getBranchBySlug } from "@/lib/data/locations";
import { isLiveLink } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

const CHANNEL_LABEL: Record<string, string> = {
  "uber-eats": "Order on Uber Eats",
  "bolt-food": "Order on Bolt Food",
};

export async function generateStaticParams() {
  return getActiveBranches().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch || branch.status !== "active") return { title: "Location" };
  return {
    title: branch.name,
    description: `${branch.addressLine}, ${branch.city}`,
  };
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch || branch.status !== "active") notFound();

  const deliveryEntries = Object.entries(branch.deliveryLinks ?? {}).filter(
    ([, url]) => isLiveLink(url),
  );

  return (
    <Section eyebrow={branch.label ?? "Branch"} title={branch.name}>
      <div className="max-w-xl space-y-8">
        <p className="type-lead !max-w-none">
          {branch.addressLine}
          <br />
          {branch.area}, {branch.city}
        </p>

        <div>
          <p className="text-lg font-semibold">Hours</p>
          <ul className="type-body mt-2 space-y-1.5">
            {(branch.hours ?? []).map((h) => (
              <li key={h.days}>
                {h.days}: {h.open}
                {h.notes ? (
                  <span className="type-caption mt-1 block">{h.notes}</span>
                ) : null}
              </li>
            ))}
          </ul>
          {branch.hoursUnconfirmed ? (
            <p className="mt-3 text-base font-medium text-[var(--brand-accent)]">
              Hours not yet confirmed with the restaurant — please call or message
              before a special trip.
            </p>
          ) : null}
        </div>

        {deliveryEntries.length > 0 ? (
          <div>
            <p className="text-lg font-semibold">Delivery</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {deliveryEntries.map(([channel, url]) => (
                <Button key={channel} href={url!} variant="secondary" external>
                  {CHANNEL_LABEL[channel] ?? channel}
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          {branch.mapUrl ? (
            <Button href={branch.mapUrl} external size="lg">
              Get directions
            </Button>
          ) : null}
          <Button href="/visit" variant="secondary" size="lg">
            Plan visit
          </Button>
          {branch.qrPath ? (
            <Button href={branch.qrPath} variant="ghost" size="lg">
              Table QR portal
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
