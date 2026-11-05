import { units } from "./units";
import type { Media } from "./units";

export interface DestinationVideo {
  src: string;
  finalFrame: string;
  locationLabel: string;
}
export interface HeroDestination {
  id: string;
  name: string;
  description: string;
  image: Media;
  href: string;
  video?: DestinationVideo;
}

// Add future videos here. Public unit names and page routes remain in units.ts.
const videosByUnit: Partial<Record<string, DestinationVideo>> = {
  "sao-jose-de-piranhas": {
    src: "/videos/masterfit-saojose-satellite.mp4",
    finalFrame: "/videos/masterfit-saojose-final.jpg",
    locationLabel: "SÃO JOSÉ DE PIRANHAS",
  },
  carrapateira: {
    src: "/videos/masterfit-carrapateira-satellite.mp4",
    finalFrame: "/videos/masterfit-carrapateira-final.jpg",
    locationLabel: "CARRAPATEIRA",
  },
  aeroclube: {
    src: "/videos/masterfit-bessa-satellite.mp4",
    finalFrame: "/videos/masterfit-bessa-final.jpg",
    locationLabel: "AEROCLUBE — BESSA",
  },
};

export const heroDestinations: HeroDestination[] = units.map((unit) => ({
  id: unit.id,
  name: unit.name,
  description: unit.description,
  image: unit.heroImage,
  href: `/unidades/${unit.slug}`,
  video: videosByUnit[unit.slug],
}));
