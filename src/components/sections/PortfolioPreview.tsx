import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { featured } from '@/data/projects';
import { PublicationBadges } from '@/components/ui/PublicationBadges';
import type { Publication } from '@/data/projects';

const PREVIEW_WINS: Record<string, string[]> = {
  'insurance-ops': [
    'Encrypted client intake (TweetNaCl)',
    'Full audit log of every change',
    'Notes + tasks with assignment & due dates',
    'In production, used daily',
  ],
  engler: [
    'Built from vision alone',
    'Google Form lead capture',
    'Fully responsive',
    'Live at englercontracting.com',
  ],
  'enterprise-ai-platform': [
    'Go microservices on Kubernetes',
    'Streaming chat through nginx ingress',
    'MCP tool registry',
    'Helm-packaged deploys',
  ],
  polklookup: [
    '310k+ records searchable offline',
    'SQLite in the browser via WebAssembly',
    'Published on Google Play and Vercel',
    'Same data layer powers both surfaces',
  ],
};

export default function PortfolioPreview() {
  const projects = featured().map((p) => ({
    tag: p.tag,
    tagColor: p.tagColor,
    title: p.title,
    description: p.caseStudy?.preview?.description ?? '',
    wins: PREVIEW_WINS[p.id] ?? [],
    tech: p.caseStudy?.preview?.tech ?? p.tech,
    publications: p.publications as Publication[] | undefined,
    href: `/portfolio/${p.id}`,
  }));
  return (
    <section className="py-24 px-6 bg-[#101319]/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            What I&apos;ve actually shipped.
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Four I&apos;d bet a contract on.
          </p>
        </FadeIn>

        <Stagger className="space-y-6">
          {projects.map(({ tag, tagColor, title, description, wins, tech, publications, href }) => (
            <StaggerItem key={title}>
              <Link href={href} className="group block">
                <div className="bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,141,239,0.07)] hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left */}
                    <div className="flex-1">
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                        style={{ background: `${tagColor}18`, color: tagColor }}
                      >
                        {tag}
                      </span>
                      <h3 className="text-xl font-bold text-[#F9FAFB] mb-3 group-hover:text-[#86A8FF] transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">{description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tech.map(t => (
                          <span key={t} className="text-xs bg-[#171A22] border border-[#1B1F2A] text-[#6B7280] px-2.5 py-1 rounded-md font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                      {publications && publications.length > 0 && (
                        <PublicationBadges publications={publications} noLink />
                      )}
                    </div>

                    {/* Right wins */}
                    <div className="md:w-60 shrink-0 space-y-2.5">
                      {wins.map(w => (
                        <div key={w} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tagColor }} />
                          <span className="text-sm text-[#9CA3AF]">{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-sm text-[#5B8DEF] font-medium">
                    View case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2} className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#5B8DEF] hover:text-[#86A8FF] transition-colors font-medium"
          >
            View full portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
