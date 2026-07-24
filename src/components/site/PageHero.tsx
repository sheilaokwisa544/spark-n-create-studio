import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { SplashBlob } from "./Splash";

export function PageHero({
  kicker,
  title,
  subtitle,
  accent = "orange",
  children,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: "orange" | "yellow" | "turquoise" | "purple";
  children?: ReactNode;
}) {
  const colors: Record<string, string> = {
    orange: "var(--brand-orange)",
    yellow: "var(--brand-yellow)",
    turquoise: "var(--brand-turquoise)",
    purple: "var(--brand-purple)",
  };
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
