'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

type Phase = {
  id: string;
  label: string;
  filename: string;
  title: string;
  outcome: string;
  color: string;
};

const PHASES: Phase[] = [
  {
    id: 'plan',
    label: 'Plan',
    filename: 'plan.ts',
    title: 'A real plan, not a guess.',
    outcome: 'Fixed scope. Fixed timeline. Fixed price.',
    color: '#5B8DEF',
  },
  {
    id: 'build',
    label: 'Build',
    filename: 'engler.tsx',
    title: 'Working software every Friday.',
    outcome: 'You steer the product while it ships, not after.',
    color: '#06B6D4',
  },
  {
    id: 'result',
    label: 'Result',
    filename: 'analytics.ts',
    title: 'Numbers that move.',
    outcome: 'Every feature tied to a metric you can read.',
    color: '#10B981',
  },
];

// --- syntax tokens ----------------------------------------------------------

const Kw = ({ children }: { children: ReactNode }) => <span className="text-[#C084FC]">{children}</span>;
const St = ({ children }: { children: ReactNode }) => <span className="text-[#86EFAC]">{children}</span>;
const Nu = ({ children }: { children: ReactNode }) => <span className="text-[#FDBA74]">{children}</span>;
const Tg = ({ children }: { children: ReactNode }) => <span className="text-[#7DD3FC]">{children}</span>;
const Hd = ({ children }: { children: ReactNode }) => <span className="text-[#F472B6]">{children}</span>;
const Cm = ({ children }: { children: ReactNode }) => <span className="italic text-[#6B7280]">{children}</span>;
const Pr = ({ children }: { children: ReactNode }) => <span className="text-[#94A3B8]">{children}</span>;

const CODE_LINES: ReactNode[][] = [
  [
    <><Kw>const</Kw> <Pr>plan</Pr> = {'{'}</>,
    <>{'  '}<Pr>client</Pr>: <St>{`'Engler Contracting'`}</St>,</>,
    <>{'  '}<Pr>weeks</Pr>:  <Nu>8</Nu>,</>,
    <>{'  '}<Pr>budget</Pr>: <Nu>6500</Nu>,</>,
    <>{'  '}<Pr>ship</Pr>:   <St>{`'2026-07-26'`}</St>,</>,
    <>{'}'};</>,
  ],
  [
    <>{'<'}<Tg>Card</Tg> <Pr>href</Pr>=<St>{`"/engler"`}</St>{'>'}</>,
    <>{'  <'}<Tg>Image</Tg> <Pr>src</Pr>=<St>{`"/engler.jpg"`}</St> {'/>'}</>,
    <>{'  <'}<Tg>Tag</Tg>{'>'}Live{'</'}<Tg>Tag</Tg>{'>'}</>,
    <>{'  <'}<Hd>h3</Hd>{'>'}Engler Contracting{'</'}<Hd>h3</Hd>{'>'}</>,
    <>{'  <'}<Tg>Button</Tg>{'>'}View site →{'</'}<Tg>Button</Tg>{'>'}</>,
    <>{'</'}<Tg>Card</Tg>{'>'}</>,
  ],
  [
    <><Kw>const</Kw> <Pr>stats</Pr> = <Kw>await</Kw> <Pr>db</Pr></>,
    <>{'  .'}<Tg>from</Tg>(<St>{`'engler.events'`}</St>)</>,
    <>{'  .'}<Tg>since</Tg>(<St>{`'30d'`}</St>);</>,
    <>{' '}</>,
    <><Cm>{'// → conversion:  48%'}</Cm></>,
    <><Cm>{'// → page_load:   1.2s'}</Cm></>,
    <><Cm>{'// → leads:      +38%'}</Cm></>,
  ],
];

// --- code panel -------------------------------------------------------------

