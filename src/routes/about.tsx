import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles, Compass, GraduationCap, Users, Palette, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SplashBlob } from "@/components/site/Splash";
import logoAsset from "@/assets/choranami-logo.jpg.asset.json";
import brushesAsset from "@/assets/choranami-brushes.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ChoraNami — Kenya's Creative Home for Kids" },
      {
        name: "description",
        content:
          "ChoraNami's mission is to inspire creativity, confidence and self-expression in every child across Kenya through joyful, hands-on art experiences.",
      },
      { property: "og:title", content: "About ChoraNami" },
      {
        property: "og:description",
        content: "Our story, mission and vision — every child is an artist.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: brushesAsset.url },
      { name: "twitter:image", content: brushesAsset.url },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const MILESTONES = [
  { year: "2019", title: "The first brush", desc: "ChoraNami begins as a weekend art club in a Nairobi living room." },
  { year: "2021", title: "First school partnership", desc: "Our art clubs launch as a curriculum add-on in 3 schools." },
  { year: "2023", title: "ArTogether is born", desc: "We take colour to corporates, churches and community groups." },
  { year: "2024", title: "500+ young artists", desc: "A milestone: half a thousand children reached across Kenya." },
  { year: "Today", title: "A creative movement", desc: "30+ schools, 1000+ artworks, and just getting started." },
];

const VALUES = [
  { icon: Sparkles, title: "Play First", desc: "Learning happens when children feel free — every lesson feels like play.", color: "bg-brand-orange text-white" },
  { icon: Palette, title: "Craft Matters", desc: "Real materials, professional instructors and skills that stick.", color: "bg-brand-turquoise text-white" },
  { icon: Heart, title: "Every Child", desc: "Ability, background, budget — every child deserves the joy of making art.", color: "bg-brand-purple text-white" },
  { icon: Users, title: "Community First", desc: "We build with schools, parents and partners — never alone.", color: "bg-brand-yellow text-brand-brown" },
];

function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Our Story"
        title={<>Every child is <span className="text-gradient-splash">an artist</span></>}
        subtitle="ChoraNami began with one belief — that creativity is a language every child speaks fluently. We just give them the tools, the time and the space to express it."
        accent="yellow"
      />

      {/* Mission + Vision */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-brand-orange/20 via-brand-yellow/20 to-brand-purple/20 blur-2xl" />
            <img
              src={logoAsset.url}
              alt="ChoraNami — creative education for young minds in Kenya"
              className="relative mx-auto w-72 rounded-[2rem] shadow-splash ring-4 ring-white"
              width={288}
              height={288}
            />
          </motion.div>
          <div className="space-y-8">
            <MissionCard
              kicker="Our Mission"
              accent="text-brand-orange"
              title="Inspire creativity that lasts a lifetime"
              body="To inspire creativity, confidence, imagination and self-expression in children through engaging, hands-on art experiences delivered by professionals who love kids and love art."
            />
            <MissionCard
              kicker="Our Vision"
              accent="text-brand-turquoise"
              title="A generation of confident young creators"
              body="A Kenya — and Africa — where every child has access to meaningful art education, no matter where they live or learn."
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden py-24" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <SplashBlob className="pointer-events-none absolute -left-20 top-0 h-80 w-80 opacity-30" color="var(--brand-purple)" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple shadow-card">
              <Compass className="h-3.5 w-3.5" /> The Journey
            </p>
            <h2 className="mt-4 font-display text-4xl font-black text-brand-brown sm:text-5xl">
              Six years of <span className="text-gradient-splash">colour</span>
            </h2>
          </div>
          <div ref={timelineRef} className="relative mt-14">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-orange via-brand-yellow to-brand-purple" />
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative mb-10 flex items-start gap-6 md:mb-14 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 top-6 h-5 w-5 -translate-x-1/2 rounded-full bg-white shadow-card ring-4 ring-brand-orange" />
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <div className="glass-card rounded-2xl p-6 shadow-glass">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">{m.year}</p>
                    <h3 className="mt-1 font-display text-2xl font-black text-brand-brown">{m.title}</h3>
                    <p className="mt-2 text-sm text-brand-brown/70">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">What We Stand For</p>
          <h2 className="mt-3 font-display text-4xl font-black text-brand-brown sm:text-5xl">
            Our <span className="text-gradient-splash">values</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="group rounded-3xl bg-card p-7 shadow-card ring-1 ring-border transition hover:shadow-splash"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${v.color} shadow-card group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                <v.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-brand-brown">{v.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brown p-10 text-center text-white shadow-splash md:p-16">
          <SplashBlob className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-30" color="var(--brand-yellow)" />
          <SplashBlob className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 opacity-30" color="var(--brand-orange)" delay={0.3} />
          <div className="relative">
            <GraduationCap className="mx-auto h-12 w-12 text-brand-yellow" />
            <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">
              Bring ChoraNami to your school or home
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              We'd love to hear about the young artists in your world. Let's build something colourful together.
            </p>
            <Link to="/contact" className="btn-pill mt-6 bg-gradient-button text-white shadow-glow-orange">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function MissionCard({ kicker, accent, title, body }: { kicker: string; accent: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl bg-card p-7 shadow-card ring-1 ring-border transition hover:shadow-splash">
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>{kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-black text-brand-brown">{title}</h3>
      <p className="mt-3 text-foreground/75">{body}</p>
    </div>
  );
}
