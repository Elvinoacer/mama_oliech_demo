# Mama Oliech Demo — Architecture Overview

This document maps the project skeleton to the two source docs:

| Doc | Role |
| --- | --- |
| `docs/mama-oliech-website-content.md` | Public marketing website copy & page structure |
| `docs/mama_oliech_more_info.md` | Digital ops blueprint (QR portal, M-Pesa, eTIMS, multi-branch, staff training) |

**Goal of this scaffold:** folder structure, empty/skeleton modules, and comments that say *what* to implement — not production code.

---

## High-level system map

```
┌─────────────────────────────────────────────────────────────────┐
│                     PUBLIC TOUCHPOINTS                          │
│  Marketing site          Table QR portal       Delivery apps    │
│  (Next.js pages)         (/table/*)            (Uber/Bolt)      │
└──────────┬─────────────────────┬───────────────────┬────────────┘
           │                     │                   │
           ▼                     ▼                   ▼
┌──────────────────┐   ┌─────────────────┐   ┌──────────────────┐
│ Shared content   │   │ Heritage + menu │   │ Aggregator stub  │
│ lib/data/*       │   │ portal UI       │   │ (Deliverect etc) │
└────────┬─────────┘   └────────┬────────┘   └────────┬─────────┘
         │                      │                     │
         └──────────────────────┼─────────────────────┘
                                ▼
              ┌─────────────────────────────────────┐
              │  API route handlers (app/api/*)     │
              │  contact · catering · mpesa · etims │
              └─────────────────┬───────────────────┘
                                ▼
              ┌─────────────────────────────────────┐
              │  Future integrations (not built)    │
              │  Daraja · KRA VSCU · POS · scales   │
              └─────────────────────────────────────┘
```

This repo is primarily the **customer-facing web layer** + **integration stubs**. Full POS hardware, kitchen printers, and offline-first ERP live outside this Next.js app (see ops doc Phase 1–4).

---

## App Router layout

```
app/
  layout.tsx                 Root shell, fonts, global metadata
  globals.css                Brand tokens (extend later)
  not-found.tsx              404
  error.tsx                  Route error boundary
  robots.ts / sitemap.ts     SEO stubs

  (marketing)/               Public marketing site (route group — no URL prefix)
    layout.tsx               Header + Footer chrome
    page.tsx                 Home (hero, story teaser, CTAs)
    about/page.tsx           Founder + family + celebrities
    menu/page.tsx            Categories (prices via PDF / easy-update source)
    locations/page.tsx       Active branches only
    locations/[slug]/        Per-branch detail
    visit/page.tsx           Reservations, delivery, plan your trip
    catering/page.tsx        Group menus + enquiry CTA
    contact/page.tsx         Contact form shell

  table/                     Table QR guest portal (ops doc § “Promoting Brand Heritage”)
    layout.tsx               Mobile-first, minimal chrome
    page.tsx                 QR landing (story / menu / culture)
    menu/page.tsx
    story/page.tsx
    celebrities/page.tsx
    food-guide/page.tsx

  staff/                     Internal training portal skeleton
    layout.tsx
    page.tsx
    training/[module]/page.tsx

  api/
    contact/route.ts
    catering/route.ts
    mpesa/stk-push/route.ts
    mpesa/callback/route.ts
    etims/invoice/route.ts
```

Route groups like `(marketing)` organize layouts without changing URLs (`/about`, not `/marketing/about`).

---

## Shared code

| Path | Purpose |
| ---- | ------- |
| `components/layout/*` | Header, footer, mobile nav |
| `components/marketing/*` | Homepage / marketing sections |
| `components/menu/*` | Menu category / item cards |
| `components/locations/*` | Branch cards |
| `components/qr/*` | Table QR portal UI |
| `components/ui/*` | Tiny design primitives (Button, Section, Container) |
| `lib/types/*` | TypeScript models |
| `lib/data/*` | Static content placeholders (menu, locations, story) |
| `lib/constants.ts` | Brand name, taglines, external links |
| `lib/integrations/*` | Client stubs for Daraja / eTIMS / delivery aggregator |
| `public/images/*` | Food, people, location assets (empty placeholders) |
| `public/menus/*` | Downloadable PDF menus per branch |

---

## Content rules (from website doc)

1. **Verify bracketed facts** before publish (hours, phones, delivery status).
2. **Lead with story** — founder, Dennis Oliech, celebrity visits.
3. **No volatile prices on marketing pages** — link to a single updateable source (PDF or CMS).
4. **Only active branches** on the public site (Hurlingham + Kiambu Road today).
5. **Real photography** over stock images.

---

## Implementation phases (aligned with ops roadmap)

| Phase | Web work in this repo |
| ----- | --------------------- |
| 1 | Finish marketing pages + static content from `lib/data` |
| 2 | Table QR portal polish + branch-aware deep links (`?branch=hurlingham`) |
| 3 | Contact / catering forms → email or CRM |
| 4 | M-Pesa STK Push + callback (server-only secrets) |
| 5 | eTIMS invoice stub → real VSCU when POS exists |
| 6 | Delivery menu sync via aggregator webhook (optional) |
| 7 | Staff training modules + media |

---

## What this scaffold intentionally does *not* include

- Full POS / KDS / thermal printer drivers
- Catch-weight scale hardware integration
- Real Safaricom / KRA credentials
- Database / auth (add when ops backend is chosen)
- Production design system

When you implement a file, replace the `TODO` comments and remove skeleton placeholders.
