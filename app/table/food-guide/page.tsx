/**
 * Cultural food guide — QR portal.
 * Ops doc: explain greens, ugali etiquette, fish sourcing.
 *
 * TODO: expand into richer modules (osuga, managu, eating whole fish).
 */

import { STORY } from "@/lib/data/story";
import { FoodGuideCard } from "@/components/qr/food-guide-card";

export default function TableFoodGuidePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Cultural food guide</h1>
      <p className="text-sm opacity-70">
        A quick guide to the dishes and traditions on your plate.
      </p>
      <div className="space-y-3">
        {STORY.heritageFacts.map((fact) => (
          <FoodGuideCard key={fact.id} fact={fact} />
        ))}
      </div>
    </div>
  );
}
