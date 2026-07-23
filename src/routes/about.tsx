import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";
import logoAsset from "@/assets/choranami-logo.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ChoraNami — Every Child is an Artist" },
      {
        name: "description",
        content:
          "ChoraNami's mission is to inspire creativity, confidence and self-expression in every child through joyful art experiences.",
      },
      { property: "og:title", content: "About ChoraNami" },
      {
        property: "og:description",
        content:
          "We believe every child is an artist. Learn our story, our mission and our vision.",
      },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -left-16 top-10 h-72 w-72 opacity-40"
          color="var(--brand-yellow)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-black text-brand-brown sm:text-6xl"
          >
            Every child is <span className="text-gradient-splash">an artist</span>
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/75">
            ChoraNami began with one belief — that creativity is a language every child
            speaks fluently. We just give them the tools, the time and the space to
            express it.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
        <img
          src={logoAsset.url}
          alt="ChoraNami logo"
          className="mx-auto w-64 rounded-3xl shadow-splash ring-4 ring-white"
        />
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
              Our Mission
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-brown">
              Inspire creativity that lasts a lifetime
            </h2>
            <p className="mt-3 text-foreground/75">
              To inspire creativity, confidence, imagination and self-expression in
              children through engaging art experiences.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-turquoise">
              Our Vision
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-brown">
              A generation of confident young creators
            </h2>
            <p className="mt-3 text-foreground/75">
              A Kenya — and Africa — where every child has access to meaningful art
              education, no matter where they live or learn.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Play First",
              d: "Learning happens when children feel free — we design every lesson to feel like play.",
              c: "bg-brand-orange text-white",
            },
            {
              t: "Craft Matters",
              d: "Real materials, professional instructors, and skills that stick beyond the classroom.",
              c: "bg-brand-turquoise text-white",
            },
            {
              t: "Every Child",
              d: "Ability, background or budget — every child deserves the joy of making art.",
              c: "bg-brand-purple text-white",
            },
          ].map((v) => (
            <div
              key={v.t}
              className="rounded-3xl bg-card p-6 shadow-card ring-1 ring-border"
            >
              <div className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase ${v.c}`}>
                Value
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-brand-brown">
                {v.t}
              </h3>
              <p className="mt-2 text-sm text-foreground/75">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
