# 🖼️ Mama Oliech — Complete Image Audit Report

A definitive audit of **every file** in the codebase — where images are used, where they're missing, and where adding them would most improve the UI.

---

## 📦 Existing Image Assets (`/public/images/`)

| Path | Used By |
|------|---------|
| `/images/food/hero-tilapia-feast.jpg` | Hero, Signature Dish, Menu Ticker, CTA Section |
| `/images/food/tilapia-wet-fry.jpg` | Signature Dish, Menu Ticker |
| `/images/food/traditional-greens-ugali.jpg` | Signature Dish, Menu Ticker |
| `/images/food/heritage-beef-aliya.jpg` | Signature Dish, Menu Ticker |
| `/images/food/dawa-cocktail.jpg` | Signature Dish, Menu Ticker |
| `/images/locations/restaurant-dining-vibe.jpg` | Story Preview, About Page |
| `/images/people/` | ⚠️ **Empty** (only `.gitkeep`) |

> [!NOTE]
> Only **6 images** exist for the entire site. Several are reused across 3–4 sections.

---

## ✅ Places Currently Using Images (Working)

| # | Component | Image(s) | Notes |
|---|-----------|----------|-------|
| 1 | [hero.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/hero.tsx) | `hero-tilapia-feast.jpg` | Main hero feature image via `next/image` |
| 2 | [signature-dish.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/signature-dish.tsx) | All 5 food images | Dynamic tab-based dish gallery |
| 3 | [menu-ticker.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/menu-ticker.tsx) | All 5 food images | Scrolling dish cards with thumbnails |
| 4 | [cta-section.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/cta-section.tsx) | `hero-tilapia-feast.jpg` | Background image with 20% opacity overlay |
| 5 | [story-preview.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/story-preview.tsx) | `restaurant-dining-vibe.jpg` | "Our Story" section banner |
| 6 | [about/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/about/page.tsx) | `restaurant-dining-vibe.jpg` | About page (only 1 image for the entire page) |

---

## 🔴 P0 — Critical: Explicit Placeholders & Core Missing Images

These are places where the code **already expects images** or has **explicit placeholder comments**.

### 1. Founder Portrait — About Page
> [!CAUTION]
> The about page has an **explicit empty placeholder box** with the text:
> `"Portrait photo · add to public/images/people/"`

- **File**: [about/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/about/page.tsx) (lines ~31–33)
- **What's needed**: Portrait photo of Mary Auma Oliech (founder)
- **Path**: `/public/images/people/mama-oliech-portrait.jpg`

### 2. Menu Item Cards — No Image Support
> [!IMPORTANT]
> `MenuItemCard` currently renders **zero images** — no `imageUrl` prop exists. The entire menu page is a plain text list. For a restaurant, this is the single biggest UI gap.

- **File**: [menu-item-card.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/menu/menu-item-card.tsx)
- **What's needed**: Add `image` prop support + food photos for each menu item category (fish, chicken, beef, sides, drinks)
- **Impact**: 🔥 **Massive** — the menu is the core reason visitors come to the site

### 3. Testimonials — No Avatar Images
> [!IMPORTANT]
> Reviewer cards for Mark Zuckerberg, CNN Travel, and Chef/Food Critic use **plain text names only** — no photos, no logos.

- **File**: [testimonials.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/testimonials.tsx)
- **What's needed**: Reviewer portrait photos + brand logos (CNN logo, etc.)
- **Path**: `/public/images/people/` (currently empty)

### 4. Celebrity Wall (QR Portal) — No Celebrity Photos
> [!WARNING]
> Renders celebrity visits (Barack Obama, Mark Zuckerberg, Anthony Bourdain, Idris Elba) as **plain text cards with no photos**.

- **File**: [celebrity-wall.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/qr/celebrity-wall.tsx)
- **What's needed**: Celebrity guest profile photos/avatars
- **Path**: `/public/images/people/`

### 5. OpenGraph / Social Share Image — Missing
> [!WARNING]
> The root layout metadata omits `openGraph.images`. Links shared on WhatsApp, Twitter, and Facebook will **not show a preview image**.

- **File**: [layout.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/layout.tsx) (lines ~40–46)
- **Fix**: Add `images: ['/images/food/hero-tilapia-feast.jpg']` to the openGraph config

---

