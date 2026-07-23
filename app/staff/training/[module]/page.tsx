/**
 * Single training module page.
 *
 * TODO:
 * - Real lesson content + embedded video.
 * - Quiz / acknowledgement checkbox for compliance.
 * - generateStaticParams for known modules.
 */

import { notFound } from "next/navigation";

const KNOWN = ["founders", "menu-mastery", "hospitality", "digital-tools"] as const;

type Props = { params: Promise<{ module: string }> };

export default async function TrainingModulePage({ params }: Props) {
  const { module: mod } = await params;
  if (!KNOWN.includes(mod as (typeof KNOWN)[number])) notFound();

  return (
    <article className="space-y-4">
      <h2 className="text-xl font-semibold capitalize">
        Module: {mod.replace(/-/g, " ")}
      </h2>
      <p className="text-sm opacity-70">
        TODO: lesson body for <code>{mod}</code>. Pull narrative from{" "}
        <code>lib/data/story.ts</code> where relevant; add service SOPs from ops
        doc (greeting, QR intro, STK billing script).
      </p>
      <div className="rounded-xl border border-dashed border-foreground/20 p-6 text-sm opacity-50">
        Video / checklist placeholder
      </div>
    </article>
  );
}
