import type { ImageMetadata } from "astro";

import epaBurguerThumb from "../assets/images/epa-burguer-thumbnail.webp";
import epaBurguerTakeawayBox from "../assets/images/projects/epa-burguer/epa-burguer-takeaway-box.webp";
import epaBurguerStreetVibe from "../assets/images/projects/epa-burguer/epa-burguer-street-vibe.webp";
import epaBurguerStorefront from "../assets/images/projects/epa-burguer/epa-burguer-storefront.webp";
import epaBurguerPackaging from "../assets/images/projects/epa-burguer/epa-burguer-packaging.webp";
import epaBurguerLogo from "../assets/images/logos/epa-burguer-logo.png";
import ogiThumb from "../assets/images/ogi-thumbnail.webp";
import ogiLogo from "../assets/images/logos/ogi-logo.png";
import ogiBox from "../assets/images/projects/ogi/ogi-box.webp";
import ogiMatcha from "../assets/images/projects/ogi/ogi-matcha.webp";
import ogiPlace from "../assets/images/projects/ogi/ogi-place.webp";
import ravagoThumb from "../assets/images/ravago-thumbnail.webp";
import ravagoLogo from "../assets/images/logos/ravago-logo.png";
import ravagoCorporateKit from "../assets/images/projects/ravago/ravago-corporate-kit.webp";
import ravagoBrandIdentity from "../assets/images/projects/ravago/ravago-brand-identity.webp";
import ravagoCollateral from "../assets/images/projects/ravago/ravago-collateral.webp";
import ravagoStickerMockup from "../assets/images/projects/ravago/ravago-sticker-mockup.webp";
import spanishFlowersThumb from "../assets/images/spanish-flowers-thumbnail.webp";
import spanishFlowersLogo from "../assets/images/logos/spanish-flowers-logo.png";
import spanishFlowersPackaging from "../assets/images/spanish-flowers-packaging.png";
import spanishSign from "../assets/images/projects/spanish/spanish-sign.webp";
import spanishCard from "../assets/images/projects/spanish/spanish-card.webp";
import spanishStickers from "../assets/images/projects/spanish/spanish-stickers.webp";
import spanishTshirt from "../assets/images/projects/spanish/spanish-tshirt.webp";

export type CaseMediaRatio = "landscape" | "portrait" | "square" | "wide" | "standard";
export type CaseMediaSpan = "full" | "half" | "third";
export type CaseMediaPosition = "bottom" | "center" | "top" | "upper";

export type BaseCaseMedia = {
  label: string;
  ratio: CaseMediaRatio;
  span?: CaseMediaSpan;
  position?: CaseMediaPosition;
};

export type ImageMedia = BaseCaseMedia & {
  type?: "image";
  /** Approved asset path; omit until client provides media. */
  src?: string;
  alt?: string;
};

export type ColorPaletteMedia = BaseCaseMedia & {
  type: "color-palette";
  colors: { name: string; hex: string; textClass?: string }[];
  logoSrc?: string;
  logoBgHex?: string;
  logoWhite?: boolean;
};

export type TypographyMedia = BaseCaseMedia & {
  type: "typography";
  fontFamily: string;
  fontName: string;
  sampleText?: string;
};

export type CaseMedia = ImageMedia | ColorPaletteMedia | TypographyMedia;

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
  statement?: string;
  gallery: readonly CaseMedia[];
  bg: string;
  textColor: string;
  svgColor: string;
  accentColor: string;
  aspect: string;
  thumbnail: ImageMetadata;
};

