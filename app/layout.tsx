/**
 * Root layout — fonts, global metadata, all route groups.
 *
 * Type system:
 * - Display: Fraunces (warm soft-serif — heritage / dining character)
 * - Body: DM Sans (clean, readable, strong at larger sizes)
 * Scale lives in app/globals.css (@theme + .type-* utilities).
 */

import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { BRAND } from "@/lib/constants";
import "./globals.css";

/** Distinct CSS var names so @theme --font-display is not circular */
const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.shortName}`,
  },
  description: BRAND.heroSubheadline,
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: BRAND.name,
    title: BRAND.name,
    description: BRAND.heroSubheadline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-base text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
