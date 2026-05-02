import Link from 'next/link';
import { Globe, Cpu, Smartphone, Layers, ArrowRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description:
      'Custom web apps built from your vision with minimal briefing needed. Forms, dashboards, integrations — fully functional and deployed.',
    color: '#5B8DEF',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    description:
      'Workflow automation and LLM-backed tools that eliminate manual work. API integrations, data pipelines, smart notifications.',
    color: '#06B6D4',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'React Native mobile apps with LLM capabilities, real-time data, and solid UX. Built for iOS and Android from a single codebase.',
    color: '#8B5CF6',
  },
  {
    icon: Layers,
    title: 'SaaS Products',
    description:
      'End-to-end SaaS builds. I maintain, improve, and scale your product over time.',
    color: '#10B981',
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">What I Build</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            One developer. Full stack.
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Most projects don&apos;t need five people. They need one person who knows the full stack and actually sticks around.
          </p>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map(({ icon: Icon, title, description, color }) => (
            <StaggerItem key={title}>
              <div className="group relative bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,141,239,0.07)] hover:-translate-y-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">{title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-[#5B8DEF] hover:text-[#86A8FF] transition-colors font-medium"
          >
            See all services & pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
