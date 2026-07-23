import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/lib/types/location";
import { isLiveLink } from "@/lib/constants";
import { MapPin, Clock, ExternalLink, Navigation, Phone, ShoppingBag } from "lucide-react";

const CHANNEL_LABEL: Record<string, string> = {
  "uber-eats": "Uber Eats",
  "bolt-food": "Bolt Food",
  glovo: "Glovo",
  "phone-pickup": "Pickup",
};

export function LocationCard({ branch }: { branch: Branch }) {
  const delivery = (branch.deliveryChannels ?? []).filter((ch) => {
    if (ch === "phone-pickup") return true;
    return isLiveLink(branch.deliveryLinks?.[ch]);
  });

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--brand-accent)]/50 hover:-translate-y-1">
      {branch.imageSrc ? (
        <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-5 aspect-[16/9] overflow-hidden rounded-t-3xl">
          <Image
            src={branch.imageSrc}
            alt={`${branch.name} restaurant`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {branch.label ? (
            <span className="absolute top-4 right-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
              {branch.label}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-bold text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
            {branch.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] mt-1 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{branch.area}, {branch.city}</span>
          </p>
        </div>
        {branch.label && !branch.imageSrc ? (
          <span className="shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
            {branch.label}
          </span>
        ) : null}
      </div>

      <p className="text-sm text-[var(--muted)] mt-4 leading-relaxed">
        {branch.addressLine}
      </p>

      {branch.hours?.[0] ? (
        <div className="mt-4 flex items-start gap-2 text-xs text-[var(--foreground)] bg-stone-50 p-3 rounded-xl border border-stone-200/80">
          <Clock className="h-4 w-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{branch.hours[0].days}:</span> {branch.hours[0].open}
            {branch.hoursUnconfirmed ? (
              <span className="block text-[11px] text-[var(--muted)] italic mt-0.5">
                Hours unconfirmed — call branch before visiting
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {delivery.length > 0 ? (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
            <span>Delivery Partners</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {delivery.map((ch) => (
              <span
                key={ch}
                className="inline-flex items-center gap-1 bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md text-xs font-semibold border border-stone-200"
              >
                {CHANNEL_LABEL[ch] ?? ch}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <Link
          href={`/locations/${branch.slug}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-accent)] transition-colors"
        >
          <span>Branch Details</span>
          <ExternalLink className="h-4 w-4" />
        </Link>

        {branch.mapUrl ? (
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-primary)] text-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-[var(--brand-primary-hover)] transition-all"
          >
            <Navigation className="h-3.5 w-3.5 text-amber-300" />
            <span>Get Directions</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

