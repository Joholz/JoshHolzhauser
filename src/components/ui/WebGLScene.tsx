'use client';

/**
 * WebGLScene — site-wide ambient particle field
 *
 * Effect stack:
 *  1. Continuous slow drift: every particle rides overlapping sine waves → the
 *     field breathes and rolls over time with no user input.
 *  2. Cursor parallax: the camera tilts subtly toward the pointer position,
 *     giving the scene a 3-D look as you move the mouse across the page.
 *  3. Particle disturbance field: particles near the cursor are pushed outward
 *     proportional to cursor speed. At rest the field is calm; fast swipes
 *     create visible ripples that dissipate exponentially.
 *  4. Micro-distortion glow: a radial soft-light is added in the vertex shader
 *     for particles close to the cursor, making them brighter and larger.
 *
 * Performance / safety:
 *  - prefers-reduced-motion → no canvas at all, component returns null.
 *  - Mobile DPR capped at 1.5; desktop at 2.
 *  - One RAF loop shared by the whole page; cancelled on unmount.
 *  - All Three.js objects disposed on cleanup to prevent navigation leaks.
 *  - Dynamic import-safe: uses `'use client'` boundary only.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';

/* ─── Tuneable constants ─────────────────────────────────────────────────── */

const COUNT     = 5500;   // total particles
const SPREAD_X  = 2600;   // horizontal world-space extent
const SPREAD_Y  = 1400;   // vertical   world-space extent
const SPREAD_Z  = 1800;   // depth range
const BASE_SIZE = 2.8;    // default point size (world units)

// Influence of the cursor on nearby particles
const DISTORT_RADIUS = 480;   // world-space radius — large visible wave
const DISTORT_FORCE  = 0.055; // strong push per frame

// Colour palette — must match design system tokens
const COLOR_A = new THREE.Color('#3B82F6'); // blue (primary)
const COLOR_B = new THREE.Color('#06B6D4'); // cyan (accent)
const COLOR_C = new THREE.Color('#0f1c30'); // very dark blue (not black) — visible against bg

/* ─── Vertex shader ──────────────────────────────────────────────────────── */

const VERT = /* glsl */`
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aCursorGlow;

  varying vec3  vColor;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    float dist = -mvPos.z;

    // Perspective-correct size — larger cap so big close particles are dramatic
    gl_PointSize = clamp(aSize * (420.0 / dist), 1.2, 22.0);

    // Fade near/far planes
    vAlpha = smoothstep(0.0, 100.0, dist) * smoothstep(2200.0, 1400.0, dist);

    vColor = aColor;
    vGlow  = aCursorGlow;

    gl_Position = projectionMatrix * mvPos;
  }
`;

/* ─── Fragment shader ────────────────────────────────────────────────────── */

const FRAG = /* glsl */`
  varying vec3  vColor;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    // Soft circular disc — hard circle is harsh
    vec2  uv   = gl_PointCoord - vec2(0.5);
    float r    = length(uv) * 2.0;
    float disc = 1.0 - smoothstep(0.5, 1.0, r);

    if (disc < 0.01) discard;

    // Cursor-proximity glow: punch to near-white and dramatically brighten
    vec3 glowColor = mix(vColor, vec3(0.9, 0.97, 1.0), vGlow * 0.8);
    float alpha    = disc * vAlpha * mix(0.55, 1.0, vGlow * 0.85 + 0.15);

    gl_FragColor = vec4(glowColor, alpha);
  }
`;

/* ─── Component ──────────────────────────────────────────────────────────── */

