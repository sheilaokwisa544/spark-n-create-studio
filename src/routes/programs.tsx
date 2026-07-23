import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";
import { PROGRAMS, programColorClasses } from "@/lib/programs";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs — ChoraNami Art Experiences" },
      {
        name: "description",
        content:
          "Explore ChoraNami art programs: School Art Clubs, Homeschool Art Classes, ArTogether team experiences and Party Boom kids' events.",
      },
      { property: "og:title", content: "ChoraNami Programs" },
      {
        property: "og:description",
        content:
          "School Art Clubs, Homeschool Art Classes, ArTogether and Party Boom — pick the experience that fits.",
      },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

function Programs() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -right-10 top-10 h-72 w-72 opacity-40"
          color="var(--brand-orange)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-black text-brand-brown sm:text-6xl">
            Our <span className="text-gradient-splash">Programs</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Structured, joyful and hands-on. Pick the program that fits your school,
            family or event.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-20 sm:px-6">
        {PROGRAMS.map((p, i) => (
          <motion.article
            key={p.slug}
            id={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`grid gap-8 rounded-[2rem] bg-card p-8 shadow-card ring-1 ring-border md:grid-cols-[1fr_1.5fr] md:items-center md:p-12 ${
              i % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div
              className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl ${programColorClasses[p.color]}`}
            >
              <SplashBlob
                className="absolute inset-0 h-full w-full opacity-30"
                color="rgba(255,255,255,0.9)"
              />
              <p.Icon className="relative h-24 w-24" strokeWidth={1.4} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                Program
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold text-brand-brown">
                {p.title}
              </h2>
              <p className="mt-3 text-lg text-foreground/75">{p.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand-turquoise" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                search={{ service: p.slug }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-splash hover:brightness-105"
              >
                {p.cta}
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}
