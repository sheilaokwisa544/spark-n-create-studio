import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Phone, MapPin, MessageCircle, Loader2, Check, Clock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { PROGRAMS } from "@/lib/programs";
import { site } from "@/lib/site";
import { submitBooking } from "@/lib/submissions.functions";
import { toast } from "sonner";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact & Book — ChoraNami Art Programs Kenya" },
      { name: "description", content: "Book a ChoraNami program or get in touch. We reply within one business day." },
      { property: "og:title", content: "Contact ChoraNami" },
      { property: "og:description", content: "Book a program or send us a message — we'd love to hear from you." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const STEPS = ["Program", "Your Details", "Schedule", "Review"] as const;

const bookingSchema = z.object({
  program_slug: z.string().min(1, "Please choose a program"),
  parent_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  child_age: z.string().trim().max(30).optional().or(z.literal("")),
  participants: z.string().optional().or(z.literal("")),
  preferred_date: z.string().optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

type BookingForm = z.infer<typeof bookingSchema>;

function Contact() {
  const { service } = Route.useSearch();
  const submit = useServerFn(submitBooking);
  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    program_slug: service ?? "",
    parent_name: "",
    email: "",
    phone: "",
    child_age: "",
    participants: "",
    preferred_date: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof BookingForm>(k: K, v: BookingForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validateStep(): boolean {
    setErrors({});
    const stepFields: Record<number, (keyof BookingForm)[]> = {
      0: ["program_slug"],
      1: ["parent_name", "email", "phone"],
      2: [],
      3: [],
    };
    const fields = stepFields[step];
    const partial: Record<string, string> = {};
    for (const f of fields) {
      const shape = (bookingSchema.shape as any)[f];
      const r = shape.safeParse(form[f]);
      if (!r.success) partial[f] = r.error.issues[0]?.message ?? "Invalid";
    }
    if (Object.keys(partial).length) {
      setErrors(partial);
      return false;
    }
    return true;
  }

  async function finish() {
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      toast.error("Please review your details.");
      return;
    }
    setPending(true);
    try {
      await submit({
        data: {
          program_slug: parsed.data.program_slug,
          parent_name: parsed.data.parent_name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          child_age: parsed.data.child_age || null,
          participants: parsed.data.participants ? Number(parsed.data.participants) : null,
          preferred_date: parsed.data.preferred_date || null,
          message: parsed.data.message || null,
        },
      });
      setSubmitted(true);
      toast.success("Booking received! We'll be in touch shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Let's Create Together"
        title={<>Let's make <span className="text-gradient-splash">something</span></>}
        subtitle="Fill in the form to book a program, or reach us directly — we reply within one business day."
        accent="orange"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-brand-brown shadow-card">
          <Clock className="h-3.5 w-3.5 text-brand-turquoise" /> Response within 1 business day
        </span>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-[2rem] p-6 shadow-glass sm:p-10"
        >
          {submitted ? (
            <SuccessScreen onReset={() => { setSubmitted(false); setStep(0); }} />
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      i < step ? "bg-brand-turquoise text-white" : i === step ? "bg-gradient-button text-white shadow-glow-orange" : "bg-white/70 text-brand-brown/60"
                    }`}>
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    {i < STEPS.length - 1 ? (
                      <div className={`h-1 flex-1 rounded-full ${i < step ? "bg-brand-turquoise" : "bg-white/50"}`} />
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-orange">
                Step {step + 1} of {STEPS.length}
              </p>
              <h2 className="mt-1 font-display text-3xl font-black text-brand-brown">{STEPS[step]}</h2>

              <div className="mt-6 space-y-4">
                {step === 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PROGRAMS.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => update("program_slug", p.slug)}
                        className={`rounded-2xl border-2 p-4 text-left transition ${
                          form.program_slug === p.slug
                            ? "border-brand-orange bg-white shadow-splash"
                            : "border-transparent bg-white/60 hover:border-brand-orange/40"
                        }`}
                      >
                        <p className="font-display text-lg font-black text-brand-brown">{p.title}</p>
                        <p className="mt-1 text-xs text-brand-brown/70">{p.short}</p>
                      </button>
                    ))}
                    {errors.program_slug ? (
                      <p className="col-span-full text-xs text-destructive">{errors.program_slug}</p>
                    ) : null}
                  </div>
                ) : null}

                {step === 1 ? (
                  <>
                    <Field label="Your name" value={form.parent_name} onChange={(v) => update("parent_name", v)} error={errors.parent_name} required />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} required />
                      <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} required />
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Preferred date" type="date" value={form.preferred_date ?? ""} onChange={(v) => update("preferred_date", v)} />
                      <Field label="Participants" type="number" value={form.participants ?? ""} onChange={(v) => update("participants", v)} />
                    </div>
                    <Field label="Child age(s) — optional" value={form.child_age ?? ""} onChange={(v) => update("child_age", v)} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-brand-brown">Anything else?</label>
                      <textarea
                        rows={4}
                        value={form.message ?? ""}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us a little about what you're planning…"
                        className="w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-2 rounded-2xl bg-white/70 p-5 text-sm">
                    <ReviewRow label="Program" value={PROGRAMS.find((p) => p.slug === form.program_slug)?.title ?? "—"} />
                    <ReviewRow label="Name" value={form.parent_name} />
                    <ReviewRow label="Email" value={form.email} />
                    <ReviewRow label="Phone" value={form.phone} />
                    {form.preferred_date ? <ReviewRow label="Preferred date" value={form.preferred_date} /> : null}
                    {form.participants ? <ReviewRow label="Participants" value={form.participants} /> : null}
                    {form.child_age ? <ReviewRow label="Ages" value={form.child_age} /> : null}
                    {form.message ? <ReviewRow label="Message" value={form.message} /> : null}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-brown/70 hover:text-brand-brown disabled:opacity-40"
                >
                  Back
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => validateStep() && setStep((s) => s + 1)}
                    className="btn-pill bg-gradient-button text-white shadow-glow-orange"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finish}
                    disabled={pending}
                    className="btn-pill bg-gradient-button text-white shadow-glow-orange disabled:opacity-70"
                  >
                    {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Send Booking Request
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>

        <div className="space-y-4">
          <ContactCard Icon={Phone} label="Call us" value={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} color="bg-brand-orange text-white" />
          <ContactCard Icon={MessageCircle} label="WhatsApp" value="Chat with us" href={`https://wa.me/${site.whatsapp}`} color="bg-[#25d366] text-white" />
          <ContactCard Icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} color="bg-brand-turquoise text-white" />
          <ContactCard Icon={MapPin} label="Visit" value={site.address} color="bg-brand-purple text-white" />
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-border">
            <iframe
              title="ChoraNami — Nairobi, Kenya"
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

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-turquoise text-white shadow-splash">
        <Check className="h-10 w-10" />
      </motion.div>
      <h3 className="mt-5 font-display text-3xl font-black text-brand-brown">Thank you!</h3>
      <p className="mt-2 text-brand-brown/75">Your booking has been received. We'll be in touch shortly.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-pill bg-[#25d366] text-white">
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn-pill bg-white text-brand-brown ring-1 ring-border">
          Send another
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, error }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-brand-brown">
        {label} {required ? <span className="text-brand-orange">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/40 py-1.5 last:border-0">
      <span className="text-brand-brown/60">{label}</span>
      <span className="text-right font-semibold text-brand-brown">{value}</span>
    </div>
  );
}

function ContactCard({ Icon, label, value, href, color }: { Icon: typeof Mail; label: string; value: string; href?: string; color: string }) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-splash"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} shadow-card group-hover:scale-110 transition`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-foreground/60">{label}</p>
        <p className="font-semibold text-brand-brown">{value}</p>
      </div>
    </Wrapper>
  );
}
