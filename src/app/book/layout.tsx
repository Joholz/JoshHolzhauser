import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tell me about your project',
  description:
    "Three quick steps. Tell me what you're building, what you're working with, and how to reach you. I read every one personally.",
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Tell me about your project · Josh Holzhauser',
    description: "Three quick steps. I read every one personally.",
    url: '/book',
    images: ['/opengraph-image'],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
