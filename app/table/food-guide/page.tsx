import { FoodGuideCard } from "@/components/qr/food-guide-card";
import { STORY } from "@/lib/data/story";
import { Compass } from "lucide-react";

export default function TableFoodGuidePage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
      {/* Header & Intro */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Compass className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Luo Culinary Traditions</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Cultural Food Guide
          </h1>
          <div className="mt-2.5 h-1 w-16 sm:w-20 bg-amber-500 rounded-full" />
        </div>

        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
          A quick guide to the dishes, preparation traditions, and heritage
          served at your table.
        </p>
      </div>

      {/* Guide Cards List */}
      <div className="space-y-4" role="list">
        {STORY.heritageFacts.map((fact) => (
          <FoodGuideCard key={fact.id} fact={fact} />
        ))}
      </div>
    </div>
  );
}
