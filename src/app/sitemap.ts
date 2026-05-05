import type { MetadataRoute } from "next";
import { tier1 } from "@/data/projects";

const SITE_URL = "https://joshholzhauser.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const caseStudies: MetadataRoute.Sitemap = tier1().map((p) => ({
    url: `${SITE_URL}/portfolio/${p.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [
    { url: `${SITE_URL}/`,          lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/about`,     lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`,  lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...caseStudies,
    { url: `${SITE_URL}/book`,      lastModified, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
