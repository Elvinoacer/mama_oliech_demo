# Mama Oliech — Implementation Backlog

Work through these **small, manageable tasks** one at a time.  
Mark a task done by changing `[ ]` → `[x]` (prefer checkmarks over deleting — keeps history).

| Field | Meaning |
| ----- | ------- |
| **ID** | Stable task id (`P1-01` = Phase 1, task 01) |
| **Files** | Paths you will edit/create for that task |
| **Depends** | Finish these first (if any) |
| **Done when** | Clear exit criteria |

**Source material:** `docs/mama-oliech-website-content.md` · `docs/mama_oliech_more_info.md` · `docs/ARCHITECTURE.md`

---

## Progress checklist (overview)

| Phase | Focus | Status |
| ----- | ----- | ------ |
| 0 | Verify facts & content inventory | **Mostly done** — phone/WhatsApp/hours still need restaurant confirm |
| 1 | Brand foundations | **Done** |
| 2 | Content data layer | **Mostly done** — real photos + PDFs still needed |
| 3 | Marketing pages | **Done** (polish remaining when photos arrive) |
| 4 | Table QR portal | **Done** |
| 5 | Forms (contact + catering) | **Done** (email provider optional) |
| 6 | SEO & production polish | **Mostly done** — favicon + real domain + dry-run |
| 7 | Staff training portal | **Done** (set password in prod) |
| 8 | Integrations (M-Pesa, eTIMS, delivery) | **Not started** (by design) |

---

## Phase 0 — Verify facts before building more UI

### [x] P0-01 — Confirm active branches only

- **Files:** `lib/data/locations.ts`
- **Done:** Hurlingham + Kiambu `active`; Westlands + Dagoretti `closed` (internal only).

### [~] P0-02 — Collect real contact details

- **Status:** Partial — delivery URLs filled; phone / WhatsApp / email / social still empty (not in source docs).
- **Files:** `lib/constants.ts` (`EXTERNAL_LINKS`)
- **Still needed:** Real `phone`, `whatsapp`, `email`, social handles from the restaurant. UI hides empty channels via `isLiveLink()`.

### [~] P0-03 — Collect real hours per branch

- **Status:** Partial — placeholder “Lunch & dinner service” + `hoursUnconfirmed: true`.
- **Files:** `lib/data/locations.ts`
- **Still needed:** Exact open/close times; then set `hoursUnconfirmed: false`.

### [x] P0-04 — Collect delivery storefront URLs

- **Files:** `lib/data/locations.ts`, `lib/constants.ts`
- **Done:** Uber Eats (Hurlingham + Kiambu) and Bolt Food flagship links from ops research.

### [x] P0-05 — Inventory photos needed

- **Files:** `docs/ASSET_CHECKLIST.md`, `public/images/*`
- **Done:** Checklist created; folders ready. Photos themselves still **Needed**.

### [x] P0-06 — Approve public story wording

- **Files:** `lib/data/story.ts`
- **Done:** Full narrative from website + ops docs. Re-confirm with family before real public launch if needed.

---

## Phase 1 — Brand foundations

### [x] P1-01 — Define color tokens

- **Files:** `app/globals.css`

### [x] P1-02 — Choose fonts

- **Files:** `app/layout.tsx`, `app/globals.css` (Libre Baskerville + Source Sans 3)

### [x] P1-03 — Polish `Button` variants

- **Files:** `components/ui/button.tsx`

### [x] P1-04 — Polish `Section` + `Container` spacing

- **Files:** `components/ui/section.tsx`, `components/ui/container.tsx`

### [x] P1-05 — Build real site header

- **Files:** `components/layout/header.tsx`, `components/layout/header-nav-link.tsx`

### [x] P1-06 — Mobile nav drawer

- **Files:** `components/layout/mobile-nav.tsx`, `components/layout/header.tsx`

### [x] P1-07 — Build real site footer

- **Files:** `components/layout/footer.tsx`

### [x] P1-08 — 404 page polish

- **Files:** `app/not-found.tsx`

---

## Phase 2 — Content data layer

### [x] P2-01 — Finalize brand constants

- **Files:** `lib/constants.ts`

### [x] P2-02 — Complete locations data

- **Files:** `lib/data/locations.ts`, `lib/types/location.ts`
- **Note:** Hours still unconfirmed; exact Kiambu street number still soft.

### [x] P2-03 — Complete menu categories

- **Files:** `lib/data/menu.ts`

### [x] P2-04 — Complete story data

- **Files:** `lib/data/story.ts` (8 heritage facts)

### [ ] P2-05 — Add first real images to `public/`

- **Depends:** Restaurant photography
- **Files:** `public/images/food/*`, `public/images/people/*`, `public/images/locations/*`
- **Done when:** At least hero/food, people, location images exist (see `docs/ASSET_CHECKLIST.md`).

### [ ] P2-06 — Wire image paths into data

- **Depends:** P2-05
- **Files:** `lib/data/story.ts`, `lib/data/locations.ts`, types as needed
- **Done when:** Components use `imageSrc` / `next/image` instead of placeholders.

### [ ] P2-07 — Menu PDF placeholders → real PDFs

- **Files:** `public/menus/`, `lib/data/locations.ts` (`menuPdfPath`), `app/(marketing)/menu/page.tsx`
- **Done when:** Menu page PDF buttons work (or stay hidden until files exist — currently hidden).

---

## Phase 3 — Marketing pages

