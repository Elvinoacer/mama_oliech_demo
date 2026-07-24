import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/lib/types/location";
import { isLiveLink } from "@/lib/constants";
import {
  MapPin,
  Clock,
  ExternalLink,
  Navigation,
  ShoppingBag,
} from "lucide-react";

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
    <article className="group flex h-full flex-col rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-6 lg:p-7 shadow-xs hover:shadow-xl hover:border-[var(--brand-primary)]/40 transition-all duration-300">
      {/* Image Banner with Overlay Badge */}
      {branch.imageSrc ? (
        <div className="relative -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-7 lg:-mt-7 mb-4 sm:mb-5 aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-stone-900">
          <Image
            src={branch.imageSrc}
            alt={`${branch.name} restaurant`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {branch.label ? (
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold text-black uppercase tracking-wider shadow-md border border-amber-300/30">
              {branch.label}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Header: Title & Location Tag */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors truncate">
            {branch.name}
          </h3>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)] mt-1 flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500" />
            <span className="truncate">
              {branch.area}, {branch.city}
            </span>
          </p>
        </div>
        {branch.label && !branch.imageSrc ? (
          <span className="shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            {branch.label}
          </span>
        ) : null}
      </div>

      {/* Address */}
      <p className="text-xs sm:text-sm text-[var(--muted)] mt-2.5 sm:mt-3 leading-relaxed line-clamp-2">
        {branch.addressLine}
      </p>

      {/* Operating Hours Box */}
      {branch.hours?.[0] ? (
        <div className="mt-3 sm:mt-4 flex items-start gap-2.5 text-xs text-[var(--foreground)] bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]/70">
          <Clock className="h-4 w-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-bold">{branch.hours[0].days}:</span>{" "}
            <span className="text-[var(--muted)] font-medium">
              {branch.hours[0].open}
            </span>
            {branch.hoursUnconfirmed ? (
              <span className="block text-[11px] text-amber-600 dark:text-amber-400 italic mt-0.5">
                Hours unconfirmed — please call branch before visiting
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Delivery Partners List */}
      {delivery.length > 0 ? (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--border)]/70">
          <p className="text-[10px] sm:text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Delivery Partners</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {delivery.map((ch) => (
              <span
                key={ch}
                className="inline-flex items-center gap-1 bg-[var(--surface)] text-[var(--foreground)] px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-[var(--border)] shadow-2xs"
              >
                {CHANNEL_LABEL[ch] ?? ch}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Action Footer */}
      <div className="mt-auto pt-5 grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:justify-between">
        <Link
          href={`/locations/${branch.slug}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/30 px-3 py-2.5 sm:px-4 text-xs sm:text-sm font-bold text-[var(--foreground)] transition-colors min-h-[44px] active:scale-[0.98]"
        >
          <span>View Details</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
        </Link>

        {branch.mapUrl ? (
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--brand-primary)] text-white px-3 py-2.5 sm:px-4 text-xs sm:text-sm font-bold shadow-sm hover:opacity-90 transition-all min-h-[44px] active:scale-[0.98]"
          >
            <Navigation className="h-3.5 w-3.5 text-amber-300 shrink-0" />
            <span>Directions</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
