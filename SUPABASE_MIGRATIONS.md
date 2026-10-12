# Supabase Migrations — LIVO

Project: **livo** (`dlzmkkmnmrbvxoazzbpi`) · region us-west-2

Log every schema / table / RLS change here.

| # | Date | Migration | Summary |
|---|------|-----------|---------|
| 0002 | not applied (written 2026-10-12) | `0002_quotes_customers.sql` | bookings + kind, segment, division, sub_service, tier, business_name, address, access_notes, description, photos[], customer_id, place_id. New tables `customers`, `places`, `login_codes`, `customer_sessions` (RLS on, no policies → service role only). Private storage bucket `quote-photos` (8 MB, images) with one policy: anon may INSERT under `incoming/` only. Apply at go-live — see CLAUDE.md checklist. |
| 0001 | 2026-07-26 | `create_bookings_table` | Adds `public.bookings` (customer contact, visit date/time, items jsonb, total, first-time discount, status). RLS **enabled with no policy** — only the service-role key (used by the Edge Function) can write; no public access. Indexes on `created_at desc` and `status`. |

## Edge Functions

| Function | Deployed | Purpose |
|----------|----------|---------|
| `send-booking-confirmation` v2 | not deployed (written 2026-10-12) | Adds quotes, photo links, saved customers/places, LIVO alert SMS + email. Needs migration 0002 first. |
| `customer-auth` | not deployed (written 2026-10-12) | Phone sign-in with 6-digit text code; `me` returns saved places + past jobs; remove-place; signout. verify_jwt=false (own session check). |
| `send-booking-confirmation` | 2026-07-26 | On booking confirm: inserts the row, sends SMS (Twilio) + email (Resend), returns a reference number. `verify_jwt=false` (public endpoint, validates its own input). |

### Required secrets (set via `supabase secrets set … --project-ref dlzmkkmnmrbvxoazzbpi`)
`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`,
`RESEND_API_KEY`, `RESEND_FROM`, and from v2: `LIVO_ALERT_PHONE`, `LIVO_ALERT_EMAIL`.
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.)
Until the secrets are set, bookings still save; the function just skips sending.