### [x] P3-01 — Homepage hero — `components/marketing/hero.tsx`
### [x] P3-02 — Homepage story preview — `components/marketing/story-preview.tsx`
### [x] P3-03 — Homepage signature dish — `components/marketing/signature-dish.tsx` (photo slot until P2-05)
### [x] P3-04 — Homepage locations preview — `components/marketing/locations-preview.tsx`
### [x] P3-05 — Homepage closing CTA — `components/marketing/cta-section.tsx`
### [x] P3-06 — About page — `app/(marketing)/about/page.tsx`
### [x] P3-07 — Menu page UX — `app/(marketing)/menu/page.tsx` + menu components
### [x] P3-08 — Locations index — `app/(marketing)/locations/page.tsx`
### [x] P3-09 — Branch detail — `app/(marketing)/locations/[slug]/page.tsx`
### [x] P3-10 — Visit page — `app/(marketing)/visit/page.tsx`
### [x] P3-11 — Catering page — `app/(marketing)/catering/page.tsx`
### [x] P3-12 — Contact page static + form shell — `app/(marketing)/contact/page.tsx`

---

## Phase 4 — Table QR portal

### [x] P4-01 — QR portal layout — `app/table/layout.tsx`, `components/qr/heritage-nav.tsx`
### [x] P4-02 — QR landing — `app/table/page.tsx`
### [x] P4-03 — Branch query `?branch=` — `app/table/page.tsx`
### [x] P4-04 — QR story — `app/table/story/page.tsx`
### [x] P4-05 — QR celebrity wall — `app/table/celebrities/page.tsx`
### [x] P4-06 — QR food guide — `app/table/food-guide/page.tsx` (8 cards)
### [x] P4-07 — QR menu — `app/table/menu/page.tsx`
### [x] P4-08 — QR deployment notes — `docs/QR_DEPLOYMENT.md`

---

## Phase 5 — Forms

### [x] P5-01 — Contact form UI — `components/forms/contact-form.tsx`
### [x] P5-02 — Contact API — `app/api/contact/route.ts` (validates + logs; email provider optional)
### [x] P5-03 — Catering form UI — `components/forms/catering-form.tsx`
### [x] P5-04 — Catering API — `app/api/catering/route.ts`
### [x] P5-05 — Spam honeypot — both forms + APIs accept clean payloads

### [ ] P5-06 — Wire real email delivery (optional follow-up)

- **Files:** `app/api/contact/route.ts`, `app/api/catering/route.ts`, `.env.example`
- **Done when:** `RESEND_API_KEY` + `CONTACT_TO_EMAIL` send real mail.

---

## Phase 6 — SEO & production polish

### [x] P6-01 — Metadata per marketing page
### [x] P6-02 — Sitemap + robots (`/staff`, `/api` disallowed)
### [x] P6-03 — Open Graph image — `app/opengraph-image.tsx`
### [x] P6-04 — Error boundary polish — `app/error.tsx`
### [x] P6-05 — Accessibility basics (focus rings, labels, Escape on mobile nav)
### [x] P6-06 — Removed default Next.js public SVGs

### [ ] P6-07 — Launch checklist dry-run

- Click every public route on phone + desktop; fix any broken links.

### [ ] P6-08 — Brand favicon

- **Files:** `app/favicon.ico`
- **Done when:** Default Next favicon replaced.

### [ ] P6-09 — Set production `NEXT_PUBLIC_SITE_URL`

- **Files:** `.env` / hosting env, `app/sitemap.ts`, `app/layout.tsx`

---

## Phase 7 — Staff training portal

### [x] P7-01 — Staff home — `app/staff/page.tsx`
### [x] P7-02 — Module: founders — `lib/data/training.ts`
### [x] P7-03 — Module: menu mastery
### [x] P7-04 — Module: hospitality scripts
### [x] P7-05 — Module: digital tools overview
### [x] P7-06 — Staff password gate — `app/staff/layout.tsx`, `app/api/staff/unlock/route.ts`, `components/staff/staff-gate-form.tsx`

- **Note:** Set `STAFF_PORTAL_PASSWORD` in production. Without it, portal stays open for local demo.

---

## Phase 8 — Integrations (later)

### [ ] P8-01 — Document env vars for M-Pesa — `docs/INTEGRATIONS_MPESA.md`
### [ ] P8-02 — Daraja OAuth + STK sandbox — `lib/integrations/mpesa.ts`, `app/api/mpesa/stk-push/route.ts`
### [ ] P8-03 — M-Pesa callback handling — `app/api/mpesa/callback/route.ts`
### [ ] P8-04 — Protect STK endpoint (auth)
### [ ] P8-05 — eTIMS sandbox client — `lib/integrations/etims.ts`
### [ ] P8-06 — Chain payment success → eTIMS
### [ ] P8-07 — Delivery aggregator research — `docs/INTEGRATIONS_DELIVERY.md`
### [ ] P8-08 — Delivery webhook route
### [ ] P8-09 — Menu publish helper

---

## Out of scope for this Next.js app

POS handhelds, kitchen printers, catch-weight scales, offline ERP, inventory par-levels — track outside this repo.

---

## Remaining “next up” (recommended order)

1. **P0-02 / P0-03** — Get phone, WhatsApp, exact hours from the restaurant → `lib/constants.ts` + `lib/data/locations.ts`
2. **P2-05 / P2-06** — Drop real photos; wire `next/image`
3. **P2-07** — Branch PDF menus
4. **P6-08 / P6-09** — Favicon + production URL
5. **P5-06** — Resend (or similar) for forms
6. **P6-07** — Full device dry-run
7. **Phase 8** — only when ops is ready

```bash
npm run dev
# Marketing:  /
# QR:         /table?branch=hurlingham
# Staff:      /staff
# Forms:      /contact  /catering
```
