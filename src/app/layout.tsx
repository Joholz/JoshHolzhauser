import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WebGLSceneClient } from "@/components/ui/WebGLSceneClient";
import { MagneticCursor } from "@/components/ui/MagneticCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://joshholzhauser.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Josh Holzhauser — Full-Stack Developer & Builder",
    template: "%s · Josh Holzhauser",
  },
  description:
    "Solo developer building custom websites, business tools, automations, and SaaS products. Concept to deployed — maintained over time.",
  alternates: { canonical: "/" },
  authors: [{ name: "Josh Holzhauser", url: SITE_URL }],
  creator: "Josh Holzhauser",
  openGraph: {
    type: "website",
    siteName: "Josh Holzhauser",
    url: SITE_URL,
    title: "Josh Holzhauser — Full-Stack Developer & Builder",
    description:
      "Solo developer building custom websites, business tools, automations, and SaaS products. Concept to deployed — maintained over time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josh Holzhauser — Full-Stack Developer & Builder",
    description:
      "Solo developer building custom websites, business tools, automations, and SaaS products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#07080B] text-[#F9FAFB] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Josh Holzhauser",
                url: SITE_URL,
                jobTitle: "Full-Stack Developer",
                description:
                  "Solo developer building custom websites, business tools, automations, and SaaS products.",
                knowsAbout: [
                  "Web Development",
                  "Mobile Development",
                  "SaaS",
                  "Automation",
                  "AI Integration",
                  "Next.js",
                  "TypeScript",
                  "Firebase",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Josh Holzhauser",
                url: SITE_URL,
              },
            ]),
          }}
        />
        {/* Custom cursor — replaces system cursor on pointer devices */}
        <MagneticCursor />
        {/* Global WebGL particle field — fixed behind all content */}
        <WebGLSceneClient className="fixed inset-0 w-full h-full z-0" />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
