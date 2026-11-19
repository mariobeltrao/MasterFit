import { useEffect, useRef, type ElementType } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Unit } from "../../data/units";
import { monthlyPricingByUnit, monthlyPlanWhatsAppUrl } from "../../data/monthlyPricing";
import { Container } from "../ui";
import "../../styles/pricing.css";
import "../../styles/monthly-pricing.css";

/** Isolated enhancement so the existing Aeroclube pricing remains unchanged. */
interface MonthlyPricingSectionProps {
  unit: Unit;
  /** id of the <section>; null omits it. Default "planos" keeps the unit page anchor. */
  sectionId?: string | null;
  /** Prefix for internal ids, so several units can share one page. */
  idPrefix?: string;
  /** Level of the section title (default 2); card titles use the next level. */
  headingLevel?: number;
}

export function MonthlyPricingSection({ unit, sectionId = "planos", idPrefix = "", headingLevel = 2 }: MonthlyPricingSectionProps) {
  const Title = `h${Math.min(headingLevel, 6)}` as ElementType;
  const CardTitle = `h${Math.min(headingLevel + 1, 6)}` as ElementType;
  const titleId = `${idPrefix}monthly-pricing-title`;
  const sectionRef = useRef<HTMLElement>(null);
  const pricing = monthlyPricingByUnit[unit.slug];
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-monthly-reveal]"));
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      section.classList.remove("monthly-motion");
      items.forEach(item => item.classList.remove("monthly-visible"));
    };
    const configure = () => {
      clear();
      if (preference.matches) return;
      section.classList.add("monthly-motion");
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("monthly-visible");
          observer?.unobserve(entry.target);
        }
      }), { threshold: .08 });
      items.forEach(item => observer?.observe(item));
    };
    const revealFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) event.target.closest("[data-monthly-reveal]")?.classList.add("monthly-visible");
    };
    configure();
    preference.addEventListener("change", configure);
    section.addEventListener("focusin", revealFocus);
    return () => {
      clear();
      preference.removeEventListener("change", configure);
      section.removeEventListener("focusin", revealFocus);
    };
  }, [unit.slug]);
  const whatsapp = unit.whatsapp;
  if (!pricing || !whatsapp) return null;
  return (
    <section className="section pricing-section monthly-pricing" id={sectionId ?? undefined} aria-labelledby={titleId} ref={sectionRef}>
      <Container>
        <div className="pricing-heading">
          <span className="eyebrow">PLANOS E MENSALIDADES / {unit.name}</span>
          <Title id={titleId} data-monthly-reveal>{pricing.title}</Title>
          <p data-monthly-reveal>{pricing.subtitle}</p>
        </div>
        <div className={`monthly-pricing-grid ${pricing.plans.length === 1 ? "monthly-pricing-single" : ""}`}>
          {pricing.plans.map(plan => (
            <article className={`pricing-card monthly-pricing-card ${plan.featured ? "monthly-pricing-featured" : ""}`} key={plan.id} data-monthly-reveal>
              <span className="pricing-period">{unit.name} / Mensal</span>
              <CardTitle>{plan.name}</CardTitle>
              <p className="pricing-value" aria-label={`R$ ${plan.amount} por mês`}>
                <span aria-hidden="true"><span className="pricing-prefix">R$</span><strong>{plan.amount}</strong><span className="pricing-cadence">/mês</span></span>
              </p>
              <p className="monthly-pricing-description">{plan.description}</p>
              {plan.access && (
                <div className={`monthly-pricing-access ${plan.restricted ? "monthly-pricing-restricted" : ""}`} id={`${idPrefix}monthly-access-${plan.id}`}>
                  <p><Clock3 size={18} aria-hidden="true" /><strong>{plan.access}</strong></p>
                  {plan.accessDetail && <p>{plan.accessDetail}</p>}
                </div>
              )}
              <a className="button button-secondary pricing-cta" href={monthlyPlanWhatsAppUrl(whatsapp, plan.message)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar plano ${plan.name} da MasterFit ${unit.name} pelo WhatsApp`} aria-describedby={plan.access ? `${idPrefix}monthly-access-${plan.id}` : undefined}>
                CONSULTAR PLANO <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
