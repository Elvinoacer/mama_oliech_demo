import type { MetadataRoute } from "next";
import { getActiveBranches } from "@/lib/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/menu",
    "/locations",
    "/visit",
    "/catering",
    "/contact",
    "/table",
    "/table/story",
    "/table/celebrities",
    "/table/food-guide",
    "/table/menu",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const branchRoutes = getActiveBranches().map((b) => ({
    url: `${base}/locations/${b.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...branchRoutes];
}
