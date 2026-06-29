-- Allow the public storefront to read active inventory listings.
alter table public.listings enable row level security;

drop policy if exists "Public read active listings" on public.listings;

create policy "Public read active listings"
  on public.listings
  for select
  to anon, authenticated
  using (status = 'Active');

-- Allow public read of listing categories used in joins.
alter table public.categories enable row level security;

drop policy if exists "Public read categories" on public.categories;

create policy "Public read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);
