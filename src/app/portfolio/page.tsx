import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PublicationBadges } from '@/components/ui/PublicationBadges';
import { LabGrid } from '@/components/sections/LabGrid';
import { tier1, tier2 } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Six case studies across insurance ops, contracting, enterprise AI, property records, recipes, and Moodle. Plus a lab grid of utilities and prototypes.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio · Josh Holzhauser',
    description:
      'Six case studies across insurance ops, contracting, enterprise AI, property records, recipes, and Moodle.',
    url: '/portfolio',
    images: ['/opengraph-image'],
  },
};

export default function PortfolioPage() {
  const caseStudies = tier1();
  const labProjects = tier2();
  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Six case studies. Different industries. All in production.
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Every project here started with a real problem. Click any one to read the full story —
            problem, solution, tech, and what shipped. After the case studies, a lab section with
            the smaller stuff.
          </p>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudies.map((p) => {
            const { id, tag, tagColor, status, statusColor, title, tech, publications } = p;
            const description =
              p.caseStudy?.preview?.description ?? p.caseStudy?.solution ?? '';
            return (
              <StaggerItem key={id}>
                <Link
                  href={`/portfolio/${id}`}
                  className="group block h-full bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,141,239,0.07)] hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${tagColor}18`, color: tagColor }}
                    >
                      {tag}
                    </span>
                    <span className="text-xs font-medium" style={{ color: statusColor }}>
                      ● {status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#F9FAFB] mb-3 group-hover:text-[#86A8FF] transition-colors">
                    {title}
                  </h2>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5 line-clamp-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(p.caseStudy?.preview?.tech ?? tech).slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono bg-[#171A22] border border-[#1B1F2A] text-[#6B7280] px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {publications && publications.length > 0 && (
                    <div className="mb-4">
                      <PublicationBadges publications={publications} noLink />
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-[#5B8DEF] font-medium">
                    Read case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        {labProjects.length > 0 && (
          <FadeIn className="mt-24">
            <div className="mb-10">
              <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">The Lab</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-3">Other things I&apos;ve built.</h2>
              <p className="text-[#9CA3AF] max-w-2xl">
                Smaller projects — utilities, MCP servers, prototypes that didn&apos;t need a customer to be worth
                building. Some are live, some live on GitHub, some just live on my machine.
              </p>
            </div>
            <LabGrid projects={labProjects} />
          </FadeIn>
        )}

        <FadeIn delay={0.2} className="mt-16 text-center">
          <p className="text-[#9CA3AF] mb-6">Have a project like one of these?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(91,141,239,0.4)] text-sm"
          >
            Tell me about your project →
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
