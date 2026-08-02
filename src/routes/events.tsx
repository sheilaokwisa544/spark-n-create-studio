import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Ticket, ArrowRight, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { listEvents } from "@/lib/data.functions";
import { photos } from "@/lib/photos";

const heroParty = photos.outdoorParty;
const heroCanvas = photos.partyTable;
const heroKids = photos.schoolClub;

const eventsQuery = queryOptions({ queryKey: ["events"], queryFn: () => listEvents() });

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — ChoraNami Creative Experiences & Workshops" },
      {
        name: "description",
        content:
          "Upcoming ChoraNami events, workshops, family art nights and holiday camps across Kenya. Reserve your spot today.",
      },
      { property: "og:title", content: "ChoraNami Events" },
      { property: "og:description", content: "Workshops, camps, family canvas nights and school exhibitions." },
      { property: "og:image", content: heroParty },
      { name: "twitter:image", content: heroParty },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(eventsQuery),
  component: EventsPage,
  errorComponent: ({ reset }) => (
    <div className="p-10 text-center"><p>Failed to load.</p><button onClick={reset} className="underline">Retry</button></div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found</div>,
});

const FALLBACK_IMAGES = [heroParty, heroCanvas, heroKids];

function EventsPage() {
  const { data: events } = useSuspenseQuery(eventsQuery);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const now = Date.now();

  const upcoming = useMemo(
    () => events.filter((e) => new Date(e.starts_at).getTime() >= now || e.status === "upcoming").sort((a, b) => +new Date(a.starts_at) - +new Date(b.starts_at)),
    [events, now],
  );
  const past = useMemo(
    () => events.filter((e) => new Date(e.starts_at).getTime() < now && e.status !== "upcoming").sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at)),
    [events, now],
  );
  const featured = events.filter((e) => e.featured).slice(0, 4);
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Events"
        title={<>Come <span className="text-gradient-splash">create</span> with us</>}
        subtitle="Family canvas nights, holiday art camps, school exhibitions and community pop-ups — all on the ChoraNami calendar."
        accent="purple"
      />

      {/* Featured events swiper */}
      {featured.length > 0 ? (
        <section className="relative -mt-8 pb-4">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            loop={featured.length > 1}
            className="!pb-12"
          >
            {featured.map((e, i) => (
              <SwiperSlide key={e.id}>
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                  <div className="relative overflow-hidden rounded-[2rem] shadow-splash">
                    <img src={e.cover_url ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} alt={e.title} className="h-[440px] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-12">
                      <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow">
                        <Sparkles className="h-3.5 w-3.5" /> Featured
                      </span>
                      <h3 className="mt-3 font-display text-3xl font-black md:text-5xl">{e.title}</h3>
                      <p className="mt-2 max-w-xl text-white/85">{e.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
                        <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {format(new Date(e.starts_at), "PPP")}</span>
                        {e.location ? <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.location}</span> : null}
                        {e.price_text ? <span className="inline-flex items-center gap-2"><Ticket className="h-4 w-4" /> {e.price_text}</span> : null}
                      </div>
                      <Link to="/contact" search={{ service: `event:${e.slug}` }} className="btn-pill mt-5 bg-gradient-button text-white shadow-glow-orange">
                        Reserve a Spot <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : null}

      {/* Filter tabs */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex justify-center gap-2">
          {(["upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition ${
                tab === t ? "bg-gradient-button text-white shadow-glow-orange" : "glass-card text-brand-brown/80 hover:text-brand-brown"
              }`}
            >
              {t} ({t === "upcoming" ? upcoming.length : past.length})
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border transition hover:shadow-splash"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={e.cover_url ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <Calendar className="h-3 w-3" /> {format(new Date(e.starts_at), "MMM d")}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-black text-brand-brown">{e.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-brand-brown/70">{e.description}</p>
                <div className="mt-4 space-y-1.5 text-xs text-brand-brown/75">
                  {e.location ? <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand-orange" /> {e.location}</p> : null}
                  {e.capacity ? <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-brand-turquoise" /> Capacity: {e.capacity}</p> : null}
                  {e.price_text ? <p className="flex items-center gap-2"><Ticket className="h-3.5 w-3.5 text-brand-purple" /> {e.price_text}</p> : null}
                </div>
                {tab === "upcoming" ? (
                  <Link
                    to="/contact"
                    search={{ service: `event:${e.slug}` }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:gap-3 transition-all"
                  >
                    Reserve a spot <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-16 text-center text-brand-brown/60">
            <Calendar className="mx-auto h-10 w-10" />
            <p className="mt-3">No {tab} events right now — check back soon!</p>
          </div>
        ) : null}
      </section>
    </SiteLayout>
  );
}
