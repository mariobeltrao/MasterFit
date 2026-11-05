import { TrajectoryTimeline } from "../components/home/TrajectoryTimeline";
import { useHomeReveals } from "../hooks/useHomeReveals";
import "../styles/home-sequence.css";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "../components/home/Hero";
import { InfiniteLogoMarquee } from "../components/home/InfiniteLogoMarquee";
import { UnitCard } from "../components/units/UnitCard";
import {
  Container,
  CTASection,
  SectionHeading,
} from "../components/ui";
import { units } from "../data/units";
export function Home() {
  const sequenceRef = useHomeReveals();
  return (
    <div className="home-sequence" ref={sequenceRef}>
      <Hero />
      <InfiniteLogoMarquee />
      <TrajectoryTimeline />
      <section className="section home-units" id="unidades">
        <Container>
          <SectionHeading
            eyebrow="02 / Nossas unidades"
            title="Encontre o seu lugar."
          >
            <p>
              Três endereços para começar uma nova rotina. Conheça cada unidade.
            </p>
          </SectionHeading>
          <div className="units-grid">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </Container>
      </section>
      <ReviewsSection />
      <CTASection />
      <div className="ticker" aria-hidden="true">
        MASTERFIT <ArrowUpRight /> SEU PRÓXIMO MOVIMENTO <ArrowUpRight />{" "}
        MASTERFIT
      </div>
    </div>
  );
}
