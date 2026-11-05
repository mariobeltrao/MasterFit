import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "../../data/site";
import { units } from "../../data/units";
import { Container } from "../ui";
import { BrandLogo } from "../ui/BrandLogo";
export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link
              className="footer-brand"
              to="/"
              aria-label="MasterFit — início"
            >
              <BrandLogo />
            </Link>
            <p>
              Seu próximo movimento
              <br />
              começa aqui.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>Nossas unidades</h2>
            {units.map((unit) => (
              <Link key={unit.id} to={`/unidades/${unit.slug}`}>
                {unit.name}
              </Link>
            ))}
          </div>
          <div>
            <h2>Vamos conversar</h2>
            <Link to="/contato">
              Canais por unidade <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <Link to="/contato">WhatsApp das unidades</Link>
            <Link to="/contato">Instagram das unidades</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}.
          </span>
          <a href="#top">Voltar ao topo ↑</a>
        </div>
      </Container>
    </footer>
  );
}
