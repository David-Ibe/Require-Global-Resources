-- Ensures core tables exist, then adds orders.quantity.
-- Safe to run on an empty project OR on one that already has 001 applied.

create extension if not exists "pgcrypto";

-- Required for orders.product_id FK
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

create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_active on public.products(active);
create index if not exists idx_orders_created on public.orders(created_at desc);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_product on public.orders(product_id);

alter table public.products enable row level security;
alter table public.orders enable row level security;

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

alter table public.orders
  add column if not exists quantity integer not null default 1;
