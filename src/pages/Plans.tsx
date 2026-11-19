import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, CTASection, PageHero } from "../components/ui";
import { MonthlyPricingSection } from "../components/units/MonthlyPricingSection";
import { PricingSection } from "../components/units/PricingSection";
import { units, type Unit } from "../data/units";
import "../styles/plans.css";

/** Prices are never copied here: each block reads pricing.ts / monthlyPricing.ts through the unit components. */
function UnitPricing({ unit }: { unit: Unit }) {
  const shared = { sectionId: null, idPrefix: `${unit.slug}-`, headingLevel: 3 };
  if (unit.slug === "aeroclube") {
    return unit.whatsapp ? <PricingSection whatsapp={unit.whatsapp} {...shared} /> : null;
  }
  return <MonthlyPricingSection unit={unit} {...shared} />;
}

export function Plans() {
  return (
    <>
      <PageHero
        eyebrow="Planos MasterFit"
        title="Todos os planos. Um só lugar."
        description="Compare as opções das três unidades e fale direto com a unidade escolhida pelo WhatsApp."
      />
      <nav className="plans-anchors" aria-label="Planos por unidade">
        <Container>
          <ul>
            {units.map((unit) => (
              <li key={unit.slug}>
                <a href={`#planos-${unit.slug}`}>{unit.name}</a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
      {units.map((unit) => (
        <section
          className="plans-unit"
          id={`planos-${unit.slug}`}
          aria-labelledby={`planos-${unit.slug}-title`}
          key={unit.slug}
        >
          <Container className="plans-unit-header">
            <div>
              <span className="eyebrow">Unidade {unit.id}</span>
              <h2 id={`planos-${unit.slug}-title`}>{unit.name}</h2>
            </div>
            <Link className="text-link" to={`/unidades/${unit.slug}`}>
              Ver unidade
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Container>
          <UnitPricing unit={unit} />
        </section>
      ))}
      <CTASection
        title="Escolha por onde começar."
        text="Conheça a estrutura, os horários e a localização de cada unidade."
      />
    </>
  );
}
