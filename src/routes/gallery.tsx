import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Masonry from "react-masonry-css";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { listGallery } from "@/lib/data.functions";
import { photos, galleryPhotos } from "@/lib/photos";

const heroKids = photos.schoolClub;

const galleryQuery = queryOptions({
  queryKey: ["gallery"],
  queryFn: () => listGallery(),
});

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ChoraNami Art in Action Across Kenya" },
      {
        name: "description",
        content:
          "See ChoraNami in action: school art clubs, homeschool lessons, canvas painting, birthday parties and children's artwork from across Kenya.",
      },
      { property: "og:title", content: "ChoraNami Gallery" },
      {
        property: "og:description",
        content: "Moments from our art clubs, homeschool lessons and events.",
      },
      { property: "og:image", content: heroKids },
      { name: "twitter:image", content: heroKids },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryQuery),
  component: GalleryPage,
  errorComponent: ({ reset }) => (
    <div className="p-10 text-center">
      <p>Failed to load gallery.</p>
      <button onClick={reset} className="underline">Retry</button>
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Not found</div>,
});

// Real ChoraNami photos shown until the admin uploads more.
function GalleryPage() {
  const { data: dbItems } = useSuspenseQuery(galleryQuery);

  const items = useMemo(() => {
    if (dbItems && dbItems.length > 0) return dbItems;
    return galleryPhotos.map((p, i) => ({
      id: `ph-${i}`,
      url: p.url,
      title: p.title,
      caption: null,
      category: p.category,
      width: null,
      height: null,
      sort_order: i,
    }));
  }, [dbItems]);


  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category ?? "General"));
    return Array.from(set);
  }, [items]);

  const [category, setCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category],
  );

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((n) => (n === null ? null : (n + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightbox((n) => (n === null ? null : (n - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Gallery"
        title={<>A splash of <span className="text-gradient-splash">colour</span></>}
        subtitle="Moments from ChoraNami art clubs, homeschool lessons, canvas events and unforgettable parties."
        accent="purple"
        image={heroKids}
        ctaPrimary={{ to: "/contact", label: "Book Your Session" }}
        ctaSecondary={{ to: "/events", label: "Upcoming Events" }}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === c
                  ? "bg-gradient-button text-white shadow-glow-orange"
                  : "glass-card text-brand-brown/80 hover:text-brand-brown hover:-translate-y-0.5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Pinterest masonry */}
        <Masonry
          breakpointCols={{ default: 4, 1280: 3, 768: 2, 480: 1 }}
          className="mt-10 flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {filtered.map((it, idx) => (
            <motion.button
              key={it.id}
              layout
              type="button"
              onClick={() => setLightbox(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl shadow-card ring-1 ring-border text-left"
              aria-label={`Open ${it.title ?? "image"}`}
            >
              <img
                src={it.url}
                alt={it.title ?? "ChoraNami artwork"}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-110"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-4 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">{it.category}</p>
                <p className="font-display text-lg font-black leading-tight">{it.title}</p>
              </div>
            </motion.button>
          ))}
        </Masonry>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-brand-brown/60">
            <Camera className="mx-auto h-10 w-10" />
            <p className="mt-3">No photos yet in this category.</p>
          </div>
        ) : null}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightbox((n) => (n === null ? null : (n - 1 + filtered.length) % filtered.length)); }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightbox((n) => (n === null ? null : (n + 1) % filtered.length)); }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-brown"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl"
            >
              <img src={filtered[lightbox].url} alt={filtered[lightbox].title ?? ""} className="max-h-[85vh] w-auto" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">{filtered[lightbox].category}</p>
                <p className="mt-1 font-display text-2xl font-black">{filtered[lightbox].title}</p>
                {filtered[lightbox].caption ? (
                  <p className="mt-1 text-sm text-white/80">{filtered[lightbox].caption}</p>
                ) : null}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SiteLayout>
  );
}
