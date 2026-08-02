import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SplashBlob } from "./Splash";

type Cta = { to: string; label: string };

export function PageHero({
  kicker,
  title,
  subtitle,
  accent = "orange",
  image,
  align = "left",
  ctaPrimary,
  ctaSecondary,
  children,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: "orange" | "yellow" | "turquoise" | "purple";
  /** Background photo — renders the cinematic homepage-style hero. */
  image?: string;
  align?: "left" | "center";
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
  children?: ReactNode;
}) {
  const colors: Record<string, string> = {
    orange: "var(--brand-orange)",
    yellow: "var(--brand-yellow)",
    turquoise: "var(--brand-turquoise)",
    purple: "var(--brand-purple)",
  };

  if (image) {
    return (
      <section className="relative flex min-h-[70vh] w-full items-end overflow-hidden pb-16 pt-40 md:min-h-[78vh] md:items-center md:pb-0">
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full scale-110 object-cover animate-[float-slow_18s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown/90 via-brand-brown/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>
        <div
          className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 ${
            align === "center" ? "text-center" : ""
          }`}
        >
          <div className={align === "center" ? "mx-auto max-w-3xl text-white" : "max-w-2xl text-white"}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow"
            >
              <Sparkles className="h-3.5 w-3.5" /> {kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="mt-5 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className={`mt-5 text-lg text-white/85 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}
              >
                {subtitle}
              </motion.p>
            ) : null}
            {(ctaPrimary || ctaSecondary || children) ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className={`mt-8 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
              >
                {ctaPrimary ? (
                  <Link to={ctaPrimary.to} className="btn-pill bg-gradient-button text-white shadow-glow-orange">
                    {ctaPrimary.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
                {ctaSecondary ? (
                  <Link
                    to={ctaSecondary.to}
                    className="btn-pill glass-dark border border-white/30 text-white hover:bg-white/15"
                  >
                    {ctaSecondary.label}
                  </Link>
                ) : null}
                {children}
              </motion.div>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 p-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-white" />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-hero-wash pt-32 pb-20 md:pt-40 md:pb-28">
      <SplashBlob
        className="pointer-events-none absolute -left-16 -top-10 h-96 w-96 opacity-40"
        color={colors[accent]}
      />
      <SplashBlob
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 opacity-30"
        color={colors.purple}
        delay={0.4}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange shadow-card ring-1 ring-brand-orange/20"
        >
          <Sparkles className="h-3.5 w-3.5" /> {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 font-display text-5xl font-black leading-[1.02] text-brand-brown sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-brand-brown/75"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
