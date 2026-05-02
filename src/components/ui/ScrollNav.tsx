'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LABELS = [
  'Intro',
  'Proof',
  'Services',
  'Portfolio',
  'Build System',
  'Process',
  'Why Josh',
  'Contact',
];

export function ScrollNav({ labels = LABELS }: { labels?: string[] }) {
  const [active,  setActive]  = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const activeRef   = useRef(0);
  const sectionsRef = useRef<Element[]>([]);

  // Keep ref in sync so keyboard handler avoids stale closures
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section'));
    sectionsRef.current = sections;
    if (!sections.length) return;

    /* ── Intersection observer ── */
    const io = new IntersectionObserver(
      (entries) => {
        let bestRatio = 0;
        let bestIdx   = activeRef.current;
        entries.forEach((e) => {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            const idx = sections.indexOf(e.target);
            if (idx >= 0) bestIdx = idx;
          }
        });
        if (bestRatio > 0) setActive(bestIdx);
      },
      { threshold: [0.25, 0.5], rootMargin: '-15% 0px -15% 0px' },
    );
    sections.forEach((s) => io.observe(s));

    /* ── Keyboard navigation ── */
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const curr = sectionsRef.current;
      const idx  = activeRef.current;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        curr[Math.min(idx + 1, curr.length - 1)]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        curr[Math.max(idx - 1, 0)]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => { io.disconnect(); window.removeEventListener('keydown', onKey); };
  }, []);

  function goTo(idx: number) {
    sectionsRef.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Page sections"
    >
      {labels.map((label, i) => (
        <div key={label} className="relative flex items-center justify-end">
          {/* Tooltip */}
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-[#1B1F2A] bg-[#101319]/95 px-2.5 py-1 text-xs text-[#F9FAFB] backdrop-blur-sm"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => goTo(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Jump to ${label}`}
            aria-current={i === active ? 'true' : undefined}
            className="flex h-5 w-5 items-center justify-center"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:           i === active ? 10 : 6,
                height:          i === active ? 10 : 6,
                backgroundColor: i === active ? '#5B8DEF' : '#262B38',
                boxShadow:       i === active ? '0 0 10px rgba(91,141,239,0.7)' : 'none',
              }}
            />
          </button>
        </div>
      ))}

      {/* Keyboard hint */}
      <div className="mt-3 flex flex-col items-end gap-0.5 text-[#6B7280]">
        <span className="font-mono text-[9px] tracking-widest">↑↓</span>
        <span className="font-mono text-[9px] tracking-widest">KEYS</span>
      </div>
    </nav>
  );
}
