# LIVO Property Services — CLAUDE.md

## Last updated
2026-07-30

## What changed (this session)
Replaced gradient placeholders with real before/after photography across three service pages in `index.html`, and upgraded the Junk Removal service card image on the homepage.

- **Airbnb Turnover** (`sba4`) → `airbnb-before.jpg` / `airbnb-after.jpg`
- **Interior Cleaning** (`sba5`) → `interior-before.jpg` / `interior-after.jpg`
- **Power Washing & Windows** (`sba0`) → `power-before.jpg` / `power-after.jpg`
- **Junk Removal homepage card** → `junk-removal-team.jpg` replaced with the branded LIVO truck photo (same filename, no markup change)

New CSS modifier `.svc-ba-slider.photo` scopes photo sliders to 460px tall on desktop and 280px on mobile, leaving the Junk Removal slider (`sba3`) on its original 500px inline sizing.

## Current branch state
- `v1.0` merged into `main` and deployed to livoland.com
- Both branches level as of this session

## Image encoding conventions
- Before/after slider photos: 2000px wide, JPEG quality 88, 4:4:4 subsampling, progressive (~370–430 KB)
- Detailed textures (concrete, stone) compress poorly — drop to quality 84 to stay under ~600 KB
- Service card images: native resolution, quality 90
- Cards use `object-fit: cover` at 400px tall, so 16:9 source images crop hard to centre

## Known issues / cleanup
- `AirBnB Before.png` and `AirBnB After.png` (2.1 MB each) are unused originals left in the repo root — safe to delete
- `index_1.html`, `index_3.html`, `index_5.html`, `index.backup.html`, `livo-index-FINAL.html`, `livo-lite-v2.html` are stale copies
- Homepage hero and several service hero images are still base64-embedded, keeping `index.html` at ~613 KB

## Pending / not yet done
- Real confirmation emails: needs EmailJS account (Service ID, Template ID, Public Key)
- `livoland.ca` → `livoland.com` redirect may need Netlify DNS configuration

## Known workflow notes
- Do **not** use the GitHub web editor on `index.html` — it renders blank at this size. Use the upload page: fetch raw with a cache-bust, patch the string in memory, build a `File` via `DataTransfer`, assign through the native `files` setter, dispatch `change`, then set the commit message and click **Commit changes**.
- Binary files cannot be pushed from the Claude sandbox — generate them, share via the outputs folder, and have Ali drag them onto the same upload page so they land in one commit.
- Netlify rebuilds take roughly 70–90 seconds. Browsers cache `index.html` aggressively; hard-refresh to verify.

## Workflow
All work goes to `v1.0` first (staging: `v1-0--darling-marigold-ff0def.netlify.app`). Never merge to `main` without Ali's explicit approval.
