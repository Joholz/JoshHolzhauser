'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPED_STRINGS = [
  'websites',
  'custom tools',
  'automations',
  'mobile apps',
  'software',
];

function Typewriter() {
  const [idx, setIdx]     = useState(0);
  const [text, setText]   = useState('');
  const [deleting, setDel] = useState(false);

  useEffect(() => {
    const target  = TYPED_STRINGS[idx];
    const timeout = deleting
      ? setTimeout(() => {
          setText(t => t.slice(0, -1));
          if (text.length <= 1) {
            setDel(false);
            setIdx(i => (i + 1) % TYPED_STRINGS.length);
          }
        }, 40)
      : setTimeout(() => {
          setText(target.slice(0, text.length + 1));
          if (text === target) setTimeout(() => setDel(true), 1800);
        }, 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <span className="gradient-text-blue">
      {text}
      <span
        className="inline-block w-0.5 h-[1em] bg-[#5B8DEF] ml-0.5 align-middle"
        style={{ animation: 'blink 1s step-end infinite' }}
      />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-16"
      style={{ minHeight: '100dvh' }}
    >
      {/* Vignette overlay — improves text readability over the global WebGL scene */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(10,14,26,0.65) 100%)',
        }}
      />
      {/* Soft blue centre glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] bg-[#5B8DEF]/6 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#101319] border border-[#1B1F2A] text-[#9CA3AF] text-xs font-medium px-3 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Available for new projects
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          I build&nbsp;
          <Typewriter />
          <br />
          <span className="gradient-text">that fit your business.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto text-lg text-[#9CA3AF] leading-relaxed mb-10"
        >
          From a small business website to a custom tool to a product you sell — I take rough ideas
          and turn them into things people actually use, then keep them running as you grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book"
            className="group flex items-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(91,141,239,0.5)] text-sm w-full sm:w-auto justify-center"
          >
            Book a Free Discovery Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] font-medium text-sm transition-colors border border-[#1B1F2A] hover:border-[#5B8DEF]/40 px-6 py-3.5 rounded-xl w-full sm:w-auto justify-center"
          >
            See My Work ↓
          </Link>
        </motion.div>

        {/* Trust anchors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7280]"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#5B8DEF]" />
            <span>Real products in production</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#1B1F2A]" />
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Fast delivery, minimal briefing</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#1B1F2A]" />
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Maintained &amp; improved over time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
