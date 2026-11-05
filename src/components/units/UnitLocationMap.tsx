import { ArrowUpRight, MapPin } from "lucide-react";
import type { Unit } from "../../data/units";

export function UnitLocationMap({ unit }: { unit: Unit }) {
  return (
    <div className="unit-location-map">
      <h2>
        <MapPin size={19} aria-hidden="true" />
        Localização
      </h2>
      {unit.mapEmbedUrl ? (
        <iframe
          src={unit.mapEmbedUrl}
          title={`Localização de ${unit.fullName || unit.name} no Google Maps`}
          width="600"
          height="360"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="empty-state">
          <p>Mapa da unidade a fornecer.</p>
        </div>
      )}
      {unit.mapUrl && (
        <a
          className="text-link"
          href={unit.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {unit.presentationVideo ? "COMO CHEGAR" : "Abrir no Google Maps"} <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
