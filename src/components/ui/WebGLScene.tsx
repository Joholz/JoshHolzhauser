'use client';

/**
 * WebGLScene — premium site-wide particle field
 *
 * Effect stack:
 *  1. AMBIENT DRIFT        — 5500 particles on overlapping sine waves, always breathing
 *  2. CAMERA PARALLAX      — smooth lerp toward cursor; scene tilts in 3-D
 *  3. CURSOR DISTURBANCE   — particles pushed outward near cursor, proximity glow at rest
 *  4. CLICK SHOCKWAVE      — expanding ring of force on every click; particles burst outward
 *  5. BLOOM                — UnrealBloomPass: every particle gets a glowing cinematic halo
 *  6. CHROMATIC ABERRATION — RGB channels diverge radially from cursor; faster = stronger
 *
 * Safety: reduced-motion → null. Mobile DPR ≤ 1.5. Full disposal on unmount.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass }      from 'three/addons/postprocessing/OutputPass.js';
import { useReducedMotion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';

/* ─── Chromatic aberration shader ────────────────────────────────────────── */
const ChromaShader = {
  name: 'ChromaShader',
  uniforms: {
    tDiffuse:  { value: null as THREE.Texture | null },
    uOffset:   { value: 0.0 },
    uCursorUV: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float     uOffset;
    uniform vec2      uCursorUV;
    varying vec2      vUv;
    void main() {
      vec2  delta = vUv - uCursorUV;
      vec2  dir   = length(delta) > 0.0001 ? normalize(delta) : vec2(0.0);
      float d     = length(delta);
      float str   = uOffset * (1.0 - smoothstep(0.0, 0.6, d)) * 0.7;
      float r     = texture2D(tDiffuse, vUv + dir * str * 1.4).r;
      float g     = texture2D(tDiffuse, vUv).g;
      float b     = texture2D(tDiffuse, vUv - dir * str * 1.0).b;
      vec4  src   = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(r, g, b, src.a);
    }
  `,
};

/* ─── Tuneable constants ─────────────────────────────────────────────────── */

const COUNT     = 5500;
const SPREAD_X  = 2600;
const SPREAD_Y  = 1400;
const SPREAD_Z  = 1800;
const BASE_SIZE = 2.8;

const DISTORT_RADIUS = 480;
const DISTORT_FORCE  = 0.055;

const BURST_RADIUS = 380;    // expanding shockwave max radius (world units)
const BURST_FORCE  = 0.28;   // impulse at wavefront
const BURST_LIFE   = 750;    // ms before burst is removed

// Colour palette
const COLOR_A = new THREE.Color('#3B82F6'); // blue  (primary)
const COLOR_B = new THREE.Color('#06B6D4'); // cyan  (accent)
const COLOR_C = new THREE.Color('#0d1929'); // near-black — visible against bg

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

    gl_PointSize = clamp(aSize * (420.0 / dist), 1.2, 24.0);

    vAlpha = smoothstep(0.0, 80.0, dist) * smoothstep(2200.0, 1200.0, dist);
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
    vec2  uv   = gl_PointCoord - vec2(0.5);
    float r    = length(uv) * 2.0;
    float disc = 1.0 - smoothstep(0.3, 1.0, r);

    if (disc < 0.005) discard;

    // Shift toward near-white on glow; bright core feeds bloom well
    vec3  col   = mix(vColor, vec3(0.92, 0.98, 1.0), vGlow * 0.85);
    float alpha = disc * vAlpha * mix(0.6, 1.0, vGlow * 0.9 + 0.1);

    gl_FragColor = vec4(col, alpha);
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
      powerPreference: 'default',
    });
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.appendChild(renderer.domElement);

    /* ── Scene + camera ── */
    const scene  = new THREE.Scene();
    scene.fog    = new THREE.FogExp2(0x0a0e1a, 0.00022);

    const camera = new THREE.PerspectiveCamera(65, W / H, 0.5, 3000);
    camera.position.set(0, 60, 520);
    camera.lookAt(0, 0, 0);

    /* ── Post-processing ── */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(W, H),
      0.1,   // strength  — halos on bright particles only; 2.4 was overpowering
      0.5,   // radius    — spread
      0.1,  // threshold — dark particles don't bloom; only vivid blue/cyan do
    );
    composer.addPass(bloomPass);

    const chromaPass = new ShaderPass(ChromaShader);
    composer.addPass(chromaPass);

    // OutputPass converts HDR → display sRGB; required after bloom
    composer.addPass(new OutputPass());

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

      // 55% vivid blue/cyan — more colour for bloom to latch onto
      const t = Math.random();
      let c: THREE.Color;
      if (t < 0.28)      c = COLOR_A;
      else if (t < 0.55) c = COLOR_B;
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
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }

    /* ── Click burst queue ── */
    type Burst = { wx: number; wy: number; startT: number };
    let bursts: Burst[] = [];

    function onClickBurst() {
      const cur    = cursor.current;
      const ar     = el.offsetWidth / el.offsetHeight;
      const fovR   = (65 * Math.PI) / 180;
      const vH     = 2 * Math.tan(fovR / 2) * camera.position.z;
      const vW     = vH * ar;
      bursts.push({
        wx: cur.nx * vW * 0.5,
        wy: -cur.ny * vH * 0.5,
        startT: performance.now(),
      });
    }
    window.addEventListener('click', onClickBurst);

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
      composer.setSize(w, h);
      bloomPass.resolution.set(w, h);
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
      camTargetX = cur.nx * 95;
      camTargetY = cur.ny * -48 + 60;
      camera.position.x += (camTargetX - camera.position.x) * 0.026 * dt;
      camera.position.y += (camTargetY - camera.position.y) * 0.026 * dt;
      camera.lookAt(0, 0, 0);

      /* — Cursor world-space projection — */
      const aspectRatio = el.offsetWidth / el.offsetHeight;
      const fovRad      = (65 * Math.PI) / 180;
      const viewH       = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const viewW       = viewH * aspectRatio;
      const curWorldX   = cur.nx * viewW * 0.5;
      const curWorldY   = -cur.ny * viewH * 0.5;

      /* — Chromatic aberration uniforms — */
      chromaPass.uniforms.uOffset.value = Math.min(cur.speed * 0.00018, 0.004);
      chromaPass.uniforms.uCursorUV.value.set(
        cur.x / el.offsetWidth,
        1.0 - cur.y / el.offsetHeight,
      );

      /* — Prune expired bursts — */
      const now = performance.now();
      bursts = bursts.filter(b => now - b.startT < BURST_LIFE);

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

        /* Click shockwave ring — expanding wavefront pushes particles outward */
        for (const b of bursts) {
          const bdx  = px - b.wx;
          const bdy  = py - b.wy;
          const bdst = Math.sqrt(bdx * bdx + bdy * bdy);
          const age  = (now - b.startT) / BURST_LIFE;
          const wave = BURST_RADIUS * age;
          const band = BURST_RADIUS * 0.32;
          const diff = Math.abs(bdst - wave);
          if (diff < band) {
            const intensity = (1 - age) * (1 - diff / band);
            velX[i] += (bdx / (bdst + 0.01)) * BURST_FORCE * intensity;
            velY[i] += (bdy / (bdst + 0.01)) * BURST_FORCE * intensity;
            glowArray[i] = Math.min(glowArray[i] + intensity * 0.7, 1.0);
          }
        }

        /* Apply velocity with slower damping so ripples travel further */
        posArray[i3]     += velX[i] * dt;
        posArray[i3 + 1] += velY[i] * dt;
        velX[i]          *= Math.pow(0.92, dt);
        velY[i]          *= Math.pow(0.92, dt);
      }

      posAttr.needsUpdate  = true;
      glowAttr.needsUpdate = true;

      composer.render();
    }

    rafId = requestAnimationFrame(animate);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click',  onClickBurst);
      geo.dispose();
      mat.dispose();
      composer.dispose();
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
