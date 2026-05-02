import Link from 'next/link';
import { CheckCircle, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const caseStudies = [
  {
    id: 'leah-renewals',
    tag: 'SaaS · Insurance',
    tagColor: '#10B981',
    status: 'Live · Paying subscriber',
    statusColor: '#10B981',
    title: 'Leah Renewals — Insurance Management System',
    problem:
      'An insurance professional was managing hundreds of client renewal records entirely inside a sprawling Google Sheets document. There was no organized pipeline, no way to track status, no way for clients to securely submit banking details, and no notification system when renewals needed attention.',
    solution:
      'I built a full web application from scratch. It ingests the existing Google Sheets data automatically, organizes renewals into a clean management pipeline with status tracking, and includes a secure client-facing intake form for sensitive banking information. When a client submits the form, an email notification fires immediately. I also built a custom notes and tasks module so the team can annotate records without leaving the app.',
    results: [
      'Live paying subscriber on an ongoing retainer',
      'Hundreds of records imported and organized from Google Sheets',
      'Secure banking intake form replacing insecure email exchanges',
      'Real-time email notifications on form submissions',
      'Custom notes & tasks module for team workflow',
      'Actively used in production daily',
    ],
    tech: ['React', 'Vite', 'TypeScript', 'Google Sheets API', 'Resend (email)', 'Tailwind CSS', 'Firebase'],
    link: null,
  },
  {
    id: 'engler',
    tag: 'Business · Web',
    tagColor: '#5B8DEF',
    status: 'Live at englercontracting.com',
    statusColor: '#5B8DEF',
    title: 'Engler Contracting — Business Website',
    problem:
      'Engler Contracting & Consulting, a professional tree service and contracting company, had no online presence. They needed a full website that reflected their professionalism, helped customers find them, and captured incoming leads — all from a minimal brief.',
    solution:
      'With just their vision and brand direction, I designed and built a complete business website. The site includes a professional homepage, services overview, and an integrated Google Form for lead capture that routes inquiries directly to their inbox. The entire project was built with near-zero back-and-forth — I took their vision and executed it independently.',
    results: [
      'Professional online presence live and indexed by Google',
      'Integrated lead capture system via Google Forms',
      'Fully responsive — works on all devices',
      'Built from minimal brief with no spec document required',
      'Client had their website without managing a design process',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Google Forms', 'Static Hosting'],
    link: 'https://www.englercontracting.com/',
  },
  {
    id: 'cookbookpal',
    tag: 'Mobile · AI',
    tagColor: '#8B5CF6',
    status: 'Available on GitHub',
    statusColor: '#8B5CF6',
    title: 'CookBookPal — AI-Powered Recipe App',
    problem:
      "Recipe management is scattered across bookmarks, apps, screenshots, and browser tabs. There was no single app that could import recipes from anywhere, generate new ones with AI assistance, and provide a clean step-by-step cook mode — all with your own library synced across devices.",
    solution:
      'I built a full React Native mobile application using Expo that runs on both iOS and Android. The app includes AI-powered recipe generation, web scraping to import recipes directly from any URL, Firebase backend for real-time sync, and a dedicated cook mode that walks users through each step without distraction. The app demonstrates complete mobile + AI + backend integration capability.',
    results: [
      'Full React Native app running on iOS and Android',
      'AI recipe generation powered by language models',
      'Web scraping to import recipes from any website',
      'Firebase Firestore for real-time cross-device sync',
      'Step-by-step cook mode with distraction-free UI',
      'Available publicly on GitHub',
    ],
    tech: ['React Native 0.76', 'Expo SDK 52', 'Firebase', 'Expo Router', 'React Native Paper', 'AI/LLM integration'],
    link: 'https://github.com/Joholz/CookBookPal',
  },
];

export default function PortfolioPage() {
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
            Three builds. Different industries. All running.
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Every project here started with a real business problem. Here&apos;s the problem, the solution I
            built, and the outcome.
          </p>
        </FadeIn>

        {/* Case Studies */}
        <Stagger className="space-y-12">
          {caseStudies.map(({ id, tag, tagColor, status, statusColor, title, problem, solution, results, tech, link }) => (
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
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#5B8DEF] hover:text-[#86A8FF] transition-colors font-medium"
                    >
                      View live site
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
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
          ))}
        </Stagger>

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
