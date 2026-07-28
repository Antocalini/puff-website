export const needsClientInput = "[NEEDS CLIENT INPUT]" as const;

export type NeedsClientInput = typeof needsClientInput;
export type Approval<T> = T | NeedsClientInput;

export type Draft<T> = {
  isDraft: true;
  value: T;
};

export const draft = <T>(value: T): Draft<T> => ({ isDraft: true, value });

export type NavigationItem = {
  label: "How it works" | "Pricing" | "Work" | "FAQ";
  href: "#how-it-works" | "#pricing" | "#work" | "#faq";
};

export type HeaderSocialLink = {
  platform: "instagram" | "facebook";
  label: string;
  href: string;
};

export type SiteMetadata = {
  title: Approval<string>;
  description: Approval<string>;
  canonicalUrl: NeedsClientInput;
  openGraphImage: NeedsClientInput;
};

export type MediaAsset = {
  src: string;
  alt: string;
};

export type PortfolioItem = {
  category: "graphic" | "web" | "video";
  title: Draft<string>;
  media: NeedsClientInput;
  ratio: "landscape" | "portrait" | "square";
};

export type LandingContent = {
  metadata: SiteMetadata;
  primaryNavigation: readonly NavigationItem[];
  header: Draft<{
    eyebrow: string;
    brandName: string;
    socialLinks: readonly HeaderSocialLink[];
    searchLabel: string;
  }>;
  logo: NeedsClientInput;
  fonts: NeedsClientInput;
  contact: NeedsClientInput;
  socialLinks: NeedsClientInput;
  legal: {
    privacyPolicy: NeedsClientInput;
    termsOfService: NeedsClientInput;
  };
  commercial: {
    pricing: NeedsClientInput;
    projectDefinition: NeedsClientInput;
    serviceLevelAgreement: NeedsClientInput;
    callToActionDestinations: NeedsClientInput;
  };
  proof: {
    clientLogos: NeedsClientInput;
    testimonials: NeedsClientInput;
  };
  portfolio: readonly PortfolioItem[];
  hero: Draft<{
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: { label: string; href: "#pricing" };
    secondaryCta: { label: string; href: "#how-it-works" };
  }>;
  process: Draft<{
    heading: string;
    intro: string;
    steps: readonly { number: string; title: string; body: string }[];
    previewLabel: string;
    previewDescription: string;
  }>;
  pricing: Draft<{
    disclosure: string;
    heading: string;
    intro: string;
    tiers: readonly {
      name: string;
      monthlyPrice: string;
      summary: string;
      inclusions: readonly string[];
    }[];
  }>;
  portfolioIntro: Draft<{ eyebrow: string; heading: string; body: string; collectionLabel: string }>;
  testimonials: Draft<{ heading: string; body: string; emptyState: string }>;
  faq: Draft<{
    heading: string;
    intro: string;
    items: readonly { question: string; answer: string }[];
  }>;
  cta: Draft<{
    eyebrow: string;
    heading: string;
    body: string;
    action: { label: string; href: "#pricing" };
  }>;
  legalPlaceholder: Draft<{ title: string; body: string }>;
};

