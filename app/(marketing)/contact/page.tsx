import type { Metadata } from "next";
import Image from "next/image";
import { EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mama Oliech Restaurant in Nairobi.",
};

export default function ContactPage() {
  const flagship = getActiveBranches().find((b) => b.slug === "hurlingham");

  return (
    <Section eyebrow="Contact" title="Get in touch">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <p className="type-lead !max-w-none">
            Questions about the menu, a visit, or a special occasion? Send a note
            and the team will follow up.
          </p>

          {/* Restaurant Atmosphere Image Card */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--border)] shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80"
              alt="Mama Oliech Dining Atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display text-lg font-bold">Hurlingham Flagship Dining Room</p>
              <p className="text-xs text-amber-200/90 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>Marcus Garvey Road, Nairobi</span>
              </p>
            </div>
          </div>

          {flagship ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <p className="text-lg font-semibold text-foreground">Flagship Branch</p>
              <p className="type-body mt-2">
                {flagship.addressLine}
                <br />
                {flagship.area}, {flagship.city}
              </p>
              {flagship.mapUrl ? (
                <a
                  href={flagship.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
                >
                  <span>Open interactive map →</span>
                </a>
              ) : null}
            </div>
          ) : null}
          <ul className="type-body space-y-2">
            {isLiveLink(EXTERNAL_LINKS.phone) ? (
              <li>
                Phone:{" "}
                <a href={EXTERNAL_LINKS.phone} className="underline">
                  {EXTERNAL_LINKS.phone.replace("tel:", "")}
                </a>
              </li>
            ) : null}
            {isLiveLink(EXTERNAL_LINKS.whatsapp) ? (
              <li>
                <a href={EXTERNAL_LINKS.whatsapp} className="underline">
                  WhatsApp
                </a>
              </li>
            ) : null}
            {isLiveLink(EXTERNAL_LINKS.email) ? (
              <li>
                <a href={EXTERNAL_LINKS.email} className="underline">
                  Email
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
