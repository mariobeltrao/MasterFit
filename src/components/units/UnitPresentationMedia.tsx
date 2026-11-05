import type { Unit } from "../../data/units";

export function UnitPresentationMedia({ unit }: { unit: Unit }) {
  const video = unit.presentationVideo;
  if (!video) return null;
  return (
    <div className="unit-presentation-media">
      <figure>
        <video
          controls
          muted
          playsInline
          preload="metadata"
          poster={video.poster}
          aria-label={`Apresentação por satélite de ${unit.fullName || unit.name}, sem áudio`}
        >
          <source src={video.src} type="video/mp4" />
          Seu navegador não suporta vídeo. <a href={video.src}>Abrir vídeo</a>
        </video>
        <figcaption>DO ALTO. ATÉ {unit.name.toUpperCase()}. <span>Apresentação por satélite · sem áudio</span></figcaption>
      </figure>
      {unit.heroImage.src ? (
        <figure>
          <img src={unit.heroImage.src} alt={unit.heroImage.alt} width={unit.heroImage.width} height={unit.heroImage.height} loading="lazy" />
          <figcaption>{unit.fullName || unit.name}</figcaption>
        </figure>
      ) : (
        <div className="unit-media-pending"><span className="eyebrow">FOTOGRAFIA DA UNIDADE</span><p>Imagem da fachada em validação.</p></div>
      )}
    </div>
  );
}
