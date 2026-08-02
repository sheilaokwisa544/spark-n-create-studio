import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, Heart, Star, Play, Palette, Users,
  PartyPopper, GraduationCap, Award, Brush, Wand2, Trophy,
  MessageCircle, CalendarCheck, Rocket, PartyPopper as Party2, Phone,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";
import coverAsset from "@/assets/choranami-cover.png.asset.json";
import brushesAsset from "@/assets/choranami-brushes.jpg.asset.json";
import { photos } from "@/lib/photos";

const heroKids = photos.schoolClub;
const heroParty = photos.outdoorParty;
const heroCanvas = photos.partyTable;
const heroStudent = photos.miniCanvases;
import { PROGRAMS } from "@/lib/programs";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChoraNami — Creative Education for Young Minds in Kenya" },
      {
        name: "description",
        content:
          "ChoraNami sparks creativity in children through school art clubs, homeschool classes, ArTogether experiences and Party Boom entertainment across Kenya.",
      },
      { property: "og:title", content: "ChoraNami — Creative Education for Young Minds" },
      {
        property: "og:description",
        content:
          "Art clubs, homeschool lessons, ArTogether experiences and Party Boom entertainment — helping every child discover their inner artist.",
      },
      { property: "og:image", content: coverAsset.url },
      { name: "twitter:image", content: coverAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout transparentHeader>
      <Hero />
      <FloatingDecor />
      <ServicesCarousel />
      <StatsBand />
      <WhyChoose />
      <TimelineSection />
      <VideoSection />
      <TestimonialsPreview />
      <CTABand />
    </SiteLayout>
  );
}

/* ============================================================
   HERO — full-width swiper with parallax + fade
============================================================ */
const HERO_SLIDES = [
  {
    image: heroKids,
    kicker: "Where imagination begins",
    title: "Creative Education for Young Minds",
    desc: "Weekly art clubs, homeschool lessons and unforgettable creative experiences — designed for children across Kenya.",
    ctaPrimary: { to: "/programs", label: "Explore Programs" },
    ctaSecondary: { to: "/contact", label: "Book a Session" },
  },
  {
    image: heroCanvas,
    kicker: "ArTogether",
    title: "Bring your team together, one canvas at a time",
    desc: "Interactive painting experiences for schools, churches, companies and community groups — from 50 to 500 participants.",
    ctaPrimary: { to: "/contact", label: "Book ArTogether" },
    ctaSecondary: { to: "/programs", label: "How it works" },
  },
  {
    image: heroParty,
    kicker: "Party Boom",
    title: "The most colorful birthday party ever",
    desc: "Painting stations, crafts, creative games and group art projects delivered straight to your venue.",
    ctaPrimary: { to: "/contact", label: "Plan a Party" },
    ctaSecondary: { to: "/gallery", label: "See Photos" },
  },
  {
    image: heroStudent,
    kicker: "Real confidence, real skills",
    title: "Every child is an artist",
    desc: "1,200+ young artists reached across 30+ schools — with hands-on curricula that build lifelong creative skills.",
    ctaPrimary: { to: "/about", label: "Our Story" },
    ctaSecondary: { to: "/gallery", label: "See the Work" },
  },
];