export function WebGLScene({ className }: { className?: string }) {
  const rm         = useReducedMotion();
  const container  = useRef<HTMLDivElement>(null);
  const cursor     = useCursor();

  useEffect(() => {
    if (rm || !container.current) return;

    const el = container.current;
    const W  = el.offsetWidth;
    const H  = el.offsetHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power', // balanced = don't hog battery
    });
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene + camera ── */
    const scene  = new THREE.Scene();
    scene.fog    = new THREE.FogExp2(0x0a0e1a, 0.00032); // lighter fog = more visible particles at depth

    const camera = new THREE.PerspectiveCamera(65, W / H, 0.5, 3000);
    camera.position.set(0, 60, 520);
    camera.lookAt(0, 0, 0);

    /* ── Build particle geometry ── */
    const positions  = new Float32Array(COUNT * 3);
    const colors     = new Float32Array(COUNT * 3);
    const sizes      = new Float32Array(COUNT);
    const cursorGlow = new Float32Array(COUNT);

    // Spread particles randomly across the scene volume
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * SPREAD_X;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z;

      // ~40% vivid blue/cyan, rest are dark-blue dim — visually rich against the bg
      const t = Math.random();
      let c: THREE.Color;
      if (t < 0.20)      c = COLOR_A;
      else if (t < 0.40) c = COLOR_B;
      else               c = COLOR_C;

      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i]      = BASE_SIZE * (0.4 + Math.random() * 1.6);
      cursorGlow[i] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',    new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor',      new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('aSize',       new THREE.BufferAttribute(sizes,     1));
    geo.setAttribute('aCursorGlow', new THREE.BufferAttribute(cursorGlow, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Velocity buffer for disturbance physics ── */
    const velX = new Float32Array(COUNT);
    const velY = new Float32Array(COUNT);
    // Store original Z-phase offsets so drift is unique per particle
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }

    /* ── Camera lerp targets (cursor parallax) ── */
    let camTargetX = 0;
    let camTargetY = 60;

    /* ── Resize handler ── */
    function onResize() {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize, { passive: true });

    /* ── RAF loop ── */
    let rafId: number;
    let lastT = 0;

    function animate(t: number) {
      rafId = requestAnimationFrame(animate);
      const dt   = Math.min((t - lastT) / 16.67, 2); // clamp to prevent huge jumps
      lastT = t;
      const time = t * 0.001;

      /* — Camera parallax — */
      const cur = cursor.current;
      camTargetX = cur.nx * 90;  // wider parallax swing
      camTargetY = cur.ny * -45 + 60;
      camera.position.x += (camTargetX - camera.position.x) * 0.025 * dt;
      camera.position.y += (camTargetY - camera.position.y) * 0.025 * dt;
      camera.lookAt(0, 0, 0);

      /* — Cursor world-space projection (approximate, z=0 plane) — */
      // Project screen-centre cursor to world coords at camera-z depth
      const aspectRatio = el.offsetWidth / el.offsetHeight;
      const fovRad      = (65 * Math.PI) / 180;
      const viewH       = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const viewW       = viewH * aspectRatio;
      const curWorldX   = cur.nx * viewW * 0.5;
      const curWorldY   = -cur.ny * viewH * 0.5;

      /* — Particle update — */
      const posAttr   = geo.getAttribute('position')   as THREE.BufferAttribute;
      const glowAttr  = geo.getAttribute('aCursorGlow') as THREE.BufferAttribute;
      const posArray  = posAttr.array as Float32Array;
      const glowArray = glowAttr.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const px = posArray[i3];
        const py = posArray[i3 + 1];

        /* Ambient drift: faster, more visible sine waves */
        posArray[i3 + 1] += Math.sin(time * 0.38 + phases[i]         ) * 0.022 * dt;
        posArray[i3]     += Math.cos(time * 0.26 + phases[i] * 0.71   ) * 0.016 * dt;
        posArray[i3 + 2] += Math.sin(time * 0.31 + phases[i] * 1.31   ) * 0.012 * dt;

        /* Wrap out-of-bounds particles back to the opposite edge */
        if (posArray[i3]     >  SPREAD_X * 0.5) posArray[i3]     -= SPREAD_X;
        if (posArray[i3]     < -SPREAD_X * 0.5) posArray[i3]     += SPREAD_X;
        if (posArray[i3 + 1] >  SPREAD_Y * 0.5) posArray[i3 + 1] -= SPREAD_Y;
        if (posArray[i3 + 1] < -SPREAD_Y * 0.5) posArray[i3 + 1] += SPREAD_Y;
        if (posArray[i3 + 2] >  SPREAD_Z * 0.5) posArray[i3 + 2] -= SPREAD_Z;
        if (posArray[i3 + 2] < -SPREAD_Z * 0.5) posArray[i3 + 2] += SPREAD_Z;

        /* Cursor disturbance */
        const dx   = px - curWorldX;
        const dy   = py - curWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DISTORT_RADIUS) {
          // Glow even when idle — proximity brightening, not just on move
          const proximity = 1 - dist / DISTORT_RADIUS;
          glowArray[i] = Math.min(glowArray[i] + proximity * 0.08, 1.0);

          if (cur.isMoving) {
            // Stronger push scaled by cursor speed
            const force = proximity * DISTORT_FORCE * Math.min(cur.speed * 0.12, 2.5);
            const nx    = dx / (dist + 0.01);
            const ny    = dy / (dist + 0.01);
            velX[i]    += nx * force;
            velY[i]    += ny * force;
          }
        } else {
          glowArray[i] = Math.max(glowArray[i] - 0.035 * dt, 0);
        }

        /* Apply velocity with slower damping so ripples travel further */
        posArray[i3]     += velX[i] * dt;
        posArray[i3 + 1] += velY[i] * dt;
        velX[i]          *= Math.pow(0.92, dt);
        velY[i]          *= Math.pow(0.92, dt);
      }

      posAttr.needsUpdate  = true;
      glowAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    rafId = requestAnimationFrame(animate);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [rm, cursor]);

  // Reduced-motion: render nothing — the CSS grid-bg on each section takes over
  if (rm) return null;

  return (
    <div
      ref={container}
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
