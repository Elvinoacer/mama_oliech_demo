/**
 * Safaricom Daraja — Lipa Na M-Pesa Online (STK Push).
 *
 * Reverse payment flow (ops doc): waitstaff trigger a PIN prompt on the guest
 * phone. There is no public cart/checkout in this app.
 *
 * Server-only — never import from Client Components.
 *
 * Env (see .env.example):
 *   MPESA_ENABLED=true          → turns FEATURES.enableMpesaStk on
 *   MPESA_ENV=sandbox|production
 *   MPESA_CONSUMER_KEY
 *   MPESA_CONSUMER_SECRET
 *   MPESA_SHORTCODE
 *   MPESA_PASSKEY
 *   MPESA_CALLBACK_URL          → public HTTPS URL (ngrok for local sandbox)
 */

import type { StkPushRequest, StkPushResult } from "@/lib/types/orders";
import { FEATURES } from "@/lib/constants";

// ─── Config ───────────────────────────────────────────────────────────────

function darajaHost(): string {
  const env = (process.env.MPESA_ENV ?? "sandbox").toLowerCase();
  return env === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env.local (see .env.example) and ensure MPESA_ENABLED=true only with full credentials.`,
    );
  }
  return value;
}

// ─── OAuth token cache (Task 2) ───────────────────────────────────────────

type TokenCache = {
  accessToken: string;
  /** epoch ms when token should be considered expired */
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

/**
 * Fetch / cache Daraja OAuth access token.
 * Not exported — only used inside this module.
 */
async function getDarajaAccessToken(): Promise<string> {
  const now = Date.now();
  // Refresh 60s early to avoid edge-of-expiry failures
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const key = requireEnv("MPESA_CONSUMER_KEY");
  const secret = requireEnv("MPESA_CONSUMER_SECRET");
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const url = `${darajaHost()}/oauth/v1/generate?grant_type=client_credentials`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Daraja OAuth failed (${res.status}): ${text || res.statusText}`,
    );
  }

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: string | number;
  };

  if (!data.access_token) {
    throw new Error("Daraja OAuth response missing access_token");
  }

  const expiresInSec = Number(data.expires_in ?? 3599);
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: now + expiresInSec * 1000,
  };

  return tokenCache.accessToken;
}

// ─── STK helpers ──────────────────────────────────────────────────────────

/** Daraja timestamp: YYYYMMDDHHmmss (Africa/Nairobi wall clock is fine in UTC+3; use local server time) */
function stkTimestamp(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  // Prefer East Africa Time for Kenya deployments
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  return `${get("year")}${get("month")}${get("day")}${get("hour")}${get("minute")}${get("second")}`;
}

function stkPassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

/**
 * Normalize Kenyan mobile to 2547XXXXXXXX (no + or spaces).
 */
function normalizeMsisdn(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length >= 12) {
    return digits.slice(0, 12);
  }
  if (digits.startsWith("0") && digits.length >= 10) {
    return `254${digits.slice(1, 10)}`;
  }
  if (digits.startsWith("7") && digits.length === 9) {
    return `254${digits}`;
  }
  if (digits.startsWith("1") && digits.length === 9) {
    // Safaricom sandbox sometimes uses 2541… test numbers
    return `254${digits}`;
  }
  return digits;
}

// ─── Public API ───────────────────────────────────────────────────────────

/**
 * Initiate Lipa Na M-Pesa Online STK Push (Task 3).
 * When FEATURES.enableMpesaStk is false, returns a safe demo payload.
 */
