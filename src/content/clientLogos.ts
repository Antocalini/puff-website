import type { ImageMetadata } from "astro";

import dpInfinity from "../assets/images/logos/dp-infinity-services-logo.png";
import emanuelKaty from "../assets/images/logos/emanuel-katy-logo.png";
import epaBurguer from "../assets/images/logos/epa-burguer-logo.png";
import mvas from "../assets/images/logos/mvas-logo.png";
import ogi from "../assets/images/logos/ogi-logo.png";
import ravago from "../assets/images/logos/ravago-logo.png";
import spanishFlowerSeafood from "../assets/images/logos/spanish-flower-seafood-logo.png";
import spanishFlowers from "../assets/images/logos/spanish-flowers-logo.png";
import theGuest from "../assets/images/logos/the-guest-logo.png";

export type ClientLogo = {
  name: string;
  image: ImageMetadata;
};

export const clientLogos: ClientLogo[] = [
  { name: "DP Infinity Services", image: dpInfinity },
  { name: "Emanuel Katy", image: emanuelKaty },
  { name: "Epa Burguer", image: epaBurguer },
  { name: "MVAS", image: mvas },
  { name: "OGI", image: ogi },
  { name: "Ravago", image: ravago },
  { name: "Spanish Flower Seafood", image: spanishFlowerSeafood },
  { name: "Spanish Flowers", image: spanishFlowers },
  { name: "The Guest", image: theGuest },
];

export const clientLogosRow1 = [
  { name: "DP Infinity Services", image: dpInfinity },
  { name: "Emanuel Katy", image: emanuelKaty },
  { name: "Epa Burguer", image: epaBurguer },
  { name: "MVAS", image: mvas },
  { name: "OGI", image: ogi },
] as const;

export const clientLogosRow2 = [
  { name: "Ravago", image: ravago },
  { name: "Spanish Flower Seafood", image: spanishFlowerSeafood },
  { name: "Spanish Flowers", image: spanishFlowers },
  { name: "The Guest", image: theGuest },
  { name: "DP Infinity Services", image: dpInfinity },
] as const;
