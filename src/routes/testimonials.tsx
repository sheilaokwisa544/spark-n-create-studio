import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote, Star, Heart, Users, Award, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import Masonry from "react-masonry-css";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { listTestimonials } from "@/lib/data.functions";

const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () => listTestimonials(),
});

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Reviews — What Parents & Schools Say About ChoraNami" },
      {
        name: "description",
        content:
          "Real stories from parents, teachers and school leaders across Kenya on how ChoraNami has sparked creativity in their children.",
      },
      { property: "og:title", content: "ChoraNami Reviews" },
      { property: "og:description", content: "Real stories from families and schools across Kenya." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(testimonialsQuery),
  component: Testimonials,
  errorComponent: ({ reset }) => (
    <div className="p-10 text-center">
      <p>Failed to load.</p>
      <button onClick={reset} className="underline">Retry</button>
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found</div>,
});

const STATS = [
  { icon: Heart, n: "500+", label: "Happy families" },
  { icon: Users, n: "30+", label: "Partner schools" },
  { icon: Star, n: "5.0", label: "Average rating" },
  { icon: Award, n: "6", label: "Years of colour" },
];

const GRADIENTS = [
  "from-brand-orange to-brand-yellow",
  "from-brand-turquoise to-brand-purple",
  "from-brand-purple to-brand-orange",
  "from-brand-yellow to-brand-orange",
  "from-brand-orange to-brand-purple",
  "from-brand-turquoise to-brand-yellow",
];

function Testimonials() {
  const { data: reviews } = useSuspenseQuery(testimonialsQuery);
  const featured = reviews.filter((r) => r.featured);
  const featuredList = featured.length ? featured : reviews;
  const wall = reviews;

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="5-Star Community"
        title={<><span className="text-gradient-splash">Kind words</span> from our community</>}
        subtitle="Six years of colour, one story at a time."
        accent="turquoise"
      />

      {/* Stats band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 text-center shadow-glass"
            >
              <s.icon className="mx-auto h-6 w-6 text-brand-orange" />
              <p className="mt-2 font-display text-3xl font-black text-brand-brown md:text-4xl">{s.n}</p>
              <p className="text-xs font-semibold text-brand-brown/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coverflow featured */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={featuredList.length > 2}
          pagination={{ clickable: true }}
          centeredSlides
          slidesPerView={1.1}
          breakpoints={{ 768: { slidesPerView: 1.8 }, 1024: { slidesPerView: 2.4 } }}
          className="!pb-16 !px-4"
        >
          {featuredList.map((r, i) => (
            <SwiperSlide key={r.id} className="!h-auto">
              <motion.figure
                whileHover={{ y: -6 }}
                className={`relative h-full min-h-[320px] rounded-[2rem] bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} p-1 shadow-splash`}
              >
                <div className="h-full rounded-[calc(2rem-4px)] bg-card p-8">
                  <Quote className="h-10 w-10 text-brand-orange/70" />
                  <div className="mt-2 flex gap-0.5 text-brand-yellow">
                    {Array.from({ length: r.rating ?? 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg leading-relaxed text-brand-brown">
                    "{r.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} font-display text-lg font-black text-white`}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-brand-brown">{r.name}</p>
                      <p className="text-xs text-brand-brown/60">{r.role}</p>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Wall of love */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple shadow-card">
            <Sparkles className="h-3.5 w-3.5" /> Wall of Love
          </p>
          <h2 className="mt-3 font-display text-4xl font-black text-brand-brown">
            Every voice, <span className="text-gradient-splash">every colour</span>
          </h2>
        </div>
        <Masonry
          breakpointCols={{ default: 3, 768: 2, 480: 1 }}
          className="mt-10 flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {wall.map((r, i) => (
            <motion.figure
              key={`wall-${r.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-card p-6 shadow-card ring-1 ring-border"
            >
              <div className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: r.rating ?? 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-brand-brown/85">"{r.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} text-xs font-bold text-white`}>
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-brown">{r.name}</p>
                  <p className="text-[11px] text-brand-brown/60">{r.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </Masonry>
      </section>
    </SiteLayout>
  );
}
