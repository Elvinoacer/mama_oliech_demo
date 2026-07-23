import type { Metadata } from "next";
import { EXTERNAL_LINKS, isLiveLink } from "@/lib/constants";
import { getActiveBranches } from "@/lib/data/locations";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mama Oliech Restaurant in Nairobi.",
};

export default function ContactPage() {
  const flagship = getActiveBranches().find((b) => b.slug === "hurlingham");

  return (
    <Section eyebrow="Contact" title="Get in touch">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-5">
          <p className="type-lead !max-w-none">
            Questions about the menu, a visit, or a special occasion? Send a note
            and the team will follow up.
          </p>
          {flagship ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-lg font-semibold text-foreground">Flagship</p>
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
                  className="mt-4 inline-block text-base font-semibold text-[var(--brand-primary)] underline-offset-2 hover:underline"
                >
                  Open in maps
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
