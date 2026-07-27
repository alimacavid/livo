-- LIVO bookings table
create table if not exists public.bookings (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text not null,
  visit_date          date not null,
  visit_time          text not null,          -- 'Morning' | 'Afternoon' | 'Evening'
  items               jsonb not null,          -- [{svcName,group,size,freq,price}]
  total               integer not null,
  first_time_discount boolean not null default false,
  notes               text,
  status              text not null default 'pending'  -- pending | confirmed | cancelled
);

alter table public.bookings enable row level security;

-- No public read/write. Only the service-role key (used by the Edge Function)
-- bypasses RLS, so inserts happen only through the function.
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);
