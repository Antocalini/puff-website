export type Testimonial = {
  quote: string;
  author: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Puff Cross Media is one of a kind in their approach to the Art that is crucial in their line of business. All you mostly need to do is to provide them with your ideas and they know how to do the rest in such excellent manners that is next to none. The level of professionalism applied to their overall business processes is world-class!",
    author: "Tolulope Soola",
    company: "Ogi",
  },
  {
    quote:
      "We've been working with Puff Cross Media since 2020 for all of our print needs at Spanish Flowers Cocina Mexicana: menus, voucher cards, menu inserts, wall signs, even custom stickers for our cups. Piera is amazing to work with: fast turnaround, great quality every time, and she always makes sure everything comes out exactly how we need it. Five years later, she's still our go-to for anything print related. Highly recommend!",
    author: "Bisael Bermúdez",
    company: "Spanish Flowers",
  },
  {
    quote:
      "We highly recommend Puff Cross Media! Their products are outstanding, with exceptional quality and attention to detail. The entire process was smooth, professional, and exceeded our expectations. If you're looking for premium products and excellent customer service, Puff Cross Media is the way to go. We recommend them 100%!",
    author: "Nazaret Rodriguez",
    company: "DP",
  },
  {
    quote:
      "Outstanding service and incredible speed in delivering their work, and above all, true professionalism. I couldn't be more pleased with the results.",
    author: "Lenin Lopez",
    company: "Client Partner",
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
