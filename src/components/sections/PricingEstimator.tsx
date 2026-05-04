'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TYPES = [
  { id: 'web',        label: 'Web Presence',    base: [800,  1500]  as [number, number], color: '#5B8DEF', desc: 'Business site + lead capture' },
  { id: 'app',        label: 'Business App',    base: [2500, 6000]  as [number, number], color: '#06B6D4', desc: 'Custom workflow tool' },
  { id: 'automation', label: 'AI & Automation', base: [1500, 4000]  as [number, number], color: '#8B5CF6', desc: 'Automate manual work with AI' },
  { id: 'mobile',     label: 'Mobile App',      base: [3000, 7500]  as [number, number], color: '#F59E0B', desc: 'iOS + Android with Firebase' },
  { id: 'saas',       label: 'Full SaaS',       base: [5000, 12000] as [number, number], color: '#10B981', desc: 'Auth · payments · admin · users' },
];

const TIMELINES = [
  { id: 'asap',     label: 'ASAP',     sub: '< 4 weeks',  mult: 1.3 },
  { id: 'standard', label: 'Standard', sub: '1–3 months', mult: 1.0 },
  { id: 'flexible', label: 'Flexible', sub: 'No deadline', mult: 0.9 },
];

const COMPLEXITY = [
  { id: 'simple',   label: 'Simple',   desc: 'Clear scope, minimal integrations', mult: 0.75 },
  { id: 'moderate', label: 'Moderate', desc: 'Custom logic, 1–2 APIs',             mult: 1.0  },
  { id: 'complex',  label: 'Complex',  desc: 'Multi-system, custom workflows',     mult: 1.4  },
];

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    const startTime = performance.now();
    const dur = 480;
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - startTime) / dur, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return display;
}

function getNote(typeId: string, timelineId: string, complexityId: string): string {
  if (timelineId === 'asap' && complexityId === 'complex') {
    return 'Rush + complex scope is achievable but requires locking every deliverable before day one. Start with a call to define the edge cases.';
  }
  if (typeId === 'saas') {
    return 'SaaS scope sharpens fast on a 30-minute call — most of what you think is "complex" has a simpler path. The number above is the floor; multi-tenant, custom billing, or deep analytics push it up.';
  }
  if (timelineId === 'flexible' && complexityId === 'simple') {
    return 'Best-case scenario. Clean scope and no deadline pressure means a polished result with nothing cut. This is the easiest engagement to run.';
  }
  if (typeId === 'automation') {
    return 'Automation projects often surface more opportunity once the workflow is mapped. Budget some buffer for the "I didn\'t know we could fix that too" moments.';
  }
  return 'This number sharpens significantly after a 30-minute call. No obligation — just a conversation about what\'s actually in scope.';
}

export function PricingEstimator() {
  const [type,       setType]       = useState(TYPES[1]);
  const [timeline,   setTimeline]   = useState(TIMELINES[1]);
  const [complexity, setComplexity] = useState(COMPLEXITY[1]);

  const rawLow = Math.round(type.base[0] * timeline.mult * complexity.mult / 100) * 100;

  const low  = useAnimatedNumber(rawLow);
  const note = getNote(type.id, timeline.id, complexity.id);

  return (
    <div className="relative mb-20 overflow-hidden rounded-3xl border border-[#1B1F2A] bg-[#101319]/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5B8DEF] to-transparent" />

      <div className="p-6 md:p-12">
        <div className="mb-10">
          <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7280]">
            Rough Estimate Calculator
          </p>
          <h2 className="text-2xl font-bold text-[#F9FAFB] md:text-3xl">
            What does your build actually cost?
          </h2>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Configure below — the number updates live. No email required.
          </p>
        </div>

        {/* Type */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            What are you building?
          </p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t)}
                className="flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all duration-200"
                style={
                  type.id === t.id
                    ? { borderColor: t.color, color: t.color, background: `${t.color}14` }
                    : { borderColor: '#1B1F2A', color: '#9CA3AF' }
                }
              >
                <span className="text-xs font-semibold">{t.label}</span>
                <span className="text-xs opacity-60">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            What&apos;s the timeline?
          </p>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeline(t)}
                className={`rounded-xl border px-5 py-3 text-left transition-all duration-200 ${
                  timeline.id === t.id
                    ? 'border-[#5B8DEF] bg-[#5B8DEF]/14 text-[#DBEAFE]'
                    : 'border-[#1B1F2A] text-[#9CA3AF] hover:border-[#262B38]'
                }`}
              >
                <span className="block text-xs font-semibold">{t.label}</span>
                <span className="block text-xs opacity-60">{t.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            How complex?
          </p>
          <div className="flex flex-wrap gap-2">
            {COMPLEXITY.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setComplexity(c)}
                className={`rounded-xl border px-5 py-3 text-left transition-all duration-200 ${
                  complexity.id === c.id
                    ? 'border-[#06B6D4] bg-[#06B6D4]/14 text-[#CFFAFE]'
                    : 'border-[#1B1F2A] text-[#9CA3AF] hover:border-[#262B38]'
                }`}
              >
                <span className="block text-xs font-semibold">{c.label}</span>
                <span className="block text-xs opacity-60">{c.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Output */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${type.id}-${timeline.id}-${complexity.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-2xl border border-[#1B1F2A] bg-[#07080B] p-4 md:p-8"
            style={{ boxShadow: `0 0 40px ${type.color}10` }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex-1">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[#6B7280]">
                  Starting at &mdash; {type.label} &middot; {timeline.label} &middot; {complexity.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-[#6B7280]">from</span>
                  <span className="text-3xl font-bold sm:text-4xl md:text-5xl" style={{ color: type.color }}>
                    ${low.toLocaleString()}
                  </span>
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#9CA3AF]">{note}</p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/book"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B8DEF] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#4775D9] hover:shadow-[0_0_24px_rgba(91,141,239,0.5)] md:w-auto"
                >
                  Lock in this scope
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
