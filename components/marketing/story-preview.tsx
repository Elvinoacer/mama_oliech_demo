/**
 * Homepage teaser for the founder / family story.
 * Full narrative lives on /about — keep this short and emotional.
 *
 * TODO: portrait of Mama Oliech + pull-quote anecdote when approved.
 */

import { STORY } from "@/lib/data/story";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function StoryPreview() {
  return (
    <Section eyebrow="Our story" title="The woman behind the name">
      <p className="max-w-2xl text-base leading-relaxed opacity-80">
        {STORY.founder.summary}
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80">
        {/* One-line family bridge — full Dennis / Lilian detail on About */}
        A family legacy that runs from the kitchen to the pitch — and back again.
      </p>
      <div className="mt-6">
        <Button href="/about" variant="secondary">
          Read the full story
        </Button>
      </div>
    </Section>
  );
}
