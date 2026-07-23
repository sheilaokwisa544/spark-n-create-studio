import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ChoraNami Art in Action" },
      {
        name: "description",
        content:
          "See ChoraNami in action: school art clubs, homeschool lessons, canvas painting, birthday parties and more.",
      },
      { property: "og:title", content: "ChoraNami Gallery" },
      {
        property: "og:description",
        content: "Moments from our art clubs, homeschool lessons and events.",
      },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const CATEGORIES = [
  "All",
  "School Art Clubs",
  "Homeschool Lessons",
  "Canvas Painting",
  "Birthday Parties",
  "Tote Bag Painting",
  "T-shirt Painting",
  "Children's Artwork",
] as const;

// Placeholder gallery — Phase 2 will replace with data from the DB + Storage.
const PLACEHOLDER = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Creative moment #${i + 1}`,
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
  hue: [40, 190, 300, 90, 20][i % 5],
}));

function GalleryPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = PLACEHOLDER.filter(
    (i) => category === "All" || i.category === category,
  );

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -left-10 top-10 h-72 w-72 opacity-40"
          color="var(--brand-purple)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-black text-brand-brown sm:text-6xl">
            <span className="text-gradient-splash">Gallery</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            A splash of colour from the ChoraNami community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? "bg-primary text-primary-foreground shadow-splash"
                  : "bg-card text-foreground/70 ring-1 ring-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {items.map((it, idx) => (
            <motion.button
              layout
              key={it.id}
              onClick={() => setLightbox(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left shadow-card ring-1 ring-border transition hover:-translate-y-1"
              style={{
                aspectRatio: idx % 3 === 0 ? "3/4" : idx % 4 === 0 ? "1/1" : "4/5",
                background: `linear-gradient(135deg, oklch(0.85 0.15 ${it.hue}), oklch(0.7 0.18 ${(it.hue + 60) % 360}))`,
              }}
              aria-label={`Open ${it.title}`}
            >
              <div className="flex h-full flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">
                  {it.category}
                </p>
                <p className="font-display text-lg font-bold">{it.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(135deg, oklch(0.85 0.15 ${items[lightbox].hue}), oklch(0.7 0.18 ${(items[lightbox].hue + 60) % 360}))`,
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-brown"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">
                  {items[lightbox].category}
                </p>
                <p className="font-display text-2xl font-bold">
                  {items[lightbox].title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SiteLayout>
  );
}