export const projects: readonly Project[] = [
  {
    slug: "epa-burguer-branding",
    number: "01",
    title: "EPA BURGUER BRANDING",
    category: "Packaging & Street Collateral",
    client: "Epa Burguer",
    year: "2025",
    summary:
      "Custom takeaway packaging boxes, greaseproof burger wrapping paper, outdoor food truck signage graphics, and branded napkin prints designed for Katy, Texas' premier Venezuelan street food spot.",
    overview:
      "Epa Burguer is a high-energy Venezuelan street food truck operating in Katy, Texas, famous for its heavy-loaded smash burgers, pepitos, and street-style Arepas. They required custom physical design collateral built to withstand high-volume kitchen service and takeaway delivery. We engineered print-ready packaging assets including heavy-duty cardboard burger boxes, custom greaseproof wrapping paper, high-visibility food truck exterior vinyl signage, and two-color printed napkins that make every order look impressive right out of the bag.",
    challenge:
      "Designing food packaging and outdoor street collateral that can handle high heat, moisture, and grease from fresh smash burgers while keeping colors crisp, typography legible, and print costs efficient for daily food truck operations.",
    solution:
      "We developed custom food-safe grease-resistant print layouts, high-contrast takeaway box structures, and weatherproof vinyl graphics for the truck exterior. Every piece was built using high-visibility typography and vibrant color blocks that stand out in outdoor lighting and on social media unboxing videos.",
    outcome:
      "Delivered a complete, production-ready suite of packaging assets and physical collateral that streamlined food assembly, enhanced order presentation, and increased organic customer shares across social platforms.",
    deliverables: [
      "Takeaway Packaging Boxes",
      "Greaseproof Wrapping Paper",
      "Food Truck Exterior Signage",
      "Custom Printed Napkins",
    ],
    gallery: [
      { label: "Cover — Takeaway Collateral", ratio: "standard", span: "full", src: epaBurguerThumb.src },
      {
        label: "Color Palette & Print Specs",
        ratio: "wide",
        span: "full",
        type: "color-palette",
        logoSrc: epaBurguerLogo.src,
        logoBgHex: "#DC2626",
        logoWhite: true,
        colors: [
          { name: "Spicy Red", hex: "#DC2626", textClass: "text-white" },
          { name: "Burger Bun", hex: "#F59E0B", textClass: "text-ink" },
          { name: "Charcoal", hex: "#1D1D1D", textClass: "text-white" },
          { name: "Paper", hex: "#F5F5F5", textClass: "text-ink" },
        ],
      },
      { label: "Takeaway Packaging Box", ratio: "landscape", span: "full", src: epaBurguerTakeawayBox.src },
      { label: "In-Store & Street Collateral", ratio: "wide", span: "full", src: epaBurguerStreetVibe.src },
      { label: "Storefront Signage Application", ratio: "wide", span: "full", src: epaBurguerStorefront.src },
      { label: "Brand Packaging & Napkin Details", ratio: "portrait", span: "full", position: "bottom", src: epaBurguerPackaging.src },
    ],
    bg: "bg-red-600",
    textColor: "text-paper",
    svgColor: "text-amber-500",
    accentColor: "#DC2626",
    aspect: "aspect-[4/3]",
    thumbnail: epaBurguerThumb,
  },
  {
    slug: "ogi-visual-identity",
    number: "02",
    title: "OGI BRAND EXPERIENCE",
    category: "Product Packaging & Merch",
    client: "OGI",
    year: "2025",
    summary:
      "Structural paper delivery bags, waterproof iced matcha cup labels, bakery packaging wraps, and spatial signage mockups for OGI Coffee, Gelato & Bakery in Texas.",
    overview:
      "OGI Coffee, Gelato & Bakery is an artisanal Texas café concept that combines Japanese minimalist aesthetics with specialty coffee, house-made gelatos, and fresh baked goods. We designed a comprehensive collection of physical packaging assets and spatial collateral pieces. This included custom structural paper delivery bags, waterproof container labels for their signature iced matcha line, bakery tissue wraps, and physical store placement signage that unifies the takeaway and in-house dining experience.",
    challenge:
      "Engineering packaging pieces for delicate iced matcha beverages, specialty gelatos, and fresh bakery items that prevent condensation leaks, maintain product temperature, and communicate an elevated artisanal quality to customers.",
    solution:
      "We created custom structural paper bags with reinforced handles, waterproof matte labels for cold beverage cups, grease-resistant bakery tissue papers, and clean architectural signage layouts for the physical space.",
    outcome:
      "Produced a cohesive set of physical product pieces and takeaway packaging collaterals that elevated OGI's customer touchpoints and strengthened their market presence as a premium specialty café.",
    deliverables: [
      "Reinforced Delivery Paper Bags",
      "Waterproof Matcha Cup Labels",
      "Greaseproof Bakery Wraps",
      "Spatial Store Signage",
    ],
    gallery: [
      { label: "Cover — Product Packaging", ratio: "standard", span: "full", src: ogiThumb.src },
      {
        label: "Color Palette & Specs",
        ratio: "wide",
        span: "full",
        type: "color-palette",
        logoSrc: ogiLogo.src,
        logoBgHex: "#581C87",
        logoWhite: false,
        colors: [
          { name: "Purple Core", hex: "#581C87", textClass: "text-white" },
          { name: "Accent Lime", hex: "#A3E635", textClass: "text-ink" },
          { name: "Dark Ink", hex: "#18181B", textClass: "text-white" },
          { name: "Paper White", hex: "#F5F5F5", textClass: "text-ink" },
        ],
      },
      { label: "Delivery Bag Mockup", ratio: "standard", span: "full", src: ogiBox.src },
      { label: "Matcha Product Container", ratio: "portrait", span: "full", position: "upper", src: ogiMatcha.src },
      { label: "Spatial Environment Collateral", ratio: "landscape", span: "full", src: ogiPlace.src },
    ],
    bg: "bg-purple-900",
    textColor: "text-paper",
    svgColor: "text-accent-lime",
    accentColor: "#581C87",
    aspect: "aspect-[4/3]",
    thumbnail: ogiThumb,
  },
  {
    slug: "ravago-corporate-identity",
    number: "03",
    title: "RAVAGO CORPORATE SYSTEM",
    category: "Executive Corporate Kits",
    client: "Ravago",
    year: "2024",
    summary:
      "Executive presentation folders, corporate stationery cards, industrial die-cut sticker sheets, and print marketing collateral for Ravago Manufacturing Americas.",
    overview:
      "Ravago Manufacturing Americas is a global leader in polymer compounding, plastic recycling, and engineered thermoplastics with major manufacturing facilities in Houston and Baytown, Texas. To support their sales directors and executive teams during international summits and client presentations, we designed a suite of executive corporate collateral pieces. This included custom pocket presentation folders, embossed business cards, industrial die-cut sticker sheets, and structured print product catalog sheets.",
    challenge:
      "Creating corporate print collateral that communicates industrial scale, polymer engineering expertise, and environmental sustainability across diverse international business units and executive-level client meetings.",
    solution:
      "We produced structured print layouts utilizing heavy paper stocks, precision die-cut folder pockets, custom polymer sticker assets, and clean technical grid typography designed for corporate clarity and ease of navigation.",
    outcome:
      "Equipped Ravago's sales and executive teams with a unified, high-end collection of corporate print pieces that standardized sales presentations, improved client proposals, and reflected the company's global industry leadership.",
    deliverables: [
      "Executive Pocket Folders",
      "Embossed Corporate Cards",
      "Die-Cut Polymer Sticker Sheets",
      "Print Product Catalogs",
    ],
    gallery: [
      { label: "Cover — Corporate Kit", ratio: "standard", span: "full", src: ravagoThumb.src },
      {
        label: "Color Palette & Print Specs",
        ratio: "wide",
        span: "full",
        type: "color-palette",
        logoSrc: ravagoLogo.src,
        logoBgHex: "#2447F5",
        logoWhite: true,
        colors: [
          { name: "Cobalt Blue", hex: "#2447F5", textClass: "text-white" },
          { name: "Pure Paper", hex: "#FFFFFF", textClass: "text-ink" },
          { name: "Charcoal Ink", hex: "#18181B", textClass: "text-white" },
        ],
      },
      { label: "Corporate Folder & Guidelines", ratio: "wide", span: "full", src: ravagoCorporateKit.src },
      { label: "Brand Collateral System", ratio: "wide", span: "full", src: ravagoBrandIdentity.src },
      { label: "Executive Presentation Pieces", ratio: "wide", span: "full", src: ravagoCollateral.src },
      { label: "Sticker Collateral & Assets", ratio: "landscape", span: "full", src: ravagoStickerMockup.src },
    ],
    bg: "bg-accent-cobalt",
    textColor: "text-paper",
    svgColor: "text-paper",
    accentColor: "#2447F5",
    aspect: "aspect-[4/3]",
    thumbnail: ravagoThumb,
  },
  {
    slug: "spanish-flowers-brand",
    number: "04",
    title: "SPANISH FLOWERS IDENTITY",
    category: "Restaurant Collateral & Merch",
    client: "Spanish Flowers",
    year: "2024",
    summary:
      "Laser-cut 3D architectural wood signage, tactile business cards, takeout packaging graphics, custom merchandise t-shirts, and sticker collaterals for Houston landmark Spanish Flowers.",
    overview:
      "Founded in 1979, Spanish Flowers Mexican Restaurant is a celebrated Houston culinary institution known for authentic Tex-Mex, homemade menudo, and round-the-clock dining tradition. We designed a diverse collection of physical design pieces to enrich their restaurant environment and customer outreach. This included a multi-layered 3D laser-cut wood architectural wall sign, tactile business cards, takeout box graphic wraps, custom merchandise t-shirts, and branded sticker sheets.",
    challenge:
      "Designing physical architectural pieces and merchandise collateral that honor over four decades of traditional Mexican culinary heritage while feeling fresh, durable, and appealing to new generations of diners.",
    solution:
      "We engineered vector files for precision 3D wood laser cutting and assembly, designed high-texture print cards, produced screen-print apparel artwork for merchandise t-shirts, and developed durable takeout packaging graphics.",
    outcome:
      "Transformed the restaurant's interior with an iconic 3D wood wall art feature and launched a popular merchandise line that turned loyal diners into brand ambassadors across Houston.",
    deliverables: [
      "3D Layered Wood Signage",
      "Tactile Business Cards",
      "Takeout Box Wraps",
      "Custom Screen-Printed T-Shirts",
    ],
    gallery: [
      { label: "Cover — Hospitality Collateral", ratio: "standard", span: "full", src: spanishFlowersThumb.src },
      {
        label: "Color Palette & Print Specs",
        ratio: "wide",
        span: "full",
        type: "color-palette",
        logoSrc: spanishFlowersLogo.src,
        logoBgHex: "#10B981",
        logoWhite: false,
        colors: [
          { name: "Emerald", hex: "#10B981", textClass: "text-ink" },
          { name: "Accent Pink", hex: "#EC4899", textClass: "text-white" },
          { name: "Charcoal", hex: "#18181B", textClass: "text-white" },
          { name: "Paper", hex: "#F5F5F5", textClass: "text-ink" },
        ],
      },
      { label: "Architectural 3D Signage", ratio: "portrait", span: "half", src: spanishSign.src },
      { label: "Stationery Card Pieces", ratio: "portrait", span: "half", src: spanishCard.src },
      { label: "Packaging & Printables", ratio: "landscape", span: "full", src: spanishFlowersPackaging.src },
      { label: "Custom Apparel & Merch", ratio: "portrait", span: "half", src: spanishTshirt.src },
      { label: "Brand Sticker Collateral", ratio: "portrait", span: "half", src: spanishStickers.src },
    ],
    bg: "bg-emerald-500",
    textColor: "text-paper",
    svgColor: "text-pink-500",
    accentColor: "#10B981",
    aspect: "aspect-[4/3]",
    thumbnail: spanishFlowersThumb,
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
    case "bg-red-600":
      return {
        text: "text-red-500",
        border: "border-red-500",
        pillHover: "hover:bg-red-600 hover:text-paper",
      };
    case "bg-purple-900":
      return {
        text: "text-purple-400",
        border: "border-purple-400",
        pillHover: "hover:bg-purple-900 hover:text-paper",
      };
    case "bg-emerald-500":
      return {
        text: "text-emerald-500",
        border: "border-emerald-500",
        pillHover: "hover:bg-emerald-500 hover:text-ink",
      };
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
