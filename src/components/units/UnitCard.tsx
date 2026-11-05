import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Unit } from "../../data/units";
import { MediaPlaceholder } from "../ui";
export function UnitCard({ unit }: { unit: Unit }) {
  return (
    <article className="unit-card">
      <Link
        to={`/unidades/${unit.slug}`}
        className="unit-image-link"
        aria-label={`Conhecer unidade ${unit.name}`}
      >
        <MediaPlaceholder media={unit.heroImage} number={unit.id} />
        <span className="unit-arrow">
          <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>
      <div className="unit-card-heading">
        <span className="eyebrow">Unidade {unit.id}</span>
        <h3>
          <Link to={`/unidades/${unit.slug}`}>{unit.name}</Link>
        </h3>
      </div>
      <p>{unit.description}</p>
      <Link className="text-link" to={`/unidades/${unit.slug}`}>
        Conhecer unidade
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </article>
  );
}
