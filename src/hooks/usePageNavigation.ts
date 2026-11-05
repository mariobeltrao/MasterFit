import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { units } from "../data/units";
export function usePageNavigation() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const unit = units.find((item) => pathname === `/unidades/${item.slug}`);
    const titles: Record<string, string> = {
      "/": "Seu próximo movimento",
      "/unidades": "Nossas unidades",
      "/contato": "Contato",
    };
    const title = unit?.name || titles[pathname] || "Página não encontrada";
    document.title = `${title} | MasterFit`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        unit
          ? `Conheça a MasterFit ${unit.name}: planos, horários, localização e canais oficiais de contato.`
          : `${title}. Explore a MasterFit e suas unidades Aeroclube, São José de Piranhas e Carrapateira.`,
      );
    const known = Boolean(unit || titles[pathname]);
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", known ? "index,follow" : "noindex,follow");
    if (hash) {
      let targetId = hash.slice(1);
      try { targetId = decodeURIComponent(targetId); } catch { /* Invalid fragment: keep navigation usable. */ }
      const target = document.getElementById(targetId);
      target?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      const main = document.getElementById("main-content");
      main?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
}