function CodePanel({
  phaseIndex,
  progress,
  color,
}: {
  phaseIndex: number;
  progress: MotionValue<number>;
  color: string;
}) {
  const lines = CODE_LINES[phaseIndex];
  const phase = PHASES[phaseIndex];
  const [revealed, setRevealed] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    const target = Math.min(lines.length, Math.ceil((Math.min(0.35, v) / 0.35) * lines.length));
    setRevealed((prev) => (prev === target ? prev : target));
  });

  return (
    <div className="overflow-hidden rounded-xl border border-[#1B1F2A] bg-[#07080B] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-1.5 border-b border-[#1B1F2A] bg-[#101319] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <motion.span
          key={phase.filename}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="ml-3 font-mono text-[10px] text-[#9CA3AF]"
        >
          {phase.filename}
        </motion.span>
      </div>
      <div className="min-h-[150px] p-3 font-mono text-[11px] leading-[1.65] text-[#E5E7EB] md:min-h-[260px] md:p-4 md:text-[13px] md:leading-[1.75]">
        {lines.map((line, i) => (
          <motion.div
            key={`${phaseIndex}-${i}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: i < revealed ? 1 : 0, y: i < revealed ? 0 : 4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex whitespace-pre"
          >
            <span className="mr-3 select-none text-[#374151]">{String(i + 1).padStart(2, ' ')}</span>
            <span>{line}</span>
          </motion.div>
        ))}
        <motion.span
          className="mt-1 inline-block h-3.5 w-1.5 align-middle md:h-4"
          style={{ backgroundColor: color }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

// --- preview: plan ----------------------------------------------------------

function PlanPreview({ progress }: { progress: MotionValue<number> }) {
  const items = [
    { name: 'Discovery',     weeks: 1, dates: 'Jun 1 — Jun 7'  },
    { name: 'Design system', weeks: 2, dates: 'Jun 8 — Jun 21' },
    { name: 'Build & ship',  weeks: 4, dates: 'Jun 22 — Jul 19' },
    { name: 'Launch',        weeks: 1, dates: 'Jul 20 — Jul 26' },
  ];
  const [step, setStep] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.25) / 0.4));
    const target = Math.floor(t * (items.length + 1));
    setStep((prev) => (prev === target ? prev : target));
  });

  return (
    <div className="rounded-xl border border-[#1B1F2A] bg-[#0E1117] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#6B7280]">Project plan</p>
          <p className="text-sm font-semibold text-[#F9FAFB] md:text-base">Engler Contracting</p>
        </div>
        <div className="rounded-md border border-[#5B8DEF]/30 bg-[#5B8DEF]/10 px-2 py-1">
          <span className="font-mono text-[11px] text-[#5B8DEF]">$6,500</span>
        </div>
      </div>
      <div className="space-y-1.5 md:space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: i < step ? 1 : 0, x: i < step ? 0 : -8 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="flex items-center gap-3 rounded-lg border border-[#1B1F2A] bg-[#07080B] px-3 py-2"
          >
            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5B8DEF]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-[#E5E7EB] md:text-sm">{item.name}</p>
              <p className="font-mono text-[9px] text-[#6B7280] md:text-[10px]">{item.dates}</p>
            </div>
            <div className="font-mono text-[11px] text-[#9CA3AF]">{item.weeks}w</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= items.length ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 flex items-center justify-between border-t border-[#1B1F2A] pt-3"
      >
        <span className="text-[11px] text-[#9CA3AF] md:text-xs">8 weeks · ships Jul 26</span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#10B981] md:text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10B981]" />
          On schedule
        </span>
      </motion.div>
    </div>
  );
}

// --- preview: build ---------------------------------------------------------

function BuildPreview({ progress }: { progress: MotionValue<number> }) {
  const [stage, setStage] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.2) / 0.5));
    const target = Math.floor(t * 7);
    setStage((prev) => (prev === target ? prev : target));
  });

  return (
    <div className="rounded-xl border border-[#1B1F2A] bg-[#0E1117] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-[#6B7280]">Live preview</p>
        <motion.span
          className="flex items-center gap-1.5 text-[10px]"
          animate={{ opacity: stage >= 6 ? 1 : 0.25 }}
          style={{ color: stage >= 6 ? '#10B981' : '#6B7280' }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stage >= 6 ? '#10B981' : '#374151' }} />
          {stage >= 6 ? 'Deployed' : 'Building...'}
        </motion.span>
      </div>

      <motion.div
        className="overflow-hidden rounded-xl border bg-[#07080B]"
        animate={{ borderColor: stage >= 1 ? '#06B6D4' : '#1B1F2A' }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#1B1F2A] to-[#0E1117]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background:
                'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(91,141,239,0.3) 50%, rgba(16,185,129,0.3) 100%)',
            }}
          />
          {stage < 2 && (
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                backgroundSize: '200% 100%',
              }}
            />
          )}
          {/* Faux content silhouette inside the image */}
          <motion.div
            className="absolute inset-0 flex items-end p-3 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex w-full items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-white/30 md:h-8 md:w-8" />
              <div className="flex-1">
                <div className="h-2 w-1/2 rounded bg-white/40" />
                <div className="mt-1 h-1.5 w-1/3 rounded bg-white/20" />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute left-3 top-3 rounded-md bg-[#10B981] px-2 py-0.5 shadow-lg"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : -6 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-white md:text-[10px]">Live</span>
          </motion.div>
        </div>

        <div className="space-y-2 p-3 md:p-4">
          <motion.h3
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: stage >= 4 ? 1 : 0, y: stage >= 4 ? 0 : 4 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold text-[#F9FAFB] md:text-base"
          >
            Engler Contracting
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-[11px] text-[#9CA3AF] md:text-xs"
          >
            Vinyl siding · Roofing · Family-run since 1998
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 4 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg bg-[#06B6D4] px-3 py-1.5 text-[11px] font-semibold text-[#07080B] md:px-4 md:py-2 md:text-xs"
          >
            View site →
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: stage >= 6 ? 1 : 0, y: stage >= 6 ? 0 : 6 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mt-3 flex items-center gap-2 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-2"
      >
        <span className="text-xs text-[#10B981]">●</span>
        <span className="font-mono text-[11px] text-[#D1D5DB]">deploy preview · 1.2s build · ✓ Friday demo</span>
      </motion.div>
    </div>
  );
}

// --- preview: results -------------------------------------------------------

function ResultsPreview({ progress }: { progress: MotionValue<number> }) {
  const conversionMV = useTransform(progress, [0.15, 0.5], [0, 48]);
  const loadMV       = useTransform(progress, [0.2, 0.5],  [3.4, 1.2]);
  const bounceMV     = useTransform(progress, [0.25, 0.55], [62, 28]);
  const chartMV      = useTransform(progress, [0.3, 0.65], [1, 0]);
  const badgeOp      = useTransform(progress, [0.6, 0.72], [0, 1]);
  const badgeScale   = useTransform(progress, [0.6, 0.72], [0.85, 1]);
  const areaOp       = useTransform(progress, [0.4, 0.65], [0, 0.45]);

  const [conv, setConv]     = useState(0);
  const [load, setLoad]     = useState(3.4);
  const [bounce, setBounce] = useState(62);

  useMotionValueEvent(conversionMV, 'change', (v) => setConv(Math.round(v)));
  useMotionValueEvent(loadMV,       'change', (v) => setLoad(Math.round(v * 10) / 10));
  useMotionValueEvent(bounceMV,     'change', (v) => setBounce(Math.round(v)));

  const points = [10, 13, 11, 16, 14, 19, 17, 24, 28, 27, 34, 39, 46];
  const w = 280;
  const h = 64;
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h * 0.85 - 4;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="rounded-xl border border-[#1B1F2A] bg-[#0E1117] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#6B7280]">Last 30 days</p>
          <p className="font-mono text-sm text-[#F9FAFB] md:text-base">englercontracting.com</p>
        </div>
        <motion.div
          style={{ opacity: badgeOp, scale: badgeScale }}
          className="rounded-md border border-[#10B981]/40 bg-[#10B981]/15 px-2 py-1"
        >
          <span className="font-mono text-[11px] font-semibold text-[#10B981]">+38% leads</span>
        </motion.div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-1.5 md:gap-3">
        <Kpi label="Conversion" value={`${conv}%`}        color="#10B981" />
        <Kpi label="Page load"  value={`${load.toFixed(1)}s`} color="#06B6D4" />
        <Kpi label="Bounce"     value={`${bounce}%`}      color="#5B8DEF" />
      </div>

      <div className="rounded-lg border border-[#1B1F2A] bg-[#07080B] p-2 md:p-3">
        <svg viewBox={`0 0 ${w} ${h + 8}`} className="h-16 w-full md:h-20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ai-results-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#10B981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1="0"
              x2={w}
              y1={(h / 3) * i + 4}
              y2={(h / 3) * i + 4}
              stroke="#1B1F2A"
              strokeWidth="0.5"
            />
          ))}
          <motion.path d={areaPath} fill="url(#ai-results-area)" style={{ opacity: areaOp }} />
          <motion.path
            d={path}
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: chartMV }}
          />
        </svg>
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#6B7280] md:text-[10px]">
          <span>Apr 01</span>
          <span>Apr 30</span>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-[#1B1F2A] bg-[#07080B] px-2 py-2 md:px-3 md:py-3">
      <p className="mb-0.5 text-[9px] uppercase tracking-wider text-[#6B7280] md:text-[10px]">{label}</p>
      <p className="font-mono text-base font-bold tabular-nums md:text-xl" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

// --- progress rail ----------------------------------------------------------

function ProgressRail({
  scrollProgress,
  phaseIndex,
}: {
  scrollProgress: MotionValue<number>;
  phaseIndex: number;
}) {
  const fill = useTransform(scrollProgress, [0, 1], [0, 1]);

  return (
    <div className="mb-5 px-2 md:mb-7 md:px-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[5px] h-px bg-[#1B1F2A]" />
        <motion.div
          className="absolute left-0 top-[5px] h-px origin-left"
          style={{
            scaleX: fill,
            width: '100%',
            backgroundImage: `linear-gradient(90deg, ${PHASES[0].color} 0%, ${PHASES[1].color} 50%, ${PHASES[2].color} 100%)`,
          }}
        />
        <div className="relative flex justify-between">
          {PHASES.map((p, i) => {
            const reached = i <= phaseIndex;
            const active = i === phaseIndex;
            return (
              <div key={p.id} className="flex flex-col items-center">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full border-2 md:h-3 md:w-3"
                  animate={{
                    borderColor: p.color,
                    backgroundColor: reached ? p.color : '#07080B',
                    boxShadow: active ? `0 0 12px ${p.color}` : '0 0 0 rgba(0,0,0,0)',
                    scale: active ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <p
                  className="mt-2 font-mono text-[9px] uppercase tracking-wider transition-colors md:text-[10px]"
                  style={{ color: active ? p.color : '#6B7280' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  className="text-[10px] font-medium transition-colors md:text-xs"
                  style={{ color: active ? '#F9FAFB' : '#6B7280' }}
                >
                  {p.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- preview switcher -------------------------------------------------------

function Preview({ phaseIndex, progress }: { phaseIndex: number; progress: MotionValue<number> }) {
  if (phaseIndex === 0) return <PlanPreview progress={progress} />;
  if (phaseIndex === 1) return <BuildPreview progress={progress} />;
  return <ResultsPreview progress={progress} />;
}

// --- header -----------------------------------------------------------------

function Header() {
  return (
    <FadeIn>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#5B8DEF]">
        How a build comes together
      </p>
      <h2 className="max-w-3xl text-3xl font-bold text-[#F9FAFB] md:text-5xl">
        An idea, in <span className="gradient-text-blue">three scenes.</span>
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9CA3AF] md:text-lg">
        Code on the left. Working software on the right. Scroll to watch one project move from a sentence to a shipped page.
      </p>
    </FadeIn>
  );
}

// --- reduced-motion fallback ------------------------------------------------

function ReducedMotionLayout() {
  return (
    <div className="mt-10 space-y-4">
      {PHASES.map((phase, i) => (
        <div
          key={phase.id}
          className="rounded-2xl border border-[#1B1F2A] bg-[#101319]/60 p-6"
          style={{ borderTop: `2px solid ${phase.color}` }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
              style={{ backgroundColor: phase.color }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: phase.color }}
            >
              {phase.label}
            </span>
          </div>
          <p className="text-base font-semibold text-[#F9FAFB]">{phase.title}</p>
          <p className="mt-2 text-sm text-[#9CA3AF]">{phase.outcome}</p>
        </div>
      ))}
    </div>
  );
}

// --- main -------------------------------------------------------------------

export default function AIShowcase() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const phaseProgress = useTransform(smooth, (v) => {
    const size = 1 / PHASES.length;
    const idx = Math.min(PHASES.length - 1, Math.floor(v / size));
    return Math.max(0, Math.min(1, (v - idx * size) / size));
  });

  const [phase, setPhase] = useState(0);
  useMotionValueEvent(smooth, 'change', (v) => {
    const size = 1 / PHASES.length;
    const next = Math.min(PHASES.length - 1, Math.floor(v / size));
    setPhase((p) => (p === next ? p : next));
  });

  const hintOpacity = useTransform(smooth, [0, 0.04], [1, 0]);

  if (reduce) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Header />
          <ReducedMotionLayout />
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-3xl" />
        <div className="absolute bottom-12 right-8 h-56 w-56 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        <Header />
      </div>

      <div ref={trackRef} className="relative mt-12 h-[320vh] md:h-[360vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-5xl">
            <ProgressRail scrollProgress={smooth} phaseIndex={phase} />

            <motion.div
              style={{ opacity: hintOpacity }}
              className="mb-3 flex justify-center"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
                <span>Scroll to play</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.span>
              </div>
            </motion.div>

            <div className="grid gap-3 md:grid-cols-2 md:gap-5">
              <CodePanel
                phaseIndex={phase}
                progress={phaseProgress}
                color={PHASES[phase].color}
              />
              <Preview phaseIndex={phase} progress={phaseProgress} />
            </div>

            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-4 px-2 text-center md:mt-6"
            >
              <p
                className="text-base font-semibold md:text-lg"
                style={{ color: PHASES[phase].color }}
              >
                {PHASES[phase].title}
              </p>
              <p className="mt-1 text-sm text-[#9CA3AF] md:text-base">
                {PHASES[phase].outcome}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