## 🟠 P1 — High Impact: Would Transform the UI

### 6. About Page — Needs Multiple Photos
- **File**: [about/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/about/page.tsx)
- Currently uses only **1 image** for an entire story page
- **What's needed**:
  - Founder portrait (see P0 #1 above)
  - Dennis Oliech & Lilian Oliech family photos
  - Historical photo of the original restaurant
  - Kitchen action shot (chefs at work)

### 7. Location Cards — Has `imageSrc` Prop But Doesn't Render It
- **File**: [location-card.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/locations/location-card.tsx)
- **Data file**: [locations.ts](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/lib/data/locations.ts) — `BRANCHES[0]` has `imageSrc: undefined`
- The `Branch` type **already defines** `imageSrc?: string` but the component **never renders it**
- **What's needed**: Unique exterior/interior photo per branch + component update to render images

### 8. Location Detail Pages — Plain Text
- **File**: [locations/\[slug\]/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/locations/[slug]/page.tsx)
- **What's needed**: Branch hero banner image

### 9. Hero Section — Celebrity Trust Bar
- **File**: [hero.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/hero.tsx) (lines ~78–88)
- Mentions Obama, Zuckerberg, Bourdain visits but uses **text only**
- **What's needed**: Small circular celebrity avatar badges for social proof

### 10. Story Preview — Celebrity & Founder Narrative
- **File**: [story-preview.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/story-preview.tsx)
- Zuckerberg visit card uses only a Lucide `Globe2` icon (lines ~31–41)
- Founder narrative section (lines ~65–72) is text-only
- **What's needed**: Celebrity visit photo + founder portrait

---

## 🟡 P2 — Medium Impact: Visual Polish

### 11. CTA Section — Reused Image
- **File**: [cta-section.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/cta-section.tsx)
- Reuses `hero-tilapia-feast.jpg` (already hero + signature + ticker). Feels repetitive.
- **What's needed**: Dedicated atmospheric/crowd dining background

### 12. Catering Page — No Hero Image
- **File**: [catering/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/catering/page.tsx)
- Catering packages (Whole Mbuzi, Fish & Pilau feast) have **no imagery**
- **What's needed**: Buffet spread / group feast / catering event photo

### 13. Header Logo — CSS Icon Only
- **File**: [header.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/layout/header.tsx)
- Uses a CSS circular div with Lucide `Flame` icon instead of a proper logo
- **What's needed**: Official logo image or SVG (`/images/logo.svg`)

### 14. Footer — No Branding
- **File**: [footer.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/layout/footer.tsx)
- Text-only footer, no logo or partner badges
- **What's needed**: Logo image + delivery partner logos (Uber Eats, Bolt Food)

### 15. Mobile Nav — No Logo
- **File**: [mobile-nav.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/layout/mobile-nav.tsx)
- **What's needed**: Brand logo at top of mobile nav panel

### 16. Menu Category Headers — Plain Text
- **File**: [menu-category.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/menu/menu-category.tsx)
- Category sections (Fish, Heritage, Greens & Sides, Drinks) are plain text headings
- **What's needed**: Category banner images or decorative food icons

### 17. Food Guide Cards (QR) — Text-Only Cultural Guide
- **File**: [food-guide-card.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/qr/food-guide-card.tsx)
- Describes Lake Victoria fish, Ugali, Greens, etc. with **no food photos**
- **What's needed**: Food thumbnails for each guide card

---

## 🟢 P3 — Polish: Nice-to-Have

### 18. Signature Dish Tabs — Text-Only Selectors
- **File**: [signature-dish.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/signature-dish.tsx) (lines ~83–100)
- Tab buttons are text pills. Tiny circular dish thumbnails inside each tab would make switching more visual.

### 19. Menu Ticker — CTA Card Has No Image
- **File**: [menu-ticker.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/marketing/menu-ticker.tsx) (lines ~126–141)
- The 6th grid card is a dark CTA box without an image, breaking visual consistency with the other 5 dish cards.

### 20. Contact Page — No Atmosphere
- **File**: [contact/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/contact/page.tsx)
- **What's needed**: Restaurant interior photo + map graphic

### 21. Visit Page — Text Links Only
- **File**: [visit/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/(marketing)/visit/page.tsx)
- Uber Eats & Bolt Food delivery links are text-only
- **What's needed**: Delivery partner logos + restaurant ambiance photo

### 22. Table QR Portal — 100% Text-Based
- **Files**: [table/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/table/page.tsx), `celebrities/`, `food-guide/`, `menu/`, `story/`
- The entire in-restaurant QR experience has **zero images**
- **What's needed**: Food thumbnails, celebrity photos, founder portrait throughout

### 23. 404 & Error Pages — Generic
- **Files**: [not-found.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/not-found.tsx), [error.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/error.tsx)
- **What's needed**: Fun branded illustrations (empty plate, lost fish, etc.)

### 24. Staff Portal — Plain Training Modules
- **Files**: [staff/page.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/app/staff/page.tsx), `training/[module]/`
- **What's needed**: Dish presentation photos, service diagrams

### 25. Catering & Contact Forms — No Side Imagery
- **Files**: [catering-form.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/forms/catering-form.tsx), [contact-form.tsx](file:///home/elvin/Projects/tutorials/potential_sales/restaurants/mama_oliech_demo/components/forms/contact-form.tsx)
- **What's needed**: Side photography next to form fields (catering spread, dining room)

---

## 📊 Full Priority Matrix

| Priority | # | Location | What's Needed | Impact |
|----------|---|----------|---------------|--------|
| 🔴 P0 | 1 | About Page — Founder Box | Founder portrait (explicit placeholder exists!) | Broken placeholder |
| 🔴 P0 | 2 | Menu Item Cards | Food photos + add `image` prop | Massive — core page |
| 🔴 P0 | 3 | Testimonials | Reviewer avatars + brand logos | High — trust & credibility |
| 🔴 P0 | 4 | Celebrity Wall (QR) | Celebrity guest photos | High — flagship feature |
| 🔴 P0 | 5 | OpenGraph Metadata | Add OG image to layout.tsx | SEO / social sharing |
| 🟠 P1 | 6 | About Page (full) | Family, kitchen, history photos | High — story depth |
| 🟠 P1 | 7 | Location Cards | Branch photos + render `imageSrc` | Medium-High |
| 🟠 P1 | 8 | Location Detail Pages | Branch hero banner | Medium-High |
| 🟠 P1 | 9 | Hero — Celebrity Bar | Small avatar badges | Medium — social proof |
| 🟠 P1 | 10 | Story Preview — Narrative | Celebrity + founder photos | Medium |
| 🟡 P2 | 11 | CTA Section | Unique background (not reused) | Medium — reduce repetition |
| 🟡 P2 | 12 | Catering Page | Buffet/event hero image | Medium |
| 🟡 P2 | 13 | Header Logo | SVG/image logo | Medium — branding |
| 🟡 P2 | 14 | Footer | Logo + partner badges | Medium — branding |
| 🟡 P2 | 15 | Mobile Nav | Logo image | Low-Medium |
| 🟡 P2 | 16 | Menu Categories | Category banners/icons | Low-Medium |
| 🟡 P2 | 17 | Food Guide Cards (QR) | Food thumbnails | Low-Medium |
| 🟢 P3 | 18 | Signature Dish Tabs | Tiny thumb in tabs | Low — polish |
| 🟢 P3 | 19 | Ticker CTA Card | Background image | Low — consistency |
| 🟢 P3 | 20 | Contact Page | Interior photo + map | Low |
| 🟢 P3 | 21 | Visit Page | Partner logos + ambiance | Low |
| 🟢 P3 | 22 | Table QR Portal (all) | Images throughout | Low-Medium |
| 🟢 P3 | 23 | 404 / Error Pages | Fun branded illustrations | Low — delight |
| 🟢 P3 | 24 | Staff Portal | Training visuals | Low |
| 🟢 P3 | 25 | Form Components | Side photography | Low |

---

## 🎯 Top Recommendations

Start with the **5 P0 items** — they'll have the most dramatic impact:

1. **Generate founder portrait** → fix the explicit broken placeholder on the About page
2. **Add image support to `MenuItemCard`** → generate dish photos and connect them to menu data
3. **Generate reviewer avatars** → populate `/public/images/people/` for testimonials
4. **Generate celebrity photos** → for the QR portal celebrity wall
5. **Add OG image to metadata** → quick 1-line fix in `layout.tsx`

These changes will transform the site from a text-heavy template to a visual, premium restaurant experience.
