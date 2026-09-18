import { Palette, Users, PartyPopper, GraduationCap, Scissors, Shirt, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { photos } from "@/lib/photos";
import { crochetPhotos } from "@/lib/crochet-photos";
import { fashionPhotos } from "@/lib/fashion-photos";
import aiForTeens from "@/assets/ai-for-teens.jpg";

export type Program = {
  slug: string;
  title: string;
  tagline?: string;
  short: string;
  description: string;
  features: string[];
  cta: string;
  Icon: LucideIcon;
  color: "orange" | "yellow" | "turquoise" | "purple";
  image: string;
  badge: string;
  emoji: string;
  hue: string;
  comingSoon?: boolean;
};

export const PROGRAMS: Program[] = [
  {
    slug: "school-art-clubs",
    title: "School Art Clubs",
    tagline: "Where every school becomes a studio.",
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
    image: photos.schoolClub,
    badge: "In Schools",
    emoji: "🎨",
    hue: "from-brand-orange to-brand-yellow",
  },
  {
    slug: "homeschool-art-classes",
    title: "Homeschool Art Classes",
    tagline: "Learning by making, at your own pace.",
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
    image: photos.miniCanvases,
    badge: "At Home",
    emoji: "🖌",
    hue: "from-brand-turquoise to-brand-purple",
  },
  {
    slug: "fashion-design-club",
    title: "Fashion & Design Club",
    tagline: "Think it. Design it. Make it.",
    short: "A hands-on fashion club where ideas become real garments.",
    description:
      "A practical fashion programme where children and teens explore fashion by creating. Learners move from ideas and sketches to hands-on projects, learning useful fashion and garment-making skills along the way — a making club, not a theory-heavy classroom course.",
    features: [
      "Fashion illustration & sketching",
      "Design ideas and mood boards",
      "Fabric and colour exploration",
      "Hand stitching & embroidery",
      "Basic sewing skills",
      "Garment and accessory projects",
      "Creative design challenges",
      "Showcase finished work",
    ],
    cta: "Explore Fashion Club",
    Icon: Shirt,
    color: "purple",
    image: fashionPhotos.upcycledShirts,
    badge: "Design & Make",
    emoji: "✂️",
    hue: "from-brand-purple to-brand-orange",
  },
  {
    slug: "crochet-club",
    title: "Crochet Club",
    tagline: "Learn, create, and make something beautiful with your own hands.",
    short: "Learn, create, and make something beautiful with your own hands.",
    description:
      "The Crochet Club introduces children and teens to crochet through fun, practical projects. Learners develop creativity, patience, coordination and useful handmade skills while creating items they can actually use or take home.",
    features: [
      "Beginner-friendly crochet skills",
      "Basic stitches and techniques",
      "Small creative projects",
      "Progressive skill development",
      "Hands-on learning",
      "For children and teenagers",
    ],
    cta: "Explore Crochet Club",
    Icon: Scissors,
    color: "yellow",
    image: crochetPhotos.beginnerEssentials,
    badge: "Handmade",
    emoji: "🧶",
    hue: "from-brand-yellow to-brand-turquoise",
  },
  {
    slug: "artogether",
    title: "ArTogether",
    tagline: "Creativity that brings people together.",
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
    image: photos.partyTable,
    badge: "Team Events",
    emoji: "🎉",
    hue: "from-brand-purple to-brand-orange",
  },
  {
    slug: "party-boom",
    title: "Party Boom",
    tagline: "The party where everyone makes something.",
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
    image: photos.outdoorParty,
    badge: "Parties",
    emoji: "🎈",
    hue: "from-brand-yellow to-brand-orange",
  },
  {
    slug: "ai-for-teens",
    title: "AI for Teens",
    tagline: "Create. Explore. Innovate with AI.",
    short: "A future-focused programme introducing teens to creative AI.",
    description:
      "A future-focused programme designed to introduce teenagers to the creative and practical possibilities of Artificial Intelligence — how to use it well, and how to use it responsibly.",
    features: [
      "Creativity with AI tools",
      "Problem-solving",
      "Hands-on projects",
      "Research skills",
      "Digital skills",
      "Innovation mindset",
      "Responsible use of technology",
    ],
    cta: "Coming Soon — Register Interest",
    Icon: Sparkles,
    color: "turquoise",
    image: aiForTeens,
    badge: "Coming Soon",
    emoji: "🤖",
    hue: "from-brand-turquoise to-brand-purple",
    comingSoon: true,
  },
];

/** Programmes that can actually be booked right now. */
export const BOOKABLE_PROGRAMS = PROGRAMS.filter((p) => !p.comingSoon);

export const programColorClasses: Record<Program["color"], string> = {
  orange: "bg-brand-orange text-primary-foreground",
  yellow: "bg-brand-yellow text-brand-brown",
  turquoise: "bg-brand-turquoise text-white",
  purple: "bg-brand-purple text-white",
};
