import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Code2, Zap, Users } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { SkillsGraph } from '@/components/sections/SkillsGraph';
import { BuildLog } from '@/components/sections/BuildLog';

const values = [
  { icon: Code2, title: 'I own the entire build',    desc: 'No handoffs between design, dev, and QA. I take it from concept to deployed — faster and with fewer broken phones.' },
  { icon: Zap,   title: 'I need minimal briefing',   desc: 'You share your vision. I ask the right questions. Most of my clients never write a spec document.' },
  { icon: Users, title: 'I build relationships',     desc: "I'm not a gig worker. I maintain what I build. Most clients are still working with me months or years later." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <FadeIn className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </FadeIn>

        {/* Hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          {/* Text */}
          <FadeIn>
            <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6 leading-tight">
              I&apos;m Josh. I build things <span className="gradient-text-blue">that work.</span>
            </h1>
            <div className="space-y-4 text-[#9CA3AF] text-base leading-relaxed">
              <p>
                I&apos;m a full-stack developer who specializes in turning business problems into working
                software — quickly and with minimal hand-holding. If you have a vague idea, a spreadsheet
                you hate, or a process you want automated, I&apos;m the person who can take that and make it real.
              </p>
              <p>
                I&apos;ve built a full insurance renewal management system that a client actively pays a
                monthly retainer for. I&apos;ve built a contracting company&apos;s entire web presence from scratch
                with near-zero direction. I&apos;ve built a cross-platform mobile app with AI recipe generation
                and Firebase integration.
              </p>
              <p>
                What I do differently: I use AI tools throughout my development process, which means I
                build faster, catch bugs earlier, and deliver more for the same cost. And when I ship
                something, I don&apos;t disappear — I maintain it, improve it, and grow it with you.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/Joholz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors text-sm border border-[#1E2A3A] hover:border-[#2a3a50] px-5 py-3 rounded-xl"
              >
                <GithubIcon />
                View GitHub
              </a>
            </div>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/10 rounded-2xl" />
              <Image
                src="/headshot.jpg"
                alt="Josh Holzhauser"
                fill
                className="object-cover object-top rounded-2xl"
                sizes="(max-width: 768px) 288px, 320px"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A0E1A]/90 backdrop-blur-sm border border-[#1E2A3A] rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-[#F9FAFB]">Josh Holzhauser</p>
                <p className="text-xs text-[#9CA3AF]">Full-Stack Developer · Builder</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Values */}
        <FadeIn className="mb-5">
          <p className="text-xs text-[#3B82F6] uppercase tracking-widest font-semibold mb-3">How I work</p>
          <h2 className="text-3xl font-bold text-[#F9FAFB] mb-12">What makes me different</h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title}>
              <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-7">
                <Icon className="w-5 h-5 text-[#3B82F6] mb-4" />
                <h3 className="text-base font-semibold text-[#F9FAFB] mb-2">{title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Skills — animated */}
        <FadeIn className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3B82F6]">Technical Stack</p>
          <h2 className="mb-10 text-3xl font-bold text-[#F9FAFB]">Stack I trust in production</h2>
          <SkillsGraph />
        </FadeIn>

        {/* Build Log */}
        <FadeIn className="mt-20">
          <BuildLog />
        </FadeIn>
      </div>
    </div>
  );
}
