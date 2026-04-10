-- Manual WhatsApp order flow seed + status alignment.
-- Safe to re-run.

create extension if not exists "pgcrypto";

do $$
begin
  if to_regclass('public.orders') is not null then
    execute 'alter table public.orders alter column status set default ''pending_payment''';
    execute 'update public.orders set status = ''pending_payment'' where status = ''pending''';
  else
    raise notice 'Skipping orders status update: public.orders does not exist.';
  end if;
end $$;

do $$
begin
  if to_regclass('public.products') is not null then
    insert into public.products (
      slug,
      name,
      category,
      description,
      features,
      images,
      pricing_options,
      stock_count,
      current_price,
      active
    )
    values
      (
        'magnetic-car-phone-holder',
        'Magnetic Car Phone Holder',
        'Car Accessories',
        'Strong magnetic phone holder designed for Nigerian roads and daily driving.',
        array['Strong magnetic grip', 'Dashboard and windshield support', 'Easy one-hand use'],
        array['/products/car-phone-holder-gallery/01-vacuum-magnet.png'],
        '[{"label":"Buy 1 Unit","price":"₦7,500","savings":"","qty":"1"}]'::jsonb,
        30,
        '₦7,500',
        true
      ),
      (
        'car-seat-gap-organiser',
        'Car Seat Gap Organiser',
        'Car Accessories',
        'Keeps essentials from falling between seats while adding cleaner storage.',
        array['Prevents item drops', 'Quick install', 'Durable finish'],
        array['/products/Car-Seat-Gap-Organiser/1.png'],
        '[{"label":"Buy 1 Unit","price":"₦8,000","savings":"","qty":"1"}]'::jsonb,
        30,
        '₦8,000',
        true
      ),
      (
        'lagos-driver-bundle',
        'Lagos Driver Bundle',
        'Bundle Deal',
        'Best-value bundle for drivers who want grip, organization, and convenience.',
        array['Phone holder included', 'Seat organiser included', 'Bundle savings'],
        array['/products/car-phone-holder-gallery/01-vacuum-magnet.png'],
        '[{"label":"Bundle","price":"₦13,500","savings":"Save ₦2,000","qty":"2 items"}]'::jsonb,
        20,
        '₦13,500',
        true
      )
    on conflict (slug) do update
    set
      name = excluded.name,
      category = excluded.category,
      description = excluded.description,
      features = excluded.features,
      images = excluded.images,
      pricing_options = excluded.pricing_options,
      stock_count = excluded.stock_count,
      current_price = excluded.current_price,
      active = excluded.active;
  else
    raise notice 'Skipping product seed: public.products does not exist.';
  end if;
end $$;
