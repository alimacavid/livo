# Supabase Migrations — LIVO

Project: **livo** (`dlzmkkmnmrbvxoazzbpi`) · region us-west-2

Log every schema / table / RLS change here.

| # | Date | Migration | Summary |
|---|------|-----------|---------|
| 0001 | 2026-07-26 | `create_bookings_table` | Adds `public.bookings` (customer contact, visit date/time, items jsonb, total, first-time discount, status). RLS **enabled with no policy** — only the service-role key (used by the Edge Function) can write; no public access. Indexes on `created_at desc` and `status`. |

## Edge Functions

| Function | Deployed | Purpose |
|----------|----------|---------|
| `send-booking-confirmation` | 2026-07-26 | On booking confirm: inserts the row, sends SMS (Twilio) + email (Resend), returns a reference number. `verify_jwt=false` (public endpoint, validates its own input). |

### Required secrets (set via `supabase secrets set … --project-ref dlzmkkmnmrbvxoazzbpi`)
`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`,
`RESEND_API_KEY`, `RESEND_FROM`.
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.)
Until the secrets are set, bookings still save; the function just skips sending.
