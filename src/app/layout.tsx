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
      <body className="min-h-screen flex flex-col bg-[#07080B] text-[#F9FAFB] antialiased">
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
