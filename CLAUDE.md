# LIVO Property Services — CLAUDE.md

## Last updated
2026-10-11

## 2026-10-11 — UI polish: motion + accessibility (branch `ui-polish`, NOT merged)
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
- Branch: `ui-polish` (from main). Pending: Ali approval → `v1.0` staging → Ali approval → `main`.
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
- Prices are the v1 prices. Market research (`claude/livo-competitor-pricing-research.md` in the Livo project) says Junk, Power Washing and Airbnb are underpriced — Ali to decide.
- Airbnb has no own photos beyond before/after; power washing sub-pages share one photo — shoot per-service photos.
- careers.html is still the old standalone page (phone fixed only).
- Real confirmation emails: Resend/Twilio secrets on the Supabase function must be set.

## Workflow
Work on a branch → Ali approves → `v1.0` (staging: `v1-0--darling-marigold-ff0def.netlify.app`) → Ali approves → `main` (livoland.com). Never merge to `main` without Ali's explicit approval.
