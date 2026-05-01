import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Josh Holzhauser — Full-Stack Developer & Builder",
  description:
    "I build custom web apps, automations, and AI-powered tools for businesses. From concept to deployed product — maintained and improved over time.",
  keywords: ["full-stack developer", "web app development", "automation", "SaaS", "AI development", "custom software"],
  openGraph: {
    title: "Josh Holzhauser — Full-Stack Developer & Builder",
    description: "I build apps, automations, and AI tools so you don't have to hire a team.",
    type: "website",
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
      <body className="min-h-screen flex flex-col bg-[#0A0E1A] text-[#F9FAFB] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
