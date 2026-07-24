# ChoraNami — Phase 2 Full Buildout

Big scope, so I'm splitting into a single coordinated plan. All work stays on the existing brand system (Fraunces + DM Sans, splash palette, glassmorphism, Framer Motion + Swiper) so the redesigned pages feel like siblings of the new Home.

## 1. Modernize every public page (match Home's "classy" register)

- **About** — full-bleed animated hero with parallax logo, "our story" timeline with milestone counters, mission/vision as glass cards with gradient borders, team/founders strip (placeholders), values as tilt-hover cards.
- **Programs** — sticky category rail, hero swiper of program covers, each program as an alternating "showcase slab" with gradient blob backdrop, feature checklist, animated pricing/duration chips, "Book this" CTA opens a modal (booking flow, see §4).
- **Gallery** — replace current masonry with a true **Pinterest-style** layout using `react-masonry-css`, lightbox with keyboard nav + swipe, category filter as glass pill bar, infinite-scroll batches, subtle image hover zoom + caption reveal. Loads from DB (see §3).
- **Testimonials** — keep coverflow, add stats row on top ("500+ happy families…"), add a "Wall of Love" masonry section under the swiper for the long tail.
- **FAQ** — split into categorized tabs (General / Programs / Booking / Pricing), animated accordions with icon per category, "still have questions?" glass CTA card linking to Contact.
- **Contact** — two-column premium layout, live-validated form with step indicators, contact cards with gradient icons, WhatsApp quick-chat button, embedded Nairobi map with custom brand pin, response-time badge.

## 2. New Events showcase

- New `/events` route: hero carousel of upcoming events, filterable grid (upcoming / past), event detail modal (or `/events/$slug`) with date, location, capacity, "RSVP" button that funnels into booking flow.
- Backed by `events` table (see §3). Featured events also appear on Home.

## 3. Database (SQL migration)

New public tables (RLS + GRANTs, service_role for admin, anon SELECT only on truly public rows):

- `programs` — editable version of the currently hardcoded programs (title, slug, description, features[], color, order, active).
- `gallery_images` — url, category, title, caption, width, height, sort, published.
- `testimonials` — name, role, quote, avatar_url, rating, featured, published.
- `faqs` — category, question, answer, sort, published.
- `events` — title, slug, description, cover_url, starts_at, ends_at, location, capacity, price, status.
- `bookings` — program_slug/event_id, parent_name, email, phone, child_age, message, preferred_date, status (new/contacted/confirmed/completed/cancelled), created_at.
- `contact_messages` — name, email, phone, subject, message, status.
- `newsletter_subscribers` — email (unique), subscribed_at, unsubscribed_at.
- `user_roles` + `app_role` enum + `has_role()` security-definer fn (admin gating).
- `profiles` (id → auth.users, display_name, avatar_url) with auto-create trigger.

Public routes read published rows via a **server publishable client** (narrow `TO anon` SELECT policies). Writes go through `createServerFn` with `requireSupabaseAuth` + `has_role('admin')` checks.

## 4. Booking flow polish

- Multi-step booking modal (Program → Details → Schedule → Review) with progress bar, per-step Zod validation, optimistic submit, success screen with WhatsApp handoff option.
- Server fn `submitBooking` (public, rate-limited by simple IP+email dedupe) writes to `bookings`, sends notification email to admin via Lovable AI Gateway (or Resend if user later adds a key — I'll wire the abstraction).
- Contact form + newsletter form get the same treatment (server fns, toast feedback, spam honeypot).

## 5. Admin dashboard (`/admin/*`, under `_authenticated` + admin role gate)

- `/auth` — email/password + Google sign-in (Google configured via connector in the same migration turn).
- `/admin` — overview cards (new bookings, unread messages, subscribers, events this month) with sparklines.
- `/admin/bookings` — table with filters, status change, notes, CSV export.
- `/admin/messages` — inbox view.
- `/admin/gallery` — upload to Storage bucket `gallery`, drag-reorder, category assignment, publish toggle.
- `/admin/programs`, `/admin/events`, `/admin/testimonials`, `/admin/faqs` — CRUD tables with inline edit.
- `/admin/subscribers` — list + export.
- All admin data via authenticated server fns; admin check via `has_role`.

## 6. SEO performance pass

- Per-route `head()` audit: unique title/description, `og:image` wired to route hero (absolute URLs once available), `og:type` correct per page, JSON-LD (`Organization` on root, `Event` on event pages, `FAQPage` on FAQ, `BreadcrumbList` on deep routes).
- `sitemap.xml` regenerated from DB (programs + events + gallery categories).
- `robots.txt` allows all, points to sitemap.
- Image `alt` audit, lazy-loading, `width/height` on all imgs to prevent CLS.
- Run `list_findings` after deploy, fix all failing SEO findings, mark fixed.

## 7. Technical notes

- New deps: `react-masonry-css` (Pinterest layout), `date-fns` (events), `@tanstack/react-table` (admin tables), `recharts` (admin sparklines).
- Storage buckets: `gallery` (public read), `events` (public read), `avatars` (authenticated).
- All admin mutations behind `requireSupabaseAuth` + role check; never trust client role claims.
- Public read paths use publishable server client, not `supabaseAdmin`.
- Google auth wired via `supabase--configure_social_auth` in the same turn it's added.

## Order of execution

1. SQL migration (all tables, RLS, roles, storage buckets, triggers) — one migration call for approval.
2. Seed programs/faqs/testimonials from current hardcoded content (same migration).
3. Server fns + public data fetchers, refactor pages to read from DB.
4. Redesign About / Programs / Gallery / Testimonials / FAQ / Contact.
5. Events route + Home featured-events strip.
6. Booking flow modal + contact/newsletter server fns + admin notification email.
7. Auth pages + admin dashboard.
8. SEO pass (heads, JSON-LD, sitemap from DB, findings sweep).

This is ~3–4 substantial turns of work after the migration is approved. I'll proceed turn-by-turn and check in with you at each milestone (after DB, after public redesign, after admin, after SEO). Reply "go" to start with the migration, or tell me to trim scope (e.g. skip admin for now, skip events, keep gallery hardcoded, etc.).
