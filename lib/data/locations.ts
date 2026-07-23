/**
 * Branch registry.
 * Source: website content §4 + ops multi-branch analysis.
 *
 * PUBLIC RULE: only `status: "active"` should appear on marketing pages.
 * Closed branches kept here for internal / ops context only.
 *
 * TODO:
 * - Fill real hours, phones, map pins, delivery URLs.
 * - Remove or hide any branch that is not guest-ready.
 */

import type { Branch } from "@/lib/types/location";

export const BRANCHES: Branch[] = [
  {
    slug: "hurlingham",
    name: "Hurlingham / Kilimani — Flagship",
    label: "Flagship",
    status: "active",
    addressLine: "Marcus Garvey Road, Hurlingham",
    area: "Hurlingham / Kilimani",
    city: "Nairobi",
    // TODO: confirm phone + hours
    phone: undefined,
    hours: [{ days: "Daily", open: "TODO: confirm hours" }],
    deliveryChannels: ["uber-eats", "bolt-food", "phone-pickup"],
    deliveryLinks: {
      // TODO: live storefront URLs
      "uber-eats": "#",
      "bolt-food": "#",
    },
    qrPath: "/table?branch=hurlingham",
    internalNotes:
      "Led by Lilian (founder's daughter). Highest brand recognition.",
  },
  {
    slug: "kiambu-road",
    name: "Kiambu Road (Ridgeways)",
    label: "Expansion",
    status: "active",
    addressLine: "TODO: exact address, Ridgeways area",
    area: "Ridgeways / Kiambu Road",
    city: "Nairobi",
    hours: [{ days: "Daily", open: "TODO: confirm hours" }],
    deliveryChannels: ["uber-eats", "phone-pickup"],
    deliveryLinks: { "uber-eats": "#" },
    qrPath: "/table?branch=kiambu-road",
    internalNotes:
      "Ops note: pricing/menu may diverge from flagship — centralize later.",
  },
  // --- Internal only: do not render on public site ---
  {
    slug: "westlands",
    name: "Westlands — Reliance Centre (closed)",
    status: "closed",
    addressLine: "Reliance Centre, Woodvale Grove, Westlands",
    area: "Westlands",
    city: "Nairobi",
    internalNotes: "Permanently closed. Keep off public nav.",
  },
  {
    slug: "dagoretti",
    name: "Dagoretti Corner (closed)",
    status: "closed",
    addressLine: "Ngina Road Junction, Naivasha Road, Dagoretti Corner",
    area: "Dagoretti",
    city: "Nairobi",
    internalNotes: "Inactive; previously paired with a pub.",
  },
];

export function getActiveBranches(): Branch[] {
  return BRANCHES.filter((b) => b.status === "active");
}

export function getBranchBySlug(slug: string): Branch | undefined {
  return BRANCHES.find((b) => b.slug === slug);
}
