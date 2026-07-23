/**
 * Branch / location types.
 * PUBLIC RULE: only `status: "active"` on marketing pages.
 */

export type BranchStatus = "active" | "closed" | "coming-soon";

export type DeliveryChannel = "uber-eats" | "bolt-food" | "glovo" | "phone-pickup";

export interface BranchHours {
  days: string;
  open: string;
  notes?: string;
}

export interface Branch {
  slug: string;
  name: string;
  label?: string;
  status: BranchStatus;
  addressLine: string;
  area: string;
  city: string;
  mapUrl?: string;
  phone?: string;
  whatsapp?: string;
  hours?: BranchHours[];
  deliveryChannels?: DeliveryChannel[];
  deliveryLinks?: Partial<Record<DeliveryChannel, string>>;
  /** Path under public/, e.g. /images/locations/hurlingham.jpg */
  imageSrc?: string;
  /** Downloadable menu PDF under public/menus/ */
  menuPdfPath?: string;
  /** Table QR deep-link */
  qrPath?: string;
  /** Internal only — never render on public pages */
  internalNotes?: string;
  /**
   * Hours not yet confirmed with the restaurant.
   * When true, UI should say “confirm before you visit”.
   */
  hoursUnconfirmed?: boolean;
}
