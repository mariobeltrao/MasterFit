import { useId, useState, type CSSProperties } from "react";
import { Layers3, Star } from "lucide-react";
import type { Review } from "../../data/reviews";
import { ReviewCard } from "./ReviewCard";
import "../../styles/reviews.css";

/** Retains the existing section API and keeps every complete story below the fan. */
export function ReviewStack3D({
  reviews,
  unitLabel,
}: {
  reviews: Review[];
  unitLabel: string;
}) {
  const cardsId = useId();
  const storiesId = useId();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(0);
  const expanded = pinned || hovered;
  const activeIndex = selected < reviews.length ? selected : 0;

  function toggleDeck() {
    setPinned(!pinned);
    setHovered(false);
  }
  if (!reviews.length) return null;
  return (
    <div className={`review-stack review-fan ${expanded ? "is-open" : ""}`}>
      <div className="review-fan-toolbar">
        <span>{String(reviews.length).padStart(2, "0")} HISTÓRIAS REAIS / AEROCLUBE</span>
        <button
          className="review-fan-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={cardsId}
          onClick={toggleDeck}
        >
          <Layers3 size={17} aria-hidden="true" />
          {pinned ? "Recolher baralho" : expanded ? "Manter leque aberto" : "Explorar avaliações"}
        </button>
      </div>
      <div
        className="review-fan-scene"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          id={cardsId}
          className="review-fan-cards"
          role="group"
          aria-label={`Escolha uma avaliação de ${unitLabel}`}
        >
          {reviews.map((item, index) => (
            <button
              key={item.id}
              className={`review-fan-card ${activeIndex === index ? "is-selected" : ""}`}
              type="button"
              style={{
                "--card-offset": index - (reviews.length - 1) / 2,
                "--deck-offset": index,
              } as CSSProperties}
              aria-label={`Mostrar história de ${item.name}, ${item.rating} de 5 estrelas`}
              aria-pressed={activeIndex === index}
              aria-controls={`${storiesId}-${item.id}`}
              aria-hidden={!expanded && index !== 0 ? true : undefined}
              inert={!expanded && index !== 0}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setSelected(index);
              }}
              onFocus={() => {
                setPinned(true);
                setSelected(index);
              }}
              onClick={() => {
                setPinned(true);
                setSelected(index);
              }}
            >
              <span className="review-fan-card-face">
                <span className="review-fan-number">{String(index + 1).padStart(2, "0")} <span>/ MASTERFIT</span></span>
                <span className="review-fan-symbol" aria-hidden="true">“</span>
                <span className="review-stars" aria-hidden="true">
                  {Array.from({ length: item.rating }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </span>
                <strong>{item.name}</strong>
                <span className="review-fan-unit">{unitLabel}</span>
                <span className="review-fan-read">História abaixo</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="review-interaction-hint">
        Explore as cartas com o mouse, o teclado ou um toque. Leia a história abaixo.
      </p>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        História de {reviews[activeIndex].name} selecionada.
      </span>
      <div className="review-stories" role="region" aria-label={`História selecionada — ${unitLabel}`}>
        {reviews.map((item, index) => (
          <article
            key={item.id}
            id={`${storiesId}-${item.id}`}
            className={`review-card review-story ${activeIndex === index ? "is-active" : ""}`}
            aria-label={`História de ${item.name}`}
            aria-hidden={activeIndex !== index}
            inert={activeIndex !== index}
          >
            <ReviewCard review={item} unitLabel={unitLabel} />
          </article>
        ))}
      </div>
    </div>
  );
}
