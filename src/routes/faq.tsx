import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { listFaqs } from "@/lib/data.functions";
import { photos } from "@/lib/photos";

const faqsQuery = queryOptions({ queryKey: ["faqs"], queryFn: () => listFaqs() });

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ChoraNami Art Program Questions Answered" },
      {
        name: "description",
        content:
          "Answers to common questions about ChoraNami art clubs, homeschool lessons, ArTogether team experiences and Party Boom kids' events.",
      },
      { property: "og:title", content: "ChoraNami FAQ" },
      { property: "og:description", content: "Everything you need to know before booking a ChoraNami program." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [],
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(faqsQuery),
  component: FAQ,
  errorComponent: ({ reset }) => (
    <div className="p-10 text-center">
      <p>Failed to load.</p>
      <button onClick={reset} className="underline">Retry</button>
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found</div>,
});

function FAQ() {
  const { data: faqs } = useSuspenseQuery(faqsQuery);
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    faqs.forEach((f) => set.add(f.category));
    return Array.from(set);
  }, [faqs]);
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? faqs : faqs.filter((f) => f.category === category);

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="FAQ"
        title={<><span className="text-gradient-splash">Frequently</span> asked</>}
        subtitle="Can't find your question? Drop us a message — we reply within one business day."
        accent="orange"
        image={photos.miniCanvases}
        ctaPrimary={{ to: "/contact", label: "Ask Us Anything" }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === c
                  ? "bg-gradient-button text-white shadow-glow-orange"
                  : "glass-card text-brand-brown/80 hover:text-brand-brown"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {visible.map((qa) => (
              <AccordionItem
                key={qa.id}
                value={qa.id}
                className="glass-card overflow-hidden rounded-2xl border-none px-5 shadow-glass"
              >
                <AccordionTrigger className="text-left font-display text-lg font-bold text-brand-brown hover:no-underline">
                  <span className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-button text-xs text-white">
                      <HelpCircle className="h-3.5 w-3.5" />
                    </span>
                    <span>{qa.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 text-brand-brown/75">
                  {qa.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-12 rounded-3xl bg-gradient-brown p-8 text-center text-white shadow-splash md:p-12">
          <MessageCircle className="mx-auto h-10 w-10 text-brand-yellow" />
          <h2 className="mt-3 font-display text-3xl font-black">Still have questions?</h2>
          <p className="mt-2 text-white/80">We'd love to hear from you — we reply fast.</p>
          <Link to="/contact" className="btn-pill mt-5 bg-gradient-button text-white shadow-glow-orange">
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
