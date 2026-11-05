import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui";
import { aeroclubeReviews } from "../../data/reviews";
import { ReviewStack3D } from "./ReviewStack3D";

export function ReviewsSection() {
  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <Container className="reviews-layout">
        <div className="reviews-copy">
          <span className="eyebrow">03 / A EXPERIÊNCIA DE QUEM TREINA</span>
          <h2 id="reviews-title">HISTÓRIAS QUE <span>INSPIRAM.</span></h2>
          <p>Mais do que equipamentos e estrutura, a experiência de quem treina é o que faz a diferença.</p>
          <span className="reviews-attribution">AVALIAÇÕES DE ALUNOS — MASTERFIT AEROCLUBE</span>
          <a className="text-link" href="https://maps.app.goo.gl/Cc3MJR5ZSSpdy6sC8" target="_blank" rel="noopener noreferrer">VER AVALIAÇÕES NO GOOGLE <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <ReviewStack3D reviews={aeroclubeReviews} unitLabel="Masterfit Aeroclube" />
      </Container>
    </section>
  );
}
