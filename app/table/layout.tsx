import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import { HeritageNav } from "@/components/qr/heritage-nav";
import { BRAND } from "@/lib/constants";

export default function TablePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="table-dark-theme relative flex min-h-screen w-full flex-col bg-[#0a0a0a] text-white selection:bg-amber-500/30">
      {/* Dynamic Background Glows */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] h-[40%] w-[40%] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[50%] rounded-full bg-yellow-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md md:max-w-4xl lg:max-w-5xl flex-col min-h-screen">
        {/* Table Portal Header */}
        <header className="flex items-center justify-between px-5 pt-6 pb-4 sm:pt-8 md:pt-10">
          <div>
            <div className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                Table Experience
              </p>
            </div>
            <Link
              href="/table"
              className="font-display mt-0.5 block text-2xl sm:text-3xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-amber-500 rounded-lg"
            >
              {BRAND.shortName}
            </Link>
          </div>

          <Link
            href="/"
            aria-label="Return to main website"
            className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-500 min-h-[44px] min-w-[44px]"
          >
            <Home className="h-5 w-5 md:h-6 md:w-6 text-white/80" />
          </Link>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-5 pb-32 md:pb-40">{children}</main>

        {/* Fixed Floating Glass Navigation Dock */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-8 pt-6 px-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md md:max-w-fit">
            <HeritageNav />
          </div>
        </div>
      </div>
    </div>
  );
}
