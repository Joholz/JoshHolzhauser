import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PricingEstimator } from '@/components/sections/PricingEstimator';

type Tier = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  type: string;
  color: string;
  example: string;
  features: string[];
  pushedBy: string;
  afterLaunch?: string;
  crossRoute?: { text: string; targets: { label: string; id: string }[] };
  cta: string;
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    id: 'get-found-online',
    name: 'Get found online',
    subtitle: 'A website that brings you customers',
    price: 'Starting at $800',
    type: 'One-time',
    color: '#5B8DEF',
    example: 'Like the site I built for Engler Contracting — multi-page, lead form, the whole thing live and working.',
    features: [
      'Professional multi-page website',
      'Lead capture form integration',
      'Google Maps & contact integration',
      'Mobile responsive & fast',
      'Hosting setup included',
      'Basic SEO configuration',
      '30-day fix-it warranty included',
    ],
    pushedBy: 'More pages, custom integrations, ecommerce, multi-language',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    crossRoute: {
      text: 'Need users to log in or pay?',
      targets: [
        { label: 'A tool that runs your business', id: 'business-tool' },
        { label: 'Build something you can sell', id: 'product-to-sell' },
      ],
    },
    cta: 'Get a Website',
    highlight: true,
  },
  {
    id: 'business-tool',
    name: 'A tool that runs your business',
    subtitle: 'Replace spreadsheets, paperwork, and chasing things by hand',
    price: 'Starting at $2,500',
    type: 'One-time',
    color: '#06B6D4',
    example: 'Like the renewals platform I built for a small insurance team — replaced spreadsheets, email, and chasing things down.',
    features: [
      'Custom workflow built around how you actually work',
      'Database & secure data handling',
      'Connections to other tools you already use',
      'Forms, dashboards, admin views',
      'Email notifications when things need attention',
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Number of user roles, third-party connections, reporting depth, data volume',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    crossRoute: {
      text: 'Just need a few pages? Or selling it to other businesses?',
      targets: [
        { label: 'Get found online', id: 'get-found-online' },
        { label: 'Build something you can sell', id: 'product-to-sell' },
      ],
    },
    cta: 'Build My Tool',
    highlight: false,
  },
  {
    id: 'automation',
    name: 'Stop doing it by hand',
    subtitle: 'Automate the repetitive work that eats your week',
    price: 'Starting at $1,500',
    type: 'One-time',
    color: '#8B5CF6',
    example: 'Like the end-of-day email reports that now write themselves for that same insurance team.',
    features: [
      'Map out the workflow that hurts the most',
      'Connect the systems you already use',
      'Optional AI step where it actually helps',
      'Automated notifications and handoffs',
      'Google Sheets / Drive / email integrations',
      'Estimate of hours saved before I build',
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Number of systems wired together, optional AI step, volume of data processed',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    crossRoute: {
      text: 'Need a full interface around it, not just a pipeline?',
      targets: [
        { label: 'A tool that runs your business', id: 'business-tool' },
      ],
    },
    cta: 'Automate It',
    highlight: false,
  },
  {
    id: 'product-to-sell',
    name: 'Build something you can sell',
    subtitle: 'A product with paying users, accounts, and payments',
    price: 'Starting at $5,000',
    type: 'One-time + optional retainer',
    color: '#F59E0B',
    example: 'Like PolkLookup — a property records app live on the App Store and the web.',
    features: [
      'The whole thing — front end, back end, deployment',
      'User accounts and sign-in',
      'Payments (Stripe)',
      'Admin view for you, user view for your customers',
      'Set up so the next change is easy',
      'Optional ongoing retainer',
      '30-day fix-it warranty included',
    ],
    pushedBy: 'Multi-user organizations, complex billing, role permissions, custom analytics',
    afterLaunch: 'Ongoing care optional, from $250/mo.',
    crossRoute: {
      text: 'Smaller scope to start?',
      targets: [
        { label: 'A tool that runs your business', id: 'business-tool' },
      ],
    },
    cta: 'Build My Product',
    highlight: false,
  },
  {
    id: 'maintenance',
    name: 'Keep it running and growing',
    subtitle: 'Ongoing care after launch',
    price: 'Starting at $250',
    type: 'Per month, scope reviewed quarterly',
    color: '#10B981',
    example: 'Most clients I work with are still working with me months or years after launch.',
    features: [
      'Improvements, small features, dependency upkeep',
      'Performance & uptime monitoring',
      'Priority response time',
      'Monthly progress updates',
      'Reviewed every 3 months — adjusted to actual load, no surprise bills',
    ],
    pushedBy: 'How complex the stack is, how often it changes, how fast you need a response, how actively users hit it',
    cta: 'Start a Retainer',
    highlight: false,
  },
];

