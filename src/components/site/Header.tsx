import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import logoAsset from "@/assets/choranami-logo.jpg.asset.json";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5">
        <div
          className={cn(
            "flex items-center justify-between rounded-full transition-all duration-500 px-4 sm:px-5 py-2.5",
            scrolled
              ? "glass-card shadow-glass"
              : "bg-white/25 backdrop-blur-md border border-white/40",
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <img
              src={logoAsset.url}
              alt={`${site.name} logo`}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-card"
            />
            <span className="font-display text-xl font-black text-brand-brown">
              {site.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-brand-brown/80 transition hover:text-brand-brown"
                activeProps={{ className: "text-brand-brown" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-purple transition-all duration-300",
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100",
                      )}
                    />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/contact"
              className="btn-pill bg-gradient-button text-white text-sm shadow-glow-orange"
            >
              <Sparkles className="h-4 w-4" /> Book Now
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-brown shadow-card lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-3 mt-2 rounded-3xl glass-card shadow-glass lg:hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col p-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-brand-brown/80 hover:bg-white/60 hover:text-brand-brown transition"
                activeProps={{ className: "bg-white/70 text-brand-brown" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-pill mt-2 bg-gradient-button text-white shadow-glow-orange"
            >
              <Sparkles className="h-4 w-4" /> Book Now
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
