import Link from "next/link";
import Image from "next/image";
import { TRAINING_MODULES } from "@/lib/data/training";

const MODULE_IMAGES: Record<string, string> = {
  founders: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  "menu-mastery": "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80",
  hospitality: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=500&q=80",
  "digital-tools": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=80",
};

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
              className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-sm transition hover:border-[var(--brand-accent)] sm:p-5 group"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-[var(--border)]">
                <Image
                  src={MODULE_IMAGES[m.slug] ?? "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=900&q=80"}
                  alt={m.title}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
                  {m.title}
                </p>
                <p className="type-body mt-1 text-sm text-[var(--muted)]">{m.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
