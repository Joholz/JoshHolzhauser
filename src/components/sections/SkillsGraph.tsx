'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STACK = [
  {
    category: 'Frontend',
    color: '#3B82F6',
    skills: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend & Data',
    color: '#06B6D4',
    skills: ['Node.js', 'Firebase', 'Firestore', 'REST APIs', 'Google APIs', 'Resend'],
  },
  {
    category: 'AI & Tooling',
    color: '#8B5CF6',
    skills: ['LLM Integration', 'Web Scraping', 'Workflow Automation', 'GitHub', 'Vercel', 'Expo'],
  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function SkillsGraph() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {STACK.map((cat, catIdx) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: catIdx * 0.12, duration: 0.5, ease: EASE }}
          whileHover={{ boxShadow: `0 0 40px ${cat.color}18`, borderColor: `${cat.color}40` }}
          className="rounded-2xl border border-[#1E2A3A] bg-[#111827] p-7 transition-colors"
        >
          <div className="mb-6 flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}60` }}
            />
            <h3 className="text-sm font-semibold text-[#F9FAFB]">{cat.category}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, skillIdx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.84 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: catIdx * 0.12 + skillIdx * 0.055 + 0.15,
                  duration: 0.32,
                  ease: EASE,
                }}
                whileHover={{
                  scale: 1.06,
                  color: cat.color,
                  borderColor: `${cat.color}55`,
                  boxShadow: `0 0 12px ${cat.color}28`,
                  transition: { duration: 0.12 },
                }}
                className="cursor-default rounded-md border border-[#1E2A3A] bg-[#1a2332] px-2.5 py-1.5 font-mono text-xs text-[#6B7280]"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
