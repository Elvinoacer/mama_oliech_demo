# Table QR deployment notes

## Final URL pattern

| Branch | QR URL |
| ------ | ------ |
| Hurlingham (flagship) | `https://YOUR_DOMAIN/table?branch=hurlingham` |
| Kiambu Road | `https://YOUR_DOMAIN/table?branch=kiambu-road` |

Local testing:

- http://localhost:3000/table?branch=hurlingham
- http://localhost:3000/table?branch=kiambu-road

## Physical blocks

Ops plan: custom wooden blocks on tables engraved/printed with dynamic QR codes.

1. Generate QR for each branch URL above (high error correction for wood/print wear).
2. Print test stickers first; confirm mobile open time on mid-range Android.
3. Engrave or affix final codes on wooden blocks.
4. Staff script: “Scan to browse our menu and learn Mama Oliech’s story while we prepare your fish.”

## Content on scan

Portal routes (no login):

- `/table` — hub
- `/table/story` — founder & family
- `/table/celebrities` — guest wall
- `/table/food-guide` — cultural guide
- `/table/menu` — menu (prices in house)

Table *ordering* is intentionally off (`FEATURES.enableTableOrdering = false`) until POS is ready.
