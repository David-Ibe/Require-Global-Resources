-- If products was created without `active`, add it (PostgREST / seed expect this column).
alter table public.products
  add column if not exists active boolean not null default true;

create index if not exists idx_products_active on public.products(active);
