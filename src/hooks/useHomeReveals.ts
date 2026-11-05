import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays visible without observers or with reduced motion. */
export function useHomeReveals() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selectors = [
      ".trajectory-heading",
      ".home-units h2", ".reviews-copy",
      ".cta-section h2",
      ".units-grid > *",
    ];
    const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors.join(",")));
    elements.push(...document.querySelectorAll<HTMLElement>(".footer-grid > *"));
    let observer: IntersectionObserver | null = null;
    const clear = () => {
      observer?.disconnect();
      elements.forEach((element) => {
        element.classList.remove("masterfit-reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
    const configure = () => {
      clear();
      if (media.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      elements.forEach((element) => {
        const parent = element.parentElement;
        if (parent?.matches(".units-grid, .footer-grid")) {
          element.style.setProperty("--reveal-delay", `${Array.from(parent.children).indexOf(element) % 4 * 70}ms`);
        }
        element.classList.add("masterfit-reveal");
        if (element.getBoundingClientRect().top < innerHeight * .95) element.classList.add("is-revealed");
        else observer?.observe(element);
      });
    };
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      elements.forEach((element) => {
        if (element.contains(event.target as Element)) {
          element.classList.add("is-revealed");
          observer?.unobserve(element);
        }
      });
    };
    configure();
    media.addEventListener("change", configure);
    document.addEventListener("focusin", revealFocused);
    return () => {
      clear();
      media.removeEventListener("change", configure);
      document.removeEventListener("focusin", revealFocused);
    };
  }, []);
  return rootRef;
}
