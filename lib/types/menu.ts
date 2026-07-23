/**
 * Menu domain types.
 */

export type MenuCategoryId =
  | "fish"
  | "heritage"
  | "greens-sides"
  | "group-catering"
  | "drinks";

export type KitchenStation = "fry" | "starch-greens" | "bar" | "pass";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  /** Optional marketing badge, e.g. "Signature", "Zuckerberg Special" */
  badge?: string;
  /**
   * Food photo — Unsplash demo URLs or /public paths.
   * Prefer real kitchen photography in production.
   */
  imageSrc?: string;
  imageAlt?: string;
  /**
   * Price intentionally optional on marketing surfaces.
   */
  priceKes?: number;
  /** Catch-weight items (whole tilapia) need scale/barcode flow in POS later */
  isCatchWeight?: boolean;
  available?: boolean;
  station?: KitchenStation;
}

export interface MenuCategory {
  id: MenuCategoryId;
  title: string;
  intro?: string;
  items: MenuItem[];
}

export interface BranchMenu {
  branchSlug: string;
  pdfPath?: string;
  categories: MenuCategory[];
  lastUpdated?: string;
}
