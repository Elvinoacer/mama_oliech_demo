# M-Pesa + table bill payments

**Preferred flow:** build a bill from menu line items, then STK-push the
**server-computed** total. Free-form amount STK remains staff-only for
edge cases.

There is no marketing-site cart. Table QR (`/table/menu`) pays **per menu card**:
configure portion → confirm amount → M-Pesa phone → STK.

## Architecture

```
Menu catalog (pricingMode, priceKes, pricePerKgKes, taxCategory, payable)
        │
        ▼
  POST /api/bills          ← lines[] only; server prices every line
        │
        ▼
  In-memory Bill store     ← totalKes is source of truth
        │
        ▼
  POST /api/bills/:id/pay  ← phone only; amount = bill.totalKes
        │
        ▼
  Daraja STK Push          ← lib/integrations/mpesa.ts
        │
        ▼
  POST /api/mpesa/callback ← settles bill + eTIMS stub
```

### Payable attributes on menu items

| Attribute | Role |
| --------- | ---- |
| `pricingMode` | `fixed` · `catch-weight` · `enquiry` |
| `priceKes` | Unit price for fixed items |
| `pricePerKgKes` | Rate for whole fish |
| `portionTiers` | Kitchen labels → nominal kg |
| `taxCategory` | Food / alcohol / catering (eTIMS mapping) |
| `payable` | `false` for group catering (enquiry only) |
| `station` | Kitchen routing hint |

Catch-weight line total: `round(pricePerKgKes × weightKg)`.

## Files

| File | Role |
| ---- | ---- |
| `lib/types/menu.ts` | Pricing attributes |
| `lib/types/orders.ts` | Bill / STK / eTIMS types |
| `lib/data/menu.ts` | Catalog + reference prices |
| `lib/payments/pricing.ts` | Server pricing engine |
| `lib/payments/bills.ts` | In-memory bill store |
| `lib/payments/service.ts` | Orchestrates bill → STK → eTIMS |
| `app/api/bills/route.ts` | Create bill |
| `app/api/bills/[id]/route.ts` | Get bill status |
| `app/api/bills/[id]/pay/route.ts` | Pay bill via STK |
| `lib/integrations/mpesa.ts` | OAuth, STK, callback parse |
| `app/api/mpesa/callback/route.ts` | Safaricom webhook |
| `app/api/mpesa/stk-push/route.ts` | Staff-only free-form STK |
| `components/qr/item-pay-modal.tsx` | Per-item pay modal (configure → confirm → STK) |
| `components/menu/menu-item-card.tsx` | Card “Pay with M-Pesa” when `enablePay` |

## Demo (no Daraja credentials)

With `MPESA_ENABLED` unset, `/pay` returns a demo STK id and **auto-completes**
the bill with a demo receipt + eTIMS stub so the happy path is visible.

## Enable sandbox

1. Create an app at [Safaricom Daraja](https://developer.safaricom.co.ke).
2. Copy Consumer Key / Secret.
3. Use sandbox shortcode **174379** and the published test Passkey.
4. Tunnel callback:
   ```bash
   ngrok http 3000
   # MPESA_CALLBACK_URL=https://xxxx.ngrok-free.app/api/mpesa/callback
   ```
5. `.env.local`:
   ```env
   MPESA_ENABLED=true
   MPESA_ENV=sandbox
   MPESA_CONSUMER_KEY=...
   MPESA_CONSUMER_SECRET=...
   MPESA_SHORTCODE=174379
   MPESA_PASSKEY=...
   MPESA_CALLBACK_URL=https://your-tunnel/api/mpesa/callback
   ```
6. Create + pay a bill:
   ```bash
   # Create bill from menu lines
   BILL=$(curl -s -X POST http://localhost:3000/api/bills \
     -H "Content-Type: application/json" \
     -d '{
       "tableLabel": "Table 5",
       "branchSlug": "hurlingham",
       "lines": [
         { "menuItemId": "tilapia-fried", "portionTierId": "medium" },
         { "menuItemId": "ugali", "quantity": 2 },
         { "menuItemId": "managu", "quantity": 1 },
         { "menuItemId": "soft-drinks", "quantity": 2 }
       ]
     }')
   echo "$BILL" | jq .
   ID=$(echo "$BILL" | jq -r .id)

   # Pay — amount is server total only
   curl -s -X POST "http://localhost:3000/api/bills/$ID/pay" \
     -H "Content-Type: application/json" \
     -d '{ "phone": "254708374149" }' | jq .
   ```

## Staff free-form STK (legacy / emergency)

`POST /api/mpesa/stk-push` still accepts `phone` + `amountKes` + `accountReference`
when staff cookie is present (if `STAFF_PORTAL_PASSWORD` is set). Prefer bill APIs.

## Not built yet

- Durable bill store (DB / POS)
- Production IP allowlist for callback
- Live KRA eTIMS (stub only)
- Split bills / service charge
