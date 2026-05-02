import { MessageSquare, Code, Rocket, Wrench } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const steps = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    description:
      'You send me what you\'ve got — a rough idea, a process you hate, a spreadsheet you\'re embarrassed by. I ask the questions. You don\'t write a spec.',
    color: '#5B8DEF',
  },
  {
    step: '02',
    icon: Code,
    title: 'Build',
    description:
      'I scope it, price it, and build it. You get updates along the way. I make the technical calls — that\'s what you\'re paying for.',
    color: '#06B6D4',
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Launch',
    description:
      'Your product goes live. I walk you through how it works. You won\'t need a developer just to use what I built you.',
    color: '#8B5CF6',
  },
  {
    step: '04',
    icon: Wrench,
    title: 'Maintain & Improve',
    description:
      'Most of my clients are still clients a year later. I keep systems running, add features as the business grows, and fix things when they break.',
    color: '#10B981',
  },
];

export default function HowIWork() {
  return (
    <section className="py-24 px-6 bg-[#101319]/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            What working together looks like
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            No surprises. Here&apos;s the process.
          </p>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, icon: Icon, title, description, color }, i) => (
            <StaggerItem key={step}>
              <div className="relative bg-[#101319] border border-[#1B1F2A] rounded-2xl p-7 h-full">
                {/* Connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-[#1B1F2A] to-transparent z-10" style={{ width: '100%' }} />
                )}
                <span className="text-xs font-mono text-[#6B7280] mb-4 block">{step}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-base font-semibold text-[#F9FAFB] mb-2">{title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
