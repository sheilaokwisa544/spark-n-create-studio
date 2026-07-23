import { Palette, Users, PartyPopper, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  cta: string;
  Icon: LucideIcon;
  color: "orange" | "yellow" | "turquoise" | "purple";
};

export const PROGRAMS: Program[] = [
  {
    slug: "school-art-clubs",
    title: "School Art Clubs",
    short: "Structured after-school art clubs for schools.",
    description:
      "A full-term program that turns any school into a hub of creativity — drawing, painting, crafts, sculpture and mixed media, guided by professional instructors.",
    features: [
      "10 lessons per term",
      "Professional instructors",
      "All materials provided",
      "End-of-term exhibitions",
    ],
    cta: "Partner With Us",
    Icon: GraduationCap,
    color: "orange",
  },
  {
    slug: "homeschool-art-classes",
    title: "Homeschool Art Classes",
    short: "Personalized one-on-one or small group art lessons.",
    description:
      "Tailored art lessons for homeschooled children — drawing, painting, colour theory, crafts, mixed media and creative thinking, at your pace.",
    features: [
      "1:1 or small groups",
      "Custom curriculum",
      "Flexible schedule",
      "Progress portfolio",
    ],
    cta: "Book Lessons",
    Icon: Palette,
    color: "turquoise",
  },
  {
    slug: "artogether",
    title: "ArTogether",
    short: "Interactive creative experiences for organizations.",
    description:
      "Bring your school, church, company or community together with hands-on painting experiences: canvas painting, tote bag painting or t-shirt painting.",
    features: [
      "Canvas painting",
      "Tote bag painting",
      "T-shirt painting",
      "Minimum 50 participants",
    ],
    cta: "Book ArTogether",
    Icon: Users,
    color: "purple",
  },
  {
    slug: "party-boom",
    title: "Party Boom",
    short: "On-site creative entertainment for kids' events.",
    description:
      "The ultimate creative party experience — painting stations, crafts, creative games and group art projects delivered straight to your venue.",
    features: [
      "Canvas painting",
      "Painting stations & crafts",
      "Creative games",
      "Group art projects",
    ],
    cta: "Book Party Boom",
    Icon: PartyPopper,
    color: "yellow",
  },
];

export const programColorClasses: Record<Program["color"], string> = {
  orange: "bg-brand-orange text-primary-foreground",
  yellow: "bg-brand-yellow text-brand-brown",
  turquoise: "bg-brand-turquoise text-white",
  purple: "bg-brand-purple text-white",
};
