# LIVO Property Services — CLAUDE.md

## Last updated
2026-10-12

## 2026-10-12 — Minimal mobile UI (TEST ONLY — `v1.0`)
- Branch `codex/minimal-ui`, based on `v1.0`; PR targets `v1.0` only.
- Homepage hero preserved. Removed the popular row, boxed returning-customer prompt, service-photo overlays, and boxed trust messages. Mobile order: hero, services, results, Why LIVO, areas, footer.
- Category/service headers now put text on white before clean photos. Shared section gaps: 40px mobile / 96px desktop. Lighter service rows, add-ons, footer, and booking presentation; existing brand colors/fonts and five mobile navigation destinations retained.
- Included items expand accessibly after the first four on mobile. Reduced motion disables animation and explicitly renders reveal content and success icons in their final visible state. Selection/field boundaries and touch targets improved.
- No changes to service data/prices/names, API, URLs, Netlify settings, Supabase, booking payloads, quote steps, sign-in logic, or test mode. Existing yellow test bars retained.
- Verification evidence and screenshots: `docs/minimal-ui/`. Checks run against the local production build in test mode; the existing hosted `v1.0` site remains the baseline until this PR is merged.


## 2026-10-12 — Residential/Commercial split, quotes with photos, saved customers (TEST ONLY — `v1.0`)
Plan doc: "LIVO Website v1.0 — Action Plan" (Claude Docs, 2026-10-12). Ali approved every recommendation in it.
- **Two customer types.** Homepage "What do you need?" has Residential | Commercial tabs (`CARDS` in `src/data/services.ts`). Commercial tab = Commercial Cleaning, Restaurant & Kitchen, Post-Construction, Junk & Debris (→ Renovation Debris). Hero (redesigned 2026-10-12 evening, Ali: "too crowded"): minimal — small line "LIVO Property Services · Tri-Cities", headline in dark text on white (no text over the photo), "We make it happen." in purple, clean rounded photo, then two tiles: lime "For my home · Instant price" (→ /book?seg=residential) and light-purple "For my business · Free quote" (→ /book?seg=commercial). Mobile order: words → photo → tiles; desktop: words + tiles left, photo right. Header is solid (no longer overlay). Services page, menu and footer grouped the same way.
- **Renames + new URLs (SEO):** interior → `house-cleaning` (Regular Cleaning, Deep Cleaning, Weekly & Bi-Weekly Cleaning), move → `move-cleaning/move-in-move-out-cleaning`, construction → `construction-cleaning/post-construction-cleaning`, airbnb → `airbnb-cleaning` (Turnover Cleaning, Deep Reset), junk → `junk-removal` (`junk-removal-by-load`, `renovation-debris`), commercial → `commercial-cleaning` (`strata-cleaning` was common-areas), restaurant → `restaurant-kitchen-cleaning`. Every old URL (live + old test) 301s in `netlify.toml`.
- **Each division has** `segment`, `intro` (first sentence with the SEO phrase), `seoTitle`, `keyword`, `notIncluded`, `crossSell` (component `src/components/Extras.astro`). FAQPage schema on category pages; business schema (legal name, 15 areas, services) in `Base.astro`.
- **Quote flow.** `quote: true` on a sub-service = customer sends a quote request instead of booking. All Commercial, Restaurant, Renovation Debris and Post-Construction are quotes. Post-Construction keeps "from $349 / $499 / $649" as estimates (draft tag removed, household add-ons removed). Booking page steps for quotes: service → how to quote/size → **photos & details** (up to 10 photos, ≥1 unless "Free Site Visit"; business name required for business) → how often → **preferred date** → details. Quote prices never show $0.
- **Discount:** 15% first booking (was 30%), residential fixed-price bookings only. `FIRST_TIME_DISCOUNT` in services.ts.
- **Removed claims:** "Get your deposit back", "Upfront prices", "Real LIVO jobs, not stock photos", "Licensed & insured" (badge, footer, sidebar, commercial FAQ), "GST included" — none confirmed. Put "Licensed & insured" back only once liability insurance + WorkSafeBC are in place; add "+ GST" only if LIVO is GST-registered.
- **Saved customer details.** "Save my details" box (on by default) at the end of booking; `/my-livo` = sign in with phone + 6-digit text code (no password), saved places (Book here / Remove), past jobs (Book again / Ask again). Booking page fills name/phone/email and lets the customer pick a saved place (`?place=`). New `/privacy` page (BC PIPA).
- **Bottom tab bar** now 5 items: Home, Services, Book, My LIVO, Call. Desktop menu has My LIVO.
- **Video slots** ready: `HERO_VIDEO` in services.ts (homepage) and `video` on a division (e.g. restaurant). Plays muted, pause button, off for reduce-motion and data-saver. No clips yet.
- **TEST MODE (important):** `src/lib/api.ts` checks the address. Anywhere except livoland.com (v1.0 test site, previews, localhost) nothing is sent or saved on a server: bookings/quotes return `TEST-xxxxxx`, photo upload is simulated, sign-in code is always **123456** and shown on screen, the "account" lives in the browser (localStorage `livo-test-account`). Yellow "Test version" bar shows on /book and /my-livo. Ali chose this (free) over a paid test database (2026-10-12): the Supabase connector only sees the paid org, not "Javids Free".
- **Backend written, NOT deployed:** `supabase/migrations/0002_quotes_customers.sql` (bookings gets kind/segment/address/photos…, new customers, places, login_codes, customer_sessions, private `quote-photos` bucket), `supabase/functions/send-booking-confirmation` v2 (quotes, photos, saved details, LIVO alert with 7-day photo links), new `supabase/functions/customer-auth`. Both type-check (deno check); NOT yet run against a database.
- Checked: build OK (29 pages); axe WCAG 2.2 AA = 0 violations on home, services, category, service, booking (incl. photo step), My LIVO (phone + code), privacy at 390 px; no horizontal scroll; full test-mode journeys pass (home booking $360 → $306 with 15%, restaurant quote with photo, sign out/in, Book here).
- Known gaps: homepage before/after shows two different spots (sink vs shower) — needs a matching real pair. Commercial pages still use the team-van photo, Restaurant a home kitchen. Privacy page has no email contact yet (phone only).

