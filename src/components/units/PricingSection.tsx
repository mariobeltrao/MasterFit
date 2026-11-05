import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { aeroclubePricing, planWhatsAppUrl, type PricingPlan, type PricingCategory } from "../../data/pricing";
import { Container } from "../ui";
import "../../styles/pricing.css";

function PricingCard({ plan, category, whatsapp }: { plan: PricingPlan; category: PricingCategory; whatsapp: string }) {
  return (
    <article className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`} data-pricing-reveal>
      <div className="pricing-card-top">
        <span className="pricing-period">{category.name} / {plan.period}</span>
        {plan.featured && <span className="pricing-badge">MENOR VALOR DA CATEGORIA</span>}
      </div>
      <h3>{plan.name}<sup>{plan.note}</sup></h3>
      <p className="pricing-value" aria-label={plan.accessiblePrice}>
        <span aria-hidden="true">
          <span className="pricing-prefix">{plan.installments ? `${plan.installments}x de ` : ""}R$</span>
          <strong>{plan.amount}</strong>
          {plan.cadence && <span className="pricing-cadence">{plan.cadence}</span>}
        </span>
      </p>
      {plan.benefit && <p className="pricing-benefit"><Check size={17} aria-hidden="true" /><span>{plan.benefit}</span></p>}
      {category.id === "equilibrium" && <p className="pricing-card-access">Segunda a sexta: 10h–14h. Sábados, domingos e feriados: dentro do funcionamento da unidade.</p>}
      <a className="button button-secondary pricing-cta" href={planWhatsAppUrl(whatsapp, plan.name, category.name)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${plan.name.toLocaleLowerCase("pt-BR")} ${category.name} pelo WhatsApp`} aria-describedby={`pricing-access-${category.id}`}>
        CONSULTAR ESTE PLANO <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}

export function PricingSection({ whatsapp }: { whatsapp: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-pricing-reveal]"));
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      section.classList.remove("pricing-motion");
      items.forEach(item => item.classList.remove("pricing-visible"));
    };
    const configure = () => {
      clear();
      if (preference.matches) return;
      section.classList.add("pricing-motion");
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pricing-visible");
          observer?.unobserve(entry.target);
        }
      }), { threshold: .08 });
      items.forEach(item => observer?.observe(item));
    };
    const revealFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) event.target.closest("[data-pricing-reveal]")?.classList.add("pricing-visible");
    };
    configure();
    preference.addEventListener("change", configure);
    section.addEventListener("focusin", revealFocus);
    return () => {
      clear();
      preference.removeEventListener("change", configure);
      section.removeEventListener("focusin", revealFocus);
    };
  }, []);
  return (
    <section className="section pricing-section" id="planos" aria-labelledby="pricing-title" ref={sectionRef}>
      <Container>
        <div className="pricing-heading">
          <span className="eyebrow">{aeroclubePricing.eyebrow} / AEROCLUBE</span>
          <h2 id="pricing-title" data-pricing-reveal>{aeroclubePricing.title}</h2>
          <p data-pricing-reveal>{aeroclubePricing.subtitle}</p>
        </div>
        <div className="pricing-categories">
          {aeroclubePricing.categories.map(category => (
            <div className={`pricing-category pricing-category-${category.id}`} key={category.id}>
              <span className="eyebrow">CATEGORIA / AEROCLUBE</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <p className="pricing-starting">{category.startingPrice}</p>
              <div className="pricing-access" id={`pricing-access-${category.id}`}>
                <h4><Clock3 size={18} aria-hidden="true" />{category.id === "equilibrium" ? "ATENÇÃO AOS HORÁRIOS" : "CONDIÇÕES DE ACESSO"}</h4>
                <p>{category.access}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="pricing-comparison-label">COMPARE AS OPÇÕES POR PERÍODO</p>
        <div className="pricing-grid">
          {aeroclubePricing.categories[0].plans.flatMap((_, index) => aeroclubePricing.categories.map(category => (
            <PricingCard key={`${category.id}-${category.plans[index].id}`} plan={category.plans[index]} category={category} whatsapp={whatsapp} />
          )))}
        </div>
        <div className="pricing-disclosures">
          {aeroclubePricing.categories.map(category => (
            <div key={category.id}>
              <h3>Condições / {category.name}</h3>
              {category.disclosures.map(note => <p key={note}>{note}</p>)}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
