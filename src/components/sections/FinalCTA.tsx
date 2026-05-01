import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="relative bg-gradient-to-br from-[#111827] to-[#0d1520] border border-[#1E2A3A] rounded-3xl px-8 md:px-16 py-16 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[80px]" />
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-5 leading-tight">
                Got something<br />
                <span className="gradient-text-blue">in mind?</span>
              </h2>

              <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto mb-10">
                Tell me what you&apos;re working on. I&apos;ll give you an honest read on whether I can help and what it would take to build it.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="group flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-sm w-full sm:w-auto justify-center"
                >
                  Tell me about your project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/portfolio"
                  className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
                >
                  See what I&apos;ve built first →
                </Link>
              </div>

              <p className="mt-8 text-xs text-[#6B7280]">
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
