import Link from "next/link";
import { TRAINING_MODULES } from "@/lib/data/training";

export default function StaffHomePage() {
  return (
    <div className="space-y-7">
      <p className="type-lead !max-w-none">
        Complete each module before busy service. Content covers brand story,
        menu knowledge, hospitality scripts, and upcoming digital tools.
      </p>
      <ul className="space-y-4">
        {TRAINING_MODULES.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/staff/training/${m.slug}`}
              className="block rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm transition hover:border-[var(--brand-accent)] sm:p-6"
            >
              <p className="font-display text-xl font-semibold text-[var(--brand-primary)]">
                {m.title}
              </p>
              <p className="type-body mt-2">{m.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
