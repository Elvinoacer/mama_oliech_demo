/**
 * Delivery aggregator stub (Deliverect / Buymore / similar).
 * Ops doc problem: fragmented Uber Eats / Bolt menus + dead storefronts.
 *
 * TODO:
 * - Single menu publish pipeline → all channels.
 * - Webhook receiver for incoming delivery orders → kitchen print route.
 * - 86 / out-of-stock sync so apps don't sell empty fish cases.
 * - Branch-scoped menus to stop Kiambu vs Hurlingham price drift.
 *
 * This Next app may only own webhooks + admin UI; POS owns kitchen routing.
 */

import { FEATURES } from "@/lib/constants";

export async function publishMenuToChannels(_branchSlug: string): Promise<void> {
  if (!FEATURES.enableDeliveryAggregator) {
    // no-op skeleton
    return;
  }
  // TODO: push menu payload to aggregator API
  throw new Error("publishMenuToChannels: not implemented");
}

export async function handleDeliveryOrderWebhook(
  _payload: unknown,
): Promise<{ accepted: boolean }> {
  // TODO: validate signature, map items, route to kitchen stations
  return { accepted: false };
}
