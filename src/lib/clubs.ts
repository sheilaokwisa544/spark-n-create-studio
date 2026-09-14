import {
  Palette,
  Brush,
  Scissors,
  Shirt,
  Sparkles,
  Ruler,
  Layers,
  Users,
  Wand2,
  Grid2x2,
  PenTool,
  Puzzle,
  Recycle,
  Hand,
  Droplets,
  Image as ImageIcon,
  Cpu,
  Lightbulb,
  Presentation,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { photos } from "@/lib/photos";
import crochetClub from "@/assets/crochet-club.jpg";
import fashionDesignClub from "@/assets/fashion-design-club.jpg";
import aiForTeens from "@/assets/ai-for-teens.jpg";
import clubArtHero from "@/assets/club-art-hero.jpg";
import clubFashionHero from "@/assets/club-fashion-hero.jpg";
import clubCrochetHero from "@/assets/club-crochet-hero.jpg";
import clubAiHero from "@/assets/club-ai-hero.jpg";

export type ClubActivity = { label: string; Icon: LucideIcon };
export type ClubProject = { name: string; description: string; skill: string; image: string };
export type ClubOffering = { title: string; description: string };

export type Club = {
  /** URL slug used at /programmes/<slug> */
  slug: string;
  /** Matching programme slug in PROGRAMS (for booking + cross-linking) */
  programSlug: string;
  name: string;
  tagline: string;
  intro: string;
  heroImage: string;
  accent: "orange" | "yellow" | "turquoise" | "purple";
  comingSoon?: boolean;
  about: {
    teaches: string;
    who: string;
    how: string;
    skills: string[];
    different: string;
  };
  activities: ClubActivity[];
  projects: ClubProject[];
  /** Gallery categories to pull from the backend for this club. */
  galleryCategories: string[];
  galleryFallback: { url: string; title: string; category: string }[];
  offerings: ClubOffering[];
  seoDescription: string;
};

const JOURNEY = ["Idea", "Plan", "Create", "Experiment", "Make", "Share"] as const;
const LEARNER_PATH = ["Discover", "Learn", "Practise", "Create", "Improve", "Showcase"] as const;
export const CLUB_JOURNEY = JOURNEY;
export const CLUB_LEARNER_PATH = LEARNER_PATH;

export const CLUBS: Club[] = [
  {
    slug: "art",
    programSlug: "school-art-clubs",
    name: "Art Club",
    tagline: "Draw it. Paint it. Make it yours.",
    intro:
      "A hands-on art club where children explore drawing, painting, colour and mixed media through real projects. Every session ends with something made, not just something heard.",
    heroImage: clubArtHero,
    accent: "orange",
    about: {
      teaches:
        "Drawing, painting, colour theory, composition, texture and mixed-media making — taught through projects children actually finish.",
      who: "Children aged 5–15 in schools, homeschool groups and holiday programmes.",
      how: "Short demonstration, then straight into making. Instructors guide, learners decide.",
      skills: [
        "Observation & drawing",
        "Colour mixing & confidence",
        "Patience and focus",
        "Creative problem solving",
        "Presenting their own work",
      ],
      different:
        "ChoraNami clubs are practical and project-based. Children don't sit and listen to theory — they create, experiment, design and make.",
    },
    activities: [
      { label: "Drawing", Icon: PenTool },
      { label: "Painting", Icon: Brush },
      { label: "Colour exploration", Icon: Droplets },
      { label: "Creative projects", Icon: Lightbulb },
      { label: "Canvas painting", Icon: ImageIcon },
      { label: "Mixed-media projects", Icon: Layers },
      { label: "Art challenges", Icon: Puzzle },
      { label: "Group projects", Icon: Users },
    ],
    projects: [
      { name: "Canvas Painting", description: "A finished canvas learners plan, paint and take home.", skill: "Composition & brushwork", image: photos.miniCanvases },
      { name: "Character Drawing", description: "Invent a character, then bring it to life on paper.", skill: "Drawing & imagination", image: photos.schoolClub },
      { name: "Creative Collage", description: "Paper, fabric and found materials layered into one piece.", skill: "Texture & layout", image: photos.workshopTable },
      { name: "Colour Mixing Projects", description: "Small studies that unlock the whole colour wheel.", skill: "Colour theory", image: photos.handprintFlowers },
      { name: "Group Art Project", description: "One big collaborative artwork made by the whole club.", skill: "Teamwork", image: photos.handprintTree },
      { name: "Art Challenge Series", description: "Timed creative briefs that stretch fresh ideas.", skill: "Creative thinking", image: photos.fingerprintBalloon },
    ],
    galleryCategories: ["School Art Clubs", "Canvas Painting", "Children's Artwork", "Homeschool Lessons"],
    galleryFallback: [
      { url: photos.schoolClub, title: "Club easels ready", category: "School Art Clubs" },
      { url: photos.miniCanvases, title: "Mini canvas showcase", category: "Canvas Painting" },
      { url: photos.handprintTree, title: "Four-seasons handprint tree", category: "Children's Artwork" },
      { url: photos.handprintFlowers, title: "Handprint flower garden", category: "Children's Artwork" },
      { url: photos.fingerprintBalloon, title: "Fingerprint hot-air balloon", category: "Children's Artwork" },
      { url: photos.workshopTable, title: "Workshop table", category: "Homeschool Lessons" },
    ],
    offerings: [
      { title: "School Clubs", description: "Weekly term-long art clubs run inside your school." },
      { title: "After-School Programmes", description: "Structured creative sessions after the school day." },
      { title: "Holiday Programmes", description: "Intensive creative weeks during school breaks." },
      { title: "Workshops", description: "One-off themed art workshops for groups." },
      { title: "Creative Events", description: "Exhibitions, open days and community art days." },
      { title: "Special Projects", description: "Murals, school branding and collaborative artworks." },
    ],
    seoDescription:
      "ChoraNami Art Club — practical, project-based drawing, painting and mixed-media clubs for children in Kenyan schools and homeschool groups.",
  },
  {
    slug: "fashion",
    programSlug: "fashion-design-club",
    name: "Fashion & Design Club",
    tagline: "Think it. Design it. Make it.",
    intro:
      "A practical fashion club where children and teens move from sketches and mood boards to real stitched pieces. A making club, not a theory class.",
    heroImage: clubFashionHero,
    accent: "purple",
    about: {
      teaches:
        "Fashion illustration, design thinking, fabric and colour, hand stitching, embroidery and basic sewing.",
      who: "Children and teens aged 8–17 who love clothes, design and making things with their hands.",
      how: "Learners design first, then build the skill they need to make the thing they imagined.",
      skills: [
        "Sketching & illustration",
        "Design decision making",
        "Hand and machine stitching",
        "Material awareness",
        "Finishing and presenting work",
      ],
      different:
        "Every learner leaves with something wearable or usable — not a folder of notes.",
    },
    activities: [
      { label: "Fashion sketching", Icon: PenTool },
      { label: "Design ideas", Icon: Lightbulb },
      { label: "Fabric exploration", Icon: Layers },
      { label: "Hand stitching", Icon: Hand },
      { label: "Embroidery", Icon: Sparkles },
      { label: "Sewing", Icon: Scissors },
      { label: "Upcycling", Icon: Recycle },
      { label: "Fashion showcases", Icon: Presentation },
    ],
    projects: [
      { name: "Fashion Illustration", description: "Build a personal sketchbook of original looks.", skill: "Drawing & proportion", image: fashionDesignClub },
      { name: "Simple Sewing Project", description: "A first stitched piece, start to finish.", skill: "Basic sewing", image: clubFashionHero },
      { name: "Embroidery Piece", description: "Hand-stitched detail on fabric or a garment.", skill: "Hand embroidery", image: photos.tshirtLeaves },
      { name: "Upcycled Fashion", description: "Turn an old garment into something new.", skill: "Reworking & finishing", image: photos.tshirtWave },
      { name: "Accessories", description: "Bags, scrunchies, pouches and wearable extras.", skill: "Construction", image: photos.workshopTable },
      { name: "Mini Fashion Collection", description: "Three linked pieces designed around one theme.", skill: "Collection thinking", image: photos.partyTable },
    ],
    galleryCategories: ["Fashion & Design", "T-Shirt Painting"],
    galleryFallback: [
      { url: clubFashionHero, title: "Sketching and stitching", category: "Fashion & Design" },
      { url: fashionDesignClub, title: "Design club in session", category: "Fashion & Design" },
      { url: photos.tshirtLeaves, title: "Botanical tee printing", category: "T-Shirt Painting" },
      { url: photos.tshirtWave, title: "Hand-painted wave tee", category: "T-Shirt Painting" },
      { url: photos.workshopTable, title: "Materials table", category: "Fashion & Design" },
      { url: photos.miniCanvases, title: "Design showcase", category: "Fashion & Design" },
    ],
    offerings: [
      { title: "School Clubs", description: "Weekly fashion and design clubs in your school." },
      { title: "After-School Programmes", description: "Small-group design and sewing sessions." },
      { title: "Holiday Programmes", description: "Design-and-make weeks with a showcase finale." },
      { title: "Workshops", description: "Embroidery, upcycling or illustration workshops." },
      { title: "Creative Events", description: "Mini fashion shows and design showcases." },
      { title: "Group Sessions", description: "Private groups, clubs and community programmes." },
    ],
    seoDescription:
      "ChoraNami Fashion & Design Club — sketching, fabric, embroidery and sewing projects where children and teens design and make real pieces.",
  },
  {
    slug: "crochet",
    programSlug: "crochet-club",
    name: "Crochet Club",
    tagline: "Learn, create, and make something beautiful with your own hands.",
    intro:
      "Crochet taught through small, achievable projects. Learners build stitches, patience and coordination while making pieces they can actually use.",
    heroImage: clubCrochetHero,
    accent: "yellow",
    about: {
      teaches:
        "Crochet terminology, yarn and tools, foundational stitches, counting and shaping, and original project design.",
      who: "Children and teens aged 8–17, complete beginners welcome.",
      how: "Each session builds one new stitch or technique inside a real project.",
      skills: [
        "Fine motor coordination",
        "Patience & focus",
        "Counting and measuring",
        "Following and creating patterns",
        "Finishing handmade pieces",
      ],
      different:
        "Progressive skill building — every learner moves from first stitch to finished, wearable work.",
    },
    activities: [
      { label: "Crochet terminology", Icon: Wand2 },
      { label: "Yarn & tools", Icon: Package },
      { label: "Basic stitches", Icon: Hand },
      { label: "Stitch practice", Icon: Grid2x2 },
      { label: "Sketching ideas", Icon: PenTool },
      { label: "Taking measurements", Icon: Ruler },
      { label: "Counting & marking", Icon: Puzzle },
      { label: "Designing original pieces", Icon: Lightbulb },
    ],
    projects: [
      { name: "Stitch Samples", description: "A practice square library of every stitch learnt.", skill: "Stitch control", image: clubCrochetHero },
      { name: "Small Accessories", description: "Keyrings, headbands and coasters to keep.", skill: "Shaping", image: crochetClub },
      { name: "Crochet Bag", description: "A full bag project with handles and finishing.", skill: "Project planning", image: photos.workshopTable },
      { name: "Decorations", description: "Hanging pieces and room decor in colour.", skill: "Colour work", image: photos.handprintFlowers },
      { name: "Wearable Pieces", description: "Scarves, beanies and simple wearables.", skill: "Measurement & fit", image: photos.miniCanvases },
      { name: "Learner-Designed Project", description: "Their own idea, sketched then crocheted.", skill: "Original design", image: photos.schoolClub },
    ],
    galleryCategories: ["Crochet", "Children's Artwork"],
    galleryFallback: [
      { url: clubCrochetHero, title: "First stitches", category: "Crochet" },
      { url: crochetClub, title: "Crochet club table", category: "Crochet" },
      { url: photos.workshopTable, title: "Tools and yarn", category: "Crochet" },
      { url: photos.handprintFlowers, title: "Colour inspiration", category: "Children's Artwork" },
      { url: photos.miniCanvases, title: "Finished pieces", category: "Crochet" },
      { url: photos.schoolClub, title: "Club in session", category: "Crochet" },
    ],
    offerings: [
      { title: "School Clubs", description: "Termly crochet clubs hosted at your school." },
      { title: "After-School Programmes", description: "Relaxed weekly making sessions." },
      { title: "Holiday Programmes", description: "Learn-to-crochet weeks with finished projects." },
      { title: "Workshops", description: "Beginner crochet workshops for groups." },
      { title: "Group Sessions", description: "Small private groups and community clubs." },
      { title: "Special Projects", description: "Collaborative crochet installations and gifts." },
    ],
    seoDescription:
      "ChoraNami Crochet Club — beginner-friendly crochet for children and teens in Kenya, from first stitch to finished wearable projects.",
  },
  {
    slug: "ai-for-teens",
    programSlug: "ai-for-teens",
    name: "AI for Teens",
    tagline: "Create. Explore. Innovate with AI.",
    intro:
      "A future-focused programme introducing teenagers to the creative and practical possibilities of Artificial Intelligence — and how to use it responsibly. Launching soon.",
    heroImage: clubAiHero,
    accent: "turquoise",
    comingSoon: true,
    about: {
      teaches:
        "Creative AI tools, problem solving, research skills, digital literacy and responsible use of technology.",
      who: "Teenagers aged 13–18 who are curious about technology and creativity.",
      how: "Project-led sessions where teens build and test real ideas rather than memorise concepts.",
      skills: [
        "Creativity with AI tools",
        "Problem solving",
        "Research & evaluation",
        "Digital skills",
        "Innovation mindset",
        "Responsible, ethical use",
      ],
      different:
        "This programme is still in development — register your interest and we'll tell you the moment dates open.",
    },
    activities: [
      { label: "Creativity with AI", Icon: Sparkles },
      { label: "Problem solving", Icon: Puzzle },
      { label: "Hands-on projects", Icon: Cpu },
      { label: "Research skills", Icon: Lightbulb },
      { label: "Digital skills", Icon: Grid2x2 },
      { label: "Responsible use", Icon: Shirt },
    ],
    projects: [],
    galleryCategories: [],
    galleryFallback: [],
    offerings: [
      { title: "School Programmes", description: "Planned termly AI programmes for secondary schools." },
      { title: "Holiday Programmes", description: "Intensive creative-tech weeks (coming soon)." },
      { title: "Workshops", description: "Introductory AI workshops for teen groups." },
    ],
    seoDescription:
      "ChoraNami AI for Teens — a coming-soon programme helping teenagers explore creative, practical and responsible uses of AI.",
  },
];

export const CLUB_BY_SLUG: Record<string, Club> = Object.fromEntries(
  CLUBS.map((c) => [c.slug, c]),
);

/** Programme slug -> dedicated club page slug (where one exists). */
export const CLUB_PAGE_FOR_PROGRAM: Record<string, string> = Object.fromEntries(
  CLUBS.map((c) => [c.programSlug, c.slug]),
);

export const clubAccentClasses: Record<Club["accent"], string> = {
  orange: "bg-brand-orange text-primary-foreground",
  yellow: "bg-brand-yellow text-brand-brown",
  turquoise: "bg-brand-turquoise text-white",
  purple: "bg-brand-purple text-white",
};
