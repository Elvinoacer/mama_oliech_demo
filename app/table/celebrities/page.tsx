/**
 * Celebrity guest wall — QR portal.
 */

import { STORY } from "@/lib/data/story";
import { CelebrityWall } from "@/components/qr/celebrity-wall";

export default function TableCelebritiesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Guests at our table</h1>
      <p className="text-sm opacity-70">
        World figures and local regulars share the same hospitality.
      </p>
      <CelebrityWall guests={STORY.celebrities} />
    </div>
  );
}
