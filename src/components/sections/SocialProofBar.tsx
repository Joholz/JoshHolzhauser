import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

export default function SocialProofBar() {
  return (
    <section className="border-y border-[#1B1F2A] bg-[#101319]/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <FadeIn>
          <p className="text-center text-xs text-[#6B7280] uppercase tracking-widest mb-8 font-medium">
            Clients shipping real software
          </p>
        </FadeIn>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {/* Client logo */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/engler-logo.png"
                alt="Engler Contracting & Consulting"
                width={40}
                height={40}
                className="rounded object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-[#F9FAFB]">Engler Contracting</p>
                <p className="text-xs text-[#6B7280]">Full business website</p>
              </div>
            </div>
          </FadeIn>

          <div className="hidden md:block w-px h-10 bg-[#1B1F2A]" />

          {/* Stat */}
          <FadeIn delay={0.2}>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#F9FAFB]">3+</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Products built &amp; deployed</p>
            </div>
          </FadeIn>

          <div className="hidden md:block w-px h-10 bg-[#1B1F2A]" />

          <FadeIn delay={0.3}>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#10B981]">Live</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Paying SaaS subscriber</p>
            </div>
          </FadeIn>

          <div className="hidden md:block w-px h-10 bg-[#1B1F2A]" />

          <FadeIn delay={0.4}>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#F9FAFB]">React · Node · AI</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Full-stack capability</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
