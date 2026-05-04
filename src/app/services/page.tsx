import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PricingEstimator } from '@/components/sections/PricingEstimator';

type Tier = {
  name: string;
  price: string;
  type: string;
  color: string;
  description: string;
  features: string[];
  pushedBy: string;
  afterLaunch?: string;
  cta: string;
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Business Web Presence',
    price: 'Starting at $800',
    type: 'One-time',
    color: '#5B8DEF',
    description:
      'A complete professional website for your business. I need only your vision — no spec document required.',
    features: [
      'Professional multi-page website',
      'Lead capture form integration',
      'Google Maps / contact integration',
      'Mobile responsive & fast',
      'Hosting setup included',
      'Basic SEO configuration',
      '30-day fix-it warranty included',
    ],
    pushedBy: 'More pages, custom integrations, ecommerce, multi-language',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    cta: 'Get a Website',
    highlight: false,
  },
  {
    name: 'Custom Business App',
    price: 'Starting at $2,500',
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
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Number of user roles, third-party APIs, reporting depth, data volume',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    cta: 'Build My App',
    highlight: true,
  },
  {
    name: 'Maintenance Retainer',
    price: 'Starting at $250',
    type: 'Per month, scope reviewed quarterly',
    color: '#10B981',
    description:
      "Most products grow after launch — new features, integrations, the small things you didn't know you'd want. The retainer covers ongoing improvements, monitoring, and the unglamorous upkeep that keeps your stack healthy.",
    features: [
      'Improvements, small features, dependency upkeep',
      'Performance & uptime monitoring',
      'Priority response time',
      'Monthly progress updates',
      'Reviewed every 3 months — adjusted to actual load, no surprise bills',
    ],
    pushedBy: 'Stack complexity, change frequency, response-time SLA, how actively users hit it',
    cta: 'Start a Retainer',
    highlight: false,
  },
  {
    name: 'AI & Automation Package',
    price: 'Starting at $1,500',
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
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Number of systems wired together, model choice, volume of data processed',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    cta: 'Automate My Business',
    highlight: false,
  },
  {
    name: 'SaaS MVP Build',
    price: 'Starting at $5,000',
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
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Multi-tenant, complex billing, role permissions, custom analytics',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
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
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            What I build — and where it starts.
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Transparent pricing. No hidden fees. Every price below is a starting point — the final number
            depends on scope, which we lock in on a free 30-minute call.
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
          {tiers.map(({ name, price, type, color, description, features, pushedBy, afterLaunch, cta, highlight }) => (
            <StaggerItem key={name}>
              <div
                className={`relative flex flex-col h-full bg-[#101319] border rounded-2xl p-8 transition-all duration-300 ${
                  highlight
                    ? 'border-[#5B8DEF] shadow-[0_0_40px_rgba(91,141,239,0.15)]'
                    : 'border-[#1B1F2A] hover:border-[#262B38]'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#5B8DEF] text-white text-xs font-semibold px-3 py-1 rounded-full">
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
                <p className="text-3xl font-bold mb-2" style={{ color }}>
                  {price}
                </p>
                <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
                  <span className="text-[#9CA3AF]">What pushes it up:</span> {pushedBy}
                </p>
                <p className="text-sm text-[#9CA3AF] mb-6 leading-relaxed">{description}</p>

                <div className="space-y-2.5 flex-1 mb-6">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <span className="text-sm text-[#9CA3AF]">{f}</span>
                    </div>
                  ))}
                </div>

                {afterLaunch && (
                  <div className="mb-6 pt-4 border-t border-[#1B1F2A]">
                    <p className="text-xs text-[#6B7280]">
                      <span className="text-[#9CA3AF] font-medium">After launch:</span> {afterLaunch}
                    </p>
                  </div>
                )}

                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 w-full"
                  style={
                    highlight
                      ? { background: '#5B8DEF', color: '#fff' }
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

        {/* Warranty footnote */}
        <FadeIn delay={0.15} className="mt-10 max-w-2xl mx-auto">
          <p className="text-xs text-[#6B7280] leading-relaxed text-center">
            <span className="text-[#9CA3AF] font-medium">30-day fix-it warranty:</span> anything I built that
            breaks within 30 days of launch, I fix at no charge. Doesn&apos;t cover new features or scope
            changes — that&apos;s what the retainer is for.
          </p>
        </FadeIn>

        {/* Note */}
        <FadeIn delay={0.2} className="mt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            Not sure which tier fits?{' '}
            <Link href="/book" className="text-[#5B8DEF] hover:text-[#86A8FF] transition-colors font-medium">
              Book a free call
            </Link>{' '}
            — I&apos;ll help you scope exactly what you need.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
