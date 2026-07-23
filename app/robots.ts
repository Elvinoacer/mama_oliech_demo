/**
 * robots.txt generation.
 * TODO: disallow /staff and /api from indexing; set production host.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // TODO: disallow: ["/staff/", "/api/"],
    },
    // TODO: sitemap: "https://www.example.com/sitemap.xml",
  };
}
