# Codex task — LIVO website: minimal, modern, mobile-first UI (2026-10-12)

Repo: `alimacavid/livo` · Start from branch **`v1.0`** (test site: https://v1-0--darling-marigold-ff0def.netlify.app)

## 0. Safety rules (do not break these)
1. Create a new branch `codex/minimal-ui` from `v1.0`. Open a pull request into **`v1.0`**.
2. **Never** push to, merge into, or open a PR against `main`. `main` is the live site livoland.com.
3. Read `CLAUDE.md` first. It explains the site, test mode and what lives where.
4. Do **not** change these files: `src/data/services.ts` (prices, services, wording), `src/lib/api.ts` (test mode, bookings, sign-in), `netlify.toml` (redirects), anything in `supabase/`.
5. Do not change any URL, any price, or any service name. Do not add new npm packages.
6. Do not add claims that are not already on the site (no "licensed & insured", no "GST included", no reviews, no star ratings, no stats).
7. Keep everything that works: booking flow, quote flow with photo upload, My LIVO sign-in, Residential/Commercial tabs, accessibility features.

## 1. Goal
The owner says the site feels **crowded**. Make every page **minimal, modern and calm, like a good phone app**: fewer boxes, more white space, one clear action per screen.

The homepage hero was redesigned on 2026-10-12 and is the **reference style** for the whole site. Look at it first: `src/pages/index.astro`, the section marked `HERO (minimal …)`.
- Words sit on white, in dark text. **No text over photos.**
- Photos are clean and rounded, with nothing on top of them.
- Choices are big, solid, rounded tiles (lime = main action, light purple = second action).

## 2. Brand (must keep exactly)
- Colours are tokens in `src/styles/global.css` (`@theme`): purple `#6B3FA0`, lime `#C4D600`, ink `#2C2C2C`, `purple-soft`, `lime-soft`, `cloud`, `line`, `muted`. Use the tokens only, never new hex values.
- Lime is a **fill** colour only (buttons, tiles). Lime text on white fails contrast; use `text-lime-ink` if lime-coloured text is ever needed.
- Fonts: Montserrat for headings (700–800), Inter for body. Do not add fonts.
- Radius: 8px fields, 12px cards, 20px panels/tiles, 100px buttons.
- Icons: only the existing `src/components/Icon.astro` set (stroke icons). No emoji as icons.

## 3. Design rules (from UI/UX Pro Max — "Minimal Single Column" + "Trust & Conversion")
1. **One primary action per screen.** Exactly one lime button or tile visible at a time; everything else is secondary (light purple, outline or plain link).
2. **White space over boxes.** Remove card borders and grey boxes where spacing alone separates content. Use the 4/8 px spacing scale; section gaps 40 px on mobile, 96 px on desktop, the same on every page.
3. **Hierarchy by size and weight, not colour.** One H1 per page; H2 for sections; body 16 px (15 px minimum for secondary lines); line length 35–60 characters on mobile.
4. **Show core content first on mobile;** hide or fold secondary content.
5. **Touch:** every tap target at least 44×44 px with 8 px between targets; visible pressed state (the existing `.press` class); `cursor-pointer` on clickables.
6. **Contrast:** text at least 4.5:1; icons and control borders at least 3:1.
7. **Performance:** keep Astro `<Image>` (WebP, `widths`/`sizes`), lazy-load below-the-fold images, reserve image space (no layout shift).
8. **Motion:** keep the existing tokens and classes (`.rise`, `.press`, `data-reveal`); subtle only; everything must still turn off with "reduce motion".
9. **No horizontal scrolling** on any page at 375 px, except deliberate swipe rows.
10. Fixed bottom bars must not cover content.

## 4. Page-by-page changes

### Homepage `src/pages/index.astro` (below the hero — do NOT change the hero)
Mobile order after the change: **Hero → What do you need? → See the difference → Why LIVO (compact) → Where we work → footer.**
1. **Remove** the "Popular right now" swipe row (it repeats the service cards).
2. **Remove** the "Booked before?" card. Replace it with one small text link under the service cards: "Booked before? **Sign in**" → `/my-livo`.
3. "What do you need?": keep the Residential | Commercial tabs and the cards. Remove the grey helper sentence under the tabs if the tab label already says it. Keep cards image-led with name + "From $X" / "Free quote" only.
4. Trust section: replace the 4 grey boxes with a **compact list of 3 lines** (icon + one short line each, no boxes): "Instant prices or a free quote", "Pay after the job", "Uniformed LIVO crews". On desktop, show them in one row.
5. "Where we work": keep (3 cities + "+12 more" on mobile).
6. Desktop "How it works" and "Ready when you are" blocks: keep but restyle with the same calm look (fewer boxes).

### Category pages `src/pages/services/[division]/index.astro`
1. Replace the photo-with-text-on-top header with the homepage style: back link, small line ("Residential" / "Commercial"), H1 and tagline + "From $X" / "Free quote" **on white**, then a clean rounded photo.
2. "Choose a service" list: lighter rows (no heavy borders), clear chevron.
3. Add-ons, "Not included", cross-sell and FAQ: same spacing scale; the cross-sell stays the only tinted card on the page.

### Service pages `src/pages/services/[division]/[sub].astro`
1. Same header style as category pages (words on white, clean photo, price chip below the title).
2. Keep the price/tier selector and the sticky mobile bottom bar (price + Call + Book/Get quote). The sticky bar's button is the one primary action.
3. Collapse "What's included" to the first 4 items with a "Show all" toggle on mobile (button with `aria-expanded`).
4. Keep the quote steps strip (Send photos → Quote → Pick your date) for quote services.

### Services list `src/pages/services/index.astro`
Calmer list: section labels "Residential" / "Commercial", rows with no borders separated by thin lines.

### Booking `src/pages/book.astro`, My LIVO `src/pages/my-livo.astro`, Privacy `src/pages/privacy.astro`
Only spacing and visual polish to match. **Do not change the logic, steps, data sent, or test mode.** Keep the yellow "Test version" bar.

### Layout `src/layouts/Base.astro`
Header and footer: lighter and calmer (fewer lines, more space). Keep the 5-item mobile tab bar (Home, Services, Book, My LIVO, Call) exactly.

## 5. Check before you open the PR (all must pass)
1. `npm ci && npm run build` — no errors.
2. Screenshots of **every page type** at **375×667, 390×844 and 1280×800**: home, /services, one category, one fixed-price service, one quote service, /book (step 1 and the photo step), /my-livo, /privacy. Attach them to the PR.
3. No horizontal scroll on any page at 375 px (`document.documentElement.scrollWidth === 375`).
4. axe-core WCAG 2.2 AA (`wcag2a, wcag2aa, wcag21aa, wcag22aa`) = **0 violations** on the same pages at 390 px.
5. Journeys still work on the test build:
   - Home booking: Deep Cleaning → details → "You're booked!" with a `TEST-` reference and 15% off.
   - Business quote: Restaurant & Kitchen Cleaning → Kitchen Deep Clean → add a photo + business name → "Quote request sent!".
   - My LIVO: sign in with any 10-digit phone and code `123456`; saved places and "Book again" show.
6. Reduce-motion on: nothing animates and nothing is hidden.

## 6. Report (put this in the PR description)
1. One line per file changed: what changed.
2. What you removed from each page.
3. Results of checks 1–6 (pass/fail, with numbers).
4. Anything you were unsure about or left out, and why.
5. Update `CLAUDE.md` with a short dated entry for this change (TEST ONLY — `v1.0`).
