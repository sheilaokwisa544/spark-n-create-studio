import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import logoAsset from "@/assets/choranami-logo.jpg.asset.json";
import { nav, site } from "@/lib/site";

export function Footer() {
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("You're on the list — expect creative goodness soon!");
    setEmail("");
  }

  return (
    <footer className="relative mt-24 bg-gradient-brown text-white overflow-hidden">
      {/* floating decor */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-brand-purple/25 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-brand-turquoise/15 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

      {/* Newsletter band */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="glass-dark rounded-[2rem] p-8 md:p-12 grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Newsletter
            </p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl font-black leading-tight">
              Get a splash of creativity in your inbox
            </h3>
            <p className="mt-2 text-white/70 text-sm max-w-md">
              Program launches, workshop dates and free activities for parents & teachers.
            </p>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full bg-white/10 border border-white/20 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
            <button type="submit" className="btn-pill bg-gradient-button text-white shadow-glow-orange">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt={`${site.name} logo`}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/60"
            />
            <span className="font-display text-2xl font-black">{site.name}</span>
          </Link>
          <p className="mt-4 text-sm text-white/70 max-w-sm">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.socials.instagram}
              aria-label="Instagram"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-brand-yellow hover:text-brand-brown hover:scale-110 transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.socials.facebook}
              aria-label="Facebook"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-brand-yellow hover:text-brand-brown hover:scale-110 transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              aria-label="WhatsApp"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-[#25d366] hover:text-white hover:scale-110 transition"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="group inline-flex items-center gap-1 text-white/80 hover:text-brand-yellow transition">
                  {n.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Phone className="h-4 w-4 text-brand-yellow" />
              </span>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Mail className="h-4 w-4 text-brand-yellow" />
              </span>
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <MapPin className="h-4 w-4 text-brand-yellow" />
              </span>
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {site.name}. Crafted with color in Kenya.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-turquoise animate-pulse" />
            Creative Education for Young Minds
          </p>
        </div>
      </div>
    </footer>
  );
}
