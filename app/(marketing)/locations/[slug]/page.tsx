import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getActiveBranches, getBranchBySlug } from "@/lib/data/locations";
import { isLiveLink } from "@/lib/constants";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  AlertTriangle,
  QrCode,
  Navigation,
  Calendar,
} from "lucide-react";

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
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      <Section eyebrow={branch.label ?? "Branch Location"} title={branch.name}>
        {/* Responsive Hero Banner */}
        {branch.imageSrc ? (
          <div className="group relative -mt-2 mb-8 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-xl bg-stone-900">
            <Image
              src={branch.imageSrc}
              alt={`${branch.name} restaurant`}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md border border-amber-500/30">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>
                  {branch.area}, {branch.city}
                </span>
              </span>
            </div>
          </div>
        ) : null}

        {/* Content Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Address Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Address & Location
              </h3>
              <p className="type-lead text-lg sm:text-xl font-medium text-[var(--foreground)] leading-relaxed">
                {branch.addressLine}
                <br />
                <span className="text-[var(--muted)]">
                  {branch.area}, {branch.city}
                </span>
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[var(--foreground)] border-b border-[var(--border)]/60 pb-3">
                <Clock className="h-5 w-5 text-[var(--brand-primary)] shrink-0" />
                <h3 className="text-base sm:text-lg font-bold">
                  Operating Hours
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm">
                {(branch.hours ?? []).map((h) => (
                  <li
                    key={h.days}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4 py-1 border-b border-[var(--border)]/30 last:border-0"
                  >
                    <span className="font-semibold text-[var(--foreground)]">
                      {h.days}
                    </span>
                    <span className="text-[var(--muted)] font-medium">
                      {h.open}
                    </span>
                    {h.notes ? (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 sm:text-right block w-full">
                        {h.notes}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              {branch.hoursUnconfirmed ? (
                <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                  <p className="leading-relaxed font-medium">
                    Hours not yet confirmed with restaurant staff — please call
                    or message before making a special trip.
                  </p>
                </div>
              ) : null}
            </div>

            {/* Delivery Partners Section */}
            {deliveryEntries.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Doorstep Delivery
                </h3>
                <div className="flex flex-wrap gap-3">
                  {deliveryEntries.map(([channel, url]) => (
                    <Button
                      key={channel}
                      href={url!}
                      variant="secondary"
                      external
                      className="w-full sm:w-auto font-bold min-h-[44px] active:scale-[0.98] transition-transform"
                    >
                      {CHANNEL_LABEL[channel] ?? channel}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sticky Quick Actions Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-4">
            <div className="rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Plan Your Visit
              </h3>

              <div className="flex flex-col gap-3">
                {branch.mapUrl ? (
                  <Button
                    href={branch.mapUrl}
                    external
                    size="lg"
                    className="w-full justify-center gap-2 font-bold min-h-[44px] shadow-sm active:scale-[0.98]"
                  >
                    <Navigation className="h-4 w-4 shrink-0" />
                    <span>Get Directions</span>
                  </Button>
                ) : null}

                <Button
                  href="/visit"
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center gap-2 font-bold min-h-[44px] active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Reserve / Plan Visit</span>
                </Button>

                {branch.qrPath ? (
                  <Button
                    href={branch.qrPath}
                    variant="outline"
                    size="lg"
                    className="w-full justify-center gap-2 font-bold min-h-[44px] border-[var(--brand-primary)]/30 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 active:scale-[0.98]"
                  >
                    <QrCode className="h-4 w-4 shrink-0" />
                    <span>Table QR Portal</span>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
