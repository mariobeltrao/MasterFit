import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "../../data/site";
import { Container } from "../ui";
import { BrandLogo } from "../ui/BrandLogo";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <Container>
        <Link
          to="/"
          className="brand"
          aria-label={`${site.name} — início`}
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          key={pathname}
          id="main-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navegação principal"
        >
          {navigation.map((link) => link.to.includes("#") ? (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ) : (
            <NavLink
              end={link.to === "/"}
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            className="nav-cta"
            to="/unidades"
            onClick={() => setOpen(false)}
          >
            Conheça as unidades
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </nav>
      </Container>
    </header>
  );
}
