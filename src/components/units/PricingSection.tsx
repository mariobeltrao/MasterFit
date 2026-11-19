import { useEffect, useRef, type ElementType } from "react";
import { ArrowUpRight, Check, Clock3, CreditCard } from "lucide-react";
import { aeroclubePricing, annualVsRecurring, planWhatsAppUrl, type PricingPlan, type PricingCategory } from "../../data/pricing";
import { Container } from "../ui";
import "../../styles/pricing.css";

/** Heading tag for a level relative to the section title (base). Capped at h6. */
const headingTag = (level: number) => `h${Math.min(level, 6)}` as ElementType;

interface PricingSectionProps {
  whatsapp: string;
  /** id of the <section>; null omits it. Default "planos" keeps the unit page anchor. */
  sectionId?: string | null;
  /** Prefix for internal ids, so the section can be rendered more than once per page. */
  idPrefix?: string;
  /** Level of the section title (default 2); inner headings follow it without skipping levels. */
  headingLevel?: number;
}

function PricingCard({ plan, category, whatsapp, idPrefix, headingLevel }: { plan: PricingPlan; category: PricingCategory; whatsapp: string; idPrefix: string; headingLevel: number }) {
  const CardTitle = headingTag(headingLevel + 1);
  return (
    <article className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`} data-pricing-reveal>
      <div className="pricing-card-top">
        <span className="pricing-period">{category.name} / {plan.period}</span>
        {plan.featured && <span className="pricing-badge">MENOR VALOR DA CATEGORIA</span>}
      </div>
      <CardTitle>{plan.name}<sup>{plan.note}</sup></CardTitle>
      <p className="pricing-value" aria-label={plan.accessiblePrice}>
        <span aria-hidden="true">
          <span className="pricing-prefix">{plan.installments ? `${plan.installments}x de ` : ""}R$</span>
          <strong>{plan.amount}</strong>
          {plan.cadence && <span className="pricing-cadence">{plan.cadence}</span>}
        </span>
      </p>
      {plan.benefit && <p className="pricing-benefit"><Check size={17} aria-hidden="true" /><span>{plan.benefit}</span></p>}
      {category.id === "equilibrium" && <p className="pricing-card-access">Segunda a sexta: 10h–14h. Sábados, domingos e feriados: dentro do funcionamento da unidade.</p>}
      <div className="pricing-payment">
        <p className="pricing-payment-label"><CreditCard size={15} aria-hidden="true" />FORMAS DE PAGAMENTO</p>
        <ul>{plan.payment.map(method => <li key={method}>{method}</li>)}</ul>
      </div>
      <a className="button button-secondary pricing-cta" href={planWhatsAppUrl(whatsapp, plan.name, category.name)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${plan.name.toLocaleLowerCase("pt-BR")} ${category.name} pelo WhatsApp`} aria-describedby={`${idPrefix}pricing-access-${category.id}`}>
        CONSULTAR ESTE PLANO <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}

export function PricingSection({ whatsapp, sectionId = "planos", idPrefix = "", headingLevel = 2 }: PricingSectionProps) {
  const Title = headingTag(headingLevel);
  const Sub = headingTag(headingLevel + 1);
  const Detail = headingTag(headingLevel + 2);
  const titleId = `${idPrefix}pricing-title`;
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
    <section className="section pricing-section" id={sectionId ?? undefined} aria-labelledby={titleId} ref={sectionRef}>
      <Container>
        <div className="pricing-heading">
          <span className="eyebrow">{aeroclubePricing.eyebrow} / JOÃO PESSOA – AEROCLUBE</span>
          <Title id={titleId} data-pricing-reveal>{aeroclubePricing.title}</Title>
          <p data-pricing-reveal>{aeroclubePricing.subtitle}</p>
        </div>
        <div className="pricing-categories">
          {aeroclubePricing.categories.map(category => (
            <div className={`pricing-category pricing-category-${category.id}`} key={category.id}>
              <span className="eyebrow">CATEGORIA / JOÃO PESSOA – AEROCLUBE</span>
              <Sub>{category.name}</Sub>
              <p>{category.description}</p>
              <p className="pricing-starting">{category.startingPrice}</p>
              <div className="pricing-access" id={`${idPrefix}pricing-access-${category.id}`}>
                <Detail><Clock3 size={18} aria-hidden="true" />{category.id === "equilibrium" ? "ATENÇÃO AOS HORÁRIOS" : "CONDIÇÕES DE ACESSO"}</Detail>
                <p>{category.access}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pricing-annual-compare" data-pricing-reveal>
          <Sub>{annualVsRecurring.title}</Sub>
          <dl>
            {annualVsRecurring.options.map(option => (
              <div key={option.name}>
                <dt>{option.name}</dt>
                <dd>{option.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="pricing-comparison-label">COMPARE AS OPÇÕES POR PERÍODO</p>
        <div className="pricing-grid">
          {aeroclubePricing.categories[0].plans.flatMap((_, index) => aeroclubePricing.categories.map(category => (
            <PricingCard key={`${category.id}-${category.plans[index].id}`} plan={category.plans[index]} category={category} whatsapp={whatsapp} idPrefix={idPrefix} headingLevel={headingLevel} />
          )))}
        </div>
        <div className="pricing-disclosures">
          {aeroclubePricing.categories.map(category => (
            <div key={category.id}>
              <Sub>Condições / {category.name}</Sub>
              {category.disclosures.map(note => <p key={note}>{note}</p>)}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
