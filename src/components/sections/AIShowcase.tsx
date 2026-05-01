'use client';

import { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

type Scene = {
  id: string;
  label: string;
  title: string;
  detail: string;
  impact: string;
  code: string[];
  output: string[];
  accent: string;
};

const SCENES: Scene[] = [
  {
    id: 'brief',
    label: '01 BRIEF',
    title: 'Unstructured request turns into a build map.',
    detail:
      'You give me a messy brief, I turn it into a concrete execution path with a clear finish line.',
    impact: 'No guesswork: defined phases, fixed priorities, and fewer expensive rewrites.',
    code: [
      'const brief = collectClientConstraints();',
      'const priorities = rankByBusinessImpact(brief.goals);',
      'const milestones = planMilestones(priorities, 3);',
      'return createRoadmap(milestones);',
    ],
    output: ['constraints parsed', '3 milestone track generated', 'delivery plan approved'],
    accent: '#3B82F6',
  },
  {
    id: 'build',
    label: '02 BUILD',
    title: 'Execution moves like product engineering, not agency handoffs.',
    detail:
      'Component systems, typed boundaries, and iteration loops happen in hours, not week-long status meetings.',
    impact: 'You see progress daily with working software, not slide decks.',
    code: [
      "const section = composeSection({ motion: 'story', perfBudget: 'strict' });",
      'runTypeChecks(section);',
      'runSmokeTests(section);',
      'deployPreview(section);',
    ],
    output: ['types passing', 'tests green', 'preview URL ready for review'],
    accent: '#06B6D4',
  },
  {
    id: 'result',
    label: '03 RESULT',
    title: 'Shipping produces measurable outcomes, not just pretty screens.',
    detail:
      'Every release closes a business loop: cleaner workflows, faster operations, and clearer conversion paths.',
    impact: 'The product starts paying for itself quickly because the implementation is tied to real decisions.',
    code: [
      'const leads = trackInboundLeads(window30d);',
      'const cycle = compareDeliveryTime(before, after);',
      'const roi = computeReturn(leads, cycle);',
      'publishOutcomeReport(roi);',
    ],
    output: ['live subscriber validated', 'manual work dropped', 'conversion flow simplified'],
    accent: '#10B981',
  },
];

function SceneDisplay({ scene }: { scene: Scene }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative overflow-hidden rounded-2xl border border-[#1E2A3A] bg-[#0A0E1A]"
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${scene.accent} 50%, transparent 100%)`,
          }}
        />
        <div className="flex items-center gap-2 border-b border-[#1E2A3A] bg-[#111827] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
          <span className="ml-2 font-mono text-xs text-[#6B7280]">build-session.ts</span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
          <div className="space-y-2 border-b border-[#1E2A3A] p-5 md:border-b-0 md:border-r">
            {scene.code.map((line, index) => (
              <div key={line} className="font-mono text-sm leading-relaxed text-[#9CA3AF]">
                <span className="mr-3 text-[#6B7280]">{String(index + 1).padStart(2, '0')}</span>
                {line}
              </div>
            ))}
          </div>
          <div className="space-y-2 p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#6B7280]">Runtime Output</p>
            {scene.output.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#D1FAE5]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: scene.accent }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ReducedMotionLayout() {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {SCENES.map((scene) => (
        <div key={scene.id} className="rounded-2xl border border-[#1E2A3A] bg-[#111827]/60 p-5">
          <p className="mb-3 font-mono text-xs tracking-wider text-[#6B7280]">{scene.label}</p>
          <h3 className="mb-3 text-lg font-semibold text-[#F9FAFB]">{scene.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-[#9CA3AF]">{scene.detail}</p>
          <p className="text-sm text-[#E5E7EB]">{scene.impact}</p>
        </div>
      ))}
    </div>
  );
}

export default function AIShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    const sceneSize = 1 / SCENES.length;
    const next = Math.min(SCENES.length - 1, Math.floor(latest / sceneSize));
    setActiveScene((prev) => (prev === next ? prev : next));
  });

  const currentScene = useMemo(() => SCENES[activeScene], [activeScene]);

  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-3xl" />
        <div className="absolute bottom-12 right-8 h-56 w-56 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">Signature Build System</p>
          <h2 className="max-w-3xl text-3xl font-bold text-[#F9FAFB] md:text-5xl">
            Scroll through the exact way an idea becomes a <span className="gradient-text-blue">working product.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9CA3AF] md:text-lg">
            This is the real delivery rhythm: define constraints, execute in tight loops, then ship outcomes people can measure.
          </p>
        </FadeIn>

        {prefersReducedMotion ? (
          <ReducedMotionLayout />
        ) : (
          <>
            <div ref={trackRef} className="relative mt-12 hidden h-[260vh] lg:block">
              <div className="sticky top-24 grid grid-cols-[0.95fr_1.05fr] gap-10">
                <div className="relative rounded-2xl border border-[#1E2A3A] bg-[#111827]/50 p-6">
                  <div className="pointer-events-none absolute bottom-0 left-8 top-8 w-px bg-[#1E2A3A]" />
                  <motion.div
                    className="pointer-events-none absolute left-8 top-8 w-px origin-top bg-[#3B82F6]"
                    style={{ height: progressHeight }}
                  />

                  <div className="space-y-8">
                    {SCENES.map((scene, index) => {
                      const isActive = index === activeScene;
                      return (
                        <button
                          key={scene.id}
                          type="button"
                          onClick={() => setActiveScene(index)}
                          className="group relative block w-full pl-8 text-left"
                          aria-pressed={isActive}
                        >
                          <span
                            className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 transition-all"
                            style={{
                              borderColor: isActive ? scene.accent : '#334155',
                              backgroundColor: isActive ? scene.accent : 'transparent',
                              boxShadow: isActive ? `0 0 0 6px ${scene.accent}20` : 'none',
                            }}
                          />
                          <p className="font-mono text-xs tracking-widest text-[#6B7280]">{scene.label}</p>
                          <p className={`mt-2 text-lg font-semibold ${isActive ? 'text-[#F9FAFB]' : 'text-[#9CA3AF] group-hover:text-[#E5E7EB]'}`}>
                            {scene.title}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{scene.detail}</p>
                          <p className="mt-3 text-sm text-[#E2E8F0]">{scene.impact}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <SceneDisplay scene={currentScene} />
              </div>
            </div>

            <div className="mt-10 space-y-4 lg:hidden">
              <div className="flex flex-wrap gap-2">
                {SCENES.map((scene, index) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setActiveScene(index)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition ${
                      index === activeScene
                        ? 'border-[#3B82F6] bg-[#3B82F6]/20 text-[#DBEAFE]'
                        : 'border-[#1E2A3A] bg-[#111827]/40 text-[#9CA3AF]'
                    }`}
                  >
                    {scene.label}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border border-[#1E2A3A] bg-[#111827]/50 p-5">
                <h3 className="text-xl font-semibold text-[#F9FAFB]">{currentScene.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">{currentScene.detail}</p>
                <p className="mt-4 text-sm text-[#E2E8F0]">{currentScene.impact}</p>
              </div>
              <SceneDisplay scene={currentScene} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
