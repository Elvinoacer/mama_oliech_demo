import { STORY } from "@/lib/data/story";
import { CelebrityWall } from "@/components/qr/celebrity-wall";

export default function TableCelebritiesPage() {
  return (
    <div className="space-y-5">
      <h1 className="type-page-title !text-[length:var(--step-4)]">
        Guests at our table
      </h1>
      <p className="type-lead !max-w-none">
        World figures and local regulars share the same hospitality.
      </p>
      <CelebrityWall guests={STORY.celebrities} />
    </div>
  );
}
