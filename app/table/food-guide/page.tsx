import { STORY } from "@/lib/data/story";
import { FoodGuideCard } from "@/components/qr/food-guide-card";

export default function TableFoodGuidePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
          Cultural food guide
        </h1>
        <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
      </div>
      <p className="text-white/80 text-lg leading-relaxed max-w-lg">
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
