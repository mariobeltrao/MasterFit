export interface Media {
  src?: string;
  alt: string;
  srcSet?: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}
export interface FAQ {
  question: string;
  answer: string;
}
export interface Modality {
  name: string;
  description: string;
}
export interface Unit {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: Media;
  gallery: Media[];
  fullName?: string;
  presentation?: { title: string; subtitle: string };
  phone?: string;
  schedule?: { day: string; opens?: string; closes?: string; closed?: boolean }[];
  hoursNote?: string;
  coordinates?: { latitude: number; longitude: number };
  mapEmbedUrl?: string;
  address?: string;
  hours?: string;
  whatsapp?: string;
  instagram?: string;
  instagramLabel?: string;
  presentationVideo?: { src: string; poster: string };
  modalities: Modality[];
  amenities: string[];
  plans: { name: string; price?: string; description: string }[];
  mapUrl?: string;
  faqs: FAQ[];
}
const createUnit = (id: string, slug: string, name: string): Unit => ({
  id,
  slug,
  name,
  description:
    "Conteúdo provisório. Em breve, este espaço apresentará a proposta, a equipe e os detalhes desta unidade.",
  heroImage:
    id === "01"
      ? {
          src: "/assets/references/masterfit-fachada-1280.webp",
          alt: "Fachada da unidade Aeroclube da MasterFit",
        }
      : { alt: `Fotografia oficial da unidade ${name} — a fornecer` },
  gallery: ["Ambiente de treino", "Equipamentos", "Espaço da unidade"].map(
    (label) => ({ alt: `${label} — foto oficial a fornecer` }),
  ),
  modalities: [],
  amenities: [],
  plans: [],
  faqs: [],
});
const aeroclube: Unit = {
  ...createUnit("01", "aeroclube", "Aeroclube"),
  fullName: "Masterfit Aeroclube",
  presentation: {
    title: "UNIDADE AEROCLUBE",
    subtitle:
      "Estrutura moderna, ambiente premium e equipamentos de qualidade para o seu treino.",
  },
  description:
    "Na unidade Aeroclube, a Masterfit oferece um ambiente moderno, bem equipado e preparado para proporcionar uma excelente experiência de treino, com conforto, estrutura e praticidade.",
  address:
    "R. Francisco Leocádio Ribeiro Coutinho, 374 - Aeroclube, João Pessoa - PB, 58036-450",
  phone: "+55 83 99832-5451",
  whatsapp: "https://wa.me/5583998325451",
  instagram: "https://www.instagram.com/masterfitjp/",
  instagramLabel: "@masterfitjp",
  hours:
    "Segunda a sexta: 05:00–23:00 · Sábado: 07:00–17:00 · Domingo: 07:00–12:00",
  schedule: [
    ...[
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
    ].map((day) => ({ day, opens: "05:00", closes: "23:00" })),
    { day: "Sábado", opens: "07:00", closes: "17:00" },
    { day: "Domingo", opens: "07:00", closes: "12:00" },
  ],
  coordinates: { latitude: -7.0845734, longitude: -34.843454 },
  mapUrl: "https://www.google.com/maps?q=-7.0845734,-34.843454",
  // Copied from Google Maps > Compartilhar > Incorporar um mapa, for the supplied pin.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3959.3567796515827!2d-34.846028925002045!3d-7.084573392918373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDUnMDQuNSJTIDM0wrA1MCczNi40Ilc!5e0!3m2!1spt-BR!2sbr!4v1793547939028!5m2!1spt-BR!2sbr",
  gallery: [
    {
      image: 4,
      alt: "Vista interna da musculação na Aeroclube, com bancos, máquinas e iluminação geométrica.",
    },
    {
      image: 1,
      alt: "Máquinas de musculação sob iluminação azul e branca na unidade Aeroclube.",
    },
    { image: 2, alt: "Equipamentos de cardio alinhados na unidade Aeroclube." },
    {
      image: 3,
      alt: "Estações de musculação e suportes de anilhas da unidade Aeroclube.",
    },
  ].map(({ image, alt }) => ({
    src: `/assets/units/aeroclube/interior-${image}-1122.jpg`,
    srcSet: [320, 640, 1122]
      .map(
        (width) =>
          `/assets/units/aeroclube/interior-${image}-${width}.jpg ${width}w`,
      )
      .join(", "),
    thumbnail: `/assets/units/aeroclube/interior-${image}-320.jpg`,
    alt,
    width: 1122,
    height: 1402,
  })),
  // Categories visible in the supplied photographs; no counts or additional facilities inferred.
  amenities: [
    "Espaço de musculação",
    "Equipamentos de cardio",
    "Estações com pesos e anilhas",
  ],
};
const carrapateira: Unit = {
  ...createUnit("03", "carrapateira", "Carrapateira"),
  fullName: "Master Fit Carrapateira",
  presentation: { title: "UNIDADE CARRAPATEIRA", subtitle: "Sua evolução começa aqui." },
  description: "Conheça a unidade Master Fit Carrapateira e descubra um espaço dedicado à sua rotina de treinos, evolução e bem-estar.",
  address: "R. Joel Pereira, 117, Carrapateira - PB, 58945-000",
  phone: "+55 83 99619-1918",
  whatsapp: "https://wa.me/5583996191918",
  hours: "Segunda a sexta: 06:00–21:00 · Sábado: 13:00–17:00 · Domingo: fechado",
  schedule: [
    ...["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((day) => ({ day, opens: "06:00", closes: "21:00" })),
    { day: "Sábado", opens: "13:00", closes: "17:00" },
    { day: "Domingo", closed: true },
  ],
  instagram: "https://www.instagram.com/ct.masterfit/",
  instagramLabel: "@ct.masterfit",
  coordinates: { latitude: -7.0412226, longitude: -38.3466987 },
  mapUrl: "https://maps.app.goo.gl/NWUnHPJ6SpzcmMZ97",
  // Official Share > Embed URL from the supplied Carrapateira Maps listing.
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.7279620432564!2d-38.3466987!3d-7.041222599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a4170030d10b0f%3A0x3c13fc4b3d441ab5!2sMaster%20Fit%20-%20Carrapateira!5e0!3m2!1spt-BR!2sbr!4v1793560078162!5m2!1spt-BR!2sbr",
  presentationVideo: {
    src: "/videos/masterfit-carrapateira-satellite.mp4",
    poster: "/videos/masterfit-carrapateira-final.jpg",
  },
  // Facade confirmed as Carrapateira by the owner in this conversation.
  heroImage: {
    src: "/assets/units/carrapateira/fachada.jpg",
    alt: "Fachada da Master Fit Carrapateira, com parede de blocos cinza, letreiro da marca e vasos amarelos na entrada.",
    width: 1920,
    height: 1370,
  },
  gallery: [],
};
const saoJose: Unit = {
  ...createUnit("02", "sao-jose-de-piranhas", "São José de Piranhas"),
  fullName: "Master Fit São José de Piranhas",
  presentation: {
    title: "UNIDADE SÃO JOSÉ DE PIRANHAS",
    subtitle: "Sua evolução começa aqui.",
  },
  description: "Conheça a Master Fit São José de Piranhas e encontre um ambiente dedicado ao seu treinamento, com foco em evolução, constância e bem-estar.",
  address: "R. Juvêncio Andrade - Centro, São José de Piranhas - PB, 58940-000",
  phone: "+55 83 99619-1918",
  whatsapp: "https://wa.me/5583996191918",
  instagram: "https://www.instagram.com/ct.masterfit/",
  instagramLabel: "@ct.masterfit",
  hours: "Segunda a sexta: 06:00–21:00 · Sábado: 13:00–17:00 · Domingo: fechado",
  hoursNote: "Horários sujeitos a alterações em feriados.",
  schedule: [
    ...["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((day) => ({ day, opens: "06:00", closes: "21:00" })),
    { day: "Sábado", opens: "13:00", closes: "17:00" },
    { day: "Domingo", closed: true },
  ],
  // Pin from the listing reached through the owner's shared Google link.
  coordinates: { latitude: -7.1212175, longitude: -38.4973176 },
  mapUrl: "https://share.google/Gkw3E84isUjaxeFnX",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0412541621417!2d-38.4973176!3d-7.121217499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a4054f8a1e5a07%3A0x4d6e7a2395b87318!2sAcademia%20Master%20Fit!5e0!3m2!1spt-BR!2sbr!4v1793561514394!5m2!1spt-BR!2sbr",
  presentationVideo: {
    src: "/videos/masterfit-saojose-satellite.mp4",
    poster: "/videos/masterfit-saojose-final.jpg",
  },
  heroImage: {
    src: "/assets/units/sao-jose-de-piranhas/fachada.jpg",
    alt: "Fachada da Master Fit São José de Piranhas, com parede cinza, letreiro preto, grandes janelas e palmeiras junto à entrada de vidro.",
    width: 842,
    height: 607,
  },
  gallery: [],
};
export const units: Unit[] = [
  aeroclube,
  saoJose,
  carrapateira,
];
