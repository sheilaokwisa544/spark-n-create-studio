import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SplashBlob } from "@/components/site/Splash";
import { ClubGallery } from "@/components/site/club/ClubGallery";
import { CLUB_BY_SLUG, clubAccentClasses, type Club } from "@/lib/clubs";

/** Step-by-step making journey shown on each club page. */
const JOURNEYS: Record<string, string[]> = {
  art: ["Idea", "Sketch", "Plan", "Create", "Finish", "Showcase"],
  "fashion-design": ["Idea", "Sketch", "Skill", "Project", "Finished Creation"],
  crochet: ["Sketch", "Measure", "Plan", "Crochet", "Create"],
  "ai-for-teens": ["Explore", "Question", "Create", "Test", "Improve", "Share"],
};

const SKILLS_HEADING = "Skills Developed";

export const Route = createFileRoute("/programmes/$club")({
  loader: ({ params }) => {
    const club = CLUB_BY_SLUG[params.club];
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Programme not found — ChoraNami" }, { name: "robots", content: "noindex" }] };
    }
    const { club } = loaderData;
    const title = `${club.name} — ChoraNami`;
    return {
      meta: [
        { title },
        { name: "description", content: club.seoDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: club.seoDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ClubNotFound,
  component: ClubPage,
});

function ClubNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-black text-brand-brown">Programme not found</h1>
        <p className="mt-3 text-foreground/70">That club page doesn&apos;t exist yet.</p>
        <Link to="/programs" className="btn-pill mt-8 bg-gradient-button text-white shadow-glow-orange">
          <ArrowLeft className="h-4 w-4" /> Back to Programmes
        </Link>
      </div>
    </SiteLayout>
  );
}

function Section({
  kicker,
  title,
  children,
  tinted = false,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "relative overflow-hidden bg-hero-wash py-16 md:py-24" : "py-16 md:py-24"}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {kicker ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{kicker}</p>
          ) : null}
          <h2 className="mt-2 font-display text-3xl font-black text-brand-brown md:text-5xl">{title}</h2>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

function ClubPage() {
  const { club } = Route.useLoaderData() as { club: Club };
  const journey = JOURNEYS[club.slug] ?? JOURNEYS.art;

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker={club.comingSoon ? "Coming Soon" : "ChoraNami Club"}
        title={
          <>
            {club.name.toUpperCase()}
            <span className="mt-3 block text-gradient-splash text-2xl sm:text-3xl md:text-4xl">
              {club.tagline}
            </span>
          </>
        }
        subtitle={club.intro}
        accent={club.accent}
        image={club.heroImage}
      >
        {club.comingSoon ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-5 py-2.5 text-sm font-black uppercase tracking-widest text-white shadow-card animate-pulse">
            <Sparkles className="h-4 w-4" /> Coming Soon
          </span>
        ) : (
          <Link
            to="/contact"
            search={{ service: club.programSlug }}
            className="btn-pill bg-gradient-button text-white shadow-glow-orange"
          >
            Partner With ChoraNami <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link to="/programs" className="btn-pill glass-dark border border-white/30 text-white hover:bg-white/15">
          <ArrowLeft className="h-4 w-4" /> Back to Programmes
        </Link>
      </PageHero>

      {/* What we do */}
      <Section kicker="What We Do" title={club.comingSoon ? "What we're building" : "Learning by making"}>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { h: "What it teaches", p: club.about.teaches },
            { h: "Who it's for", p: club.about.who },
            { h: "How we learn", p: club.about.how },
          ].map((c) => (
            <div key={c.h} className="rounded-3xl bg-white/70 p-7 shadow-card ring-1 ring-border">
              <h3 className="font-display text-xl font-black text-brand-brown">{c.h}</h3>
              <p className="mt-3 text-foreground/75">{c.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-3xl bg-gradient-to-r from-brand-orange/10 via-brand-yellow/10 to-brand-purple/10 p-7 text-lg font-semibold text-brand-brown ring-1 ring-border">
          {club.about.different}
        </p>
      </Section>

      {/* Journey */}
      <Section kicker="Our Approach" title="How we learn" tinted>
        <SplashBlob className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 opacity-25" color={`var(--brand-${club.accent})`} />
        <div className="relative flex flex-wrap items-center gap-3">
          {journey.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`rounded-full px-5 py-3 font-display text-base font-black shadow-card ${clubAccentClasses[club.accent]}`}>
                {step}
              </div>
              {i < journey.length - 1 ? <ArrowRight className="h-5 w-5 text-brand-brown/40" /> : null}
            </div>
          ))}
        </div>
        <p className="relative mt-6 max-w-3xl text-lg text-foreground/75">
          Learners learn by doing — short guidance, then straight into making. No long theoretical lessons.
        </p>
      </Section>

      {/* What learners explore */}
      <Section kicker="What Learners Explore" title="Inside every session">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {club.activities.map(({ label, Icon }) => (
            <motion.div
              key={label}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white/80 p-6 shadow-card ring-1 ring-border transition"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${clubAccentClasses[club.accent]} shadow-card`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-lg font-black text-brand-brown">{label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      {club.projects.length ? (
        <Section kicker="Projects" title="What learners make" tinted>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.projects.map((p) => (
              <motion.article
                key={p.name}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-border"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${clubAccentClasses[club.accent]}`}>
                    {p.skill}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-black text-brand-brown">{p.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{p.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Skills */}
      <Section kicker="Skills Developed" title={SKILLS_HEADING}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {club.about.skills.map((s) => (
            <li key={s} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 shadow-card ring-1 ring-border">
              <Check className="mt-0.5 h-5 w-5 flex-none text-brand-turquoise" />
              <span className="font-semibold text-brand-brown">{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Gallery */}
      {club.galleryFallback.length ? (
        <Section kicker="Gallery" title="From our sessions" tinted>
          <ClubGallery club={club} />
        </Section>
      ) : null}

      {/* Offerings */}
      <Section kicker="Ways to Join" title="How you can run this club">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {club.offerings.map((o) => (
            <div key={o.title} className="rounded-2xl bg-white/80 p-6 shadow-card ring-1 ring-border">
              <h3 className="font-display text-lg font-black text-brand-brown">{o.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{o.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-brown via-brand-brown to-black p-10 text-center text-white shadow-splash md:p-16">
          <h2 className="font-display text-3xl font-black md:text-5xl">
            {club.comingSoon
              ? "Want to hear when AI for Teens launches?"
              : `Interested in bringing ${club.name} to your school?`}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {club.comingSoon ? (
              <Link to="/contact" className="btn-pill bg-gradient-button text-white shadow-glow-orange">
                Register Interest <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/contact"
                search={{ service: club.programSlug }}
                className="btn-pill bg-gradient-button text-white shadow-glow-orange"
              >
                Partner With ChoraNami <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link to="/programs" className="btn-pill bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" /> Back to Programmes
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
