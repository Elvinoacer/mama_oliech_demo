/**
 * Root layout — wraps ALL route groups (marketing, table QR, staff).
 *
 * TODO:
 * - Brand fonts (consider a warm serif + clean sans pair; Geist is placeholder).
 * - MetadataBase URL for production domain.
 * - JSON-LD Restaurant schema (see Next.js json-ld guide).
 * - Analytics only after privacy review.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO: finalize title template + OG images under app/opengraph-image
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.shortName}`,
  },
  description: BRAND.heroSubheadline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
