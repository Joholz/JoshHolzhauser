'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Terrain configuration
───────────────────────────────────────────── */
const COLS    = 38;
const ROWS    = 26;
const SPACING = 60;
const AMBIENT = 180;

/* ─────────────────────────────────────────────
   Custom shaders — glowing perspective points
───────────────────────────────────────────── */
const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3  aColor;
  varying   vec3  vColor;
  varying   float vAlpha;

  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = -mv.z;
    gl_PointSize = aSize * (300.0 / dist);
    gl_Position  = projectionMatrix * mv;
    vAlpha = smoothstep(10.0, 120.0, dist) * (1.0 - smoothstep(900.0, 1400.0, dist));
  }
`;

const FRAG = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv) * 2.0;
    if (dist > 1.0) discard;
    float alpha = (1.0 - dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

/* ─────────────────────────────────────────────
   Terrain height function
───────────────────────────────────────────── */
function heightAt(x: number, z: number, t: number): number {
  return (
    Math.sin(x * 0.0055 + t * 0.45) * 50 +
    Math.sin(z * 0.008  + t * 0.28) * 38 +
    Math.sin((x + z) * 0.004 + t * 0.35) * 22
  );
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export function HeroCanvas({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rm      = useReducedMotion();

  useEffect(() => {
    if (rm) return;

    const container = wrapRef.current;
    if (!container) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.fog   = new THREE.FogExp2(0x0a0e1a, 0.00075);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      68,
      container.offsetWidth / container.offsetHeight,
      1,
      2200,
    );
    camera.position.set(0, 90, 430);
    camera.lookAt(0, -10, -60);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x0a0e1a, 1);
    container.appendChild(renderer.domElement);

    /* ── Geometry ── */
    const total    = COLS * ROWS + AMBIENT;
    const positions = new Float32Array(total * 3);
    const colors    = new Float32Array(total * 3);
    const sizes     = new Float32Array(total);

    const blue  = new THREE.Color(0x3b82f6);
    const cyan  = new THREE.Color(0x06b6d4);
    const white = new THREE.Color(0xbfd0f8);

    // Terrain grid
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const i  = col * ROWS + row;
        const wx = (col - COLS / 2) * SPACING;
        const wz = (row - ROWS / 2) * SPACING * 1.35 - 150;
        const wy = heightAt(wx, wz, 0);

        positions[i * 3]     = wx;
        positions[i * 3 + 1] = wy;
        positions[i * 3 + 2] = wz;

        const t = Math.max(0, Math.min(1, (wy + 80) / 170));
        const c = blue.clone().lerp(cyan, t);
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = 0.9 + Math.random() * 1.4;
      }
    }

    // Ambient star particles
    for (let j = 0; j < AMBIENT; j++) {
      const i = COLS * ROWS + j;
      positions[i * 3]     = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 700;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2200;
      colors[i * 3]     = white.r;
      colors[i * 3 + 1] = white.g;
      colors[i * 3 + 2] = white.b;
      sizes[i] = 0.35 + Math.random() * 0.55;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── Mouse parallax ── */
    let mx = 0, my = 0;
    function onMouse(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMouse, { passive: true });

    /* ── Resize ── */
    function onResize() {
      if (!container) return;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
    window.addEventListener('resize', onResize, { passive: true });

    /* ── Render loop ── */
    let raf: number;
    const start  = performance.now();
    const posAttr = geo.attributes['position'] as THREE.BufferAttribute;
    const colAttr = geo.attributes['aColor']   as THREE.BufferAttribute;

    function tick() {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - start) / 1000;

      // Animate terrain heights + colors
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const i  = col * ROWS + row;
          const wx = posAttr.getX(i);
          const wz = posAttr.getZ(i);
          const wy = heightAt(wx, wz, t);
          posAttr.setY(i, wy);

          const tc = Math.max(0, Math.min(1, (wy + 80) / 170));
          const c  = blue.clone().lerp(cyan, tc);
          colAttr.setXYZ(i, c.r, c.g, c.b);
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Scroll terrain forward (Z move creates "flying over" effect)
      points.position.z = (t * 20) % (SPACING * 1.35);

      // Camera parallax
      camera.position.x += (mx * 45  - camera.position.x) * 0.018;
      camera.position.y += (-my * 22 + 90 - camera.position.y) * 0.018;

      renderer.render(scene, camera);
    }
    tick();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [rm]);

  return <div ref={wrapRef} className={className} aria-hidden="true" />;
}
