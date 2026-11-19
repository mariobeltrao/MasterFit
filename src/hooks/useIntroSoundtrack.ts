import { useCallback, useEffect, useRef, useState } from "react";

const SOUNDTRACK_SRC = "/audio/masterfit-intro.mp3";
const STORAGE_KEY = "masterfit-intro-sound";
const TARGET_VOLUME = 0.5;
const FADE_IN_MS = 400;
const FADE_OUT_MS = 600;

function readPreference(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}
function writePreference(on: boolean) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable: keep the choice in memory only */
  }
}

interface Options {
  /** Video exists, motion is allowed and the cinema has started. */
  enabled: boolean;
  /** The video is actually playing (not loading, paused, finished or exiting). */
  playing: boolean;
  /** Changes on "Reproduzir animação": the track restarts from 0. */
  resetKey: number;
}

/**
 * Separate soundtrack for the Hero satellite videos (the MP4s have no audio).
 * Follows the video, fades in/out, respects autoplay policy and remembers the
 * visitor's choice for the session. A missing file silently hides the control.
 */
export function useIntroSoundtrack({ enabled, playing, resetKey }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const [wantsSound, setWantsSound] = useState(readPreference);
  const [blocked, setBlocked] = useState(false);
  const [missing, setMissing] = useState(false);
  const [hidden, setHidden] = useState(() => typeof document !== "undefined" && document.hidden);

  const cancelFade = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    frameRef.current = null;
    timerRef.current = null;
  };

  const fadeTo = useCallback((target: number, duration: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();
    const from = audio.volume;
    const start = performance.now();
    const settle = () => {
      cancelFade();
      audio.volume = target;
      done?.();
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      if (t >= 1) return settle();
      audio.volume = from + (target - from) * t;
      frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    // rAF is throttled in background tabs: guarantee the fade completes on time.
    timerRef.current = window.setTimeout(settle, duration + 50);
  }, []);

  // Create the element only when the cinema mounts; release it on unmount.
  useEffect(() => {
    if (!enabled) return;
    const audio = new Audio();
    audio.preload = "none";
    audio.loop = false;
    audio.volume = 0;
    audio.src = SOUNDTRACK_SRC;
    const onError = () => setMissing(true);
    audio.addEventListener("error", onError);
    audioRef.current = audio;
    return () => {
      cancelFade();
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && resetKey > 0) audio.currentTime = 0;
  }, [resetKey]);

  // Follow the video.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    if (playing && wantsSound && !hidden) {
      let cancelled = false;
      audio
        .play()
        .then(() => {
          if (cancelled) return;
          setBlocked(false);
          fadeTo(TARGET_VOLUME, FADE_IN_MS);
        })
        .catch((reason: unknown) => {
          if (cancelled) return;
          const name = reason instanceof DOMException ? reason.name : "";
          if (name === "NotAllowedError") setBlocked(true);
          else if (name !== "AbortError") setMissing(true);
        });
      return () => {
        cancelled = true;
      };
    }
    if (hidden) {
      cancelFade();
      audio.pause();
      return;
    }
    if (!audio.paused) fadeTo(0, FADE_OUT_MS, () => audio.pause());
  }, [playing, wantsSound, hidden, missing, fadeTo]);

  const soundOn = wantsSound && !blocked;
  const toggle = useCallback(() => {
    const next = !soundOn;
    writePreference(next);
    setBlocked(false);
    setWantsSound(next);
    // Start inside the user gesture so autoplay policies allow it.
    const audio = audioRef.current;
    if (next && audio && playing) {
      audio.play().then(() => fadeTo(TARGET_VOLUME, FADE_IN_MS)).catch(() => setBlocked(true));
    }
  }, [soundOn, playing, fadeTo]);

  return { available: enabled && !missing, soundOn, toggle };
}
