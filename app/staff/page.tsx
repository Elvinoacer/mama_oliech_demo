/**
 * Staff portal home — onboarding index.
 *
 * Modules from ops doc:
 * 1. Founders & football video modules
 * 2. Menu mastery & food etiquette
 * 3. Hospitality & attentiveness standards
 * 4. Digital tools (handheld POS, STK push script) — later
 */

import Link from "next/link";

const MODULES = [
  {
    slug: "founders",
    title: "Founders & football",
    body: "Mary Auma, Dennis Oliech, and why the brand story matters on the floor.",
  },
  {
    slug: "menu-mastery",
    title: "Menu mastery",
    body: "Fish styles, greens, ugali choices, group packages, allergens TODO.",
  },
  {
    slug: "hospitality",
    title: "Hospitality standards",
    body: "Greeting script, clean tables, QR intro, table-side billing language.",
  },
  {
    slug: "digital-tools",
    title: "Digital tools",
    body: "Handheld ordering, M-Pesa STK, when to escalate kitchen issues.",
  },
] as const;

export default function StaffHomePage() {
  return (
    <div className="space-y-6">
      <p className="text-sm opacity-80">
        Complete each module before busy service. Content is skeleton-only —
        replace with short videos and checklists.
      </p>
      <ul className="space-y-3">
        {MODULES.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/staff/training/${m.slug}`}
              className="block rounded-xl border border-foreground/10 p-4"
            >
              <p className="font-medium">{m.title}</p>
              <p className="mt-1 text-sm opacity-70">{m.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
