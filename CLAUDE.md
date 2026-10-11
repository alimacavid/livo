# LIVO Property Services — CLAUDE.md

## Last updated
2026-10-11

## 2026-10-11 — Services restructure + cleaner mobile home (branch `services-v3`)
- Divisions now (7): Interior Cleaning (Standard, Deep, Recurring) · Move-In / Move-Out · After-Construction Clean-Up · Airbnb Turnover · Junk Removal · Commercial Cleaning (Office, Retail & Storefront, Strata & Common Areas, Commercial Clean-Up) · Restaurant & Kitchen (Kitchen Deep Clean, Scheduled Kitchen Cleaning, Front-of-House & Dining). 16 sub-services.
- REMOVED (Ali, 2026-10-11): whole Power Washing & Windows division — power washing, windows, gutters, deck/fence, roof, exterior package. Old URLs 301 to /services (netlify.toml). Carpet & Upholstery stays inactive.
- Move-In/Move-Out and After-Construction moved out of Interior into their own divisions (same prices; After-Construction still `draft`). Old URLs 301 to new ones. They share Interior add-ons (`INTERIOR_ADDONS`) and are one-time only.
- Commercial + Restaurant: custom quote only (`price: null`, tiers "Send Photos" / "Free Site Visit") — Ali's choice, no prices approved yet. No add-ons; frequencies have no discount. Hood/duct cleaning stated as out of scope in Restaurant FAQ. Time windows: Before Opening / Daytime / After Hours (commercial), Before Opening / After Closing / Closed Day (restaurant) — confirm with Ali.
- Booking: add-ons step skipped when a division has none; "How often" skipped when only one option; step counter adjusts. Quote requests: button "Request quote", success "Quote request sent!", no 30% first-time toggle, `firstTime:false`, notes include "QUOTE REQUEST".
- Home (mobile): "How it works" and bottom CTA hidden on mobile (tab bar has Book + Call); square app-style service tiles, last tile full width; one-service divisions open straight to the service; areas show 3 + "+12 more".
- `minPrice()` now returns null when a division is quote-only → shows "Custom quote".
- Careers page service chips updated (Carpet + Power Washing removed).
- Checked: all 27 pages 200, axe WCAG 2.2 AA 0 violations at 390px, no horizontal scroll, booking tested for all 7 divisions + quote submit payload.
- Known gaps: Commercial uses team-van photo, Restaurant uses a home-kitchen photo — need real photos. careers.html says "Paid per job / contract-based" — check against current pay terms.
- Branch: `services-v3` → `v1.0` staging. Pending Ali approval for `main`.

## 2026-10-11 — UI polish: motion + accessibility (LIVE)
- What changed: no layout changes (Ali wants the mobile app kept minimal). Added motion + WCAG 2.2 AA fixes using UI/UX Pro Max guidance. Brand colors/fonts unchanged.
- Motion (all in `src/styles/global.css`, one set of timing tokens `--ease-*`, `--dur-*`):
  - Native page-to-page transitions (`@view-transition`, no JS); header + bottom bar stay fixed between pages (`view-transition-name`).
  - Hero: text rises in one piece at a time (`.rise` + `--i`), photo slow zoom (`.kenburns`), light sweep on main lime buttons (`.sheen`), drifting glow on CTA.
  - Cards stagger in on scroll (`data-reveal`, auto stagger), spring press on tap (`.press`), active tab indicator pop.
  - Prices "bump" when they change (service page sticky bar + booking total).
  - Booking steps slide left/right with direction; success screen: tick draws itself + ring + confetti.
  - Before/after slider nudges once when first seen.
  - Everything turns off with "Reduce motion" (prefers-reduced-motion).
- Accessibility: skip link, visible focus ring everywhere (purple; lime on dark via `.on-dark`), `aria-current` on tabs/nav, desktop Services menu opens on keyboard focus + Esc closes, decorative images `alt=""`, reveal content stays visible without JS (`html.js`), new `--color-lime-ink #5C6600` for lime TEXT (old `lime-deep` as text failed contrast — use lime-deep for fills only), tab labels 11px darker gray, touch targets ≥44px, services chips highlight current section.
- Booking: `aria-pressed` on every option, focus moves to each step heading + screen-reader announcement, keeps focus on the option you tapped, calendar days have full date labels, progress bar is a real progressbar, inline error under each field + focus first bad field, first-time discount is a real checkbox.
- Checked: build OK; axe-core WCAG 2.2 AA scan = 0 violations on home, services, division, sub-service and booking steps at 390px; no horizontal scroll.
- Branch: `ui-polish` → `v1.0` (staging) → `main` (livoland.com). Ali approved go-live 2026-10-11. `ui-polish`, `v1.0`, `main` all level.
- Not in this change: Ali's 2026-10-07 service changes (remove Power Washing, add Commercial / Restaurant Kitchen, split Move-in/out + After-construction) — still to do in `src/data/services.ts`.

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
- Prices are the v1 prices. Market research (`claude/livo-competitor-pricing-research.md` in the Livo project) says Junk and Airbnb are underpriced — Ali to decide.
- Airbnb has no own photos beyond before/after; Commercial and Restaurant have no real photos yet — shoot per-service photos.
- careers.html is still the old standalone page (phone fixed only).
- Real confirmation emails: Resend/Twilio secrets on the Supabase function must be set.

## Workflow
Work on a branch → Ali approves → `v1.0` (staging: `v1-0--darling-marigold-ff0def.netlify.app`) → Ali approves → `main` (livoland.com). Never merge to `main` without Ali's explicit approval.
