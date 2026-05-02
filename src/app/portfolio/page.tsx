import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PublicationBadges } from '@/components/ui/PublicationBadges';
import { LabGrid } from '@/components/sections/LabGrid';
import { tier1, tier2 } from '@/data/projects';

export default function PortfolioPage() {
  const caseStudies = tier1();
  const labProjects = tier2();
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
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Six case studies. Different industries. All in production.
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Every project here started with a real problem. After the case studies, a lab section with the
            smaller stuff — utilities, MCP servers, prototypes that didn&apos;t need a customer to be worth
            building.
          </p>
        </FadeIn>

        {/* Case Studies */}
        <Stagger className="space-y-12">
          {caseStudies.map((p) => {
            const { id, tag, tagColor, status, statusColor, title, tech, publications } = p;
            const { problem, solution, results } = p.caseStudy!;
            return (
            <StaggerItem key={id}>
              <div id={id} className="bg-[#101319] border border-[#1B1F2A] rounded-2xl overflow-hidden">
                {/* Header bar */}
                <div className="px-8 py-6 border-b border-[#1B1F2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${tagColor}18`, color: tagColor }}
                    >
                      {tag}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: statusColor }}
                    >
                      ● {status}
                    </span>
                  </div>
                  {publications && publications.length > 0 && (
                    <PublicationBadges publications={publications} />
                  )}
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left col */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#F9FAFB] mb-5">{title}</h2>
                    </div>

                    <div>
                      <h3 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">The Problem</h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">{problem}</p>
                    </div>

                    <div>
                      <h3 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">The Solution</h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">{solution}</p>
                    </div>

                    {/* Tech */}
                    <div>
                      <h3 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {tech.map(t => (
                          <span
                            key={t}
                            className="text-xs font-mono bg-[#171A22] border border-[#1B1F2A] text-[#6B7280] px-2.5 py-1 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right col — Results */}
                  <div>
                    <h3 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-5">Results</h3>
                    <div className="space-y-3.5">
                      {results.map(r => (
                        <div key={r} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tagColor }} />
                          <span className="text-sm text-[#9CA3AF]">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
            );
          })}
        </Stagger>

        {/* The Lab */}
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

        {/* CTA */}
        <FadeIn delay={0.2} className="mt-16 text-center">
          <p className="text-[#9CA3AF] mb-6">Have a project like one of these?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(91,141,239,0.4)] text-sm"
          >
            Book a Free Discovery Call →
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