export const landingContent = {
  metadata: {
    title: needsClientInput,
    description: needsClientInput,
    canonicalUrl: needsClientInput,
    openGraphImage: needsClientInput,
  },
  primaryNavigation: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Work", href: "#work" },
    { label: "FAQ", href: "#faq" },
  ],
  header: draft({
    eyebrow: "Puff Cross Media / Draft",
    brandName: "Puff",
    socialLinks: [
      { platform: "instagram", label: "Instagram (draft)", href: "#" },
      { platform: "facebook", label: "Facebook (draft)", href: "#" },
    ],
    searchLabel: "Search site",
  }),
  logo: needsClientInput,
  fonts: needsClientInput,
  contact: needsClientInput,
  socialLinks: needsClientInput,
  legal: {
    privacyPolicy: needsClientInput,
    termsOfService: needsClientInput,
  },
  commercial: {
    pricing: needsClientInput,
    projectDefinition: needsClientInput,
    serviceLevelAgreement: needsClientInput,
    callToActionDestinations: needsClientInput,
  },
  proof: {
    clientLogos: needsClientInput,
    testimonials: needsClientInput,
  },
  hero: draft({
    eyebrow: "Puff Cross Media / Draft",
    heading: "Get to know your design",
    body: "Design: it's all about momentum. Discover Puff—the on-demand creative team that keeps your brand moving.",
    primaryCta: { label: "See Plans", href: "#pricing" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
  }),
  process: draft({
    heading: "A simple rhythm for creative work.",
    intro: "A draft outline of the Puff flow—final operating terms are pending confirmation.",
    steps: [
      { number: "01", title: "Choose your direction", body: "Pick the draft plan that matches the kind of work you need." },
      { number: "02", title: "Share the brief", body: "Send the next priority so the work can move into the queue." },
      { number: "03", title: "Keep momentum", body: "Draft positioning: receive creative work in 48 hours, then keep iterating." },
    ],
    previewLabel: "Workflow preview / draft",
    previewDescription: "A future workflow preview will live here. This is not a client portal or dashboard.",
  }),
  pricing: draft({
    disclosure: "Draft pricing — pending confirmation",
    heading: "Choose a starting point.",
    intro: "The plan names and monthly price points below reflect the current site and remain draft terms.",
    tiers: [
      { name: "Graphic Lite", monthlyPrice: "$500", summary: "Graphic Design Service", inclusions: ["10 projects", "One request at a time"] },
      { name: "Graphic", monthlyPrice: "$1,000", summary: "Graphic + Web Design Service", inclusions: ["20 projects", "One request at a time"] },
      { name: "Web", monthlyPrice: "$1,500", summary: "Graphic + Web Design Service", inclusions: ["Unlimited projects", "Simultaneous requests"] },
      { name: "Video", monthlyPrice: "$1,500", summary: "Graphic + Video Design & Editing", inclusions: ["Unlimited projects", "Simultaneous requests"] },
    ],
  }),
  portfolioIntro: draft({
    eyebrow: "Sample work / Draft",
    heading: "A few ways a good idea can show up.",
    body: "Art-directed sample compositions stand in for approved portfolio assets.",
    collectionLabel: "Sample work — no client attribution",
  }),
  portfolio: [
    { category: "graphic", title: draft("Brand system"), media: needsClientInput, ratio: "square" },
    { category: "web", title: draft("Campaign toolkit"), media: needsClientInput, ratio: "landscape" },
    { category: "video", title: draft("Motion storyboards"), media: needsClientInput, ratio: "portrait" },
    { category: "graphic", title: draft("Editorial launch"), media: needsClientInput, ratio: "landscape" },
  ],
  testimonials: draft({
    heading: "The next story could be yours.",
    body: "We will publish client stories only after their quotes, attribution, and permissions are approved.",
    emptyState: "Client stories coming soon",
  }),
  faq: draft({
    heading: "Questions, answered clearly.",
    intro: "These draft answers describe the model at a high level; final commercial and policy terms are pending confirmation.",
    items: [
      { question: "What is Puff?", answer: "Puff is presented as an on-demand creative subscription. The final service scope is pending confirmation." },
      { question: "How fast is delivery?", answer: "Current draft positioning references a 48-hour delivery window. Final service levels are pending confirmation." },
      { question: "What counts as a project?", answer: "The definition of a project is pending client approval and will be published with final plan terms." },
      { question: "Can I pause or cancel?", answer: "Pause and cancellation terms are pending client approval; this page does not establish a policy." },
    ],
  }),
  cta: draft({
    eyebrow: "Ready when you are / Draft",
    heading: "Put your next creative priority in motion.",
    body: "Explore the draft plan structure while final terms and contact destinations are being confirmed.",
    action: { label: "Review draft plans", href: "#pricing" },
  }),
  legalPlaceholder: draft({
    title: "Content pending legal review",
    body: "This placeholder is not a legal policy. Approved legal content will be published here after review.",
  }),
} as const satisfies LandingContent;
