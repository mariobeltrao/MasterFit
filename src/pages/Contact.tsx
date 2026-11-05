import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Clock3 } from "lucide-react";
import { Container, CTASection, PageHero, Pending } from "../components/ui";
import { UnitContact } from "../components/units/UnitPageTemplate";
import { units } from "../data/units";
export function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos dar o próximo passo?"
        description="Escolha a unidade com a qual você deseja conversar e entre em contato pelo WhatsApp ou Instagram."
      />
      <section className="section">
        <Container>
          <div className="contact-grid">
            {units.map((unit) => (
              <article className="contact-card" key={unit.id}>
                <span className="eyebrow">Unidade {unit.id}</span>
                <h2>{unit.name}</h2>
                <UnitContact unit={unit} />
                <div className="contact-details">
                  <p>
                    <MapPin size={18} aria-hidden="true" />
                    {unit.address || <Pending>Endereço a fornecer</Pending>}
                  </p>
                  <p>
                    <Clock3 size={18} aria-hidden="true" />
                    {unit.hours || <Pending>Horários a fornecer</Pending>}
                  </p>
                </div>
                {unit.mapUrl && (
                  <a
                    className="text-link"
                    href={unit.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver localização
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                )}
                <Link className="text-link" to={`/unidades/${unit.slug}`}>
                  Conhecer unidade
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Comece conhecendo o seu espaço."
        text="Explore as páginas das unidades ou fale com a equipe pelos canais acima."
      />
    </>
  );
}