### GO-LIVE CHECKLIST for this change (do in order, only after Ali says "go live")
1. Back up live: tag `main` (e.g. `backup/pre-v1.0-2026-10`).
2. Apply `0002_quotes_customers.sql` to project `livo`; run Supabase security advisors.
3. Deploy `send-booking-confirmation` (v2) and `customer-auth` with verify_jwt=false (they check their own input/session).
4. Set secrets: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` (sign-in codes need these — without Twilio nobody can sign in), `RESEND_API_KEY`, `RESEND_FROM`, `LIVO_ALERT_PHONE`, `LIVO_ALERT_EMAIL`.
5. Merge `v1.0` → `main`. On livoland.com make one real booking, one quote with a photo, and one sign-in; then delete those test rows.
6. Update SUPABASE_MIGRATIONS.md (0002 applied) and this file.

## ⚠ 2026-10-11 — LIVE vs TEST (read first)
- Ali does NOT want today's work live. `main` (livoland.com) was restored to the 2026-09-26 site (commit 0a4209d content) on 2026-10-11.
- Today's work (UI polish + services restructure, entries below) lives ONLY on `v1.0` (test: v1-0--darling-marigold-ff0def.netlify.app) and branch `services-v3`.
- Never push to `main` unless Ali explicitly says to put it on livoland.com — and confirm once before doing it.

## 2026-10-11 — Services restructure + cleaner mobile home (TEST ONLY — not on livoland.com)
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
- Branch: `services-v3` = `v1.0` (test). Was briefly on `main`, then removed at Ali's request.

## 2026-10-11 — UI polish: motion + accessibility (TEST ONLY — not on livoland.com)
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
- Branch: included in `v1.0` (test). Was briefly on `main`, then removed at Ali's request.
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
- `draft: true` on a sub-service = price not yet approved by Ali (shows a "Draft prices" tag). Currently: none.
- `price: null` = "Quote"; `quote: true` = request a quote with photos instead of booking.
- Customer types / homepage cards: `segment` on each division + `CARDS` in `src/data/services.ts`.
- Bookings, quotes, photo upload, sign-in: `src/lib/api.ts` (test mode everywhere except livoland.com).
- Pages: `/` `/services` `/services/<division>` `/services/<division>/<sub>` `/book` `/my-livo` `/privacy`.
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
