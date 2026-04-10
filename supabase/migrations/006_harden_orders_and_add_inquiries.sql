-- Harden orders insertion path and align inquiry tables with migration flow.
-- Safe to re-run.

create extension if not exists "pgcrypto";

create table if not exists public.order_inquiries (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  customer_whatsapp text null,
  source_page text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.order_inquiries enable row level security;
alter table public.contact_inquiries enable row level security;

drop policy if exists "Allow inserts for anon users on order_inquiries" on public.order_inquiries;
create policy "Allow inserts for anon users on order_inquiries"
  on public.order_inquiries for insert
  to anon
  with check (true);

drop policy if exists "Allow inserts for anon users on contact_inquiries" on public.contact_inquiries;
create policy "Allow inserts for anon users on contact_inquiries"
  on public.contact_inquiries for insert
  to anon
  with check (true);

do $$
begin
  if to_regclass('public.orders') is not null then
    execute 'drop policy if exists "Public insert orders" on public.orders';
    execute '
      create unique index if not exists unique_orders_paystack_reference
      on public.orders(paystack_reference)
      where paystack_reference is not null
    ';
  end if;
end $$;
