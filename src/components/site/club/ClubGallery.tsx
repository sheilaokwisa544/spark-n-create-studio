import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Masonry from "react-masonry-css";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listGallery } from "@/lib/data.functions";
import type { Club } from "@/lib/clubs";

type Item = { id: string; url: string; title: string | null; category: string | null; caption?: string | null };

/**
 * Club gallery: pulls published images from the backend, filtered by the club's
 * categories, and falls back to curated photos when nothing is uploaded yet.
 */
export function ClubGallery({ club }: { club: Club }) {
  const fetchGallery = useServerFn(listGallery);
  const { data } = useQuery({ queryKey: ["gallery"], queryFn: () => fetchGallery({}) });

  const items = useMemo<Item[]>(() => {
    const fromDb = (data ?? []).filter(
      (i) => i.category && club.galleryCategories.includes(i.category),
    );
    if (fromDb.length) {
      return fromDb.map((i) => ({ id: String(i.id), url: i.url, title: i.title, category: i.category, caption: i.caption }));
    }
    return club.galleryFallback.map((p, i) => ({ id: `fb-${i}`, url: p.url, title: p.title, category: p.category }));
  }, [data, club]);

  const categories = useMemo(() => ["All", ...new Set(items.map((i) => i.category ?? "General"))], [items]);
  const [category, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category],
  );

  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white/70 p-12 text-center text-brand-brown/60 ring-1 ring-border">
        <Camera className="mx-auto h-10 w-10" />
        <p className="mt-3">Photos from this club are coming soon.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 ? (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCategory(c); setLightbox(null); }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c
                  ? "bg-gradient-button text-white shadow-glow-orange"
                  : "bg-white/70 text-brand-brown ring-1 ring-border hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <Masonry
        breakpointCols={{ default: 3, 1024: 3, 768: 2, 480: 1 }}
        className="mt-8 flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {filtered.map((it, idx) => (
          <motion.button
            key={it.id}
            type="button"
            onClick={() => setLightbox(idx)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl text-left shadow-card ring-1 ring-border"
            aria-label={`Open ${it.title ?? "image"}`}
          >
            <img
              src={it.url}
              alt={it.title ?? `${club.name} artwork`}
              loading="lazy"
              className="block w-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-4 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">{it.category}</p>
              <p className="font-display text-lg font-black leading-tight">{it.title}</p>
            </div>
          </motion.button>
        ))}
      </Masonry>

      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] ? (
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
              className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightbox((n) => (n === null ? null : (n + 1) % filtered.length)); }}
              className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25"
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
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl"
            >
              <img src={filtered[lightbox].url} alt={filtered[lightbox].title ?? ""} className="max-h-[85vh] w-auto" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">{filtered[lightbox].category}</p>
                <p className="mt-1 font-display text-2xl font-black">{filtered[lightbox].title}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
