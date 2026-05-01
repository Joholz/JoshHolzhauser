'use client';

import { useEffect, useRef } from 'react';

export interface CursorState {
  /** Raw pixel position */
  x: number;
  y: number;
  /** Normalised -1 → +1 from viewport centre */
  nx: number;
  ny: number;
  /** Velocity magnitude (px/frame, exponentially smoothed) */
  speed: number;
  /** True while the pointer has moved in the last 2 s */
  isMoving: boolean;
}

/**
 * Returns a ref (not reactive state) holding the latest cursor data.
 * Using a ref avoids React re-renders on every pointermove — subscribers
 * (WebGL RAF loops) read it directly each frame instead.
 */
export function useCursor(): React.MutableRefObject<CursorState> {
  const ref = useRef<CursorState>({
    x: 0, y: 0, nx: 0, ny: 0, speed: 0, isMoving: false,
  });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    function onMove(e: PointerEvent) {
      // Only track mouse — ignore touch/stylus to avoid mobile layout jank
      if (e.pointerType !== 'mouse') return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const rawSpeed = Math.sqrt(dx * dx + dy * dy);

      ref.current.x  = e.clientX;
      ref.current.y  = e.clientY;
      ref.current.nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ref.current.ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // Exponential smoothing keeps velocity from spiking
      ref.current.speed = ref.current.speed * 0.75 + rawSpeed * 0.25;
      ref.current.isMoving = true;

      lastX = e.clientX;
      lastY = e.clientY;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        ref.current.isMoving = false;
        ref.current.speed = 0;
      }, 2000);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      clearTimeout(idleTimer);
    };
  }, []);

  return ref;
}
