/** Physics uses CSS pixels, independent of canvas resolution and React renders. */
export interface MagneticParticle {
  nx: number;
  ny: number;
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  gold: boolean;
  trail: boolean;
  phase: number;
  influence: number;
}

export interface MagneticField {
  x: number;
  y: number;
  strength: number;
  ambient: boolean;
  time: number;
}

export const MAGNET_RADIUS = 280;
const FRAME_MS = 1000 / 60;
const TAU = Math.PI * 2;

function sample(index: number, salt: number) {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function particleCount(width: number, height: number, compact: boolean) {
  if (width <= 0 || height <= 0) return 0;
  const desired = Math.round((width * height) / (compact ? 9000 : 4300));
  return Math.min(compact ? 100 : 420, Math.max(compact ? 45 : 180, desired));
}

export function createParticle(
  index: number,
  width: number,
  height: number,
): MagneticParticle {
  const nx = sample(index, 1);
  const ny = sample(index, 2);
  return {
    nx,
    ny,
    originX: nx * width,
    originY: ny * height,
    x: nx * width,
    y: ny * height,
    vx: 0,
    vy: 0,
    radius: 0.45 + sample(index, 3) ** 2 * 1.15,
    alpha: 0.22 + sample(index, 4) * 0.48,
    gold: index % 10 < 7,
    trail: index % 11 === 0,
    phase: sample(index, 5) * TAU,
    influence: 0,
  };
}

/** A damped spring follows a nearby magnetic target, then returns to its anchor. */
export function advanceParticle(
  particle: MagneticParticle,
  field: MagneticField,
  deltaMs: number,
) {
  const step = Math.min(2, Math.max(0, deltaMs / FRAME_MS));
  const baseX =
    particle.originX +
    (field.ambient ? Math.sin(field.time * 0.00017 + particle.phase) * 1.2 : 0);
  const baseY =
    particle.originY +
    (field.ambient ? Math.cos(field.time * 0.00013 + particle.phase) * 1.4 : 0);
  const dx = field.x - baseX;
  const dy = field.y - baseY;
  const distance = Math.hypot(dx, dy);
  const influence =
    Math.max(0, 1 - distance / MAGNET_RADIUS) ** 1.4 * field.strength;
  const targetX = baseX + dx * influence * 0.8;
  const targetY = baseY + dy * influence * 0.8;
  const damping = 0.8 ** step;
  particle.influence = influence;
  particle.vx = Math.max(
    -6.5,
    Math.min(
      6.5,
      (particle.vx + (targetX - particle.x) * 0.028 * step) * damping,
    ),
  );
  particle.vy = Math.max(
    -6.5,
    Math.min(
      6.5,
      (particle.vy + (targetY - particle.y) * 0.028 * step) * damping,
    ),
  );
  particle.x += particle.vx * step;
  particle.y += particle.vy * step;
  return (
    Math.abs(particle.vx) + Math.abs(particle.vy) > 0.015 ||
    Math.abs(targetX - particle.x) + Math.abs(targetY - particle.y) > 0.06
  );
}
