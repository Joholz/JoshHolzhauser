'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ENTRIES = [
  {
    phase:  'Design System First',
    time:   'Before any code',
    tag:    'Foundation',
    color:  '#3B82F6',
    detail: 'Locked the color palette, type scale, and motion rules in a single CSS file. No design tool, no separate handoff step — the constraint forces fast, consistent decisions.',
  },
  {
    phase:  'Infrastructure Early',
    time:   'Day 1',
    tag:    'Backend',
    color:  '#06B6D4',
    detail: 'Firebase Firestore for lead capture. Vercel for hosting. No backend servers to provision, no databases to manage — infrastructure that costs nothing when idle.',
  },
  {
    phase:  'Component-First Build',
    time:   'Days 2–5',
    tag:    'Frontend',
    color:  '#10B981',
    detail: '8 homepage sections, custom typewriter, comparison table, responsive nav. Each component works in isolation before it connects to anything else — that\'s what keeps refactors cheap.',
  },
  {
    phase:  'The Scroll Timeline',
    time:   'Day 6',
    tag:    'Signature Feature',
    color:  '#8B5CF6',
    detail: 'The original terminal demo showed what code does. The scroll-pinned timeline shows what code means — the whole delivery loop from brief to shipped result, visible and interactive.',
  },
  {
    phase:  'Lead Pipeline',
    time:   'Day 7',
    tag:    'Conversion',
    color:  '#F59E0B',
    detail: 'Custom 3-step contact form writing directly to Firestore. No third-party booking embed, no iframe dependency. Admin dashboard protected by Google Auth.',
  },
  {
    phase:  'Deployed',
    time:   'Day 8',
    tag:    'Launch',
    color:  '#10B981',
    detail: 'Connected to Vercel via GitHub. Auto-deploys on every push. Zero ongoing infrastructure cost. The whole thing runs for free until it needs to scale.',
  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function BuildLog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView       = useInView(containerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef}>
      <div className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">
          Engineering Log
        </p>
        <h2 className="text-3xl font-bold text-[#F9FAFB]">How this site was actually built.</h2>
        <p className="mt-3 max-w-xl text-[#9CA3AF]">
          The same process I use for client work. Infrastructure early, component-first, ship fast.
        </p>
      </div>

      <div className="relative">
        {/* Static track */}
        <div className="absolute bottom-3 left-[19px] top-3 w-px bg-[#1E2A3A]" />
        {/* Animated fill */}
        <motion.div
          className="absolute left-[19px] top-3 w-px origin-top bg-gradient-to-b from-[#3B82F6] to-[#10B981]"
          style={{ height: lineHeight }}
        />

        <div className="space-y-8">
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.phase}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.48, ease: EASE }}
              className="relative pl-12"
            >
              {/* Dot */}
              <span
                className="absolute left-[13px] top-1.5 h-[13px] w-[13px] rounded-full border-2"
                style={{
                  borderColor:     entry.color,
                  backgroundColor: '#0A0E1A',
                  boxShadow:       `0 0 0 4px ${entry.color}20`,
                }}
              />

              <div className="rounded-xl border border-[#1E2A3A] bg-[#111827]/60 p-5 transition-colors hover:border-[#2a3a50]">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold text-[#F9FAFB]">{entry.phase}</h3>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: `${entry.color}18`, color: entry.color }}
                  >
                    {entry.tag}
                  </span>
                  <span className="ml-auto font-mono text-xs text-[#6B7280]">{entry.time}</span>
                </div>
                <p className="text-sm leading-relaxed text-[#9CA3AF]">{entry.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
