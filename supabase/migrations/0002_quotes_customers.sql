-- LIVO 0002 — quote requests, photos, saved customers, phone sign-in
-- Written 2026-10-12. NOT APPLIED YET. Apply to project `livo` only when
-- Ali approves the v1.0 → livoland.com push (see SUPABASE_MIGRATIONS.md).

-- ── bookings: also holds quote requests ──
alter table public.bookings
  add column if not exists kind          text not null default 'booking',  -- booking | quote
  add column if not exists segment       text,                              -- residential | commercial
  add column if not exists division      text,
  add column if not exists sub_service   text,
  add column if not exists tier          text,
  add column if not exists business_name text,
  add column if not exists address       text,
  add column if not exists access_notes  text,                              -- crew-only entry notes
  add column if not exists description   text,
  add column if not exists photos        text[] not null default '{}',      -- storage paths in quote-photos
  add column if not exists customer_id   uuid,
  add column if not exists place_id      uuid;

-- ── saved customers (created only when the customer ticks "Save my details") ──
create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null unique,          -- E.164, e.g. +16045550101
  name        text,
  email       text,
  company     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.places (
  id           uuid primary key default gen_random_uuid(),
  customer_id  uuid not null references public.customers(id) on delete cascade,
  label        text not null,
  address      text not null,
  segment      text not null default 'residential',
  business     text,
  access_notes text,
  created_at   timestamptz not null default now()
);
create index if not exists places_customer_idx on public.places (customer_id);

alter table public.bookings
  add constraint bookings_customer_fk foreign key (customer_id) references public.customers(id) on delete set null,
  add constraint bookings_place_fk    foreign key (place_id)    references public.places(id)    on delete set null;
create index if not exists bookings_customer_idx on public.bookings (customer_id);

-- ── phone sign-in: one-time codes + sessions (only hashes are stored) ──
create table if not exists public.login_codes (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  code_hash   text not null,
  attempts    int  not null default 0,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);
create index if not exists login_codes_phone_idx on public.login_codes (phone, created_at desc);

create table if not exists public.customer_sessions (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  token_hash  text not null unique,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

-- No public access to any table. Only the edge functions (service-role key) read/write.
alter table public.customers         enable row level security;
alter table public.places            enable row level security;
alter table public.login_codes       enable row level security;
alter table public.customer_sessions enable row level security;

-- ── photo storage: private bucket; the website may only ADD photos under incoming/ ──
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quote-photos', 'quote-photos', false, 8388608, array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do nothing;

create policy "website can upload quote photos"
  on storage.objects for insert to anon
  with check (bucket_id = 'quote-photos' and (storage.foldername(name))[1] = 'incoming');
-- no select/update/delete policy → nobody but the service role can read or change photos
