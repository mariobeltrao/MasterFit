import { memo, useEffect, useRef } from "react";
import {
  advanceParticle,
  createParticle,
  particleCount,
} from "./magneticParticles";
import type { MagneticParticle } from "./magneticParticles";
import "../../styles/magnetic-particles.css";

/** Decorative only. Its parent receives passive pointer events; the canvas never does. */
export const MagneticParticleBackground = memo(
  function MagneticParticleBackground() {
    const layerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const layer = layerRef.current;
      const canvas = canvasRef.current;
      const host = layer?.parentElement;
      const context = canvas?.getContext("2d");
      if (!layer || !canvas || !host || !context) return;

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const compactQuery = window.matchMedia(
        "(max-width: 760px), (pointer: coarse)",
      );
      let reduced = motionQuery.matches;
      let compact = compactQuery.matches;
      let visible = true;
      let disposed = false;
      let frame = 0;
      let width = 0;
      let height = 0;
      let lastPaint = 0;
      let elapsed = 0;
      let particles: MagneticParticle[] = [];
      const pointer = {
        active: false,
        rawX: 0,
        rawY: 0,
        x: 0,
        y: 0,
        strength: 0,
      };
      const style = getComputedStyle(layer);
      const goldChannels =
        style.getPropertyValue("--magnetic-gold").trim() || "237 191 54";
      const gold = `rgb(${goldChannels})`;
      const white = "rgb(255 255 255)";

      function stop() {
        cancelAnimationFrame(frame);
        frame = 0;
        lastPaint = 0;
      }

      function draw() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        context.globalAlpha = 1;
        if (!reduced && pointer.strength > 0.005) {
          const glow = context.createRadialGradient(
            pointer.x,
            pointer.y,
            0,
            pointer.x,
            pointer.y,
            150,
          );
          glow.addColorStop(
            0,
            `rgb(${goldChannels} / ${0.045 * pointer.strength})`,
          );
          glow.addColorStop(
            0.45,
            `rgb(${goldChannels} / ${0.018 * pointer.strength})`,
          );
          glow.addColorStop(1, `rgb(${goldChannels} / 0)`);
          context.fillStyle = glow;
          context.fillRect(pointer.x - 150, pointer.y - 150, 300, 300);
        }
        context.lineCap = "round";
        for (const particle of particles) {
          const color = particle.gold ? gold : white;
          if (
            particle.trail &&
            particle.influence > 0.04 &&
            Math.hypot(particle.vx, particle.vy) > 0.14
          ) {
            context.strokeStyle = color;
            context.globalAlpha = particle.alpha * 0.22;
            context.lineWidth = Math.max(0.4, particle.radius * 0.7);
            context.beginPath();
            context.moveTo(
              particle.x - particle.vx * 2,
              particle.y - particle.vy * 2,
            );
            context.lineTo(particle.x, particle.y);
            context.stroke();
          }
          context.fillStyle = color;
          context.globalAlpha = particle.alpha;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = 1;
      }

      function wake() {
        if (
          !disposed &&
          !reduced &&
          visible &&
          !document.hidden &&
          width > 0 &&
          height > 0 &&
          frame === 0
        ) {
          frame = requestAnimationFrame(tick);
        }
      }

      function tick(now: number) {
        frame = 0;
        if (disposed || reduced || !visible || document.hidden) return;
        // Mobile ambient motion needs only 30 draws/sec, not 60 full canvas clears.
        if (compact && lastPaint && now - lastPaint < 1000 / 30 - 1) {
          wake();
          return;
        }
        const delta = lastPaint ? Math.min(34, now - lastPaint) : 1000 / 60;
        lastPaint = now;
        elapsed += delta;
        const blend = 1 - Math.exp(-delta / 65);
        pointer.x += (pointer.rawX - pointer.x) * blend;
        pointer.y += (pointer.rawY - pointer.y) * blend;
        const targetStrength = pointer.active && !compact ? 1 : 0;
        pointer.strength +=
          (targetStrength - pointer.strength) * (1 - Math.exp(-delta / 100));
        const field = {
          x: pointer.x,
          y: pointer.y,
          strength: pointer.strength,
          ambient: compact,
          time: elapsed,
        };
        let moving = false;
        for (const particle of particles)
          moving = advanceParticle(particle, field, delta) || moving;
        draw();
        const pointerMoving =
          Math.abs(pointer.strength - targetStrength) > 0.001 ||
          (pointer.active &&
            Math.hypot(pointer.rawX - pointer.x, pointer.rawY - pointer.y) >
              0.05);
        if (compact || moving || pointerMoving) wake();
        else lastPaint = 0; // Desktop sleeps after settling, including while the mouse rests.
      }

      function resize() {
        const bounds = layer!.getBoundingClientRect();
        const nextWidth = Math.round(bounds.width);
        const nextHeight = Math.round(bounds.height);
        if (!nextWidth || !nextHeight) {
          stop();
          return;
        }
        const count = particleCount(nextWidth, nextHeight, compact);
        const ratio = Math.min(
          window.devicePixelRatio || 1,
          compact ? 1.25 : 1.5,
          Math.sqrt(3_000_000 / (nextWidth * nextHeight)),
        );
        const bitmapWidth = Math.round(nextWidth * ratio);
        const bitmapHeight = Math.round(nextHeight * ratio);
        if (
          nextWidth === width &&
          nextHeight === height &&
          canvas!.width === bitmapWidth &&
          canvas!.height === bitmapHeight &&
          particles.length === count
        )
          return;
        const scaleX = width ? nextWidth / width : 1;
        const scaleY = height ? nextHeight / height : 1;
        const next: MagneticParticle[] = [];
        for (let index = 0; index < count; index++) {
          const particle =
            particles[index] || createParticle(index, nextWidth, nextHeight);
          if (particles[index]) {
            particle.originX = particle.nx * nextWidth;
            particle.originY = particle.ny * nextHeight;
            particle.x *= scaleX;
            particle.y *= scaleY;
            particle.vx *= scaleX;
            particle.vy *= scaleY;
          }
          next.push(particle);
        }
        particles = next;
        width = nextWidth;
        height = nextHeight;
        // Cap both DPR and total backing pixels on wide/retina screens.
        canvas!.width = bitmapWidth;
        canvas!.height = bitmapHeight;
        context!.setTransform(
          bitmapWidth / width,
          0,
          0,
          bitmapHeight / height,
          0,
          0,
        );
        draw();
        wake();
      }

      function onPointerMove(event: PointerEvent) {
        if (
          reduced ||
          compact ||
          (event.pointerType !== "mouse" && event.pointerType !== "pen")
        )
          return;
        const bounds = host!.getBoundingClientRect();
        pointer.rawX = event.clientX - bounds.left;
        pointer.rawY = event.clientY - bounds.top;
        if (!pointer.active && pointer.strength < 0.001) {
          pointer.x = pointer.rawX;
          pointer.y = pointer.rawY;
        }
        pointer.active = true;
        wake();
      }

      function releasePointer() {
        pointer.active = false;
        wake();
      }
      function onVisibility() {
        if (document.hidden) {
          pointer.active = false;
          stop();
        } else wake();
      }
      function onMotionChange() {
        reduced = motionQuery.matches;
        pointer.active = false;
        pointer.strength = 0;
        stop();
        if (reduced) {
          for (const particle of particles) {
            particle.x = particle.originX;
            particle.y = particle.originY;
            particle.vx = particle.vy = particle.influence = 0;
          }
        }
        draw();
        wake();
      }
      function onCompactChange() {
        compact = compactQuery.matches;
        releasePointer();
        resize();
      }

      const resizeObserver = new ResizeObserver(resize);
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else {
          pointer.active = false;
          stop();
        }
      });
      resizeObserver.observe(host);
      intersectionObserver.observe(host);
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      host.addEventListener("pointerleave", releasePointer, { passive: true });
      window.addEventListener("scroll", releasePointer, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      motionQuery.addEventListener("change", onMotionChange);
      compactQuery.addEventListener("change", onCompactChange);
      resize();

      return () => {
        disposed = true;
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", releasePointer);
        window.removeEventListener("scroll", releasePointer);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        motionQuery.removeEventListener("change", onMotionChange);
        compactQuery.removeEventListener("change", onCompactChange);
        particles = [];
      };
    }, []);

    return (
      <div
        ref={layerRef}
        className="magnetic-particle-background"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="magnetic-particle-canvas" />
      </div>
    );
  },
);
