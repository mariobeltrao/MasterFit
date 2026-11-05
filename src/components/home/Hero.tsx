import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { heroDestinations } from "../../data/hero";
import { site } from "../../data/site";
import { Button, Container } from "../ui";
import { HeroVideoExperience } from "./HeroVideoExperience";
import { MagneticParticleBackground } from "./MagneticParticleBackground";
import "../../styles/hero.css";

type Phase = "selection" | "entering" | "cinema" | "returning";
const TRANSITION_MS = 650;
const HOVER_DELAY_MS = 150;
const LEAVE_DELAY_MS = 220;
type Input = "hover" | "mouse" | "keyboard" | "touch";

export function Hero() {
  const [selected, setSelected] = useState(0);
  const [cinemaIndex, setCinemaIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("selection");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusPreview, setFocusPreview] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const pointerInside = useRef(false);
  const hoverSuppressed = useRef(false);
  const input = useRef<Input>("hover");
  const pointerType = useRef("mouse");
  const phaseRef = useRef<Phase>("selection");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const triggers = useRef(new Map<number, HTMLElement>());
  const restoreFocus = useRef(false);
  const destination = heroDestinations[selected];
  const movie = heroDestinations[cinemaIndex];
  const active = phase !== "selection";

  const changePhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  function selectRoute(index: number, source: Input) {
    if (phaseRef.current !== "selection") return;
    clearTimeout(hoverTimer.current);
    clearTimeout(leaveTimer.current);
    input.current = source;
    setFocusPreview(source === "keyboard" || source === "touch");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReducedMotion(reduce);
    setSelected(index);
    setCinemaIndex(index);
    // Lock immediately, before React renders, so double clicks cannot start two sessions.
    changePhase(reduce ? "cinema" : "entering");
    if (!reduce)
      timerRef.current = setTimeout(() => changePhase("cinema"), TRANSITION_MS);
  }

  const returnToSelection = useCallback(
    (manual = true) => {
      if (phaseRef.current === "selection" || phaseRef.current === "returning")
        return;
      clearTimeout(timerRef.current);
      clearTimeout(hoverTimer.current);
      clearTimeout(leaveTimer.current);
      hoverSuppressed.current = manual;
      restoreFocus.current = manual;
      changePhase("returning");
      timerRef.current = setTimeout(
        () => changePhase("selection"),
        reducedMotion ? 0 : TRANSITION_MS,
      );
    },
    [reducedMotion, changePhase],
  );

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearTimeout(hoverTimer.current);
      clearTimeout(leaveTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (phase === "selection" && restoreFocus.current) {
      restoreFocus.current = false;
      triggers.current.get(cinemaIndex)?.focus({ preventScroll: true });
    }
  }, [phase, cinemaIndex]);
  useEffect(() => {
    if (!active) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") returnToSelection();
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [active, returnToSelection]);

  function highlight(index: number) {
    if (phaseRef.current === "selection") setSelected(index);
  }

  function schedulePreview(index: number, type: string) {
    if (type !== "mouse" || !window.matchMedia("(any-hover: hover)").matches)
      return;
    clearTimeout(hoverTimer.current);
    highlight(index);
    if (phaseRef.current !== "selection" || hoverSuppressed.current) return;
    hoverTimer.current = setTimeout(() => {
      if (pointerInside.current && !hoverSuppressed.current)
        selectRoute(index, "hover");
    }, HOVER_DELAY_MS);
  }

  function enterInteractiveArea() {
    pointerInside.current = true;
    clearTimeout(leaveTimer.current);
  }

  function leaveInteractiveArea(type: string) {
    if (type !== "mouse") return;
    pointerInside.current = false;
    hoverSuppressed.current = false;
    clearTimeout(hoverTimer.current);
    clearTimeout(leaveTimer.current);
    if (input.current === "hover" || input.current === "mouse") {
      leaveTimer.current = setTimeout(
        () => returnToSelection(false),
        LEAVE_DELAY_MS,
      );
    }
  }

  return (
    <section
      className={`hero hero-cinematic phase-${phase}`}
      aria-label="Master Fit — escolha seu destino"
    >
      <MagneticParticleBackground />
      <Container>
        <div className="hero-scene">
          <div className="hero-selection">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="live-dot" /> MASTER FIT — CHOOSE YOUR
                DESTINATION
              </span>
              <h1>
                SEU PRÓXIMO
                <br />
                MOVIMENTO
                <br />
                <span>COMEÇA AQUI.</span>
              </h1>
              <p>{site.description}</p>
              <Button to="/unidades">Encontre sua unidade</Button>
              <span className="hero-note">
                TRÊS UNIDADES. NOVAS POSSIBILIDADES.
              </span>
            </div>
            <div
              className="hero-destinations"
              onPointerEnter={enterInteractiveArea}
              onPointerLeave={(event) =>
                leaveInteractiveArea(event.pointerType)
              }
              onKeyDown={() => {
                input.current = "keyboard";
              }}
            >
              <div
                className="destination-selection"
                inert={active}
                aria-hidden={active ? true : undefined}
              >
                <div className="destination-heading">
                  <span>SELECIONE SEU DESTINO</span>
                  <span>{destination.id} / 03</span>
                </div>
                <div
                  className="destination-routes"
                  role="group"
                  aria-label="Destinos MasterFit"
                >
                  {heroDestinations.map((item, index) => {
                    const contents = (
                      <>
                        {item.image.src ? (
                          <img
                            className="destination-image"
                            src={item.image.src}
                            alt=""
                            decoding="async"
                          />
                        ) : (
                          <span
                            className="destination-image destination-image-placeholder"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className="destination-shade"
                          aria-hidden="true"
                        />
                        <span className="destination-number">
                          {item.id} <span>/ MASTER FIT</span>
                        </span>
                        <ArrowUpRight
                          className="destination-arrow"
                          strokeWidth={1}
                          aria-hidden="true"
                        />
                        <span className="destination-caption">
                          <strong>{item.name}</strong>
                          <span>
                            {item.video ? (
                              <>
                                <Play size={12} aria-hidden="true" /> Iniciar
                                jornada
                              </>
                            ) : (
                              <>
                                Ver prévia{" "}
                                <ArrowUpRight size={12} aria-hidden="true" />
                              </>
                            )}
                          </span>
                        </span>
                      </>
                    );
                    const className = `destination-route ${selected === index ? "is-selected" : ""}`;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={className}
                        ref={(node) => {
                          if (node) triggers.current.set(index, node);
                          else triggers.current.delete(index);
                        }}
                        aria-label={`Abrir prévia: ${item.name}`}
                        aria-controls="hero-cinema"
                        aria-expanded={active && cinemaIndex === index}
                        onPointerEnter={(event) =>
                          schedulePreview(index, event.pointerType)
                        }
                        onPointerLeave={() => clearTimeout(hoverTimer.current)}
                        onPointerDown={(event) => {
                          pointerType.current = event.pointerType;
                        }}
                        onFocus={() => highlight(index)}
                        onClick={(event) =>
                          selectRoute(
                            index,
                            event.detail === 0
                              ? "keyboard"
                              : pointerType.current === "touch"
                                ? "touch"
                                : "mouse",
                          )
                        }
                      >
                        {contents}
                      </button>
                    );
                  })}
                </div>
                <div
                  className="destination-description"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="eyebrow">
                    UNIDADE {destination.id} / {destination.name}
                  </span>
                  <p>{destination.description}</p>
                  <span className="destination-hint">
                    {destination.video
                      ? "Passe o mouse ou toque para iniciar o Satellite Zoom."
                      : "Passe o mouse ou toque para conhecer a unidade."}
                  </span>
                </div>
              </div>
              <div
                id="hero-cinema"
                className="hero-cinema-layer"
                hidden={!active}
              >
                {active && (
                  <HeroVideoExperience
                    destination={movie}
                    ready={phase === "cinema"}
                    exiting={phase === "returning"}
                    reducedMotion={reducedMotion}
                    onReturn={() => returnToSelection()}
                    autoFocus={focusPreview}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <a className="hero-explore" href="#unidades">
          <ArrowDown size={15} aria-hidden="true" /> EXPLORE A MASTERFIT
        </a>
      </Container>
    </section>
  );
}
