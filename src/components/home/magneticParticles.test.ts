import { test } from "node:test";
import { equal, ok } from "node:assert/strict";
import {
  advanceParticle,
  createParticle,
  particleCount,
} from "./magneticParticles.ts";
import type { MagneticField } from "./magneticParticles.ts";

const frame = 1000 / 60;
function fieldAt(x: number, y: number, strength = 1): MagneticField {
  return { x, y, strength, ambient: false, time: 0 };
}

test("the nearby cursor attracts particles and release restores their anchors", () => {
  const particle = createParticle(4, 1280, 900);
  const cursor = fieldAt(particle.originX + 110, particle.originY + 60);
  const initialDistance = Math.hypot(
    cursor.x - particle.x,
    cursor.y - particle.y,
  );
  for (let i = 0; i < 150; i++) advanceParticle(particle, cursor, frame);
  ok(
    Math.hypot(cursor.x - particle.x, cursor.y - particle.y) <
      initialDistance - 20,
  );
  for (let i = 0; i < 240; i++)
    advanceParticle(particle, { ...cursor, strength: 0 }, frame);
  ok(
    Math.hypot(particle.x - particle.originX, particle.y - particle.originY) <
      0.01,
  );
  ok(Math.hypot(particle.vx, particle.vy) < 0.001);
});

test("particles outside the magnetic radius stay at rest", () => {
  const particle = createParticle(12, 1280, 900);
  for (let i = 0; i < 100; i++)
    advanceParticle(
      particle,
      fieldAt(particle.originX + 400, particle.originY),
      frame,
    );
  equal(particle.x, particle.originX);
  equal(particle.y, particle.originY);
});

test("30 and 60 FPS converge to the same magnetic resting position", () => {
  const fast = createParticle(8, 1280, 900);
  const slow = createParticle(8, 1280, 900);
  const cursor = fieldAt(fast.x + 130, fast.y - 45);
  for (let i = 0; i < 180; i++) advanceParticle(fast, cursor, frame);
  for (let i = 0; i < 90; i++) advanceParticle(slow, cursor, frame * 2);
  ok(Math.hypot(fast.x - slow.x, fast.y - slow.y) < 0.1);
});

test("zero distance and long frames do not introduce NaNs or large jumps", () => {
  const particle = createParticle(0, 1280, 900);
  advanceParticle(particle, fieldAt(particle.x, particle.y), frame);
  ok(Number.isFinite(particle.x) && Number.isFinite(particle.y));
  for (let i = 0; i < 1000; i++) {
    const previousX = particle.x;
    const previousY = particle.y;
    advanceParticle(
      particle,
      fieldAt(
        particle.originX + Math.sin(i) * 260,
        particle.originY + Math.cos(i) * 260,
      ),
      i % 3 === 0 ? 20_000 : frame,
    );
    ok(Number.isFinite(particle.x) && Number.isFinite(particle.y));
    ok(
      Math.abs(particle.x - previousX) <= 13.001 &&
        Math.abs(particle.y - previousY) <= 13.001,
    );
  }
});

test("mobile density is lower, large screens are capped, and colors are 70/30", () => {
  const desktop = particleCount(1440, 900, false);
  const mobile = particleCount(390, 1200, true);
  ok(desktop >= 180 && mobile <= 100 && mobile < desktop);
  equal(particleCount(7680, 4320, false), 420);
  equal(particleCount(0, 0, true), 0);
  const particles = Array.from({ length: 200 }, (_, i) =>
    createParticle(i, 1440, 900),
  );
  equal(particles.filter((particle) => particle.gold).length, 140);
});

test("mobile ambient movement stays subtle without a cursor", () => {
  const particle = createParticle(2, 390, 1200);
  for (let i = 0; i < 600; i++) {
    advanceParticle(
      particle,
      { x: 0, y: 0, strength: 0, ambient: true, time: i * frame * 2 },
      frame * 2,
    );
    ok(
      Math.hypot(particle.x - particle.originX, particle.y - particle.originY) <
        2.5,
    );
  }
});
