import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Media } from "../../data/units";

export function UnitGallery({
  images,
  unitName,
}: {
  images: Media[];
  unitName: string;
}) {
  const photos = images.filter((image) => image.src);
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const photo = photos[selected] || photos[0];
  function move(delta: number) {
    setSelected((index) => (index + delta + photos.length) % photos.length);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [expanded]);

  if (!photo) return null;
  return (
    <div
      className="unit-gallery"
      role="group"
      aria-label={`Fotografias de ${unitName}`}
    >
      <div className="unit-gallery-frame">
        <button
          className="unit-gallery-main"
          type="button"
          aria-label={`Ampliar fotografia: ${photo.alt}`}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") {
              gesture.current = { x: event.clientX, y: event.clientY };
              swiped.current = false;
            }
          }}
          onPointerUp={(event) => {
            if (!gesture.current) return;
            const dx = event.clientX - gesture.current.x;
            const dy = event.clientY - gesture.current.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              move(dx < 0 ? 1 : -1);
              swiped.current = true;
            }
            gesture.current = null;
          }}
          onPointerCancel={() => {
            gesture.current = null;
          }}
          onClick={() => {
            if (swiped.current) swiped.current = false;
            else setExpanded(true);
          }}
        >
          <img
            key={photo.src}
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(min-width: 1000px) 45vw, 100vw"
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            decoding="async"
            fetchPriority="high"
          />
          <span className="unit-gallery-expand">
            <Expand size={17} aria-hidden="true" /> Ampliar
          </span>
        </button>
        <div className="unit-gallery-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Fotografia anterior"
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Próxima fotografia"
          >
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="unit-gallery-thumbnails">
        {photos.map((image, index) => (
          <button
            type="button"
            key={image.src}
            aria-label={`Ver fotografia ${index + 1}: ${image.alt}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <img
              src={image.thumbnail || image.src}
              width={image.width}
              height={image.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      <p className="unit-gallery-caption">{photo.alt}</p>
      <dialog
        ref={dialogRef}
        className="unit-lightbox"
        aria-label={`Galeria ampliada de ${unitName}`}
        onCancel={() => setExpanded(false)}
        onClose={() => setExpanded(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="unit-lightbox-header">
          <span>{unitName} / Galeria</span>
          <button
            type="button"
            className="unit-lightbox-close"
            aria-label="Fechar galeria ampliada"
            onClick={() => setExpanded(false)}
            autoFocus
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <div className="unit-lightbox-photo">
          {expanded && (
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
            />
          )}
          <button
            type="button"
            className="lightbox-prev"
            onClick={() => move(-1)}
            aria-label="Fotografia anterior ampliada"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lightbox-next"
            onClick={() => move(1)}
            aria-label="Próxima fotografia ampliada"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <p>
          {selected + 1} / {photos.length} — {photo.alt}
        </p>
      </dialog>
    </div>
  );
}
