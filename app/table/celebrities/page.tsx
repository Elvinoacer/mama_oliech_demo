import { Sparkles } from "lucide-react";
import { STORY } from "@/lib/data/story";
import { CelebrityWall } from "@/components/qr/celebrity-wall";

export default function TableCelebritiesPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
      {/* Header & Eyebrow */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Wall of Fame</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Guests at Our Table
          </h1>
          <div className="mt-2.5 h-1 w-16 sm:w-20 bg-amber-500 rounded-full" />
        </div>

        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
          From world leaders and cultural icons to our cherished everyday
          regulars, everyone shares the exact same authentic lakeside
          hospitality at Mama Oliech.
        </p>
      </div>

      {/* Celebrity Wall Display */}
      <div className="pt-2">
        <CelebrityWall guests={STORY.celebrities} />
      </div>
    </div>
  );
}
