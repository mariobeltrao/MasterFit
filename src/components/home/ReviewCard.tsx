import { Quote, Star } from "lucide-react";
import type { Review } from "../../data/reviews";

export function ReviewCard({ review, unitLabel }: { review: Review; unitLabel: string }) {
  return (
    <>
      <div className="review-card-top">
        <span className="review-stars" role="img" aria-label={`${review.rating} de 5 estrelas`}>
          {Array.from({ length: review.rating }, (_, i) => <Star key={i} size={17} fill="currentColor" aria-hidden="true" />)}
        </span>
        <Quote size={27} strokeWidth={1} aria-hidden="true" />
      </div>
      <blockquote><p>{review.comment}</p></blockquote>
      <div className="review-author"><strong>{review.name}</strong><span>{unitLabel}</span></div>
    </>
  );
}
