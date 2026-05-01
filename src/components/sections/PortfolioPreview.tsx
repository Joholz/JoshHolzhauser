import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const projects = [
  {
    tag: 'SaaS · Insurance',
    tagColor: '#10B981',
    title: 'Leah Renewals — Insurance Management System',
    description:
      'A full web application that ingests hundreds of renewal records from Google Sheets, organizes them into a manageable pipeline, and includes a secure client banking intake form with email notifications and a custom notes/tasks system.',
    wins: ['Live paying subscriber', 'Secure form with email alerts', 'Google Sheets integration', 'Custom notes & tasks module'],
    tech: ['React', 'Vite', 'Google Sheets API', 'Resend'],
    href: '/portfolio#leah-renewals',
  },
  {
    tag: 'Business · Web',
    tagColor: '#3B82F6',
    title: 'Engler Contracting — Business Website',
    description:
      'Complete business website for a tree contracting company built from a minimal brief. Full professional presence with an integrated Google Form lead capture system — designed and shipped with near-zero client hand-holding.',
    wins: ['Built from vision alone', 'Google Form lead capture', 'Fully responsive', 'Live at englercontracting.com'],
    tech: ['HTML', 'CSS', 'Google Forms', 'Hosting'],
    href: '/portfolio#engler',
  },
  {
    tag: 'Mobile · AI',
    tagColor: '#8B5CF6',
    title: 'CookBookPal — AI Recipe Mobile App',
    description:
      'React Native mobile app with AI-powered recipe generation, web scraping for recipe imports, Firebase backend, and a step-by-step cook mode. Demonstrates full mobile + AI integration capability.',
    wins: ['AI recipe generation', 'Web scraping import', 'Firebase backend', 'iOS & Android'],
    tech: ['React Native', 'Expo', 'Firebase', 'AI/ML'],
    href: '/portfolio#cookbookpal',
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 px-6 bg-[#111827]/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            What I&apos;ve actually shipped.
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            Three builds. All live. All different.
          </p>
        </FadeIn>

        <Stagger className="space-y-6">
          {projects.map(({ tag, tagColor, title, description, wins, tech, href }) => (
            <StaggerItem key={title}>
              <Link href={href} className="group block">
                <div className="bg-[#111827] border border-[#1E2A3A] hover:border-[#2a3a50] rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.07)] hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left */}
                    <div className="flex-1">
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                        style={{ background: `${tagColor}18`, color: tagColor }}
                      >
                        {tag}
                      </span>
                      <h3 className="text-xl font-bold text-[#F9FAFB] mb-3 group-hover:text-[#60A5FA] transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">{description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tech.map(t => (
                          <span key={t} className="text-xs bg-[#1a2332] border border-[#1E2A3A] text-[#6B7280] px-2.5 py-1 rounded-md font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
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

                  <div className="mt-6 flex items-center gap-1 text-sm text-[#3B82F6] font-medium">
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
            className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors font-medium"
          >
            View full portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
