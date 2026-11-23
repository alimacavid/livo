# LIVO Property Services — CLAUDE.md

## Last updated
2026-11-20 23:40 — **LIVE on livoland.com.** `v1.0` merged into `main` (PR #14, commit 1fc81a6) after Ali said "go live". `main` = `v1.0` content. Old live site backed up on branch `backup/pre-v1.0-2026-11-20`.

## ⚙ HOW WE WORK (Ali, 2026-11-21) — same as VORX
2026-11-23 — Codex: no card icons, Detail page item rows, footer 4 service columns + Greater Vancouver areas, Services click opens menu, new mega menu — PR #17
2026-11-22 — Codex: 6 UI fixes (quote wording, tax, textarea, 4/5-card layout, photo quality, restaurant crop) + review fixes + Appliance & Detail Cleaning (replaces Deep Reset; visit $59 + items: oven $49, stove $35, fridge & freezer $65, cabinets $39, blinds $12/blind, grout $79/area, deodorize $85), same 8 cards on home and /services, chooser for multi-service cards, restaurant crop on stove + $99 minimum order, From $99, stove slider removed — PR #16
- **Claude** = system designer + reviewer. Claude writes the plan and the Codex prompt, then checks Codex's report/PR. Claude does NOT write site code or push code.
- **Codex** = does all coding, builds, tests, branches and PRs.
- **Ali** = pastes Claude's prompt into Codex, pastes Codex's report back to Claude, gives final OK.
- Every Codex prompt: one part at a time, a branch name, exact files, what NOT to touch, how to test, and a short report format.
- Same safety rules for everyone: work on a branch → PR into `v1.0` (test) → Ali OKs → `main` (livoland.com) only when Ali says "go live".

## 2026-11-21 — Codex: My LIVO code screen wording + careers contrast (PR #15)

## 2026-11-20 (23:50) — Sign-in text for new numbers (Ali: "add it")
- Ali tried My LIVO sign-in: no code arrived. Correct behaviour: codes are only texted to numbers with saved details, and there were 0 customers.
- `customer-auth` now texts new numbers: "LIVO: there is no account for this number yet. Book at livoland.com/book and tick "Save my details" - then you can sign in." Website answer unchanged (same for both). Rate limit still 5 per number per hour.
- Deployed as customer-auth version 3 (Claude deployed v1 and v3; v2 was not deployed by Claude this session — check if Codex/Ali deployed something).

## 2026-11-20 (23:30) — GO-LIVE (Ali said "go live", chose "backend first") — DONE 23:40
- DONE: backup of live site = branch `backup/pre-v1.0-2026-11-20` (= main 2ce365f; tag push was refused, so a branch).
- DONE: migration 0002 applied to Supabase `livo` (dlzmkkmnmrbvxoazzbpi) as `quotes_customers` (+ indexes on bookings.place_id, customer_sessions.customer_id). Security advisor: only "RLS on, no policy" INFO — intended (only edge functions read/write).
- DONE: `send-booking-confirmation` v2 deployed (version 8) and `customer-auth` deployed (version 1), both verify_jwt=false. Could not call them from this sandbox (network blocked) — first real booking is the test.
- BLOCKER: Twilio auth token is WRONG (log 2026-11-15: "authentication failed, auth token is not valid for account AC7123…"). Texts have not been sent since; sign-in codes cannot be sent. Resend email works.
- DONE 23:35: Ali replaced TWILIO_AUTH_TOKEN and added LIVO_ALERT_PHONE + LIVO_ALERT_EMAIL (Supabase → Edge Functions → Secrets).
- DONE 23:40: PR #13 had conflicts (main was a restore commit) → branch `golive-nov20` = v1.0 + `merge -s ours main`, PR #14 merged into main. `git diff v1.0 main` = empty.
- TODO: Ali makes one real booking + one quote with photo + one sign-in on livoland.com; check function logs (texts sent?); delete those test rows from `bookings`/`customers`/`places`.
- Rollback if needed: reset `main` to branch `backup/pre-v1.0-2026-11-20` (only with Ali's OK). Note the DB changes are additive, the old site keeps working with them.

## 2026-11-20 (late night) — One page per service (branch `flow-nov20`)
- Ali: "every service has only one independent page". Top menu Services dropdown now lists all 13 services (4 columns by category), each opens its own page. Footer lists the 13 services too.
- /services = simple photo cards (one per service, from price) under the 4 category headings. Chip row and long lists removed.
- Division pages with several services removed (airbnb-cleaning, commercial-cleaning, construction-cleaning, junk-removal) → 301 (Airbnb → Turnover page, others → /services#<division>). `divHref` for those = `/services#<division>`; service page back button = "Services".
- Checked: 18 pages 200, axe 0, no overflow (390 + 1280); menu fits at 1024 and 1280.

## 2026-11-20 (night) — Booking start, sign-in return, "get ready" messages, site map (branch `flow-nov20`, from `v1.0`)
- Booking step 1 (/book with no service): Home | Business tabs + photo cards per service area (2 per row phone, 3 desktop) — no sideways chip row. Area with several services (Airbnb, Office & Strata, Post-Construction, Junk) shows its services next with an "All services" chip; one-service areas go straight to Size. Bottom bar (Total/Continue) hidden on step 1.
- My LIVO: signing in from booking now returns to the SAME step ("Your details") with every choice kept: before leaving, booking saves its state in sessionStorage (`livo-book-resume`), sign-in sends the customer to `/book?resume=1`, booking restores it (quote photos cannot survive a page change, so quotes that need photos reopen on the Photos step). No "Continue your booking" button.
- **"Get ready for your crew"**: `PREP` in services.ts (per service area). Shown on the thank-you screen, sent in the booking payload (`prep`) and used by `send-booking-confirmation` (text = first 3 tips, email = full list; quotes get "What happens next" 1-2-3). Confirmation dates now read "Tue, Nov 24 · Morning". Function NOT deployed yet (go-live step 3). Syntax-checked with esbuild; deno could not run here (no network).
- Removed the one-service section pages (/services/house-cleaning, /move-cleaning, /restaurant-kitchen-cleaning) — they duplicated the service page; 301s in netlify.toml. Site = 22 pages.
- Thank-you screen keeps its full text (auto-fit skipped on "done").
- Site map + pipeline PDF: `docs/LIVO_Sitemap_and_Pipeline_NOV_20.pdf` (3 pages: site map, booking & quote pipeline, messages & sign-in).
- Note: "We text you when your crew is on the way" is a promise in the text/email — it is a manual text by LIVO, not automated.

## 2026-11-20 — My LIVO sign-in simplified (branch `ui-nov20`, from `v1.0`)
- Ali: "too much text". Sign-in screen now: icon, "Sign in", "No password. We text you a code.", phone field (placeholder), "Text me a code", one line "New here? Book a service. We save your details for next time." Code screen centred; test notice is a small pill. Privacy Policy stays in the footer and on the booking review step.
- `prices-nov17` was merged into `v1.0` (PR #7) on 2026-11-20 with Ali's OK.

## 2026-11-17 (late) — LIVE DESIGN KEPT + services exactly as Ali's sitemap (branch `prices-nov17`)
- Ali: "keep design of live website". Codex UI pass (PR #8) REVERTED (commit 0b97b03) — pages use the live livoland.com look again: text on photos for cards and headers, grey trust boxes, "Popular right now" swipe row back (new prices).
- Services now match `LIVO_Visual_Sitemap.pdf` (17 Nov): 4 categories (`CATEGORIES` in services.ts: Residential Cleaning · Commercial Cleaning · Post-Construction · Junk Removal) used by /services, desktop menu and division eyebrow; footer = Residential + "Commercial & more".
- Homepage: 8 cards in one grid like the live site (`HOME_CARDS`): House Cleaning, Deep Cleaning, Move-In/Out, Airbnb & Vacation Rentals, Office & Strata, Restaurant & Kitchen, Post-Construction, Junk Removal. Residential/Commercial tabs removed from the homepage (booking page still has them).
- House Cleaning: Standard + Recurring on ONE page (`regular-cleaning` named "Standard & Recurring Cleaning", `recurringTable: true` shows the recurring table under the one-time prices). `recurring-cleaning` page removed → 301. Deep Cleaning keeps its own page.
- Restaurant & Kitchen: ONE page `restaurant-kitchen-cleaning/kitchen-cleaning` (regular from $650, deep from $1,050, larger = quote, site visit). Old 3 sub-pages → 301.
- Property Managers removed (not in Ali's sitemap) → 301 to Office & Strata.
- Homepage "How it works" = the live-site version again ("Booked in 60 seconds.", 3 numbered cards, shows on phones too) — Ali, 2026-11-18. Replaces the desktop-only "Two simple ways to start".
- Homepage "Popular right now" swipe row removed (Ali, 2026-11-18).
- Homepage card "Airbnb & Vacation Rentals" → "Airbnb Turnover" (own card, opens the Guest Turnover page, from $129). Deep Reset stays as the second service on that page (Ali, 2026-11-19).
- Homepage cards now grouped under the 4 sitemap categories with small headings: Residential (House, Deep, Move, Airbnb Turnover) · Commercial (Office & Strata, Restaurant & Kitchen) · Post-Construction · Junk Removal (`GROUPS` in index.astro; Ali, 2026-11-19).
- Ali's updated sitemap (19 Nov PDF): Airbnb division + service renamed "Airbnb Turnover Cleaning" (was "Airbnb & Vacation Rental Cleaning" / "Guest Turnover"; URLs unchanged), Deep Reset stays optional on the same page. Junk order now One Item Pickup → Home & Garage Clearouts → Office & Building Clearouts → Renovation Waste ("Clearouts" spelling).
- Deep Cleaning homepage card removed (Ali, 2026-11-19): House Cleaning card ("Standard, recurring & deep") opens /services/house-cleaning, which lists Standard & Recurring + Deep. Homepage now 7 cards: Residential 3 (House, Move, Airbnb Turnover Cleaning; 3 across on desktop, Airbnb full width on phones) · Commercial 2 · Post-Construction · Junk. Deep Cleaning page itself unchanged.
- Booking page: on desktop the Total + Continue bar now sits right under the step (sticky, not pinned to the bottom of the screen). Phones unchanged (fixed bottom bar). Ali likes the FAQ "Questions" accordion — keep it.
- New photos from Ali (2026-11-19, AI images in LIVO uniform, `src/assets/photos/`): House Cleaning + Standard = `house-toilet-cleaning` (before/after `toilet-*`); Deep = `oven-cleaning` (`oven-*`); Move = `cabinet-cleaning` (`cabinet-*`); Airbnb Deep Reset before/after = `fridge-*`; Restaurant = `restaurant-kitchen` (`stove-*`; homepage card uses `pos` to keep the people in frame); Post-Construction (both subs) = `post-renovation`; Office & Strata + Office = `office-cleaning`. Add-on cards on service pages now show photos (`ADDON_IMAGES` in services.ts: fridge, oven, cabinets, windows, bath); photo cards listed first. Still missing: Airbnb turnover photo, strata, junk (old photos), commercial construction own photo, freezer/kitchen/blinds/sheets/deodorize add-on photos; old Airbnb + junk before/after.
- Full UI/UX pass (Ali, 2026-11-20):
  - **Booking = one screen per step, centred, no scrolling** (checked at 390×844 and 1280×800; iPhone SE 375×667 fits except Add-ons with 10 items and the commercial Review — a few px of scroll). Steps now: service → size → add-ons → photos (quotes) → how often → **date** → **time** → **your details** (name/phone/email) → **address** (address, access, notes, save my details) → **review** (summary + confirm). Old "Date & time" and "Your details" screens were split. Fields are checked on their own screen; submit sends the customer back to the screen with a problem.
  - **Size first:** coming from a service page the booking always opens on the size step (was skipping to add-ons).
  - Add-ons in booking: compact 2-col (3-col desktop) cards, quantity stepper inline; descriptions in the screen-reader label.
  - Booking layout: steps centred vertically; desktop Total + Continue directly under the step; test-version notice is a small pill; short-screen CSS (max-height 720px) in book.astro.
  - Removed: "Great for" chips on service pages, repeated Add-ons grid on division pages.
  - Single-service sections (Move-In/Out, Restaurant & Kitchen) link straight to the service page from menu, footer and /services; the service page back button goes to /services.
  - Fixes: junk price line read "Pick your where is it?. Supplies included." → "Pick one. Loading and disposal included."; junk "Fridge or Freezer" disposal add-on no longer shows the fridge-cleaning photo; Deep Reset main photo = fridge cleaning (was the same bedroom as Turnover); /services category chips wrap on desktop.
  - Before/after sliders tested (drag + keyboard) on every page that has one.
- Service pages = information, booking = choices (Ali, 2026-11-20, "page by page like the live site"):
  - **Deep Cleaning page removed** (detail work is now add-ons) → 301 to Standard Cleaning. House Cleaning = one service, renamed **"Standard House Cleaning"** (Ali, 2026-11-20) (no more "Standard & Recurring"); recurring price table removed — a lime "Save with a regular schedule" note shows the discounts, frequency is picked in booking.
  - Home add-ons now: **Fridge & Freezer $65** (merged; was fridge $39 + freezer $29 — Ali OK'd $65 "for now", 2026-11-20), **Oven $49**, Inside Cabinets $39, Extra Bathroom $39, Interior Windows $40. Removed: Blinds, Kitchen Detail. Deodorize & Sanitize ($85) and Change Bed Sheets ($25/bed) moved to Airbnb (replaced "Extra Linen / Towel Set"). Move add-ons = Extra Bathroom + Interior Windows.
  - Service page: size list and add-ons are display-only (no selecting); Book → /book?d=&s= (booking opens on size). Page order: hero → intro → prices (+ schedule savings) → add-ons → **What's included (dark purple card) / Not included (grey card)** → before & after → cross-sell → questions → more services. Old page script removed.
  - Airbnb "Change Bed Sheets" add-on: Ali said keep it (2026-11-20), even though turnover includes remaking beds.
- Service page = Ali's exact order (2026-11-20, later): hero → description → before/after slider → What's included / Not included → Questions. Prices list, schedule note, add-ons row, cross-sell card and "More services" row REMOVED from service pages (no more sideways-scrolling rows). Price stays in the hero pill, desktop side card and phone bottom bar; "Book now" opens booking on the size step. `Extras` no longer used on service pages.
- Booking (Ali, 2026-11-20 night): Back button moved from the top into the bottom bar (left; Total in the middle; Continue right). Steps auto-fit the screen: if a step would scroll, the script adds `bk-tight` then `bk-tighter` on <html> (smaller headings/padding, add-on photos shorter then hidden). Checked at 390×844, 375×667, 1280×800, 1280×600, 1366×650, 1717×800 — no scrolling (only iPhone SE commercial Review in test mode, 6 px). Add-on photo cards restyled like the old service-page cards (16:9 photo, name, short description, price, + badge).
- Booking auto-fit has 3 levels (`bk-tight`, `bk-tighter`, `bk-tightest` — last hides size sub-lines, sign-in sub-text, divider, test pill, add-on photos) and re-runs after fonts and photos load. No scrolling at 360×640 up to 1920×900 incl. 1280×560 (Ali, 2026-11-20).
- Booking polish (Ali, 2026-11-20 late): add-on picture cards all the same size (4:3 photo, one line name, one line price; quantity − n + sits on the photo); "Booked before?" is now a dark purple sign-in card with a white "Sign in" button and an "or enter your details" divider; Time step = picture tiles (sunrise / sun / sunset / moon icons; 3 across on computers, stacked on phones) with a "date · change" chip that goes back to the Date step.
- Booking add-ons: photo cards (2 per row on phones, 3 on computers) when the add-on has a photo (`ADDON_IMAGES`, small WebP via getImage in book.astro); compact text cards otherwise (Airbnb, junk). Photos hidden on short screens (max-height 720px) so the step still fits.
- Homepage trust boxes (Instant prices / Pay after / Uniformed crews / Same-day response) removed — repeated the hero line and How it works (Ali, 2026-11-18).
- Homepage "See the difference" before/after section removed (Ali, 2026-11-17). Service pages keep their before/after.
- Pages: 27 built (26 + 404). All checks pass: every page 200, axe 0, no overflow, links OK, journeys OK.

## 2026-11-17 — Homepage hero restored to the live livoland.com hero (Ali)
- Ali prefers the 2026-09-26 live hero: full-width van photo, purple gradient, words on the photo ("LIVO Property Services" label, "Fall in love with your property." + lime "We make it happen."), lime "Book a service" (+ desktop "See services"), header `overlay` on home. Replaces the 2026-10-12 minimal hero (words on white + two Home/Business tiles). Only change to the old live hero: "Upfront prices" line now reads "Instant prices · Pay after the job". Business customers start from the Commercial tab below. Hero video slot kept. axe 0 violations, no overflow (390 + 1280).

## 2026-11-17 — Minimal UI pass (TEST ONLY — branch `codex/ui-nov17`)
- Moved service captions and headers off photos, simplified service lists and add-ons, and adjusted spacing across booking, account, and privacy pages.
- Base branch is `prices-nov17`.
- Claude review (2026-11-17): no protected files touched (services.ts, api.ts, netlify.toml, supabase); booking logic unchanged (classes only); build 31 pages; all prices/journeys re-tested and match; axe 0 violations; no overflow at 390 px; all links 200. Codex had committed 20 screenshots to `validation/` — removed and ignored. Merged PR #8 into `prices-nov17`.

## 2026-11-17 — New prices, services matched to sitemap, booking bug fixes (branch `prices-nov17`, from `v1.0` — TEST ONLY)
- Source of every number: "LIVO Revised Pricing NOV 17" workbook (Livo project doc `claude/livo-revised-price-list-2026-11-17.md`). Every price clears 30% margin after overhead at $25/h + 20% burden. Home prices = full price to customer; commercial = "+ tax".
- **First-booking discount removed** (Ali, 2026-11-17): `FIRST_TIME_DISCOUNT = 0`. All "15% off first booking" UI hides when it is 0.
- **Services now follow Ali's 17 Nov sitemap.** Home sizes are 5 tiers (Studio, 1, 2, 3, 4+ bed; old "2–3 bed" split). New pages: `junk-removal/single-item-pickup` ($119 curb / $169 inside), `junk-removal/office-clearouts` (quote), `construction-cleaning/commercial-construction-cleaning` (quote), `commercial-cleaning/property-managers` (quote). Removed: `retail-cleaning` (→ office-cleaning) and `commercial-cleanup` (→ commercial construction) with 301s in netlify.toml. Renames (URLs kept): Regular → Standard Cleaning, Turnover → Guest Turnover, Junk by Load → Home & Garage Clear-Outs, Renovation Debris → Renovation Waste, Commercial Cleaning division → Office & Strata Cleaning, Scheduled Kitchen → Regular Kitchen Cleaning, Front-of-House → Dining Room & Washrooms, Post-construction home → Home Renovations & New Builds.
- Commercial services now show starting prices (office from $165, strata from $200, kitchen deep from $1,050, regular kitchen from $650, all + tax) but stay quote requests. Tier id `visit` = free site visit (no photo needed).
- Homepage cards (`CARDS`): Residential = House, Deep, Move, Airbnb, Post-Construction, Junk (3 across on desktop). Commercial = Office & Strata, Restaurant & Kitchen, Post-Construction, Office Clear-Outs. `Card` now has its own `image` + `icon`.
- **Per-service options:** `Sub.freqs` and `Sub.addons` override the division (helpers `subFreqs`, `subAddons`). Deep Cleaning and Move-out are one-time only; Junk is one-time; Airbnb frequency has no discount.
- **Recurring rule:** weekly −15%, every 2 weeks −10%, monthly regular price — from the 2nd visit, on the service price only (not add-ons). Booking total = first visit at regular price; summary shows "then $X/visit"; booking notes record both.
- Add-ons: added Inside Freezer, Inside Cabinets, Blinds, Change Bed Sheets (homes), Laundry (Airbnb), Mattress/Box Spring, Fridge/Freezer, Same-Day $89 (junk). Removed Airbnb "Deep Sanitize".
- **Bugs fixed:** (1) weekly/bi-weekly discounts applied to Deep Cleaning, junk and Airbnb turnovers; (2) recurring discount also cut add-on prices; (3) weekly booking showed the discounted price as the first-visit total; (4) service page price box parsed its own text — broke with "from", "+ tax" or "$1,050" (now data attributes); (5) recurring page sticky bar showed the one-time 2–3 bed price (now "from $140 per visit · weekly"); (6) recurring table hid Monthly; (7) desktop "Popular right now" row ran off the page — row removed (repeated the service cards); (8) lime button shine washed out the text ("For my home", "Book now") — softened; (9) footer showed plain "LIVO." text — now the real white wordmark; (10) commercial booking list said "Free quote" even when a starting price exists.
- Also: "Booked before?" box → one text line + Sign in link; prices over $999 show a comma.
- Checked (local build, 31 pages): every page 200; no horizontal scroll at 390 px; axe WCAG 2.2 AA = 0 violations (home re-checked after animations); all internal links 200; journeys: Standard 1 bed + fridge weekly = $234 first visit then $205/visit; Deep skips "how often"; junk single item + mattress = $144; Move 4+ → quote with photos; office quote with photo → "Quote request sent!".
- Known gaps: photos repeat (Deep/Post-Construction share one photo; Office/Strata/Property Managers/Commercial construction use the team-van photo; Restaurant uses a home kitchen). Commercial "+ tax" wording assumes LIVO charges tax on commercial work — confirm GST registration.
- Branch: `prices-nov17` (not merged). Next: Ali reviews the branch preview → merge into `v1.0` → later `main` only with Ali's explicit OK.

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
- `freqs` / `addons` on a sub-service override the division's options for that service only.
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
- Prices = 2026-11-17 revised list (see entry above). Competitor check: `claude/livo-competitor-check-2026-11-17.md` in the Livo project.
- Airbnb has no own photos beyond before/after; Commercial and Restaurant have no real photos yet — shoot per-service photos.
- careers.html is still the old standalone page (phone fixed only).
- Real confirmation emails: Resend/Twilio secrets on the Supabase function must be set.

## Workflow
Work on a branch → Ali approves → `v1.0` (staging: `v1-0--darling-marigold-ff0def.netlify.app`) → Ali approves → `main` (livoland.com). Never merge to `main` without Ali's explicit approval.
