import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Code2, Zap, Users } from 'lucide-react';

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
            <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">About</p>
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
                className="inline-flex items-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm hover:shadow-[0_0_20px_rgba(91,141,239,0.4)]"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B8DEF]/20 to-[#06B6D4]/10 rounded-2xl" />
              <Image
                src="/headshot.jpg"
                alt="Josh Holzhauser"
                fill
                className="object-cover object-top rounded-2xl"
                sizes="(max-width: 768px) 288px, 320px"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/90 backdrop-blur-sm border border-[#1B1F2A] rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-[#F9FAFB]">Josh Holzhauser</p>
                <p className="text-xs text-[#9CA3AF]">Full-Stack Developer · Builder</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Values */}
        <FadeIn className="mb-5">
          <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-3">How I work</p>
          <h2 className="text-3xl font-bold text-[#F9FAFB] mb-12">What makes me different</h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title}>
              <div className="bg-[#101319] border border-[#1B1F2A] rounded-2xl p-7">
                <Icon className="w-5 h-5 text-[#5B8DEF] mb-4" />
                <h3 className="text-base font-semibold text-[#F9FAFB] mb-2">{title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Skills — animated */}
        <FadeIn className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#5B8DEF]">Technical Stack</p>
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
