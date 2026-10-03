import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-queries";
import { getPublishedProjects } from "@/lib/project-queries";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const staticPaths = [
  "",
  "/Aboutus",
  "/Interior-design-academy-enugu",
  "/Contact",
  "/Services",
  "/Services/interior-design-enugu",
  "/Services/cleaning-fumigation-pest-control-enugu",
  "/Services/real-estate-enugu",
  "/Services/Our-Projects",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPublishedPosts(), getPublishedProjects()]);

  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/Listing/Our-Projects/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
