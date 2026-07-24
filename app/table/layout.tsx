import Link from "next/link";
import { HeritageNav } from "@/components/qr/heritage-nav";
import { BRAND } from "@/lib/constants";
import Image from "next/image";

export default function TablePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="table-dark-theme relative flex min-h-screen w-full flex-col bg-[#0a0a0a] text-white selection:bg-amber-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] h-[40%] w-[40%] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[50%] rounded-full bg-yellow-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md md:max-w-4xl lg:max-w-5xl flex-col min-h-screen">
        <header className="flex items-center justify-between px-5 pt-8 pb-6 md:pt-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              Table Experience
            </p>
            <Link
              href="/table"
              className="font-display mt-1 block text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 md:text-3xl"
            >
              {BRAND.shortName}
            </Link>
          </div>
          <Link href="/" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105">
            <span className="sr-only">Main site</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 md:w-6 md:h-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
        </header>

        <main className="flex-1 px-5 pb-32 md:pb-40">
          {children}
        </main>
        
        {/* Fixed Glass Bottom Nav / Desktop Dock (below pay modal z-[100]) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-8 pt-4 px-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md md:max-w-fit">
            <HeritageNav />
          </div>
        </div>
      </div>
    </div>
  );
}