export async function initiateStkPush(
  request: StkPushRequest,
): Promise<StkPushResult> {
  if (!FEATURES.enableMpesaStk) {
    return {
      checkoutRequestId: "DEMO-CHECKOUT",
      merchantRequestId: "DEMO-MERCHANT",
      status: "pending",
      providerMessage:
        "M-Pesa STK disabled. Set MPESA_ENABLED=true and Daraja env vars to go live.",
    };
  }

  const shortcode = requireEnv("MPESA_SHORTCODE");
  const passkey = requireEnv("MPESA_PASSKEY");
  const callbackUrl = requireEnv("MPESA_CALLBACK_URL");
  const phone = normalizeMsisdn(request.phone);
  const amount = Math.round(Number(request.amountKes));

  if (!/^254\d{9}$/.test(phone)) {
    return {
      checkoutRequestId: "",
      merchantRequestId: "",
      status: "failed",
      providerMessage: `Invalid phone (expected 2547XXXXXXXX): ${request.phone}`,
    };
  }

  if (!Number.isFinite(amount) || amount < 1) {
    return {
      checkoutRequestId: "",
      merchantRequestId: "",
      status: "failed",
      providerMessage: "amountKes must be a positive integer (KES)",
    };
  }

  const accessToken = await getDarajaAccessToken();
  const timestamp = stkTimestamp();
  const password = stkPassword(shortcode, passkey, timestamp);

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: request.accountReference.slice(0, 12), // Daraja max ~12 chars
    TransactionDesc: (request.transactionDesc || "Mama Oliech bill").slice(0, 13),
  };

  const url = `${darajaHost()}/mpesa/stkpush/v1/processrequest`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as {
    MerchantRequestID?: string;
    CheckoutRequestID?: string;
    ResponseCode?: string;
    ResponseDescription?: string;
    CustomerMessage?: string;
    errorCode?: string;
    errorMessage?: string;
    requestId?: string;
  };

  if (!res.ok || (data.ResponseCode && data.ResponseCode !== "0")) {
    const message =
      data.errorMessage ||
      data.ResponseDescription ||
      data.CustomerMessage ||
      `STK push failed (${res.status})`;

    console.error("[mpesa] stk-push error", {
      status: res.status,
      data,
      branch: request.branchSlug,
    });

    return {
      checkoutRequestId: data.CheckoutRequestID ?? "",
      merchantRequestId: data.MerchantRequestID ?? data.requestId ?? "",
      status: "failed",
      providerMessage: message,
    };
  }

  return {
    checkoutRequestId: data.CheckoutRequestID ?? "",
    merchantRequestId: data.MerchantRequestID ?? "",
    status: "pending",
    providerMessage:
      data.CustomerMessage || data.ResponseDescription || "STK push accepted",
  };
}

// ─── Callback (Task 4) ────────────────────────────────────────────────────

type StkCallbackItem = { Name?: string; Value?: string | number };
type StkCallbackBody = {
  Body?: {
    stkCallback?: {
      MerchantRequestID?: string;
      CheckoutRequestID?: string;
      ResultCode?: number;
      ResultDesc?: string;
      CallbackMetadata?: {
        Item?: StkCallbackItem[];
      };
    };
  };
};

function metadataMap(
  items: StkCallbackItem[] | undefined,
): Record<string, string | number | undefined> {
  const out: Record<string, string | number | undefined> = {};
  for (const item of items ?? []) {
    if (item.Name) out[item.Name] = item.Value;
  }
  return out;
}

/**
 * Handle Safaricom STK result notification.
 * Maps ResultCode + CallbackMetadata and settles the matching bill via payment service.
 */
export async function handleStkCallback(
  payload: unknown,
): Promise<{ ok: boolean; billId?: string }> {
  const body = payload as StkCallbackBody;
  const cb = body?.Body?.stkCallback;

  if (!cb) {
    console.warn("[mpesa] callback missing Body.stkCallback", payload);
    return { ok: false };
  }

  const resultCode = cb.ResultCode;
  const meta = metadataMap(cb.CallbackMetadata?.Item);

  const summary = {
    merchantRequestId: cb.MerchantRequestID,
    checkoutRequestId: cb.CheckoutRequestID,
    resultCode,
    resultDesc: cb.ResultDesc,
    amount: meta.Amount,
    mpesaReceiptNumber: meta.MpesaReceiptNumber,
    transactionDate: meta.TransactionDate,
    phoneNumber: meta.PhoneNumber,
  };

  // Lazy import avoids circular deps at module load (mpesa ↔ payments)
  const { settleBillFromStkCallback } = await import("@/lib/payments/service");
  const settled = await settleBillFromStkCallback({
    checkoutRequestId: summary.checkoutRequestId,
    resultCode: summary.resultCode,
    resultDesc: summary.resultDesc,
    amount: summary.amount,
    mpesaReceiptNumber: summary.mpesaReceiptNumber,
    phoneNumber: summary.phoneNumber,
  });

  if (resultCode === 0) {
    console.info("[mpesa] STK success", { ...summary, billId: settled.billId });
    return { ok: true, billId: settled.billId };
  }

  console.info("[mpesa] STK not successful", { ...summary, billId: settled.billId });
  return { ok: false, billId: settled.billId };
}
