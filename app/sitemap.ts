import type { MetadataRoute } from "next";
import { devopsCatalog } from "@/lib/devopsCatalog";
import { installGuides } from "@/lib/guides";

const BASE_URL = "https://openstackgit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/downloads`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/download-git`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/download-openstack`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryPages: MetadataRoute.Sitemap = devopsCatalog.map((cat) => ({
    url: `${BASE_URL}/downloads/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = devopsCatalog.flatMap((cat) =>
    cat.tools.map((tool) => ({
      url: `${BASE_URL}/downloads/${cat.slug}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  const guidePages: MetadataRoute.Sitemap = installGuides.map((g) => ({
    url: `${BASE_URL}/blog/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...guidePages];
}
