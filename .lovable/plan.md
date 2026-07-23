
# ChoraNami — Build Plan

Two quick notes before we start:

- **Framework:** This Lovable template uses **TanStack Start** (React 19 + Vite), not Next.js. It gives you the same full-stack story (SSR, server functions, API routes, SEO) so the brief is fully achievable — I just won't introduce Next.js.
- **Backend:** I'll use **Lovable Cloud** (managed Supabase under the hood: Postgres + Auth + Storage), so no external accounts needed.

Because this scope is very large (7+ public pages, admin dashboard, 5 tables, auth, uploads, emails, CSV export, SEO, animations), I'll ship it in **3 phases** so you can review each before I keep going. If you'd rather I build everything in one shot, say the word.

---

## Phase 1 — Foundation, brand & public site (this turn)

**Design system**
- Palette from your logos + brief: Orange `#F58220`, Yellow `#FFC72C`, Turquoise `#1FB6B0`, Purple `#7A4FBF`, Brown `#6B3A1E` (logo text), White, Ink. All as `oklch` semantic tokens in `src/styles.css`.
- Display font: Fraunces (playful serif, matches logo). Body: DM Sans.
- Custom Button/Card variants (hero, splash, sunny) — no hard-coded colors in components.
- Paint-splash SVG accents + Framer Motion for hero, floating art icons, section reveals, page transitions.

**Brand assets**
- Upload the 3 logos via `lovable-assets` and pick the splash logo (image_6) as primary; use the brush-hand shot as hero.

**Public pages (TanStack routes, each with unique SEO head())**
- `/` Home — hero, CTAs, program preview, testimonials strip, CTA band
- `/about`, `/programs`, `/gallery` (masonry + lightbox + category filter), `/testimonials`, `/faq`, `/contact` (form + map + WhatsApp)
- Sticky nav, footer, floating WhatsApp button, scroll-to-top, 404 (already exists — restyled)
- `sitemap.xml` route + `robots.txt`

**Lovable Cloud enabled** so Phase 2 can start immediately.

---

## Phase 2 — Backend, booking & contact

- Migrations for tables: `programs`, `gallery`, `bookings`, `testimonials`, `contact_messages`, plus `user_roles` (enum `app_role`, `has_role()` SECURITY DEFINER — no role-on-profile).
- RLS: public SELECT on `programs`, `gallery`, `testimonials`; anon INSERT on `bookings` + `contact_messages`; admin-only for everything else via `has_role(auth.uid(), 'admin')`.
- Storage buckets: `gallery`, `testimonials` (public read, admin write).
- Seed default programs (School Art Clubs, Homeschool, ArTogether, Party Boom) from your brief.
- Server functions:
  - Public: `submitBooking`, `submitContact`, `listGallery`, `listPrograms`, `listTestimonials`
  - Admin (behind `requireSupabaseAuth` + role check): CRUD for all tables, booking status transitions
- Zod validation on every input, honeypot + basic rate-limit on public forms.
- Booking form on `/contact` (and per-program CTAs prefilling `service`).
- **Emails** (Lovable managed app emails): booking confirmation to customer, notifications to admin for bookings + contact messages. I'll scaffold templates and wire them into the server functions.

---

## Phase 3 — Admin dashboard & polish

- `/auth` sign-in (email + password; Google optional — say if you want it).
- `/_authenticated/admin/*` (integration-managed gate) with role check redirect.
- Dashboard: stat cards (bookings, messages, gallery, testimonials, programs), recent activity.
- Booking manager: table, search, service filter, status actions (accept/decline/complete), CSV export.
- Contact manager: read / mark replied / archive / delete.
- Gallery manager: upload to Storage, edit caption/category, delete.
- Testimonials manager: CRUD + photo upload.
- Programs manager: edit copy + image per program.
- Final SEO pass (JSON-LD Organization + LocalBusiness, OG images per route), Lighthouse-oriented performance pass, dark mode toggle.

---

## Things I'm deciding for you unless you object

- **No Instagram feed** unless you have a token/handle to wire — a static "Follow us" strip instead.
- **No newsletter subscription** in Phase 1–3 (out of scope; can add later with a `subscribers` table + email confirmation).
- Google Maps embed uses a plain iframe with your address (share it in a reply, or I'll use "Nairobi, Kenya" as placeholder).

---

## Please confirm / provide

1. **Go ahead with the 3-phase plan?** (or build in one giant turn?)
2. **Contact details** for the site: phone, email, WhatsApp number, address, Instagram/Facebook handles. I'll use tasteful placeholders if you'd rather fill them later.
3. **Admin email** to seed as the first admin user (so you can log in immediately after Phase 3).
4. **Google sign-in for admin** — yes or email+password only?

Reply with answers (or just "go") and I'll start Phase 1.
