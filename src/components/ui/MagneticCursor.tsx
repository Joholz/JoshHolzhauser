'use client';

/**
 * MagneticCursor — custom cursor overlay
 *
 * Two-layer spring system:
 *  - Outer ring: stiffness:90, damping:22 — trails cursor with inertia
 *  - Inner dot:  stiffness:900, damping:35 — nearly instant, anchors the eye
 *
 * States:
 *  - Default: 40px blue ring + 6px dot
 *  - Hover (a/button/[data-magnetic]): 64px cyan ring expands, label appears inside
 *  - Click: ring collapses to 18px with elastic spring-back
 *
 * Only renders on (hover:hover) and (pointer:fine) devices.
 * Invisible until first mousemove to avoid flash at (0,0).
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click';

const OUTER_SPRING = { stiffness: 90,  damping: 22, mass: 0.8 };
const INNER_SPRING = { stiffness: 900, damping: 35, mass: 0.5 };

export function MagneticCursor() {
  const [active,  setActive]  = useState(false);    // true after first mousemove
  const [state,   setState]   = useState<CursorState>('default');
  const [label,   setLabel]   = useState<string>('');
  const [canUse,  setCanUse]  = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const outerX = useSpring(rawX, OUTER_SPRING);
  const outerY = useSpring(rawY, OUTER_SPRING);
  const innerX = useSpring(rawX, INNER_SPRING);
  const innerY = useSpring(rawY, INNER_SPRING);

  // Ref for unregistering hover watchers
  const hoverTargets = useRef<Element[]>([]);

  const scanTargets = useCallback(() => {
    // Remove old listeners
    hoverTargets.current.forEach(el => {
      el.removeEventListener('mouseenter', onEnter as EventListener);
      el.removeEventListener('mouseleave', onLeave);
    });
    hoverTargets.current = Array.from(
      document.querySelectorAll<Element>('a, button, [data-magnetic], [role="button"]')
    );
    hoverTargets.current.forEach(el => {
      el.addEventListener('mouseenter', onEnter as EventListener);
      el.addEventListener('mouseleave', onLeave);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onEnter(e: MouseEvent) {
    const el    = e.currentTarget as HTMLElement;
    const lbl   = el.getAttribute('data-cursor-label') ?? '';
    setLabel(lbl);
    setState('hover');
  }

  function onLeave() {
    setLabel('');
    setState('default');
  }

  useEffect(() => {
    // Only activate on true pointer devices (not touch/stylus)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;
    setCanUse(true);

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!active) setActive(true);
    }

    function onDown() { setState(s => s === 'hover' ? 'hover' : 'click'); }
    function onUp()   { setState(s => s === 'click'  ? 'default' : s); }

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    scanTargets();

    // Re-scan when the DOM changes (new buttons/links rendered in SPAs)
    const observer = new MutationObserver(scanTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      observer.disconnect();
      hoverTargets.current.forEach(el => {
        el.removeEventListener('mouseenter', onEnter as EventListener);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!canUse) return null;

  const isHover = state === 'hover';
  const isClick = state === 'click';

  const outerSize   = isHover ? 64 : isClick ? 18 : 40;
  const outerBorder = isHover
    ? '1.5px solid rgba(6,182,212,0.85)'
    : isClick
    ? '2px solid rgba(59,130,246,0.95)'
    : '1px solid rgba(59,130,246,0.65)';
  const outerBg = isHover ? 'rgba(6,182,212,0.07)' : 'rgba(0,0,0,0)';
  const outerGlow = isHover
    ? '0 0 18px rgba(6,182,212,0.45), 0 0 36px rgba(6,182,212,0.2)'
    : '0 0 10px rgba(59,130,246,0.3)';

  const dotSize  = isClick ? 4 : isHover ? 8 : 6;
  const dotColor = isHover ? 'rgba(6,182,212,0.9)' : 'rgba(59,130,246,0.9)';

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position:    'fixed',
          top:         0,
          left:        0,
          x:           outerX,
          y:           outerY,
          translateX:  '-50%',
          translateY:  '-50%',
          zIndex:      9999,
          pointerEvents: 'none',
          borderRadius:  '50%',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          opacity:        active ? 1 : 0,
        }}
        animate={{
          width:        outerSize,
          height:       outerSize,
          border:       outerBorder,
          background:   outerBg,
          boxShadow:    outerGlow,
        }}
        transition={{
          width:      { type: 'spring', stiffness: 220, damping: 22 },
          height:     { type: 'spring', stiffness: 220, damping: 22 },
          background: { duration: 0.15 },
          boxShadow:  { duration: 0.15 },
        }}
      >
        <AnimatePresence>
          {isHover && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{    opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize:      '9px',
                fontWeight:    600,
                letterSpacing: '0.12em',
                color:         'rgba(6,182,212,0.9)',
                userSelect:    'none',
                fontFamily:    'var(--font-geist-mono, monospace)',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          x:            innerX,
          y:            innerY,
          translateX:   '-50%',
          translateY:   '-50%',
          zIndex:       10000,
          pointerEvents:'none',
          borderRadius: '50%',
          opacity:       active ? 1 : 0,
        }}
        animate={{
          width:      dotSize,
          height:     dotSize,
          background: dotColor,
        }}
        transition={{
          width:      { type: 'spring', stiffness: 400, damping: 28 },
          height:     { type: 'spring', stiffness: 400, damping: 28 },
          background: { duration: 0.12 },
        }}
      />
    </>
  );
}
