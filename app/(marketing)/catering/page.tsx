/**
 * Catering / group menus + enquiry entry point.
 * Source: website content §3 group menus + §5
 *
 * TODO:
 * - Enquiry form → POST /api/catering (email/CRM).
 * - Package cards with guest counts; price on request.
 * - Lead time / deposit policy once ops defines it.
 */

import type { Metadata } from "next";
import { getCategory } from "@/lib/data/menu";
import { Section } from "@/components/ui/section";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Catering",
  description: "Group menus and catering enquiries for Mama Oliech Restaurant.",
};

export default function CateringPage() {
  const group = getCategory("group-catering");

  return (
    <Section eyebrow="Catering" title="Feed the whole table">
      <p className="max-w-2xl opacity-80">
        Whole mbuzi packages, large-format fish and pilau spreads, and custom
        menus for 10–15+ guests. Tell us the occasion — we&apos;ll propose a
        spread.
      </p>

      {group ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {group.items.map((item) => (
            <li key={item.id}>
              <MenuItemCard item={item} />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 rounded-2xl border border-foreground/10 p-6">
        <h2 className="text-lg font-semibold">Send an enquiry</h2>
        <p className="mt-2 text-sm opacity-70">
          TODO: form fields — name, phone, date, guest count, branch preference,
          message. Wire to <code className="text-xs">/api/catering</code>.
        </p>
        <div className="mt-4">
          <Button href="/contact">Contact form (placeholder)</Button>
        </div>
      </div>
    </Section>
  );
}
