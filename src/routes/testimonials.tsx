import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — What Parents & Schools Say About ChoraNami" },
      {
        name: "description",
        content:
          "Hear from parents, teachers and school leaders on how ChoraNami has sparked creativity in their children.",
      },
      { property: "og:title", content: "ChoraNami Testimonials" },
      {
        property: "og:description",
        content: "Real stories from families and schools across Kenya.",
      },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

const REVIEWS = [
  { name: "Wanjiku M.", role: "Parent of two", quote: "My daughter looks forward to her ChoraNami club every single week. She's grown so much in confidence.", color: "from-brand-orange to-brand-yellow" },
  { name: "St. Mary's Primary", role: "Deputy Head", quote: "Their instructors are professional, prepared and so patient with our learners. The end-of-term exhibition was magical.", color: "from-brand-turquoise to-brand-purple" },
  { name: "Achieng O.", role: "Homeschool mum", quote: "One-on-one art lessons have been a highlight of our week. The curriculum feels tailored to my son.", color: "from-brand-purple to-brand-orange" },
  { name: "TechCorp Nairobi", role: "People & Culture", quote: "ArTogether was the best team offsite we've done. Every single person left smiling and with a canvas.", color: "from-brand-yellow to-brand-orange" },
  { name: "Kaia's mum", role: "Birthday party", quote: "Party Boom turned her 8th birthday into pure magic. The kids are still talking about it.", color: "from-brand-orange to-brand-purple" },
  { name: "Rev. Kimani", role: "Community Church", quote: "A wonderful group of professionals — the children created beautiful pieces they're truly proud of.", color: "from-brand-turquoise to-brand-yellow" },
];

function Testimonials() {
  return (
    <SiteLayout transparentHeader>
      <section className="relative overflow-hidden bg-hero-wash pt-32 pb-16">
        <SplashBlob className="pointer-events-none absolute -right-10 top-10 h-72 w-72 opacity-40" color="var(--brand-turquoise)" />
        <SplashBlob className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 opacity-30" color="var(--brand-orange)" delay={0.3} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange shadow-card ring-1 ring-brand-orange/20">
            <Star className="h-3.5 w-3.5 fill-current" /> 5-star community
          </p>
          <h1 className="mt-5 font-display text-5xl font-black text-brand-brown sm:text-6xl">
            <span className="text-gradient-splash">Kind words</span> from our community
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-brown/70">
            Six years of colour, one story at a time.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          centeredSlides
          slidesPerView={1.1}
          breakpoints={{ 768: { slidesPerView: 1.8 }, 1024: { slidesPerView: 2.4 } }}
          className="!pb-16 !px-4"
        >
          {REVIEWS.map((r) => (
            <SwiperSlide key={r.name} className="!h-auto">
              <motion.figure
                whileHover={{ y: -6 }}
                className={`relative h-full min-h-[300px] rounded-[2rem] bg-gradient-to-br ${r.color} p-1 shadow-splash`}
              >
                <div className="h-full rounded-[calc(2rem-4px)] bg-card p-8">
                  <Quote className="h-10 w-10 text-brand-orange/70" />
                  <div className="mt-2 flex gap-0.5 text-brand-yellow">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg leading-relaxed text-brand-brown">
                    "{r.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${r.color} font-display text-lg font-black text-white`}>
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
    </SiteLayout>
  );
}
