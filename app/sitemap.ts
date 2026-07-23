/**
 * Sitemap skeleton — marketing URLs only.
 * TODO: production base URL; include active branch detail pages.
 */

import type { MetadataRoute } from "next";
import { getActiveBranches } from "@/lib/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: replace with real domain via env
  const base = "https://example.com";

  const staticRoutes = ["", "/about", "/menu", "/locations", "/visit", "/catering", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );

  const branchRoutes = getActiveBranches().map((b) => ({
    url: `${base}/locations/${b.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...branchRoutes];
}
