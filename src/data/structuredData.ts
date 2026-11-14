import { site } from "./site.ts";
import { units } from "./units.ts";

// Schema.org data for search engines, built only from the official data in units.ts.
const dayNames: Record<string, string> = {
  "Segunda-feira": "Monday",
  "Terça-feira": "Tuesday",
  "Quarta-feira": "Wednesday",
  "Quinta-feira": "Thursday",
  "Sexta-feira": "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

const absolute = (path?: string) => (path ? `${site.url}${path}` : undefined);

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: absolute("/icon-512.png"),
    sameAs: [...new Set(units.map((unit) => unit.instagram).filter(Boolean))],
    subOrganization: units.map((unit) => ({
      "@type": "ExerciseGym",
      "@id": `${site.url}/unidades/${unit.slug}#gym`,
      name: unit.fullName || `${site.name} ${unit.name}`,
      url: `${site.url}/unidades/${unit.slug}`,
      image: absolute(unit.heroImage.src),
      telephone: unit.phone,
      address: unit.address,
      geo: unit.coordinates && {
        "@type": "GeoCoordinates",
        latitude: unit.coordinates.latitude,
        longitude: unit.coordinates.longitude,
      },
      hasMap: unit.mapUrl,
      sameAs: unit.instagram ? [unit.instagram] : undefined,
      openingHoursSpecification: unit.schedule
        ?.filter((entry) => !entry.closed && entry.opens && entry.closes)
        .map((entry) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayNames[entry.day],
          opens: entry.opens,
          closes: entry.closes,
        })),
      parentOrganization: { "@id": `${site.url}/#organization` },
    })),
  };
}
