/**
 * Contact page skeleton.
 *
 * TODO:
 * - Client form with validation (react-hook-form / server action).
 * - POST /api/contact → email provider or inbox.
 * - Spam protection (honeypot / Turnstile).
 * - Show flagship address + verified phone only.
 */

import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mama Oliech Restaurant.",
};

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Get in touch">
      <div className="max-w-lg space-y-4">
        <p className="text-sm opacity-70">
          Form UI not built yet — structure the fields below when you implement.
        </p>
        {/* Skeleton field list for implementers */}
        <ul className="list-inside list-disc text-sm opacity-80">
          <li>Name</li>
          <li>Phone / WhatsApp</li>
          <li>Email</li>
          <li>Branch (Hurlingham / Kiambu / either)</li>
          <li>Message</li>
        </ul>
        <p className="text-xs opacity-50">
          Submit handler → <code>app/api/contact/route.ts</code>
        </p>
      </div>
    </Section>
  );
}
