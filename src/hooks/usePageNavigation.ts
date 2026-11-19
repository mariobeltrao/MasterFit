import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import { units } from "../data/units";
export function usePageNavigation() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const unit = units.find((item) => pathname === `/unidades/${item.slug}`);
    const titles: Record<string, string> = {
      "/": "Seu próximo movimento",
      "/unidades": "Nossas unidades",
      "/planos": "Planos",
      "/contato": "Contato",
    };
    const title = unit?.name || titles[pathname] || "Página não encontrada";
    const descriptions: Record<string, string> = {
      "/planos":
        "Planos e mensalidades das unidades MasterFit Aeroclube, São José de Piranhas e Carrapateira reunidos em um só lugar.",
    };
    const description = unit
      ? `Conheça a MasterFit ${unit.name}: planos, horários, localização e canais oficiais de contato.`
      : descriptions[pathname] || `${title}. Explore a MasterFit e suas unidades Aeroclube, São José de Piranhas e Carrapateira.`;
    document.title = `${title} | MasterFit`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    const known = Boolean(unit || titles[pathname]);
    // Canonical and share URLs always point to the official domain (never www or pages.dev).
    const url = `${site.url}${pathname === "/" ? "/" : pathname}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (known) canonical?.setAttribute("href", url);
    else canonical?.remove();
    if (known && !canonical) {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", url);
      document.head.appendChild(link);
    }
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", `${title} | MasterFit`);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
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
