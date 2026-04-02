# Require Global Resources Website

Production-ready Next.js 14 website for **Require Global Resources** (Lagos-based product importation and trading company), optimized for paid traffic and WhatsApp-first conversion.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (order and contact logging)
- Facebook Pixel + Google Analytics 4
- Vercel deployment ready

## Routes

- `/` - Homepage
- `/car-phone-holder` - Product landing page
- `/blood-pressure-monitor` - Product landing page
- `/order-confirmation` - Thank you / conversion page
- `/contact` - Contact details + inquiry form

## Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_FB_PIXEL_ID`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CAR_PHONE_HOLDER_PRICE`
- `NEXT_PUBLIC_BLOOD_PRESSURE_MONITOR_PRICE`

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Confirm tables exist:
   - `order_inquiries`
   - `contact_inquiries`
4. Ensure RLS policies from schema are active for `anon` insert.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Event Tracking Implemented

### Facebook Pixel

- `PageView`: on every page load
- `ViewContent`: on each product page load
- `Lead`: on WhatsApp order CTA clicks
- `Purchase`: on `/order-confirmation` load

### GA4

- Pageview tracking via global gtag config
- Custom events for WhatsApp CTA clicks

## Conversion Logging

- Every WhatsApp order CTA click posts to `order_inquiries` with:
  - `product_name`
  - `source_page`
  - `created_at`
- Contact form submits to `contact_inquiries` with:
  - `name`
  - `phone`
  - `message`
  - `created_at`

## SEO and Social

- Unique metadata on each page
- Open Graph metadata on each page
- Dynamic `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`

## Vercel Deployment

1. Push project to GitHub.
2. Import repository in Vercel.
3. Set Framework Preset: **Next.js** (auto-detected).
4. Add all environment variables from `.env.local.example` in Vercel Project Settings -> Environment Variables.
5. Deploy.
6. Post-deploy verification:
   - Open product pages and confirm WhatsApp CTA links open with prefilled messages.
   - Verify order logs in Supabase `order_inquiries`.
   - Submit contact form and verify `contact_inquiries` insert.
   - Validate Pixel events via Facebook Pixel Helper.
   - Validate GA4 events via DebugView.

## Production Checklist

- Replace placeholder WhatsApp number with live business number.
- Replace placeholder product prices if needed.
- Replace email and Instagram handle if needed.
- Set `NEXT_PUBLIC_SITE_URL` to production domain.
- Run `npm run build` before every production deployment.
