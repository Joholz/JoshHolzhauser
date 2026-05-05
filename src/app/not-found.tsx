import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: "That page doesn't exist. Head back to the homepage or browse the portfolio.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs text-[#5B8DEF] uppercase tracking-widest font-semibold mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
          That page isn&apos;t here.
        </h1>
        <p className="text-[#9CA3AF] text-lg mb-10">
          Either the link is stale or I broke something. Both happen.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#5B8DEF] hover:bg-[#4775D9] text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#1B1F2A] hover:border-[#262B38] text-[#F9FAFB] font-medium transition-colors"
          >
            Browse the portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
