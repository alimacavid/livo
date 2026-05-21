# LIVO — Dev Context

> Read root CLAUDE.md first.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite |
| Hosting | Digital Ocean (livoland.com) |
| Database | Supabase (livo project, AWS us-west-2) |
| Auth | Supabase Auth |
| Payments | Stripe |
| SMS | Twilio |
| Email | Resend |
| Field Ops | Jobber (evaluating) / crew PWA planned |
| Repo | github.com/alimacavid/livo |
| GitHub Pages | alimacavid.github.io/livo (CORTEX) |

## Domains

- livoland.com — primary
- livoland.ca — redirect / brand protection
- crew.livoland.com — planned field crew PWA

## Phone

604 358 2358

## Dev Rules

- Branch off main unless staging active
- One commit = one change + CLAUDE.md update
- Never install packages without Ali approval
- Always git status before committing
- Never modify CORTEX.html unless explicitly told
- Keep SUPABASE_MIGRATIONS.md updated on every schema change
- Vorx (vorx.ca) = internal workforce platform, never expose internals publicly

## Live Supabase Tables

- cortex_ideas — CORTEX R&D portal
- See SUPABASE_MIGRATIONS.md for full schema
