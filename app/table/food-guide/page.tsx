import { STORY } from "@/lib/data/story";
import { FoodGuideCard } from "@/components/qr/food-guide-card";

export default function TableFoodGuidePage() {
  return (
    <div className="space-y-5">
      <h1 className="type-page-title !text-[length:var(--step-4)]">
        Cultural food guide
      </h1>
      <p className="type-lead !max-w-none">
        A quick guide to the dishes and traditions on your plate.
      </p>
      <div className="space-y-4">
        {STORY.heritageFacts.map((fact) => (
          <FoodGuideCard key={fact.id} fact={fact} />
        ))}
      </div>
    </div>
  );
}
