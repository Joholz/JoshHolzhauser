'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/services',   label: 'Services' },
  { href: '/portfolio',  label: 'Portfolio' },
  { href: '/about',      label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  const { scrollYProgress }  = useScroll();
  const progressWidth        = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0A0E1A]/95 backdrop-blur-md border-b border-[#1E2A3A]'
          : 'bg-transparent',
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
        style={{ width: progressWidth }}
        aria-hidden="true"
      />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/JH_Logo_White.png"
            alt="JH"
            width={44}
            height={44}
            className="object-contain"
          />
          <span className="font-bold text-[#F9FAFB] tracking-tight">Josh Holzhauser</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden md:inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Book a Call
          </Link>
          <button
            className="md:hidden text-[#9CA3AF] hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#111827] border-b border-[#1E2A3A] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm py-2 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors"
          >
            Book a Free Call
          </Link>
        </div>
      )}
    </header>
  );
}
