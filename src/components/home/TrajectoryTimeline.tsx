import { useEffect, useRef } from "react";
import { trajectory } from "../../data/trajectory";
import { Container } from "../ui";

export function TrajectoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>(".timeline-step"));
    const markers = Array.from(list.querySelectorAll<HTMLElement>(".timeline-marker"));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      const bounds = list.getBoundingClientRect();
      const positions = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      if (positions.length < 2) return;
      const stepTops = steps.map((step) => step.getBoundingClientRect().top);
      const first = positions[0];
      const length = positions[positions.length - 1] - first;
      const readingLine = window.innerHeight * 0.58;
      const progress = media.matches ? 1 : Math.max(0, Math.min(1, (readingLine - first) / Math.max(1, length)));
      list.style.setProperty("--timeline-rail-start", `${first - bounds.top}px`);
      list.style.setProperty("--timeline-rail-length", `${length}px`);
      list.style.setProperty("--timeline-progress", String(progress));
      steps.forEach((step, index) => {
        step.classList.toggle("is-visible", media.matches || stepTops[index] < window.innerHeight * 0.88);
        step.classList.toggle("is-active", media.matches || positions[index] <= readingLine);
      });
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    list.classList.add("timeline-enhanced");
    const resize = new ResizeObserver(schedule);
    resize.observe(list);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    measure();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <section className="section trajectory-section" id="trajetoria" aria-labelledby="trajectory-title">
      <Container>
        <div className="trajectory-heading">
          <span className="eyebrow">01 / Nossa trajetória</span>
          <h2 id="trajectory-title">UMA HISTÓRIA DE <span>EVOLUÇÃO.</span></h2>
          <p>A MasterFit nasceu no Sertão paraibano e levou seu espaço de treinamento a outras cidades. A trajetória começou em São José de Piranhas, passou por Carrapateira e chegou a João Pessoa.</p>
          <p>Em cada etapa, a proposta continuou ligada ao treino e à evolução de quem faz parte da academia. Conheça abaixo os marcos dessa caminhada.</p>
        </div>
        <ol className="trajectory-list" ref={listRef}>
          {trajectory.map((milestone) => (
            <li className="timeline-step" key={milestone.year}>
              <span className="timeline-marker" aria-hidden="true" />
              <article className="timeline-card">
                <time dateTime={milestone.year}>{milestone.year}</time>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
