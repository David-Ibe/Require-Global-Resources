-- Align public.products with the app + seed (adds any missing columns).
-- Run once in Supabase → SQL Editor if seed fails with PGRST204 / missing columns.
-- Safe to re-run: uses IF NOT EXISTS.
--
-- Your table must have an `id` column (uuid). If it does not, use 001_initial_schema.sql
-- to create the full table instead, or rename your legacy table and create fresh.

-- Core identifiers (required for /products/[slug] and seed upsert)
alter table public.products add column if not exists name text;
alter table public.products add column if not exists slug text;

alter table public.products add column if not exists category text;
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists description text;
alter table public.products add column if not exists features text[] not null default '{}';
alter table public.products add column if not exists images text[] not null default '{}';
alter table public.products add column if not exists pricing_options jsonb not null default '[]';
alter table public.products add column if not exists youtube_url text;
alter table public.products add column if not exists stock_count integer not null default 0;
alter table public.products add column if not exists old_price text;
alter table public.products add column if not exists current_price text;
alter table public.products add column if not exists active boolean not null default true;
alter table public.products add column if not exists created_at timestamptz not null default now();

-- Backfill: give every row a stable slug before unique index (seed uses onConflict: slug)
update public.products
set name = 'Product'
where name is null or trim(name) = '';

update public.products
set slug = 'legacy-' || replace(id::text, '-', '')
where slug is null or trim(slug) = '';

update public.products
set category = 'Car Accessories'
where category is null or trim(category) = '';

update public.products
set description = ''
where description is null;

update public.products
set current_price = ''
where current_price is null;

-- Enforce NOT NULL where the app expects it
alter table public.products alter column name set not null;
alter table public.products alter column slug set not null;
alter table public.products alter column category set not null;
alter table public.products alter column description set not null;
alter table public.products alter column current_price set not null;

-- Unique slug (required for seed upsert onConflict: slug)
create unique index if not exists unique_products_slug on public.products(slug);

create index if not exists idx_products_active on public.products(active);
