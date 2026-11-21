# Codex task — LIVO website: calm, minimal UI pass (2026-11-17)

Repo: `alimacavid/livo` · Start from branch **`prices-nov17`**.

## 0. Safety rules (do not break these)
1. Create a new branch `codex/ui-nov17` from `prices-nov17`. Open a pull request into **`prices-nov17`**.
2. **Never** push to, merge into, or open a PR against `main` or `v1.0`.
3. Read `CLAUDE.md` first (top entry 2026-11-17 explains the current state).
4. Do **not** change: `src/data/services.ts` (services, prices, wording), `src/lib/api.ts`, `netlify.toml`, anything in `supabase/`, the booking logic in `src/pages/book.astro` (only its look).
5. Do not change any URL, price, service name, or the order of services. No new npm packages. No new fonts or colours.
6. Do not add claims that are not on the site now (no "licensed & insured", no "GST included", no reviews, stars or stats).
7. Keep working: booking flow, quote flow with photo upload, My LIVO sign-in, Residential/Commercial tabs, all accessibility features, test mode.

## 1. Goal
The owner says the site still feels crowded and "not good". Make every page **calm and minimal, like a good phone app**: fewer boxes, more white space, one clear action per screen. Mobile first (390 px), then desktop.

**Reference style = the homepage hero** in `src/pages/index.astro` (section `HERO (minimal …)`): dark words on white, clean rounded photo with nothing on top, big solid rounded choice tiles.

## 2. Brand (keep exactly)
Tokens in `src/styles/global.css` (`@theme`) only: purple `#6B3FA0`, lime `#C4D600`, ink `#2C2C2C`, `purple-soft`, `lime-soft`, `cloud`, `line`, `muted`. Lime is a fill colour only (use `text-lime-ink` for lime text). Montserrat headings, Inter body. Radius: 8 px fields, 12 px cards, 20 px tiles, 100 px buttons. Icons only from `src/components/Icon.astro`.

## 3. Page changes

### Homepage `src/pages/index.astro` (do NOT change the hero)
1. Service cards: **no text over photos**. Photo on top (rounded), name + "From $X" (or "Free quote") in dark text underneath on white. Keep the icon chip out of the photo.
2. Trust section: replace the 4 grey boxes with a compact list of 3 lines (icon + one short line, no boxes): "Instant prices or a free quote", "Pay after the job", "Uniformed LIVO crews". One row on desktop.
3. Keep "See the difference", "Where we work". Same section spacing everywhere: 40 px mobile, 96 px desktop.

### Category pages `src/pages/services/[division]/index.astro`
1. Header like the homepage: back link, small line ("Residential"/"Commercial"), H1, tagline and price **on white**, then a clean rounded photo (no text on the photo).
2. "Choose a service": lighter rows (thin divider lines, no heavy borders), clear chevron.
3. Add-ons: simple 2-column list (name, price, unit) instead of grey boxes.

### Service pages `src/pages/services/[division]/[sub].astro`
1. Same header style as category pages (words on white, clean photo, price chip under the title).
2. Keep the price/size selector and the sticky mobile bottom bar (price + Call + Book/Get quote). That button is the only lime button on the page.
3. "What's included": show first 4 items, then a "Show all" button (`aria-expanded`) on mobile.
4. "Popular add-ons": keep tap-to-add, but lighter (no grey fill when not selected; thin border).

### Services list `src/pages/services/index.astro`
Section labels "Residential" / "Commercial"; rows without borders, separated by thin lines.

### Booking `book.astro`, My LIVO `my-livo.astro`, Privacy `privacy.astro`
Spacing and visual polish only. Do not change steps, logic, data sent or test mode. Keep the yellow "Test version" bar.

### Layout `src/layouts/Base.astro`
Lighter header and footer (fewer lines, more space). Keep the 5-item mobile tab bar exactly (Home, Services, Book, My LIVO, Call) and the white LIVO wordmark in the footer.

## 4. Checks before you open the PR (all must pass)
1. `npm ci && npm run build` — no errors (31 pages).
2. Screenshots at **390×844** and **1280×800**: home (both tabs), /services, /services/house-cleaning, /services/house-cleaning/regular-cleaning, /services/house-cleaning/recurring-cleaning, /services/commercial-cleaning/office-cleaning, /book step 1 and photo step, /my-livo. Attach to the PR.
3. No horizontal scroll at 375 px on any page.
4. axe-core WCAG 2.2 AA = **0 violations** at 390 px on the same pages (wait 2 s after load so animations finish).
5. Journeys (test build) give exactly:
   - Standard Cleaning · 1 Bedroom + Inside Fridge, Weekly → **First visit $234**, then **$205/visit** → "You're booked!"
   - Deep Cleaning · 2 Bedroom → no "How often" step, total **$315**.
   - One Item Pickup · Curbside + Mattress → **$144**.
   - Office Cleaning · Up to 1,500 sq ft + 1 photo + business name → "Quote request sent!"
   - Recurring page table, 1 Bedroom row: **$166 / $176 / $195**.
6. Reduce-motion on: nothing animates, nothing hidden.

## 5. Report (PR description)
1. One line per file changed.
2. What you removed from each page.
3. Results of checks 1–6 (pass/fail with numbers).
4. Anything unsure or skipped, and why.
5. Add a short dated entry to `CLAUDE.md` (TEST ONLY — branch `codex/ui-nov17`).
