import type { Metadata } from "next";
import Image from "next/image";
import { getCategory } from "@/lib/data/menu";
import { Section } from "@/components/ui/section";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { CateringForm } from "@/components/forms/catering-form";
import { CATERING_HERO_IMAGE } from "@/lib/data/unsplash";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Group menus and catering enquiries for Mama Oliech Restaurant — packages for 10–15+ guests.",
};

export default function CateringPage() {
  const group = getCategory("group-catering");

  return (
    <>
      <Section eyebrow="Catering" title="Feed the whole table">
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-[var(--border)] shadow-lg">
          <Image
            src={CATERING_HERO_IMAGE.src}
            alt={CATERING_HERO_IMAGE.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md">
              Group Feasts & Event Banquets
            </span>
          </div>
        </div>

        <p className="type-lead">
          Whole mbuzi packages, large-format fish and pilau spreads, and custom
          menus for 10–15+ guests. Tell us the occasion — we&apos;ll propose a
          spread. Pricing is on enquiry so we can match season and headcount.
        </p>

        {group ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <MenuItemCard item={item} />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section
        eyebrow="Enquire"
        title="Send a catering request"
        className="bg-[var(--surface)]"
      >
        <CateringForm />
      </Section>
    </>
  );
}
