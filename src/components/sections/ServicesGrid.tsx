import Link from 'next/link';
import { Globe, Cpu, Smartphone, Layers, ArrowRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const services = [
  {
    icon: Globe,
    title: 'Websites & business tools',
    description:
      'A website that brings in customers, or a custom tool that runs your operation. Built around how you actually work, not a template.',
    color: '#5B8DEF',
  },
  {
    icon: Cpu,
    title: 'Stop doing it by hand',
    description:
      'Daily reports, invoice chasing, data syncing — repetitive work turned into something that runs itself. With or without an AI step.',
    color: '#06B6D4',
  },
  {
    icon: Smartphone,
    title: 'Apps for phones',
    description:
      "Real iOS and Android apps. One codebase, both stores. Like the property records app I built that's live on Google Play.",
    color: '#8B5CF6',
  },
  {
    icon: Layers,
    title: 'Products you can sell',
    description:
      'User accounts, payments, the whole stack. I build the product you can show paying customers on day one.',
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
            One developer. The whole thing.
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Most projects don&apos;t need five people. They need one person who can build the whole thing
            and still be there a year later.
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
