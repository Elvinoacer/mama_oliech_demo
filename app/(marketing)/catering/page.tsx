import type { Metadata } from "next";
import { getCategory } from "@/lib/data/menu";
import { Section } from "@/components/ui/section";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { CateringForm } from "@/components/forms/catering-form";

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
