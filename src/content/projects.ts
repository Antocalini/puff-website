export type CaseMediaRatio = "landscape" | "portrait" | "square" | "wide";
export type CaseMediaSpan = "full" | "half" | "third";

export type CaseMedia = {
  label: string;
  ratio: CaseMediaRatio;
  span?: CaseMediaSpan;
  /** Approved asset path; omit until client provides media. */
  src?: string;
  alt?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  client: string;
  year: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: readonly string[];
  gallery: readonly CaseMedia[];
  bg: string;
  textColor: string;
  svgColor: string;
  accentColor: string;
  aspect: string;
};

export const projects: readonly Project[] = [
  {
    slug: "brand-identity-system",
    number: "01",
    title: "BRAND IDENTITY & SYSTEM",
    category: "Branding",
    client: "Nexa Tech Solutions",
    year: "2025",
    summary:
      "Complete visual identity rebrand, design system, and brand guidelines for a next-gen fintech scaleup.",
    overview:
      "Nexa was ready to move past a safe corporate look. We rebuilt their visual language from the ground up—wordmark, type system, color, and modular assets—so every touchpoint feels sharp, energetic, and unmistakably theirs.",
    challenge:
      "Nexa needed a bold, memorable visual identity that stood out in a sea of generic corporate blues, establishing immediate authority and energy across global markets.",
    solution:
      "We engineered a dynamic visual system powered by high-contrast typography, modular geometric assets, and a vibrant color palette that scales effortlessly across physical and digital touchpoints.",
    outcome:
      "A cohesive brand kit the team can ship from—guidelines, tokens, and asset libraries that keep campaigns, product UI, and sales decks in lockstep without reinventing the wheel each launch.",
    deliverables: [
      "Visual Identity",
      "Brand Strategy",
      "Design System",
      "Brand Guidelines",
      "Asset Library",
    ],
    gallery: [
      { label: "Cover — Brand mark", ratio: "wide", span: "full" },
      { label: "Logo lockup", ratio: "landscape", span: "half" },
      { label: "Wordmark study", ratio: "portrait", span: "half" },
      { label: "Color system", ratio: "square", span: "third" },
      { label: "Type specimens", ratio: "square", span: "third" },
      { label: "Iconography set", ratio: "square", span: "third" },
      { label: "Guidelines spread", ratio: "landscape", span: "half" },
      { label: "Stationery kit", ratio: "landscape", span: "half" },
    ],
    bg: "bg-brand-yellow",
    textColor: "text-charcoal",
    svgColor: "text-paper",
    accentColor: "#FFD100",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "web-product-design",
    number: "02",
    title: "WEB & PRODUCT DESIGN",
    category: "Digital",
    client: "Kroma Studio",
    year: "2025",
    summary:
      "High-converting web experience and design architecture crafted for an AI creative suite.",
    overview:
      "Kroma needed a site that felt like the product: fast, tactile, and premium. We designed the information architecture, UI system, and interactive walkthroughs that turn curiosity into demos.",
    challenge:
      "Kroma required a website that felt like a premium creative tool itself—fast, interactive, and visually stunning without compromising page load speeds or accessibility.",
    solution:
      "Designed and built an ultra-clean modular web interface featuring micro-animations, rich typography hierarchy, and dynamic product walkthroughs.",
    outcome:
      "A modular web system with clear hierarchy, reusable components, and motion that supports the story instead of competing with it—ready for product and marketing teams to extend.",
    deliverables: [
      "Web Architecture",
      "UI/UX Design",
      "Interactive Prototypes",
      "Design System",
      "Figma Components",
    ],
    gallery: [
      { label: "Cover — Landing hero", ratio: "wide", span: "full" },
      { label: "Product walkthrough", ratio: "landscape", span: "half" },
      { label: "Mobile frames", ratio: "portrait", span: "half" },
      { label: "Dashboard UI", ratio: "landscape", span: "full" },
      { label: "Component library", ratio: "square", span: "third" },
      { label: "Interaction states", ratio: "square", span: "third" },
      { label: "Typography scale", ratio: "square", span: "third" },
      { label: "Marketing modules", ratio: "landscape", span: "half" },
    ],
    bg: "bg-accent-cobalt",
    textColor: "text-paper",
    svgColor: "text-charcoal",
    accentColor: "#2447F5",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "motion-3d-animation",
    number: "03",
    title: "MOTION & 3D ANIMATION",
    category: "Motion",
    client: "Hyperion Labs",
    year: "2024",
    summary:
      "3D product teaser, launch motion graphics, and interactive web elements for a flagship hardware release.",
    overview:
      "Hyperion's hardware launch needed emotion, not a spec sheet. We built a motion system—3D stills, teaser film, and web-ready renders—that sells craftsmanship in a few seconds of scroll.",
    challenge:
      "Translate complex hardware engineering specs into an emotional, high-impact motion launch film that captures audience imagination.",
    solution:
      "Crafted photorealistic 3D renders combined with sleek kinetic typography and smooth camera transitions to showcase product craftsmanship.",
    outcome:
      "A launch kit of stills, teaser cuts, and interactive web renders that marketing can remix across paid, organic, and product pages without losing visual consistency.",
    deliverables: [
      "3D Product Renders",
      "Motion Teaser Film",
      "Social Video Kit",
      "Interactive Web Renders",
    ],
    gallery: [
      { label: "Cover — Hero still", ratio: "wide", span: "full" },
      { label: "Product beauty shot", ratio: "landscape", span: "half" },
      { label: "Detail close-up", ratio: "portrait", span: "half" },
      { label: "Teaser frame 01", ratio: "landscape", span: "half" },
      { label: "Teaser frame 02", ratio: "landscape", span: "half" },
      { label: "Kinetic type still", ratio: "square", span: "third" },
      { label: "Social cutdown", ratio: "portrait", span: "third" },
      { label: "Web interaction still", ratio: "square", span: "third" },
    ],
    bg: "bg-accent-pink",
    textColor: "text-charcoal",
    svgColor: "text-paper",
    accentColor: "#F091F2",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "campaign-social-assets",
    number: "04",
    title: "CAMPAIGN & SOCIAL ASSETS",
    category: "Marketing",
    client: "Vanguard Mobility",
    year: "2024",
    summary:
      "Global social launch campaign assets, digital billboards, and conversion ad creative suite.",
    overview:
      "Vanguard needed a campaign system that travels—Instagram, LinkedIn, and digital OOH—without diluting the brand. We built templates and motion ads engineered for recognition at a glance.",
    challenge:
      "Drive global awareness and high CTR across multi-platform ad channels with consistent brand voice and instant recognition.",
    solution:
      "Created a versatile kit of high-impact visual templates and motion ads engineered for maximum engagement across Instagram, LinkedIn, and OOH digital billboards.",
    outcome:
      "A campaign toolkit the team can localize and iterate: static and motion templates, OOH adaptations, and a clear visual voice that stays sharp across channels.",
    deliverables: [
      "Social Ad Suite",
      "Campaign Design System",
      "Digital OOH Ads",
      "Marketing Toolkit",
    ],
    gallery: [
      { label: "Cover — Campaign key visual", ratio: "wide", span: "full" },
      { label: "Feed ad — square", ratio: "square", span: "third" },
      { label: "Story / Reel frame", ratio: "portrait", span: "third" },
      { label: "Carousel panel", ratio: "square", span: "third" },
      { label: "LinkedIn banner", ratio: "landscape", span: "half" },
      { label: "Digital OOH", ratio: "landscape", span: "half" },
      { label: "Motion still", ratio: "landscape", span: "full" },
      { label: "Toolkit overview", ratio: "landscape", span: "half" },
    ],
    bg: "bg-accent-lime",
    textColor: "text-charcoal",
    svgColor: "text-paper",
    accentColor: "#CCFF00",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "ui-ux-design-system",
    number: "05",
    title: "UI/UX DESIGN SYSTEM",
    category: "Product",
    client: "Aether OS",
    year: "2025",
    summary:
      "Scalable atomic design system with 200+ accessible components for multi-platform web applications.",
    overview:
      "Aether's product surface had grown faster than its UI language. We built an atomic system—tokens, components, and docs—so design and engineering ship in sync.",
    challenge:
      "Eliminate UI debt and speed up product shipping times across a distributed engineering and design team.",
    solution:
      "Built an exhaustive design system with tokenized CSS, strict accessibility standards, and reusable Figma & React libraries.",
    outcome:
      "A living system: tokens, patterns, and documented components that cut redesign churn and give product teams a shared source of truth.",
    deliverables: [
      "Design System",
      "Component Library",
      "UX Guidelines",
      "Design Tokens",
    ],
    gallery: [
      { label: "Cover — System overview", ratio: "wide", span: "full" },
      { label: "Token foundation", ratio: "landscape", span: "half" },
      { label: "Component grid", ratio: "landscape", span: "half" },
      { label: "Button & form states", ratio: "square", span: "third" },
      { label: "Navigation patterns", ratio: "square", span: "third" },
      { label: "Data display", ratio: "square", span: "third" },
      { label: "Figma library", ratio: "landscape", span: "half" },
      { label: "Accessibility notes", ratio: "landscape", span: "half" },
    ],
    bg: "bg-charcoal",
    textColor: "text-brand-yellow",
    svgColor: "text-paper",
    accentColor: "#1A1A1A",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "creative-art-direction",
    number: "06",
    title: "CREATIVE ART DIRECTION",
    category: "Art Direction",
    client: "Pulse Magazine",
    year: "2024",
    summary:
      "Editorial direction, photography style guide, and digital issue layout for contemporary culture publication.",
    overview:
      "Pulse wanted the digital issue to feel as tactile as a coffee-table book. We set photography direction, typography pairings, and layout systems that make every scroll feel curated.",
    challenge:
      "Reinvent the digital magazine experience to feel as tactile and immersive as a high-end physical coffee table book.",
    solution:
      "Established bold photographic direction, unconventional grid layouts, and expressive typographic pairings.",
    outcome:
      "An editorial system—style guide, layout templates, and art direction notes—that keeps each issue distinctive while remaining producible on deadline.",
    deliverables: [
      "Art Direction",
      "Photography Style Guide",
      "Editorial Layouts",
      "Digital Magazine Design",
    ],
    gallery: [
      { label: "Cover — Issue opener", ratio: "wide", span: "full" },
      { label: "Photo direction still", ratio: "portrait", span: "half" },
      { label: "Editorial spread", ratio: "landscape", span: "half" },
      { label: "Typography pairing", ratio: "square", span: "third" },
      { label: "Feature layout", ratio: "square", span: "third" },
      { label: "Pull-quote treatment", ratio: "square", span: "third" },
      { label: "Photo grid", ratio: "landscape", span: "full" },
      { label: "Style guide page", ratio: "landscape", span: "half" },
    ],
    bg: "bg-paper",
    textColor: "text-charcoal",
    svgColor: "text-brand-yellow",
    accentColor: "#F4F0EA",
    aspect: "aspect-[4/3]",
  },
];

export type ProjectAccent = {
  text: string;
  border: string;
  pillHover: string;
};

/** Tailwind accent classes for dark (ink) sections, derived from each project's hero color. */
export function getProjectAccent(project: Pick<Project, "bg">): ProjectAccent {
  switch (project.bg) {
    case "bg-accent-cobalt":
      return {
        text: "text-accent-cobalt",
        border: "border-accent-cobalt",
        pillHover: "hover:bg-accent-cobalt hover:text-paper",
      };
    case "bg-accent-pink":
      return {
        text: "text-accent-pink",
        border: "border-accent-pink",
        pillHover: "hover:bg-accent-pink hover:text-ink",
      };
    case "bg-accent-lime":
      return {
        text: "text-accent-lime",
        border: "border-accent-lime",
        pillHover: "hover:bg-accent-lime hover:text-ink",
      };
    case "bg-paper":
      return {
        text: "text-accent-pink",
        border: "border-accent-pink",
        pillHover: "hover:bg-accent-pink hover:text-ink",
      };
    case "bg-charcoal":
    case "bg-brand-yellow":
    default:
      return {
        text: "text-brand-yellow",
        border: "border-brand-yellow",
        pillHover: "hover:bg-brand-yellow hover:text-ink",
      };
  }
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
