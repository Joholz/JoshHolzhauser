import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PricingEstimator } from '@/components/sections/PricingEstimator';

const tiers = [
  {
    name: 'Business Web Presence',
    price: '$800–$1,500',
    type: 'One-time',
    color: '#3B82F6',
    description:
      'A complete professional website for your business. I need only your vision — no spec document required.',
    features: [
      'Professional multi-page website',
      'Lead capture form integration',
      'Google Maps / contact integration',
      'Mobile responsive & fast',
      'Hosting setup included',
      'Basic SEO configuration',
    ],
    cta: 'Get a Website',
    highlight: false,
  },
  {
    name: 'Custom Business App',
    price: '$2,500–$6,000',
    type: 'One-time',
    color: '#06B6D4',
    description:
      'A fully custom web application built around your business process — like the insurance renewal system I built for a current client.',
    features: [
      'Full custom web application',
      'Database & backend integration',
      'Third-party API connections',
      'Secure forms & data handling',
      'Email notification systems',
      'Admin dashboard & workflows',
    ],
    cta: 'Build My App',
    highlight: true,
  },
  {
    name: 'Maintenance Retainer',
    price: '$200–$500',
    type: 'Per month',
    color: '#10B981',
    description:
      'Ongoing maintenance, improvements, and feature additions for your existing product. I keep your system healthy and growing.',
    features: [
      'Bug fixes & security patches',
      'New feature development',
      'Performance monitoring',
      'Priority response time',
      'Monthly progress updates',
      'Scales with your needs',
    ],
    cta: 'Start a Retainer',
    highlight: false,
  },
  {
    name: 'AI & Automation Package',
    price: '$1,500–$4,000',
    type: 'One-time',
    color: '#8B5CF6',
    description:
      'Automate manual workflows and integrate AI into your business processes. Save hours every week.',
    features: [
      'Workflow analysis & mapping',
      'API & data pipeline setup',
      'AI model integration',
      'Automated notifications',
      'Google Sheets / Drive integrations',
      'ROI estimate before build',
    ],
    cta: 'Automate My Business',
    highlight: false,
  },
  {
    name: 'SaaS MVP Build',
    price: '$5,000–$12,000',
    type: 'One-time + optional retainer',
    color: '#F59E0B',
    description:
      'I build the whole thing — frontend, backend, payments, auth. You get a product that can acquire real users on day one.',
    features: [
      'Full-stack SaaS architecture',
      'Auth & user management',
      'Stripe / payment integration',
      'Admin & user dashboards',
      'Deployment & CI/CD setup',
      'Optional ongoing retainer',
    ],
    cta: 'Build My SaaS',
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            What I build — and what it costs.
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Transparent pricing. No hidden fees. Every engagement starts with a free 30-minute discovery call
            where we scope exactly what you need.
          </p>
        </FadeIn>

        {/* Estimator */}
        <PricingEstimator />

        {/* Tiers */}
        <FadeIn className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Or pick a package below</p>
        </FadeIn>

        {/* Tiers grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tiers.map(({ name, price, type, color, description, features, cta, highlight }) => (
            <StaggerItem key={name}>
              <div
                className={`relative flex flex-col h-full bg-[#111827] border rounded-2xl p-8 transition-all duration-300 ${
                  highlight
                    ? 'border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.15)]'
                    : 'border-[#1E2A3A] hover:border-[#2a3a50]'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className="inline-flex w-10 h-10 rounded-xl items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                </div>

                <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">{name}</h2>
                <p className="text-xs text-[#6B7280] mb-4">{type}</p>
                <p className="text-3xl font-bold mb-1" style={{ color }}>
                  {price}
                </p>
                <p className="text-sm text-[#9CA3AF] mb-6 leading-relaxed">{description}</p>

                <div className="space-y-2.5 flex-1 mb-8">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <span className="text-sm text-[#9CA3AF]">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 w-full"
                  style={
                    highlight
                      ? { background: '#3B82F6', color: '#fff' }
                      : { background: `${color}18`, color }
                  }
                >
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Note */}
        <FadeIn delay={0.2} className="mt-12 text-center">
          <p className="text-sm text-[#6B7280]">
            Not sure which tier fits?{' '}
            <Link href="/book" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors font-medium">
              Book a free call
            </Link>{' '}
            — I&apos;ll help you scope exactly what you need.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
