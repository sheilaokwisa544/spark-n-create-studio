import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";
import coverAsset from "@/assets/choranami-cover.png.asset.json";
import brushesAsset from "@/assets/choranami-brushes.jpg.asset.json";
import { PROGRAMS, programColorClasses } from "@/lib/programs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChoraNami — Creative Education for Young Minds" },
      {
        name: "description",
        content:
          "Discover ChoraNami's art programs for schools, homeschoolers, organizations and birthday parties across Kenya.",
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
    <SiteLayout>
      <Hero />
      <ProgramsPreview />
      <ValueStrip />
      <CTABand />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-wash">
      <SplashBlob
        className="pointer-events-none absolute -left-16 top-8 h-72 w-72 opacity-40"
        color="var(--brand-turquoise)"
      />
      <SplashBlob
        className="pointer-events-none absolute -right-10 bottom-8 h-80 w-80 opacity-40"
        color="var(--brand-purple)"
        delay={0.2}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-brown shadow-card"
          >
            <Sparkles className="h-3.5 w-3.5" /> Art programs for children in Kenya
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-5xl font-black leading-[1.05] text-brand-brown sm:text-6xl md:text-7xl"
          >
            Creative Education for{" "}
            <span className="text-gradient-splash">Young Minds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-foreground/75"
          >
            Helping children discover their creativity through engaging art experiences
            that build confidence, imagination and lifelong artistic skills.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-splash transition hover:brightness-105 hover:scale-[1.02]"
            >
              Book a Program <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-brown ring-2 ring-brand-brown/10 shadow-card transition hover:bg-accent"
            >
              Partner With Us
            </Link>
          </motion.div>
          <div className="mt-8 flex items-center gap-6 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-brand-orange" /> Loved by 30+ schools
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-brand-yellow" /> 5-star parent reviews
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-splash ring-4 ring-white">
            <img
              src={brushesAsset.url}
              alt="A hand holding an array of paint-covered brushes"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border animate-float-slow"
          >
            <div className="h-10 w-10 rounded-full bg-brand-turquoise" />
            <div>
              <p className="text-xs font-semibold text-brand-brown">This term</p>
              <p className="text-sm font-bold">1,200+ young artists</p>
            </div>
          </motion.div>
          <motion.div className="absolute -top-4 -right-4 rounded-2xl bg-brand-yellow p-4 shadow-card ring-1 ring-brand-brown/10 animate-wiggle">
            <span className="font-display text-2xl font-black text-brand-brown">C$N</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgramsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
          Our Programs
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-brand-brown sm:text-5xl">
          Four ways to spark creativity
        </h2>
        <p className="mt-4 text-foreground/70">
          From weekly school clubs to unforgettable birthday parties — we bring the art
          studio to your door.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRAMS.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group rounded-3xl bg-card p-6 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-splash"
          >
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${programColorClasses[p.color]}`}
            >
              <p.Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-brand-brown">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{p.short}</p>
            <Link
              to="/programs"
              hash={p.slug}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange group-hover:gap-2 transition-all"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ValueStrip() {
  const items = [
    { n: "1,200+", l: "Young artists reached" },
    { n: "30+", l: "Partner schools" },
    { n: "10", l: "Lessons per term" },
    { n: "100%", l: "Materials provided" },
  ];
  return (
    <section className="bg-brand-brown text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="text-center">
            <p className="font-display text-4xl font-black text-brand-yellow">{i.n}</p>
            <p className="mt-1 text-sm text-white/70">{i.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero-wash p-10 shadow-splash sm:p-16">
        <SplashBlob
          className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-40"
          color="var(--brand-orange)"
        />
        <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold text-brand-brown sm:text-5xl">
              Ready to bring color into your child's world?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-foreground/75">
              Whether it's a school club, a homeschool lesson or a birthday to remember —
              we'd love to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-splash hover:brightness-105"
            >
              Book a Program
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-brown ring-2 ring-brand-brown/10 hover:bg-accent"
            >
              See Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
