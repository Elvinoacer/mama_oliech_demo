/**
 * Marketing chrome: header + footer around public pages.
 * Route group name (marketing) does NOT appear in the URL.
 *
 * TODO: announcement bar for holiday hours / specials when needed.
 */

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
