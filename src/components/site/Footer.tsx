import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { nav, site } from "@/lib/site";
import { SplashDivider } from "./Splash";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-brown text-white">
      <SplashDivider />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold">{site.name}</h3>
          <p className="mt-3 text-sm text-white/70">{site.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/80 hover:text-brand-yellow">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-brand-yellow" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-brand-yellow" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-yellow" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Follow
          </h4>
          <div className="mt-4 flex gap-3">
            <a
              href={site.socials.instagram}
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-brown transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.socials.facebook}
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-brown transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