function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.title} className="relative">
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover scale-110 animate-[float-slow_18s_ease-in-out_infinite]"
                style={{ transformOrigin: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown/85 via-brand-brown/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-24 sm:px-6 md:items-center md:pb-0">
              <div className="max-w-2xl text-white">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow"
                >
                  <Sparkles className="h-3.5 w-3.5" /> {slide.kicker}
                </motion.p>
                <motion.h1
                  key={slide.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mt-5 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="mt-5 max-w-xl text-lg text-white/85"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Link to={slide.ctaPrimary.to} className="btn-pill bg-gradient-button text-white shadow-glow-orange">
                    {slide.ctaPrimary.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={slide.ctaSecondary.to}
                    className="btn-pill glass-dark text-white border border-white/30 hover:bg-white/15"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-white" />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Floating decor between sections
============================================================ */
function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -mt-8 h-0 overflow-visible">
      <span className="absolute left-[6%] -top-4 text-4xl animate-float-x">🖌</span>
      <span className="absolute right-[10%] -top-8 text-3xl animate-float-slow">✨</span>
      <span className="absolute left-[45%] -top-2 text-2xl animate-wiggle">🎨</span>
    </div>
  );
}

/* ============================================================
   SERVICES — horizontal carousel with big imagery
============================================================ */
const PROGRAM_MEDIA: Record<string, { image: string; emoji: string; hue: string }> = {
  "school-art-clubs":       { image: heroKids,    emoji: "🎨", hue: "from-brand-orange to-brand-yellow" },
  "homeschool-art-classes": { image: brushesAsset.url, emoji: "🖌", hue: "from-brand-turquoise to-brand-purple" },
  artogether:               { image: heroCanvas,  emoji: "🎉", hue: "from-brand-purple to-brand-orange" },
  "party-boom":             { image: heroParty,   emoji: "🎈", hue: "from-brand-yellow to-brand-orange" },
};

function ServicesCarousel() {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Our Services"
          title={<>Four ways to spark <span className="text-gradient-splash">creativity</span></>}
          sub="Every ChoraNami program is built around one belief — that every child is already an artist."
        />
      </div>
      <div className="mt-14">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.1}
          centeredSlides
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1.8, centeredSlides: true },
            1024: { slidesPerView: 2.5, centeredSlides: false },
            1280: { slidesPerView: 3, centeredSlides: false },
          }}
          className="!pb-14 !px-4 sm:!px-8 lg:!px-16"
        >
          {PROGRAMS.map((p) => {
            const media = PROGRAM_MEDIA[p.slug];
            return (
              <SwiperSlide key={p.slug}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative h-[460px] overflow-hidden rounded-[2rem] shadow-splash ring-1 ring-white/40"
                >
                  <img
                    src={media.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${media.hue} opacity-70 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                    <span className="text-base">{media.emoji}</span> {p.title.split(" ")[0]}
                  </div>

                  <div className="absolute bottom-0 p-7 text-white">
                    <h3 className="font-display text-3xl font-black leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/85 max-w-sm">{p.short}</p>
                    <Link
                      to="/programs"
                      hash={p.slug}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-brand-brown hover:bg-brand-yellow transition group/btn"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

/* ============================================================
   STATS — animated counters
============================================================ */
const STATS = [
  { n: 500, suffix: "+", label: "Happy children", icon: Heart, color: "text-brand-orange" },
  { n: 30, suffix: "+", label: "School programs", icon: GraduationCap, color: "text-brand-turquoise" },
  { n: 100, suffix: "+", label: "Creative events", icon: PartyPopper, color: "text-brand-purple" },
  { n: 1000, suffix: "+", label: "Artworks created", icon: Palette, color: "text-brand-yellow" },
];

function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 px-4 sm:px-6"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <SplashBlob className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 opacity-40" color="var(--brand-orange)" />
      <SplashBlob className="pointer-events-none absolute -right-20 -bottom-16 h-72 w-72 opacity-40" color="var(--brand-purple)" delay={0.4} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          kicker="Our Impact"
          title={<>Colouring the world, <span className="text-gradient-splash">one child</span> at a time</>}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-7 text-center shadow-glass"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-card ${s.color}`}>
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mt-4 font-display text-5xl font-black text-brand-brown">
                <Counter to={s.n} play={inView} />{s.suffix}
              </div>
              <p className="mt-1 text-sm font-semibold text-brand-brown/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, play }: { to: number; play: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!play) return;
    const controls = animate(mv, to, { duration: 1.8, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setText(v));
    return () => { controls.stop(); unsub(); };
  }, [play, to, mv, rounded]);

  return <span>{text}</span>;
}

/* ============================================================
   WHY CHOOSE — animated icon cards
============================================================ */
const REASONS = [
  { icon: Brush, title: "Professional Educators", desc: "Trained instructors who love kids and love art.", color: "bg-brand-orange text-white" },
  { icon: Wand2, title: "Hands-on Learning", desc: "Every session is play, exploration and discovery.", color: "bg-brand-turquoise text-white" },
  { icon: Trophy, title: "Creative Excellence", desc: "A structured curriculum with visible progress.", color: "bg-brand-purple text-white" },
  { icon: Heart, title: "Confidence Building", desc: "We celebrate every child's unique voice.", color: "bg-brand-yellow text-brand-brown" },
  { icon: Palette, title: "Premium Materials", desc: "Quality paints, brushes and canvases — always provided.", color: "bg-brand-orange text-white" },
  { icon: Award, title: "Memorable Experiences", desc: "Exhibitions, showcases and moments they'll never forget.", color: "bg-brand-purple text-white" },
];

function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl py-24 px-4 sm:px-6">
      <SectionHeader
        kicker="Why ChoraNami"
        title={<>Built on <span className="text-gradient-splash">passion</span>, powered by children</>}
        sub="Six reasons families and schools across Kenya trust us with their most creative moments."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl bg-card p-7 shadow-card ring-1 ring-border transition-all hover:shadow-splash"
          >
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${r.color} shadow-card group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
              <r.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-xl font-black text-brand-brown">{r.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   TIMELINE — customer journey
============================================================ */
const STEPS = [
  { icon: Phone, title: "Contact Us", desc: "Tell us about your school, group or party.", color: "bg-brand-orange" },
  { icon: Palette, title: "Choose a Program", desc: "We'll recommend the right fit for your goals.", color: "bg-brand-turquoise" },
  { icon: CalendarCheck, title: "Book Your Session", desc: "Lock in your date and let us handle the rest.", color: "bg-brand-purple" },
  { icon: Rocket, title: "Create Amazing Art", desc: "We bring the studio to you — brushes and all.", color: "bg-brand-yellow" },
  { icon: Party2, title: "Celebrate Creativity", desc: "Exhibitions, take-home art and lasting memories.", color: "bg-brand-orange" },
];

function TimelineSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 bg-brand-cream">
      <SplashBlob className="pointer-events-none absolute -right-16 top-10 h-80 w-80 opacity-25" color="var(--brand-yellow)" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="How it works"
          title={<>From <span className="text-gradient-splash">hello</span> to happy artists</>}
          sub="A simple journey — designed to feel effortless for parents, teachers and organizers."
        />

        <div className="relative mt-16">
          {/* Dashed connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-brand-orange/40" />

          <div className="grid gap-10 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full ${s.color} text-white shadow-splash ring-8 ring-brand-cream`}>
                  <s.icon className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black text-brand-brown ring-2 ring-brand-brown/10 shadow-card">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-black text-brand-brown">{s.title}</h3>
                <p className="mt-1 text-sm text-foreground/70 max-w-[200px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VIDEO SECTION — parallax cover + play button
============================================================ */
function VideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24">
      <SectionHeader
        kicker="Watch"
        title={<>See <span className="text-gradient-splash">ChoraNami</span> in action</>}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-10 aspect-video overflow-hidden rounded-[2rem] shadow-splash ring-1 ring-white/40"
      >
        <img
          src={heroCanvas}
          alt="ChoraNami art event"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/20 to-transparent" />
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 grid place-items-center group"
            aria-label="Play video"
          >
            <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-white text-brand-orange shadow-splash transition-transform group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
              <Play className="relative h-9 w-9 translate-x-0.5 fill-current" />
            </span>
            <span className="absolute bottom-8 left-8 max-w-md text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">Story</p>
              <p className="mt-2 font-display text-2xl font-black md:text-3xl">
                A term of colour with ChoraNami
              </p>
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-black/90 text-white/70 text-sm px-6 text-center">
            Video coming soon — reach out and we'll share our reel by email.
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS PREVIEW — auto-slide
============================================================ */
const PREVIEW_REVIEWS = [
  { name: "Wanjiku M.", role: "Parent of two", quote: "My daughter looks forward to her ChoraNami club every single week. She's grown so much in confidence." },
  { name: "St. Mary's Primary", role: "Deputy Head", quote: "Their instructors are professional, prepared and so patient with our learners. The end-of-term exhibition was magical." },
  { name: "TechCorp Nairobi", role: "People & Culture", quote: "ArTogether was the best team offsite we've done. Every single person left smiling and with a canvas." },
  { name: "Kaia's mum", role: "Birthday party", quote: "Party Boom turned her 8th birthday into pure magic. The kids are still talking about it." },
  { name: "Achieng O.", role: "Homeschool mum", quote: "One-on-one art lessons have been a highlight of our week. The curriculum feels tailored to my son." },
];

function TestimonialsPreview() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 bg-hero-wash">
      <SplashBlob className="pointer-events-none absolute -left-20 top-20 h-72 w-72 opacity-30" color="var(--brand-turquoise)" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Kind Words"
          title={<>Loved by <span className="text-gradient-splash">parents & schools</span></>}
        />
        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-12"
          >
            {PREVIEW_REVIEWS.map((r) => (
              <SwiperSlide key={r.name}>
                <figure className="h-full glass-card rounded-3xl p-7 shadow-glass">
                  <div className="flex gap-0.5 text-brand-yellow">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-brand-brown">
                    "{r.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-button text-white font-display text-lg font-black">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-brand-brown">{r.name}</p>
                      <p className="text-xs text-brand-brown/60">{r.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-6 text-center">
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-bold text-brand-brown hover:text-brand-orange">
            See all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
============================================================ */
function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brown p-10 shadow-splash sm:p-16"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-orange/40 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-purple/40 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Let's Create Together
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
              Ready to bring <span className="text-gradient-splash">colour</span> into your child's world?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Whether it's a school club, a homeschool lesson or a birthday to remember — we'd love to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="btn-pill bg-gradient-button text-white shadow-glow-orange">
              Book a Program <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill glass-dark text-white border border-white/30 hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Shared section header
============================================================ */
function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange shadow-card ring-1 ring-brand-orange/20">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" /> {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-black leading-tight text-brand-brown sm:text-5xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-foreground/70">{sub}</p> : null}
    </motion.div>
  );
}
