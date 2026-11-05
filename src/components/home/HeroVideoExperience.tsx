import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import type { HeroDestination } from "../../data/hero";

type Playback = "loading" | "playing" | "paused" | "complete" | "error";
interface Props {
  destination: HeroDestination;
  ready: boolean;
  exiting: boolean;
  reducedMotion: boolean;
  onReturn: () => void;
  autoFocus: boolean;
}

/** Mounted only after selection. An ended video stays mounted on its last frame. */
export function HeroVideoExperience({
  destination,
  ready,
  exiting,
  reducedMotion,
  onReturn,
  autoFocus,
}: Props) {
  const hasVideo = Boolean(destination.video);
  const source = destination.video?.src;
  const cover = destination.video?.finalFrame || destination.image.src;
  const [started, setStarted] = useState(hasVideo && !reducedMotion);
  const [playback, setPlayback] = useState<Playback>(
    !hasVideo || reducedMotion ? "complete" : "loading",
  );
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [useStill, setUseStill] = useState(reducedMotion);
  const [attempt, setAttempt] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const playbackRef = useRef(playback);
  const activeRef = useRef(false);
  const complete = playback === "complete";
  const error = playback === "error";

  function updatePlayback(next: Playback) {
    playbackRef.current = next;
    setPlayback(next);
  }

  const fail = useCallback(() => {
    if (!activeRef.current || playbackRef.current === "complete") return;
    videoRef.current?.pause();
    setUseStill(true);
    playbackRef.current = "error";
    setPlayback("error");
  }, []);

  useEffect(() => {
    if (!started || !source) return;
    const video = videoRef.current;
    if (!video) return;
    activeRef.current = true;
    video.muted = true;
    video.src = source;
    video.load();
    return () => {
      activeRef.current = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [source, started, attempt]);

  useEffect(() => {
    // Skip/error can happen during expansion, before the deferred start.
    if (
      !ready ||
      !started ||
      exiting ||
      playbackRef.current === "complete" ||
      playbackRef.current === "error"
    )
      return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    video.play().catch((reason: unknown) => {
      if (
        cancelled ||
        (reason instanceof DOMException && reason.name === "AbortError")
      )
        return;
      fail();
    });
    return () => {
      cancelled = true;
      video.pause();
    };
  }, [ready, started, attempt, exiting, fail]);

  useEffect(() => {
    if (autoFocus && ready && !exiting)
      backRef.current?.focus({ preventScroll: true });
  }, [autoFocus, ready, exiting]);
  useEffect(() => {
    if (autoFocus && complete && ready)
      resultRef.current?.focus({ preventScroll: true });
  }, [autoFocus, complete, ready]);

  function finish(skipped = false) {
    videoRef.current?.pause();
    setUseStill(skipped || !started);
    setProgress(1);
    updatePlayback("complete");
  }

  function replay() {
    if (exiting || !hasVideo) return;
    updatePlayback("loading");
    setProgress(0);
    setUseStill(false);
    setStarted(true);
    setAttempt((value) => value + 1);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video || exiting) return;
    if (video.paused) {
      updatePlayback("loading");
      video.play().catch(fail);
    } else {
      video.pause();
      updatePlayback("paused");
    }
  }

  return (
    <div
      className={`cinema-stage playback-${playback}`}
      aria-label={`Experiência da unidade ${destination.name}`}
      inert={exiting}
    >
      {(useStill || error || !hasVideo) &&
        (cover ? (
          <img
            className="cinema-still"
            src={cover}
            alt={
              hasVideo
                ? `Frame final da fachada — ${destination.video?.locationLabel}`
                : destination.image.alt
            }
          />
        ) : (
          <div
            className="cinema-still cinema-cover-placeholder"
            role="img"
            aria-label={destination.image.alt}
          >
            <ArrowUpRight size={64} strokeWidth={1} aria-hidden="true" />
            <span>Imagem da unidade em preparação</span>
          </div>
        ))}
      {started && hasVideo && (
        <video
          ref={videoRef}
          className={`cinema-video ${useStill || error ? "is-hidden" : ""}`}
          muted
          playsInline
          preload="none"
          aria-label={`Zoom de satélite até a fachada da MasterFit — ${destination.video?.locationLabel}`}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            if (
              playbackRef.current !== "complete" &&
              Number.isFinite(video.duration) &&
              video.duration > 0
            )
              setProgress(video.currentTime / video.duration);
          }}
          onPlaying={() => {
            if (
              activeRef.current &&
              playbackRef.current !== "complete" &&
              playbackRef.current !== "error"
            )
              updatePlayback("playing");
          }}
          onEnded={() => finish()}
          onError={fail}
          onWaiting={() => {
            if (activeRef.current && playbackRef.current === "playing")
              updatePlayback("loading");
          }}
        />
      )}
      <div className="cinema-shade" aria-hidden="true" />
      <div className="cinema-topbar">
        <div className="cinema-location">
          <span>MASTER FIT / UNIDADE {destination.id}</span>
          <strong>
            {destination.video?.locationLabel || destination.name}
          </strong>
        </div>
        <button
          ref={backRef}
          className="cinema-control"
          onClick={onReturn}
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Voltar à seleção
        </button>
      </div>
      <div className="cinema-reticle" aria-hidden="true">
        <span /> <span />
      </div>
      {!complete && !error && (
        <>
          <div className="cinema-status" role="status">
            {playback === "loading"
              ? "Preparando seu destino…"
              : playback === "paused"
                ? "Animação pausada"
                : "Do alto. Até o seu próximo passo."}
          </div>
          <div className="cinema-playback-controls">
            <button
              type="button"
              className="cinema-control"
              onClick={togglePlayback}
              disabled={!ready || playback === "loading"}
            >
              {playback === "paused" ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
              {playback === "paused" ? "Continuar" : "Pausar"}
            </button>
            <button
              type="button"
              className="cinema-control"
              onClick={() => finish(true)}
            >
              <SkipForward size={16} aria-hidden="true" /> Pular animação
            </button>
          </div>
        </>
      )}
      <div
        className={`cinema-result ${complete || error ? "" : "cinema-preview-result"}`}
      >
        <span className="eyebrow">UNIDADE {destination.id}</span>
        <h2 ref={resultRef} tabIndex={-1}>
          {destination.name}
        </h2>
        {(complete || error) && (
          <p role={error ? "alert" : undefined}>
            {error
              ? "Não foi possível reproduzir o vídeo. Você pode tentar novamente ou conhecer a unidade."
              : "Seu próximo movimento começa aqui."}
          </p>
        )}
        <div className="cinema-result-actions">
          <Link className="button" to={destination.href}>
            Conhecer esta unidade <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          {(complete || error) && (
            <button
              className="button button-secondary"
              type="button"
              onClick={onReturn}
            >
              <ArrowLeft size={18} aria-hidden="true" /> Escolher outra unidade
            </button>
          )}
        </div>
        {hasVideo && (complete || error) && (
          <button
            className="text-link cinema-replay"
            type="button"
            onClick={replay}
          >
            <RotateCcw size={16} aria-hidden="true" />
            {error ? "Tentar novamente" : "Reproduzir animação"}
          </button>
        )}
      </div>
      {hasVideo && (
        <div
          className="cinema-progress"
          role="progressbar"
          aria-label="Progresso da animação"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
    </div>
  );
}
