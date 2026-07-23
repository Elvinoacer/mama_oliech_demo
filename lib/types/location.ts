/**
 * Branch / location types.
 *
 * Website doc: only list ACTIVE branches publicly.
 * Ops doc: historical closed branches (Westlands, Dagoretti) stay internal-only.
 *
 * TODO:
 * - Confirm exact addresses, hours, reservation phones before publish.
 * - Sync delivery channel status (Uber Eats / Bolt) — do not advertise dead links.
 * - Multi-branch pricing control will need branchId on menu + inventory later.
 */

export type BranchStatus = "active" | "closed" | "coming-soon";

export type DeliveryChannel = "uber-eats" | "bolt-food" | "glovo" | "phone-pickup";

export interface BranchHours {
  /** e.g. "Mon–Sun" */
  days: string;
  /** e.g. "11:00 – 22:00" — TODO: confirm real hours */
  open: string;
  notes?: string;
}

export interface Branch {
  slug: string;
  name: string;
  /** Short public label, e.g. "Flagship" */
  label?: string;
  status: BranchStatus;
  addressLine: string;
  area: string;
  city: string;
  /** Google Maps / Apple Maps URL */
  mapUrl?: string;
  phone?: string;
  hours?: BranchHours[];
  deliveryChannels?: DeliveryChannel[];
  deliveryLinks?: Partial<Record<DeliveryChannel, string>>;
  /** Manager / operator note for internal use — never render on public pages */
  internalNotes?: string;
  /** Table QR deep-link base, e.g. /table?branch=hurlingham */
  qrPath?: string;
}
