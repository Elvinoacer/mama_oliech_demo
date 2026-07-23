# Photo & asset checklist

## Demo images (live now)

Menu, testimonials, and celebrity wall use **Unsplash remote URLs** from:

→ `lib/data/unsplash.ts`

Configured in `next.config.ts` (`images.remotePatterns` → `images.unsplash.com`).

| Surface | Status |
| ------- | ------ |
| Menu item cards (all categories) | Demo Unsplash photos |
| Testimonials avatars | Demo Unsplash portraits / press imagery |
| Celebrity wall (QR + About) | Demo Unsplash stock portraits (not official likenesses) |

**Before production:** replace with rights-cleared real photos of Mama Oliech dishes, staff, and guests. Do not ship stock faces labeled as real celebrities.

---

## Optional local assets (`public/`)

Drop optimized images into the folders below when you have real photography.

### Food (`public/images/food/`)

| File (suggested) | Subject | Status |
| ---------------- | ------- | ------ |
| `tilapia-fried.jpg` | Whole fried tilapia plate | Prefer over Unsplash |
| `tilapia-wet-fry.jpg` | Wet-fry / stew style | Prefer over Unsplash |
| `greens-osuga.jpg` | Traditional greens | Prefer over Unsplash |
| `ugali-plate.jpg` | Full plate with ugali | Prefer over Unsplash |
| `hero-dining.jpg` | Dining room / atmosphere | Needed for hero |

### People (`public/images/people/`)

| File (suggested) | Subject | Status |
| ---------------- | ------- | ------ |
| `mama-oliech.jpg` | Founder portrait (rights-cleared) | Needed |
| `dennis-oliech.jpg` | Optional heritage photo | Needed |
| `team-hurlingham.jpg` | Flagship team | Optional |
| Celebrity / press photos | Rights-cleared only | Replace Unsplash stand-ins |

### Locations (`public/images/locations/`)

| File (suggested) | Subject | Status |
| ---------------- | ------- | ------ |
| `hurlingham-exterior.jpg` | Marcus Garvey Rd exterior | Needed |
| `hurlingham-interior.jpg` | Dining room | Needed |
| `kiambu-road-exterior.jpg` | Kiambu / Ridgeways branch | Needed |

### Menus (`public/menus/`)

| File | Notes | Status |
| ---- | ----- | ------ |
| `hurlingham.pdf` | Easy-to-update prices for flagship | Needed |
| `kiambu-road.pdf` | If menu differs by branch | Optional |

### Brand

| Asset | Notes | Status |
| ----- | ----- | ------ |
| Favicon | Replace `app/favicon.ico` | Needed |
| Logo / wordmark | Optional SVG in `public/` | Optional |
| OG share image | `app/opengraph-image` | Generated |

When local files land, point `imageSrc` in `lib/data/menu.ts` / `story.ts` / `unsplash.ts` at `/images/...` paths instead of Unsplash URLs.
