import { motion } from "framer-motion";

/** Decorative paint-splash blob rendered as inline SVG. */
export function SplashBlob({
  className = "",
  color = "var(--brand-orange)",
  delay = 0,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M42 68c-9-18 3-42 24-49 22-8 40 6 55-3 15-9 40-6 51 12 12 20-4 40 4 61 8 20-4 44-27 51-24 8-42-10-64-9-22 2-42-4-48-24-6-19 15-22 5-39z"
      />
      <circle cx="150" cy="40" r="8" fill={color} opacity="0.7" />
      <circle cx="30" cy="120" r="5" fill={color} opacity="0.5" />
      <circle cx="170" cy="150" r="10" fill={color} opacity="0.6" />
    </motion.svg>
  );
}

export function SplashDivider() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{ background: "var(--gradient-splash)" }}
    />
  );
}
