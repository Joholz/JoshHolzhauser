import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { PublicationBadges } from '@/components/ui/PublicationBadges';
import { tier1, projects } from '@/data/projects';

const SITE_URL = 'https://joshholzhauser.vercel.app';

export function generateStaticParams() {
  return tier1().map((p) => ({ slug: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.tier === 1);
  if (!project || !project.caseStudy) return {};

  const desc = project.caseStudy.preview?.description ?? project.caseStudy.solution;
  const truncatedDesc = desc.length > 160 ? desc.slice(0, 157) + '…' : desc;

  return {
    title: project.title,
    description: truncatedDesc,
    alternates: { canonical: `/portfolio/${project.id}` },
    openGraph: {
      title: `${project.title} · Josh Holzhauser`,
      description: truncatedDesc,
      url: `/portfolio/${project.id}`,
      type: 'article',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · Josh Holzhauser`,
      description: truncatedDesc,
    },
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.tier === 1);
  if (!project || !project.caseStudy) notFound();

  const { id, tag, tagColor, status, statusColor, title, tech, publications } = project;
  const { problem, solution, results } = project.caseStudy;

  const caseStudies = tier1();
  const idx = caseStudies.findIndex((p) => p.id === id);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: project.caseStudy.preview?.description ?? solution,
    author: { '@type': 'Person', name: 'Josh Holzhauser', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Josh Holzhauser', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/portfolio/${id}`,
    keywords: tech.join(', '),
  };

  return (
    <div className="pt-24 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </FadeIn>

        <FadeIn className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
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
          <h1 className="text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            {title}
          </h1>
          {publications && publications.length > 0 && (
            <PublicationBadges publications={publications} />
          )}
        </FadeIn>

        <div className="bg-[#101319] border border-[#1B1F2A] rounded-2xl overflow-hidden">
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">
                  The Problem
                </h2>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{problem}</p>
              </div>

              <div>
                <h2 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">
                  The Solution
                </h2>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{solution}</p>
              </div>

              <div>
                <h2 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-3">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
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

            <div>
              <h2 className="text-xs text-[#6B7280] uppercase tracking-widest font-semibold mb-5">
                Results
              </h2>
              <div className="space-y-3.5">
                {results.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tagColor }} />
                    <span className="text-sm text-[#9CA3AF]">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FadeIn delay={0.1} className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/portfolio/${prev.id}`}
              className="group bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-xl p-5 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous case study
              </div>
              <div className="text-sm font-semibold text-[#F9FAFB] group-hover:text-[#86A8FF] transition-colors">
                {prev.title}
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/portfolio/${next.id}`}
              className="group bg-[#101319] border border-[#1B1F2A] hover:border-[#262B38] rounded-xl p-5 transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-[#6B7280] mb-2">
                Next case study <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-semibold text-[#F9FAFB] group-hover:text-[#86A8FF] transition-colors">
                {next.title}
              </div>
            </Link>
          ) : <div />}
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16 text-center">
          <p className="text-[#9CA3AF] mb-6">Have a project like this?</p>
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
