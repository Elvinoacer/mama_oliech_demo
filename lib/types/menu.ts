/**
 * Menu domain types.
 *
 * Content rules (website doc):
 * - Marketing pages should avoid volatile unit prices that differ by branch/platform.
 * - Prefer categories + descriptions here; link to PDF or a single CMS source for prices.
 * - Ops doc notes pricing variance across Bolt / Uber / in-store — centralize later.
 *
 * TODO:
 * - Decide source of truth: static TS → CMS → POS menu API.
 * - Support branch-specific availability and catch-weight fish sizes.
 * - Map kitchen stations (fry / starch-greens / bar) for KOT routing later.
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
   * Price intentionally optional on marketing surfaces.
   * TODO: if shown, pull from one verified source — never hardcode multi-platform prices.
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
  /** Relative path under public/, e.g. /menus/hurlingham.pdf */
  pdfPath?: string;
  categories: MenuCategory[];
  lastUpdated?: string; // ISO date — show "menu as of" for trust
}
