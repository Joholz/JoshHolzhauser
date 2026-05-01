'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { Check, Zap, TrendingUp } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

type Phase = {
  id: string;
  number: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
};

const PHASES: Phase[] = [
  {
    id: 'brief',
    number: '01',
    title: 'Requirements & Timeline',
    problem: 'You have an idea. Unclear scope, unclear timeline, unclear cost.',
    solution: 'I translate your concept into a prioritized roadmap with fixed phases and realistic estimates.',
    outcome: "You know exactly what you're getting, when you'll have it, and what it costs.",
    icon: <Check className="h-5 w-5" />,
    accentColor: '#3B82F6',
    bgColor: '#3B82F6',
  },
  {
    id: 'build',
    number: '02',
    title: 'Working Software Weekly',
    problem: "You're waiting for the big reveal after months of development.",
    solution: 'Every week you see running software—not mockups, not promises. Sprints, demos, feedback loops, deploy previews.',
    outcome: "You steer the product as it's being built instead of trying to change it after launch.",
    icon: <Zap className="h-5 w-5" />,
    accentColor: '#06B6D4',
    bgColor: '#06B6D4',
  },
  {
    id: 'result',
    number: '03',
    title: 'Measurable Results',
    problem: 'The website is live. But is it actually helping your business?',
    solution: 'Every feature is tied to a real business goal: faster workflows, clearer customer paths, lower operational costs.',
    outcome: 'You have proof that the product is earning back its investment quickly.',
    icon: <TrendingUp className="h-5 w-5" />,
    accentColor: '#10B981',
    bgColor: '#10B981',
  },
];

function PhaseCard({ phase, isActive, scrollProgress }: { phase: Phase; isActive: boolean; scrollProgress: number }) {
  return (
    <motion.div
      className="relative rounded-2xl border border-[#1E2A3A] bg-[#111827]/60 p-6 transition-all duration-300 md:p-8"
      animate={{
        borderColor: isActive ? phase.accentColor : '#1E2A3A',
        backgroundColor: isActive ? `${phase.bgColor}08` : '#111827/60',
        boxShadow: isActive ? `0 0 24px ${phase.accentColor}20` : 'none',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
        style={{
          background: isActive
            ? `linear-gradient(90deg, ${phase.accentColor} 0%, ${phase.accentColor}40 100%)`
            : 'transparent',
        }}
      />

      {/* Phase number */}
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: phase.accentColor,
            opacity: isActive ? 1 : 0.5,
          }}
        >
          <span className="text-sm font-bold text-white">{phase.number}</span>
        </span>
        <span
          className="text-xs font-semibold uppercase tracking-widest transition-opacity"
          style={{ color: phase.accentColor, opacity: isActive ? 1 : 0.6 }}
        >
          {phase.title}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <p className="text-sm leading-relaxed text-[#9CA3AF]">{phase.problem}</p>
        </div>

        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 border-t border-[#1E2A3A] pt-4"
          >
            <div>
              <p className="text-sm font-semibold text-[#E5E7EB]">{phase.solution}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[#0A0E1A]/50 p-3">
              <div className="mt-0.5 flex-shrink-0" style={{ color: phase.accentColor }}>
                {phase.icon}
              </div>
              <p className="text-sm text-[#D1D5DB]">{phase.outcome}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-12 left-1/2 h-6 w-1 -translate-x-1/2"
          style={{
            background: phase.accentColor,
            opacity: Math.min(1, scrollProgress * 3),
          }}
        />
      )}
    </motion.div>
  );
}

function ReducedMotionLayout() {
  return (
    <div className="mt-10 space-y-4">
      {PHASES.map((phase) => (
        <div key={phase.id} className="rounded-2xl border border-[#1E2A3A] bg-[#111827]/60 p-6">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: phase.accentColor }}
            >
              <span className="text-sm font-bold text-white">{phase.number}</span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: phase.accentColor }}>
              {phase.title}
            </span>
          </div>
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-[#9CA3AF]">{phase.problem}</p>
            <p className="text-sm font-semibold text-[#E5E7EB]">{phase.solution}</p>
            <div className="flex items-start gap-3 rounded-lg bg-[#0A0E1A]/50 p-3">
              <div className="mt-0.5 flex-shrink-0" style={{ color: phase.accentColor }}>
                {phase.icon}
              </div>
              <p className="text-sm text-[#D1D5DB]">{phase.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AIShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    const phaseSize = 1 / PHASES.length;
    const next = Math.min(PHASES.length - 1, Math.floor(latest / phaseSize));
    setActivePhase((prev) => (prev === next ? prev : next));
  });

  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-3xl" />
        <div className="absolute bottom-12 right-8 h-56 w-56 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">Signature Build System</p>
          <h2 className="max-w-3xl text-3xl font-bold text-[#F9FAFB] md:text-5xl">
            The way ideas become <span className="gradient-text-blue">working products.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9CA3AF] md:text-lg">
            Clear timeline. Weekly progress. Measurable results. Here's how I work, step by step.
          </p>
        </FadeIn>

        {prefersReducedMotion ? (
          <ReducedMotionLayout />
        ) : (
          <div ref={trackRef} className="relative mt-12 h-[180vh]">
            {/* Vertical timeline connector */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#1E2A3A] via-[#3B82F6]/50 to-[#1E2A3A] md:left-12 md:block" />

            {/* Phases grid */}
            <div className="sticky top-20 space-y-6 md:space-y-8">
              {PHASES.map((phase, index) => {
                // Calculate scroll progress for this phase
                const phaseStart = index / PHASES.length;
                const phaseEnd = (index + 1) / PHASES.length;
                const phaseProgressValue = Math.max(
                  0,
                  Math.min(1, (activePhase - index) / (1 / PHASES.length) + 1)
                );

                return (
                  <motion.div
                    key={phase.id}
                    className="relative md:pl-20"
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, margin: '-50%' }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Timeline dot (hidden on mobile) */}
                    <motion.div
                      className="absolute -left-3 top-6 hidden h-6 w-6 rounded-full border-2 md:block"
                      style={{
                        borderColor: phase.accentColor,
                        backgroundColor: index <= activePhase ? phase.accentColor : 'transparent',
                      }}
                    />

                    <PhaseCard
                      phase={phase}
                      isActive={index === activePhase}
                      scrollProgress={phaseProgressValue}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
