import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import type { Unit } from "../../data/units";
import { MonthlyPricingSection } from "./MonthlyPricingSection";
import { PricingSection } from "./PricingSection";
import { UnitPresentationMedia } from "./UnitPresentationMedia";
import { UnitInfo } from "./UnitInfo";
import { UnitGallery } from "./UnitGallery";
import { UnitLocationMap } from "./UnitLocationMap";
import "../../styles/unit-details.css";
import {
  Button,
  Container,
  CTASection,
  FAQAccordion,
  MediaPlaceholder,
  Pending,
  SectionHeading,
} from "../ui";
export function UnitContact({ unit }: { unit: Unit }) {
  return (
    <div className="contact-links">
      {unit.whatsapp ? (
        <a
          className="text-link"
          href={unit.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp{" "}
          {unit.phone && (
            <span className="contact-phone">{unit.phone}</span>
          )}{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ) : (
        <span>
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp <Pending>A fornecer</Pending>
        </span>
      )}
      {unit.instagram ? (
        <a
          className="text-link"
          href={unit.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={18} aria-hidden="true" />
          {unit.instagramLabel || "Instagram"} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ) : (
        <span>
          <Instagram size={18} aria-hidden="true" />
          Instagram <Pending>A fornecer</Pending>
        </span>
      )}
    </div>
  );
}
export function UnitPageTemplate({ unit }: { unit: Unit }) {
  return (
    <>
      {unit.presentation ? (
        <section className={`section unit-overview unit-overview-${unit.slug}`}>
          <Container className="unit-overview-grid">
            <div className="unit-overview-copy">
              <span className="eyebrow">
                {unit.fullName || unit.name} / Unidade {unit.id}
              </span>
              <h1>{unit.presentation.title}</h1>
              <p className="unit-overview-subtitle">
                {unit.presentation.subtitle}
              </p>
              <p className="unit-overview-description">{unit.description}</p>
              <UnitInfo unit={unit} />
              <UnitLocationMap unit={unit} />
            </div>
            <div className="unit-overview-gallery">
              {unit.presentationVideo ? <UnitPresentationMedia unit={unit} /> : (
                <UnitGallery
                  images={unit.gallery}
                  unitName={unit.fullName || unit.name}
                />
              )}
            </div>
          </Container>
        </section>
      ) : (
        <>
          <section className="page-hero unit-hero">
            <Container className="split">
              <div>
                <span className="eyebrow">MasterFit / Unidade {unit.id}</span>
                <h1>{unit.name}</h1>
                <p>{unit.description}</p>
                <Button to="#contato-unidade">Ver contato da unidade</Button>
              </div>
              <MediaPlaceholder media={unit.heroImage} number={unit.id} />
            </Container>
          </section>
          <section className="section">
            <Container>
              <SectionHeading
                eyebrow="01 / A unidade"
                title="Conheça o seu espaço."
              >
                <p>{unit.description}</p>
              </SectionHeading>
              <div className="info-grid">
                <article>
                  <MapPin aria-hidden="true" />
                  <h3>Endereço</h3>
                  {unit.address ? (
                    <p>{unit.address}</p>
                  ) : (
                    <Pending>Endereço oficial a fornecer</Pending>
                  )}
                </article>
                <article>
                  <Clock3 aria-hidden="true" />
                  <h3>Funcionamento</h3>
                  {unit.hours ? (
                    <p>{unit.hours}</p>
                  ) : (
                    <Pending>Horários oficiais a fornecer</Pending>
                  )}
                </article>
              </div>
            </Container>
          </section>
        </>
      )}
      {!unit.presentation && (
        <>
          <section className="section">
            <Container>
              <SectionHeading
                eyebrow="02 / Galeria"
                title="Um olhar sobre a unidade."
              />
              <div className="gallery-grid">
                {unit.gallery.length ? (
                  unit.gallery.map((media, index) => (
                    <MediaPlaceholder
                      media={media}
                      key={`${media.alt}-${index}`}
                      number={`0${index + 1}`}
                    />
                  ))
                ) : (
                  <MediaPlaceholder
                    media={{ alt: "Galeria da unidade — fotos a fornecer" }}
                  />
                )}
              </div>
            </Container>
          </section>
          <section className="section soft-section">
            <Container className="split">
              <div>
                <span className="eyebrow">03 / Localização</span>
                <h2>
                  Encontre a<br />
                  {unit.name}.
                </h2>
                {unit.address ? (
                  <p>{unit.address}</p>
                ) : (
                  <p>
                    O endereço e a localização oficial serão incluídos após
                    confirmação.
                  </p>
                )}
                {unit.mapUrl && (
                  <a
                    href={unit.mapUrl}
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir localização
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className="map-placeholder">
                <MapPin size={36} strokeWidth={1.4} aria-hidden="true" />
                <h3>{unit.mapUrl ? unit.name : "Localização a fornecer"}</h3>
                <p>
                  {unit.mapUrl
                    ? "Consulte a localização oficial no link ao lado."
                    : "Área reservada para integração com Google Maps."}
                </p>
              </div>
            </Container>
          </section>
        </>
      )}
      {unit.slug === "aeroclube" && unit.whatsapp && <PricingSection whatsapp={unit.whatsapp} />}
      {(unit.slug === "sao-jose-de-piranhas" || unit.slug === "carrapateira") && <MonthlyPricingSection unit={unit} />}
      {unit.faqs.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading
              eyebrow="Dúvidas da unidade"
              title="Perguntas frequentes"
            />
            <FAQAccordion items={unit.faqs} />
          </Container>
        </section>
      )}
      <section className="section" id="contato-unidade">
        <Container className="split">
          <div>
            <span className="eyebrow">
              {unit.presentation ? "03 / Contato" : "04 / Contato"}
            </span>
            <h2>Vamos começar?</h2>
            <p>
              {unit.whatsapp
                ? `Fale com ${unit.fullName || unit.name} pelo WhatsApp oficial.`
                : `Fale com a unidade ${unit.name} pelos canais oficiais quando estiverem disponíveis.`}
            </p>
          </div>
          <div className="contact-panel">
            <h3>Canais da unidade</h3>
            <UnitContact unit={unit} />
          </div>
        </Container>
      </section>
      <CTASection
        title="Explore os outros caminhos."
        text="Conheça também as demais unidades da rede."
      />
    </>
  );
}
