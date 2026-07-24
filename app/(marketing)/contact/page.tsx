import type { Metadata } from "next";
import Image from "next/image";
import { EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mama Oliech Restaurant in Nairobi.",
};

export default function ContactPage() {
  const flagship = getActiveBranches().find((b) => b.slug === "hurlingham");

  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-12 pb-12 sm:pb-16">
      <Section eyebrow="Contact" title="Get in touch">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left Column: Info & Location Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <p className="type-lead text-base sm:text-lg text-[var(--foreground)]/90 leading-relaxed">
              Questions about the menu, a visit, or a special occasion? Send a
              note and the team will follow up promptly.
            </p>

            {/* Restaurant Atmosphere Image Card */}
            <div className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-md bg-stone-900">
              <Image
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80"
                alt="Mama Oliech Dining Atmosphere"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white space-y-1">
                <p className="font-display text-base sm:text-lg font-bold">
                  Hurlingham Flagship Dining Room
                </p>
                <p className="text-xs text-amber-200/90 flex items-center gap-1.5 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Marcus Garvey Road, Nairobi</span>
                </p>
              </div>
            </div>

            {/* Flagship Branch Information */}
            {flagship ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 shadow-sm space-y-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] mb-2">
                    Main Branch
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    {flagship.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mt-1">
                    {flagship.addressLine}
                    <br />
                    {flagship.area}, {flagship.city}
                  </p>
                </div>

                {flagship.mapUrl ? (
                  <div className="pt-2 border-t border-[var(--border)]/60">
                    <a
                      href={flagship.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--brand-primary)] hover:underline group"
                    >
                      <span>Get Directions & View Map</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Direct Contact Channels */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Direct Channels
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {isLiveLink(EXTERNAL_LINKS.phone) && (
                  <a
                    href={EXTERNAL_LINKS.phone}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 text-xs font-semibold text-[var(--foreground)] hover:border-amber-500/40 hover:text-[var(--brand-primary)] transition-all active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="truncate">
                      {EXTERNAL_LINKS.phone.replace("tel:", "")}
                    </span>
                  </a>
                )}
                {isLiveLink(EXTERNAL_LINKS.whatsapp) && (
                  <a
                    href={EXTERNAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 text-xs font-semibold text-[var(--foreground)] hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {isLiveLink(EXTERNAL_LINKS.email) && (
                  <a
                    href={EXTERNAL_LINKS.email}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 text-xs font-semibold text-[var(--foreground)] hover:border-amber-500/40 hover:text-[var(--brand-primary)] transition-all active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Email Us</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Container */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
