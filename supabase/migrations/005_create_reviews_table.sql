-- Create public.reviews (required for product pages + seed).
-- Run in Supabase → SQL Editor if seed logs: Could not find the table 'public.reviews'

create extension if not exists "pgcrypto";

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  reviewer_name text not null,
  reviewer_location text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  review_text text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_reviews_product on public.reviews(product_id);

alter table public.reviews enable row level security;

drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews"
  on public.reviews for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated insert reviews" on public.reviews;
create policy "Authenticated insert reviews"
  on public.reviews for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update reviews" on public.reviews;
create policy "Authenticated update reviews"
  on public.reviews for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete reviews" on public.reviews;
create policy "Authenticated delete reviews"
  on public.reviews for delete
  to authenticated
  using (true);
