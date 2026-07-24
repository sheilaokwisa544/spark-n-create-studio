import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowRight, Palette, Users, PartyPopper, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SplashBlob } from "@/components/site/Splash";
import { PROGRAMS, programColorClasses } from "@/lib/programs";
import heroKids from "@/assets/hero-kids-painting.jpg";
import heroParty from "@/assets/hero-party.jpg";
import heroCanvas from "@/assets/hero-canvas-event.jpg";
import heroStudent from "@/assets/hero-student-artwork.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — ChoraNami Art Experiences for Kids in Kenya" },
      {
        name: "description",
        content:
          "Explore ChoraNami's programs: School Art Clubs, Homeschool Art Classes, ArTogether team experiences and Party Boom kids' events. Book yours today.",
      },
      { property: "og:title", content: "ChoraNami Programs" },
      {
        property: "og:description",
        content: "School Art Clubs, Homeschool Art Classes, ArTogether and Party Boom — pick the experience that fits.",
      },
      { property: "og:image", content: heroKids },
      { name: "twitter:image", content: heroKids },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

const PROGRAM_MEDIA: Record<string, { image: string; badge: string }> = {
  "school-art-clubs": { image: heroKids, badge: "In Schools" },
  "homeschool-art-classes": { image: heroStudent, badge: "At Home" },
  artogether: { image: heroCanvas, badge: "Team Events" },
  "party-boom": { image: heroParty, badge: "Parties" },
};

const iconMap: Record<string, LucideIcon> = { GraduationCap, Palette, Users, PartyPopper };

function Programs() {
  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Our Programs"
        title={<>Four ways to <span className="text-gradient-splash">create</span></>}
        subtitle="Structured, joyful and hands-on. Pick the program that fits your school, family, team or event."
        accent="orange"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {PROGRAMS.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-brand-brown shadow-card ring-1 ring-white transition hover:bg-white hover:-translate-y-0.5"
            >
              {p.title}
            </a>
          ))}
        </div>
      </PageHero>

      {/* Mobile-only card swiper preview */}
      <section className="mx-auto max-w-md px-4 py-10 md:hidden">
        <Swiper
          modules={[EffectCards, Autoplay]}
          effect="cards"
          grabCursor
          autoplay={{ delay: 3500 }}
          loop
          className="h-72"
        >
          {PROGRAMS.map((p) => (
            <SwiperSlide key={p.slug} className="!rounded-3xl overflow-hidden">
              <img src={PROGRAM_MEDIA[p.slug].image} alt={p.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-brand-yellow">{PROGRAM_MEDIA[p.slug].badge}</p>
                <h3 className="font-display text-2xl font-black">{p.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Program showcase slabs */}
      <section className="mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6 md:py-24">
        {PROGRAMS.map((p, i) => {
          const media = PROGRAM_MEDIA[p.slug];
          const Icon = p.Icon;
          void iconMap;
          return (
            <motion.article
              key={p.slug}
              id={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`relative grid gap-10 md:grid-cols-2 md:items-center scroll-mt-32 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                <SplashBlob className="pointer-events-none absolute -left-8 -top-8 h-72 w-72 opacity-30" color={`var(--brand-${p.color})`} />
                <div className="relative overflow-hidden rounded-[2rem] shadow-splash ring-1 ring-white">
                  <img src={media.image} alt={p.title} className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  <div className={`absolute top-5 left-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${programColorClasses[p.color]}`}>
                    {media.badge}
                  </div>
                </div>
              </div>
              <div>
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${programColorClasses[p.color]} shadow-card`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-display text-4xl font-black text-brand-brown md:text-5xl">{p.title}</h2>
                <p className="mt-3 text-lg text-foreground/75">{p.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 rounded-xl bg-white/60 p-3 text-sm shadow-card ring-1 ring-border">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-brand-turquoise" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    search={{ service: p.slug }}
                    className="btn-pill bg-gradient-button text-white shadow-glow-orange"
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/gallery" className="btn-pill bg-white text-brand-brown ring-1 ring-border">
                    See it in action
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>
    </SiteLayout>
  );
}
