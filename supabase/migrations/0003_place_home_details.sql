-- Prepared locally only. Apply before deploying the updated customer functions.
alter table public.places add column if not exists home_details jsonb;
comment on column public.places.home_details is 'Bedroom tier, full/half bathroom counts and city for repeat cleaning bookings';
