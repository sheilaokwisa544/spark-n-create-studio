import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
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
  {
    name: "Wanjiku M.",
    role: "Parent of two",
    quote:
      "My daughter looks forward to her ChoraNami club every single week. She's grown so much in confidence.",
  },
  {
    name: "St. Mary's Primary",
    role: "Deputy Head",
    quote:
      "Their instructors are professional, prepared and so patient with our learners. The end-of-term exhibition was magical.",
  },
  {
    name: "Achieng O.",
    role: "Homeschool mum",
    quote:
      "One-on-one art lessons have been a highlight of our week. The curriculum feels tailored to my son.",
  },
  {
    name: "TechCorp Nairobi",
    role: "People & Culture",
    quote:
      "ArTogether was the best team offsite we've done. Every single person left smiling and with a canvas.",
  },
  {
    name: "Kaia's mum",
    role: "Birthday party",
    quote:
      "Party Boom turned her 8th birthday into pure magic. The kids are still talking about it.",
  },
  {
    name: "Rev. Kimani",
    role: "Community Church",
    quote:
      "A wonderful group of professionals — the children created beautiful pieces they're truly proud of.",
  },
];

function Testimonials() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -right-10 top-10 h-72 w-72 opacity-40"
          color="var(--brand-turquoise)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-black text-brand-brown sm:text-6xl">
            <span className="text-gradient-splash">Kind words</span> from our
            community
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative rounded-3xl bg-card p-6 shadow-card ring-1 ring-border"
          >
            <Quote className="absolute -top-3 left-6 h-8 w-8 text-brand-orange" />
            <div className="mb-3 flex gap-0.5 text-brand-yellow">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-base text-foreground/85">"{r.quote}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow font-display text-lg font-bold text-brand-brown">
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-brand-brown">{r.name}</p>
                <p className="text-xs text-foreground/60">{r.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </section>
    </SiteLayout>
  );
}
