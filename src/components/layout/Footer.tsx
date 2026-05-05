import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1B1F2A] bg-[#07080B]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/JH_Logo_White_Cropped.png"
                alt="JH"
                width={20}
                height={20}
                className="object-contain shrink-0"
              />
              <span className="font-bold text-[#F9FAFB]">Josh Holzhauser</span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Full-stack developer building custom apps, automations, and AI tools for businesses.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F9FAFB]">Navigation</h4>
            {[
              { href: '/',          label: 'Home' },
              { href: '/services',  label: 'Services' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about',     label: 'About' },
              { href: '/book',      label: 'Book a Call' },
            ].map(({ href, label }) => (
              <div key={href}>
                <Link href={href} className="text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors">
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F9FAFB]">Ready to build?</h4>
            <p className="text-sm text-[#6B7280]">
              Let&apos;s talk about your project in a free 30-minute discovery call.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(91,141,239,0.4)]"
            >
              Book a Free Call →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1B1F2A] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#6B7280]">© {year} Josh Holzhauser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
