import { Clock3, MapPin, Phone, ArrowUpRight, Instagram } from "lucide-react";
import type { Unit } from "../../data/units";

export function UnitInfo({ unit }: { unit: Unit }) {
  return (
    <div className="unit-info">
      {unit.address && (
        <div className="unit-info-row">
          <MapPin size={21} aria-hidden="true" />
          <div>
            <h2>Endereço</h2>
            <address>{unit.address}</address>
          </div>
        </div>
      )}
      {unit.phone && (
        <div className="unit-info-row">
          <Phone size={21} aria-hidden="true" />
          <div>
            <h2>Telefone e WhatsApp</h2>
            <a
              className="unit-phone-link"
              href={`tel:${unit.phone.replace(/[^+\d]/g, "")}`}
            >
              {unit.phone}
            </a>
          </div>
        </div>
      )}
      {unit.schedule?.length ? (
        <div className="unit-info-row">
          <Clock3 size={21} aria-hidden="true" />
          <table className="unit-hours">
            <caption>Horários de funcionamento</caption>
            <tbody>
              {unit.schedule.map(({ day, opens, closes, closed }) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>
                    {closed ? "Fechado" : (
                      <><time dateTime={opens}>{opens}</time>–<time dateTime={closes}>{closes}</time></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {unit.hoursNote && <tfoot><tr><td colSpan={2}>{unit.hoursNote}</td></tr></tfoot>}
          </table>
        </div>
      ) : (
        unit.hours && (
          <div className="unit-info-row">
            <Clock3 size={21} aria-hidden="true" />
            <div>
              <h2>Horários de funcionamento</h2>
              <p>{unit.hours}</p>
            </div>
          </div>
        )
      )}
      {unit.instagram && (
        <div className="unit-info-row">
          <Instagram size={21} aria-hidden="true" />
          <div>
            <h2>Instagram</h2>
            <a className="text-link unit-instagram-link" href={unit.instagram} target="_blank" rel="noopener noreferrer">
              {unit.instagramLabel || "Ver Instagram"} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
      {unit.whatsapp && (
        <a
          className="button unit-whatsapp"
          href={unit.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar no WhatsApp com ${unit.fullName || unit.name} (abre em nova aba)`}
        >
          FALAR NO WHATSAPP <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {unit.instagram && (
        <a
          className="button button-secondary unit-instagram-cta"
          href={unit.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver Instagram de ${unit.fullName || unit.name} (abre em nova aba)`}
        >
          VER INSTAGRAM <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
