/**
 * Per-branch detail page.
 *
 * TODO:
 * - generateStaticParams from active branches.
 * - Embed map, full hours table, reservation CTA, delivery buttons.
 * - Branch-specific menu PDF.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveBranches, getBranchBySlug } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

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

  // Public site: hide closed branches even if slug is guessed
  if (!branch || branch.status !== "active") notFound();

  return (
    <Section eyebrow={branch.label ?? "Branch"} title={branch.name}>
      <div className="max-w-xl space-y-4 text-sm">
        <p className="opacity-80">
          {branch.addressLine}
          <br />
          {branch.area}, {branch.city}
        </p>

        <div>
          <p className="font-medium">Hours</p>
          <ul className="mt-1 opacity-70">
            {(branch.hours ?? []).map((h) => (
              <li key={h.days}>
                {h.days}: {h.open}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-xs opacity-50">TODO: verify hours before launch</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {/* TODO: real map / tel / delivery URLs */}
          <Button href="/visit" variant="primary">
            Plan visit
          </Button>
          {branch.qrPath ? (
            <Button href={branch.qrPath} variant="secondary">
              Table QR portal
            </Button>
          ) : null}
        </div>

        {/* internalNotes must never render publicly */}
      </div>
    </Section>
  );
}
