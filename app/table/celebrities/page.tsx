import { STORY } from "@/lib/data/story";
import { CelebrityWall } from "@/components/qr/celebrity-wall";

export default function TableCelebritiesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
          Guests at our table
        </h1>
        <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
      </div>
      <p className="text-white/80 text-lg leading-relaxed max-w-lg">
        World figures and local regulars share the same hospitality.
      </p>
      <CelebrityWall guests={STORY.celebrities} />
    </div>
  );
}
