-- Legacy templates sometimes add CHECK (category IN (...)) e.g. only 'active'.
-- This app uses category as a display label ("Car Accessories", "Bundle Deal", …).
alter table public.products drop constraint if exists products_category_check;
