import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Loader2, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SplashBlob } from "@/components/site/Splash";
import { PROGRAMS } from "@/lib/programs";
import { site } from "@/lib/site";
import { toast } from "sonner";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact & Book — ChoraNami" },
      {
        name: "description",
        content:
          "Book a ChoraNami program or get in touch. We reply within one business day.",
      },
      { property: "og:title", content: "Contact ChoraNami" },
      {
        property: "og:description",
        content: "Book a program or send us a message — we'd love to hear from you.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const bookingSchema = z.object({
  parent_name: z.string().trim().min(2, "Please enter your name").max(100),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  service: z.string().min(1, "Please choose a service"),
  preferred_date: z.string().optional().or(z.literal("")),
  number_of_participants: z.coerce.number().min(1).max(5000).optional(),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function Contact() {
  const { service } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = bookingSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setPending(true);
    // Phase 2 wires this to a Cloud server function; for now, simulate success.
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setSubmitted(true);
    toast.success("Booking received! We'll be in touch soon.");
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-hero-wash">
        <SplashBlob
          className="pointer-events-none absolute -right-10 top-10 h-72 w-72 opacity-40"
          color="var(--brand-orange)"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-black text-brand-brown sm:text-6xl">
            Let's make <span className="text-gradient-splash">something</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Fill in the form to book a program, or reach us directly — we reply within
            one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-card p-6 shadow-card ring-1 ring-border sm:p-8"
        >
          <h2 className="font-display text-2xl font-bold text-brand-brown">
            Book a Program
          </h2>
          {submitted ? (
            <div className="mt-6 rounded-2xl bg-brand-turquoise/10 p-8 text-center">
              <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-turquoise text-white">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-brown">
                Thank you!
              </h3>
              <p className="mt-2 text-foreground/75">
                Your booking has been received. We'll be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm font-semibold text-brand-orange hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field name="parent_name" label="Your name" error={errors.parent_name} required />
              <Field
                name="organization"
                label="Organization / School (optional)"
                error={errors.organization}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="email" label="Email" type="email" error={errors.email} required />
                <Field name="phone" label="Phone" type="tel" error={errors.phone} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-brown">
                  Service <span className="text-brand-orange">*</span>
                </label>
                <select
                  name="service"
                  defaultValue={service ?? ""}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>
                    Choose a service…
                  </option>
                  {PROGRAMS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
                {errors.service ? (
                  <p className="mt-1 text-xs text-destructive">{errors.service}</p>
                ) : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="preferred_date" label="Preferred date" type="date" />
                <Field
                  name="number_of_participants"
                  label="Number of participants"
                  type="number"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-brand-brown">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us a little about what you're planning…"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-splash transition hover:brightness-105 disabled:opacity-70"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Send Booking Request
              </button>
            </form>
          )}
        </motion.div>

        <div className="space-y-4">
          <ContactCard
            Icon={Phone}
            label="Call us"
            value={site.phone}
            href={`tel:${site.phone.replace(/\s/g, "")}`}
          />
          <ContactCard
            Icon={MessageCircle}
            label="WhatsApp"
            value="Chat with us"
            href={`https://wa.me/${site.whatsapp}`}
          />
          <ContactCard
            Icon={Mail}
            label="Email"
            value={site.email}
            href={`mailto:${site.email}`}
          />
          <ContactCard Icon={MapPin} label="Visit" value={site.address} />
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-border">
            <iframe
              title="ChoraNami location"
              src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-brand-brown">
        {label} {required ? <span className="text-brand-orange">*</span> : null}
      </label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function ContactCard({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-splash"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-yellow text-brand-brown">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-foreground/60">{label}</p>
        <p className="font-semibold text-brand-brown">{value}</p>
      </div>
    </Wrapper>
  );
}
