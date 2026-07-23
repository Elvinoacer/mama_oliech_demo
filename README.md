# Mama Oliech Restaurant — Demo

Next.js 16 skeleton for Mama Oliech’s public website, table QR heritage portal, staff training stubs, and Kenya F&B integration hooks (M-Pesa, eTIMS).

**This is architecture + placeholders**, not a finished product. Each file has `TODO` comments describing what to implement next.

## Source docs

| Doc | Purpose |
| --- | ------- |
| [`docs/mama-oliech-website-content.md`](./docs/mama-oliech-website-content.md) | Marketing copy structure |
| [`docs/mama_oliech_more_info.md`](./docs/mama_oliech_more_info.md) | Ops / digital transformation blueprint |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | How this repo is organized |
| [`docs/IMPLEMENTATION_BACKLOG.md`](./docs/IMPLEMENTATION_BACKLOG.md) | **Step-by-step tasks** (small tickets + files per task) |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route map

| URL | Role |
| --- | ---- |
| `/` | Marketing home |
| `/about` `/menu` `/locations` `/visit` `/catering` `/contact` | Public marketing pages |
| `/locations/[slug]` | Active branch detail |
| `/table/*` | Table QR guest portal (heritage + menu) |
| `/staff/*` | Internal training skeleton |
| `/api/contact` `/api/catering` | Form endpoints (501 stubs) |
| `/api/mpesa/*` `/api/etims/*` | Payment & tax integration stubs |

## Project layout

```
app/(marketing)/     Public site (header/footer)
app/table/           QR portal
app/staff/           Training portal
app/api/             Route handlers
components/          UI skeletons by domain
lib/data/            Static content seeds
lib/types/           Domain types
lib/integrations/    Daraja / eTIMS / delivery stubs
public/images|menus/ Asset placeholders
```

## Implementation order (suggested)

1. Fill `lib/data/*` with verified hours, phones, and branch details  
2. Design system + photography in `components/*` and `public/images/*`  
3. Polish marketing pages, then table QR portal  
4. Wire contact/catering forms  
5. Only then: real M-Pesa / eTIMS / delivery aggregator (env in `.env.example`)

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run start  # serve production build
npm run lint   # eslint
```
