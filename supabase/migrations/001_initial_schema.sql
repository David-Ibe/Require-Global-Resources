-- Require Global Resources — initial schema, RLS, storage
-- Run in Supabase SQL Editor or via CLI

-- Extensions
create extension if not exists "pgcrypto";

-- Tables
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  badge text,
  description text not null,
  features text[] not null default '{}',
  images text[] not null default '{}',
  pricing_options jsonb not null default '[]',
  youtube_url text,
  stock_count integer not null default 0,
  old_price text,
  current_price text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  package_label text not null,
  package_price text not null,
  customer_name text not null,
  phone text not null,
  whatsapp text not null,
  address text not null,
  state text not null,
  payment_method text not null default 'cod',
  status text not null default 'pending',
  paystack_reference text,
  created_at timestamptz not null default now()
);

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

-- Indexes
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_active on public.products(active);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_product on public.orders(product_id);
create index if not exists idx_reviews_product on public.reviews(product_id);

-- Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- Products policies
drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
  on public.products for select
  to anon, authenticated
  using (active = true);

drop policy if exists "Authenticated read all products" on public.products;
create policy "Authenticated read all products"
  on public.products for select
  to authenticated
  using (true);

drop policy if exists "Authenticated insert products" on public.products;
create policy "Authenticated insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update products" on public.products;
create policy "Authenticated update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete products" on public.products;
create policy "Authenticated delete products"
  on public.products for delete
  to authenticated
  using (true);

-- Orders policies
drop policy if exists "Public insert orders" on public.orders;
create policy "Public insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated read orders" on public.orders;
create policy "Authenticated read orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "Authenticated update orders" on public.orders;
create policy "Authenticated update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete orders" on public.orders;
create policy "Authenticated delete orders"
  on public.orders for delete
  to authenticated
  using (true);

-- Reviews policies
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

-- Storage bucket (create in Dashboard if insert fails; policies below)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated delete product images" on storage.objects;
create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
