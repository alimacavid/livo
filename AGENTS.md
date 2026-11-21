# AGENTS.md — rules for Codex on alimacavid/livo

Read CLAUDE.md first (history, where things live, test mode, go-live checklist).

1. Never push or merge to `main` (= livoland.com). Work on the branch named in the prompt; open a PR into `v1.0`.
2. Prices and services live ONLY in `src/data/services.ts`.
3. Do not touch `supabase/` (database + live functions), `netlify.toml` redirects or `src/lib/api.ts` unless the prompt says so.
4. Do not re-add unconfirmed claims: "Licensed & insured", "GST included", "Upfront prices". First-booking discount stays 0.
5. Keep the live livoland.com design. Mobile first. No sideways-scrolling rows. Booking = one step per screen, no scrolling.
6. Before the PR: `npm run build` passes; every page loads; no horizontal scroll at 390 px; axe WCAG 2.2 AA = 0 violations on changed pages.
7. Do not commit screenshots or test output.
8. End with the report format the prompt asks for (files changed, what you tested, anything you could not do).
