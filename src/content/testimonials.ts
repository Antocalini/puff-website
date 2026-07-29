export type Testimonial = {
  quote: string;
  author: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "As a long-term partner, Puff proactively drives innovation to not only meet our growth goals but transform our end-user digital experience.",
    author: "Alex Chen",
    company: "VP of Product at Nexa Tech",
  },
  {
    quote:
      "The speed of execution is unprecedented. We went from design concept to a production Astro app in under a week with 0 friction.",
    author: "Elena Rostova",
    company: "Head of Marketing at Pulse Global",
  },
  {
    quote:
      "Puff's subscription model completely replaced our traditional agency costs while delivering 3x higher design quality and motion.",
    author: "Marcus Vance",
    company: "Founder at Vanguard Mobility",
  },
];

export const testimonialLogosRow1 = [
  "icash pay",
  "PRESIDENT SECURITIES",
  "LITEON",
  "NESPRESSO",
  "CATHAY FINANCIAL",
  "FAREASTONE",
  "CHICTRIP",
  "HOTAI MOTOR",
] as const;

export const testimonialLogosRow2 = [
  "CATHAY FINANCIAL",
  "FAREASTONE",
  "NESPRESSO",
  "icash pay",
  "HOTAI MOTOR",
  "LITEON",
  "CHICTRIP",
  "PRESIDENT SECURITIES",
] as const;
