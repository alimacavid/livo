# LIVO Property Services — CLAUDE.md

## Last updated
2026-09-26

## 2026-09-26 — v2 rebuild in Astro + Tailwind (branch `v2-astro`)
- What changed: whole front end rebuilt as an Astro 7 + Tailwind v4 static site. App-style mobile UI (bottom tab bar: Home / Services / Book / Call; sticky Book bar on service pages).
- Hero now shows only "Fall in love with your property. We make it happen." ("Trusted Property Services" removed — Ali's decision).
- Phone everywhere: **888-802-LIVO** (tel +18888025486). 604 number removed.
- Every sub-service has its own page + URL: `/services/<division>/<sub>` with price table, what's included, before/after, add-ons, FAQ.
- Booking rebuilt at `/book` (6 steps: service → size → add-ons → frequency → date/time → details). Posts the SAME payload to the existing Supabase edge function `send-booking-confirmation` (address + notes go in `notes`). Old `/book.html` 301-redirects to `/book` (netlify.toml).
- Stats (52+ projects etc.) and the 3 testimonials were NOT carried over — add back only with real reviews.
- Later same day: popular add-ons on service pages made selectable (carry into /book via `?a=`); "LIVO Property Services" line added above home hero headline. A bigger home redesign was tried and reverted at Ali's request — he wants the home page kept minimal.
- Branch state: `v2-astro`, `v1.0` and `main` all level. Ali approved go-live 2026-09-26 → livoland.com now runs the Astro site.

## Where things live
- **All services + prices: `src/data/services.ts`** — the ONLY place prices exist. Sub-service pages, homepage "From $X", and the booking page all read it. Change a number there → whole site updates.
- `draft: true` on a sub-service = price not yet approved by Ali (shows a "Draft prices" tag). Currently: After-Construction Clean-Up.
- `price: null` = "Custom quote".
- Layout / header / tab bar / footer: `src/layouts/Base.astro`
- Brand tokens (colors, fonts, radius): `src/styles/global.css` (`@theme`). Custom classes use `@utility` (Tailwind v4 — `@apply` of a plain class fails).
- Photos: `src/assets/photos/` (Astro auto-resizes to WebP). Static files (favicons, manifest, careers.html): `public/`
- Old v1 files kept for reference only in `_legacy/` (not deployed).

## Build / deploy
- `npm install` → `npm run build` → output `dist/`. `npm run dev` for local.
- Netlify reads `netlify.toml` (build command + publish `dist`, Node 22). Branch deploys build automatically once pushed.

## Known issues / next
- Claude GitHub App installed on `alimacavid/livo` (2026-09-26) — cloud sessions can push.
- Netlify production must build with `netlify.toml` (npm run build → dist). If livoland.com shows a blank/404 after deploy, check Netlify site build settings aren't overriding it.
- Prices are the v1 prices. Market research (`claude/livo-competitor-pricing-research.md` in the Livo project) says Junk, Power Washing and Airbnb are underpriced — Ali to decide.
- Airbnb has no own photos beyond before/after; power washing sub-pages share one photo — shoot per-service photos.
- careers.html is still the old standalone page (phone fixed only).
- Real confirmation emails: Resend/Twilio secrets on the Supabase function must be set.

## Workflow
Work on a branch → Ali approves → `v1.0` (staging: `v1-0--darling-marigold-ff0def.netlify.app`) → Ali approves → `main` (livoland.com). Never merge to `main` without Ali's explicit approval.
