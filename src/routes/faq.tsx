import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ChoraNami Art Programs" },
      {
        name: "description",
        content:
          "Answers to common questions about ChoraNami art clubs, homeschool lessons, ArTogether and Party Boom.",
      },
      { property: "og:title", content: "ChoraNami FAQ" },
      {
        property: "og:description",
        content: "Everything you need to know before booking a ChoraNami program.",
      },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const QA = [
  {
    q: "What ages do you cater to?",
    a: "Our programs are designed for children aged 4–14, with age-appropriate lessons and materials for each group.",
  },
  {
    q: "Do you provide materials?",
    a: "Yes — all materials are included in every program. Children arrive ready to create.",
  },
  {
    q: "Where do you operate?",
    a: "We're based in Nairobi, Kenya and travel to schools, homes and event venues across the country by arrangement.",
  },
  {
    q: "How long is a school term program?",
    a: "Our school art clubs run for 10 lessons per school term, typically once a week.",
  },
  {
    q: "What's the minimum for ArTogether?",
    a: "ArTogether experiences require a minimum booking of 50 participants.",
  },
  {
    q: "Can we book a birthday on short notice?",
    a: "We recommend booking Party Boom at least two weeks in advance, but reach out — we'll try to make it work.",
  },
  {
    q: "Do you offer payment plans?",
    a: "For school clubs and long-term partnerships, we're happy to structure payments per term. Contact us for details.",
  },
];

function FAQ() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -left-10 top-10 h-72 w-72 opacity-40"
          color="var(--brand-yellow)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-black text-brand-brown sm:text-6xl">
            Frequently <span className="text-gradient-splash">Asked</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Can't find your question? Drop us a message.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Accordion type="single" collapsible className="space-y-3">
          {QA.map((qa, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="text-left font-display text-lg font-bold text-brand-brown hover:no-underline">
                {qa.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/75">
                {qa.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
