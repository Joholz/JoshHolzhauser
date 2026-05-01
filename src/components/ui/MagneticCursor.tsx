'use client';

/**
 * TrailingRing — a faint 20px ring that follows the cursor with spring lag.
 * Native cursor is untouched. The ring is a background detail, not a focal point.
 * Only renders on true pointer devices (not touch/mobile).
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };

export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [canUse, setCanUse]   = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, SPRING);
  const y    = useSpring(rawY, SPRING);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;
    setCanUse(true);

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!canUse) return null;

  return (
    <motion.div
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        x,
        y,
        translateX:    '-50%',
        translateY:    '-50%',
        width:         20,
        height:        20,
        borderRadius:  '50%',
        border:        '1px solid rgba(59,130,246,0.28)',
        pointerEvents: 'none',
        zIndex:        9999,
        opacity:       visible ? 1 : 0,
      }}
    />
  );
}