const pickerOptions = [
  { id: 'get-found-online', label: 'Get found online',           sub: 'A website for my business' },
  { id: 'business-tool',    label: 'Run my business better',     sub: 'A tool that replaces my spreadsheets' },
  { id: 'automation',       label: 'Stop doing it by hand',      sub: 'Automate something I do every day' },
  { id: 'product-to-sell',  label: 'Build something I can sell', sub: 'A product with users and payments' },
  { id: 'maintenance',      label: 'Keep what I have alive',     sub: 'Care for something already built' },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="mb-12">
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

        {/* Goal picker */}
        <FadeIn className="mb-16">
          <div className="rounded-3xl border border-[#1B1F2A] bg-[#101319]/70 p-6 md:p-10">
            <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7280]">
              Start here
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#F9FAFB] mb-2">
              What do you actually want to build?
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-6">
              Pick the one that sounds closest. I&apos;ll jump you to the right tier.
            </p>
            <div className="flex flex-wrap gap-3">
              {pickerOptions.map(({ id, label, sub }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex flex-col gap-0.5 rounded-xl border border-[#1B1F2A] bg-[#07080B] px-4 py-3 text-left transition-all duration-200 hover:border-[#5B8DEF] hover:bg-[#5B8DEF]/5"
                >
                  <span className="text-sm font-semibold text-[#F9FAFB]">{label}</span>
                  <span className="text-xs text-[#6B7280]">{sub}</span>
                </a>
              ))}
              <Link
                href="/book"
                className="flex flex-col gap-0.5 rounded-xl border border-dashed border-[#1B1F2A] bg-transparent px-4 py-3 text-left transition-all duration-200 hover:border-[#5B8DEF] hover:bg-[#5B8DEF]/5"
              >
                <span className="text-sm font-semibold text-[#9CA3AF]">I&apos;m not sure</span>
                <span className="text-xs text-[#6B7280]">Talk it through with me</span>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Estimator */}
        <PricingEstimator />

        {/* Tiers */}
        <FadeIn className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Or browse the tiers</p>
        </FadeIn>

        {/* Tiers grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tiers.map(({ id, name, subtitle, price, type, color, example, features, pushedBy, afterLaunch, crossRoute, cta, highlight }) => (
            <StaggerItem key={id}>
              <div
                id={id}
                className={`tier-card relative flex flex-col h-full bg-[#101319] border rounded-2xl p-8 transition-all duration-300 ${
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
                <p className="text-sm text-[#9CA3AF] mb-4 leading-snug">{subtitle}</p>
                <p className="text-xs text-[#6B7280] mb-3">{type}</p>
                <p className="text-3xl font-bold mb-2" style={{ color }}>
                  {price}
                </p>
                <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
                  <span className="text-[#9CA3AF]">What pushes it up:</span> {pushedBy}
                </p>

                <p className="text-sm italic text-[#9CA3AF] mb-6 leading-relaxed">{example}</p>

                <div className="space-y-2.5 flex-1 mb-6">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <span className="text-sm text-[#9CA3AF]">{f}</span>
                    </div>
                  ))}
                </div>

                {afterLaunch && (
                  <div className="mb-4 pt-4 border-t border-[#1B1F2A]">
                    <p className="text-xs text-[#6B7280]">
                      <span className="text-[#9CA3AF] font-medium">After launch:</span> {afterLaunch}
                    </p>
                  </div>
                )}

                {crossRoute && (
                  <div className="mb-5">
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {crossRoute.text}{' '}
                      {crossRoute.targets.map((t, i) => (
                        <span key={t.id}>
                          <a
                            href={`#${t.id}`}
                            className="text-[#5B8DEF] hover:text-[#86A8FF] transition-colors underline-offset-2 hover:underline"
                          >
                            {t.label}
                          </a>
                          {i < crossRoute.targets.length - 1 ? ' or ' : ''}
                        </span>
                      ))}
                      .
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
            Still not sure?{' '}
            <Link href="/book" className="text-[#5B8DEF] hover:text-[#86A8FF] transition-colors font-medium">
              Tell me about your project
            </Link>{' '}
            — I&apos;ll help you figure out what you actually need.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
