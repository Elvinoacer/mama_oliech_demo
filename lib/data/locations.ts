/**
 * Branch registry.
 * Active: Hurlingham (flagship), Kiambu Road.
 * Closed (internal only): Westlands, Dagoretti.
 *
 * Delivery URLs from public Uber Eats / Bolt listings (ops research doc).
 * Hours: not confirmed in source docs — marked hoursUnconfirmed.
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
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Mama+Oliech+Marcus+Garvey+Road+Hurlingham+Nairobi",
    hours: [
      {
        days: "Daily",
        open: "Lunch & dinner service",
        notes: "Confirm today’s hours before you travel",
      },
    ],
    hoursUnconfirmed: true,
    deliveryChannels: ["uber-eats", "bolt-food", "phone-pickup"],
    deliveryLinks: {
      "uber-eats":
        "https://www.ubereats.com/ke/store/mama-oliech-hurligham/4aQXycxHSlyHH_fbNdnuUw",
      "bolt-food":
        "https://food.bolt.eu/en/320-nairobi/p/67342-mama-oliech-restaurant/",
    },
    menuPdfPath: undefined, // add public/menus/hurlingham.pdf when ready
    qrPath: "/table?branch=hurlingham",
    imageSrc: undefined,
    internalNotes:
      "Led by Lilian (founder's daughter). Highest brand recognition.",
  },
  {
    slug: "kiambu-road",
    name: "Kiambu Road (Ridgeways)",
    label: "Expansion",
    status: "active",
    addressLine: "Kiambu Road, Ridgeways area",
    area: "Ridgeways / Kiambu Road",
    city: "Nairobi",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Mama+Oliech+Kiambu+Road+Nairobi",
    hours: [
      {
        days: "Daily",
        open: "Lunch & dinner service",
        notes: "Confirm today’s hours before you travel",
      },
    ],
    hoursUnconfirmed: true,
    deliveryChannels: ["uber-eats", "phone-pickup"],
    deliveryLinks: {
      "uber-eats":
        "https://www.ubereats.com/ke/store/mama-oliech-kiambu-road/wOPzpbfuW2euV0xGhQcydA",
    },
    qrPath: "/table?branch=kiambu-road",
    internalNotes:
      "Ops note: pricing/menu may diverge from flagship — centralize later. Exact street number to confirm.",
  },
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
