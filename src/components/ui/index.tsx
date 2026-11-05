import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImagePlus, Plus } from "lucide-react";
import type { FAQ, Media } from "../../data/units";
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Button({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "button-secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children && <div className="heading-aside">{children}</div>}
    </div>
  );
}
export function MediaPlaceholder({
  media,
  className = "",
  number,
}: {
  media: Media;
  className?: string;
  number?: string;
}) {
  return media.src ? (
    <img
      className={`media ${className}`}
      src={media.src}
      alt={media.alt}
      loading="lazy"
    />
  ) : (
    <div
      className={`media media-placeholder ${className}`}
      role="img"
      aria-label={media.alt}
    >
      <div className="media-grid" aria-hidden="true" />
      {number && (
        <span className="media-number" aria-hidden="true">
          {number}
        </span>
      )}
      <span className="media-caption">
        <ImagePlus size={17} aria-hidden="true" />
        {media.alt}
      </span>
    </div>
  );
}
export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.question}>
          <summary>
            <span className="faq-index">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <Plus size={21} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function CTASection({
  title = "Encontre o seu ponto de partida.",
  text = "Conheça as três unidades e escolha por onde começar.",
  to = "/unidades",
  label = "Explorar unidades",
}: {
  title?: string;
  text?: string;
  to?: string;
  label?: string;
}) {
  return (
    <section className="cta-section">
      <Container>
        <div>
          <span className="eyebrow">O próximo passo é seu</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Button to={to} secondary>
          {label}
        </Button>
      </Container>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <Container>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    </section>
  );
}
export function Pending({
  children = "Informação a fornecer",
}: {
  children?: ReactNode;
}) {
  return <span className="pending">{children}</span>;
}
