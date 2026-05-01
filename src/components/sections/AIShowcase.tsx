'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

const LINES = [
  { delay: 0,    text: '$ analyzing business workflow...',   color: '#9CA3AF' },
  { delay: 900,  text: '✓ identified 14 manual tasks',       color: '#10B981' },
  { delay: 1800, text: '$ connecting google sheets API...',  color: '#9CA3AF' },
  { delay: 2700, text: '✓ 247 records synced successfully',  color: '#10B981' },
  { delay: 3500, text: '$ building intake form...',          color: '#9CA3AF' },
  { delay: 4400, text: '✓ secure form + email alerts ready', color: '#10B981' },
  { delay: 5200, text: '$ deploying to production...',       color: '#9CA3AF' },
  { delay: 6100, text: '✓ app live · client paying $20/mo', color: '#06B6D4' },
];

function TerminalLine({ text, color }: { text: string; color: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 80); return () => clearTimeout(t); }, []);
  return shown ? (
    <div className="flex items-start gap-2 text-sm" style={{ color }}>
      <span className="font-mono">{text}</span>
    </div>
  ) : null;
}

function Terminal() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-100px' });
  const [lines, setLines] = useState<typeof LINES>([]);

  useEffect(() => {
    if (!inView) return;
    setLines([]);
    LINES.forEach(line => {
      setTimeout(() => setLines(prev => [...prev, line]), line.delay);
    });
  }, [inView]);

  return (
    <div ref={ref} className="bg-[#0A0E1A] border border-[#1E2A3A] rounded-2xl overflow-hidden shadow-2xl">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-[#1E2A3A]">
        <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
        <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
        <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
        <span className="ml-3 text-xs text-[#6B7280] font-mono">josh-ai-workflow ~ zsh</span>
      </div>
      <div className="p-6 space-y-2.5 min-h-[300px]">
        {lines.map((line, i) => (
          <TerminalLine key={i} text={line.text} color={line.color} />
        ))}
        {lines.length > 0 && lines.length < LINES.length && (
          <div className="flex items-center gap-1 text-sm text-[#9CA3AF]">
            <span className="font-mono">_</span>
            <span
              className="inline-block w-2 h-4 bg-[#3B82F6]"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <FadeIn>
          <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">AI-Powered Development</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-5">
            I use AI to build <span className="gradient-text-blue">faster than an agency.</span>
          </h2>
          <p className="text-[#9CA3AF] leading-relaxed mb-6">
            From workflow analysis to automated testing, I leverage AI tools throughout the entire
            development process — which means your project ships faster, with fewer bugs, at a fraction
            of agency cost.
          </p>
          <ul className="space-y-3">
            {[
              'AI-assisted code generation & review',
              'Automated testing & quality checks',
              'AI-powered data processing & integrations',
              'Smart form logic & workflow automation',
            ].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#9CA3AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Terminal demo */}
        <FadeIn delay={0.2}>
          <Terminal />
        </FadeIn>
      </div>
    </section>
  );
}
