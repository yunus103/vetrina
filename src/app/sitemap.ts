import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const data = await client.fetch(allSlugsForSitemapQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/referanslarimiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...(data?.blogPosts?.map((p: any) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || []),
    ...(data?.blogCategories?.map((p: any) => ({
      url: `${base}/blog/kategori/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })) || []),
    ...(data?.services?.map((p: any) => ({
      url: `${base}/hizmetler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || []),
    ...(data?.projects?.map((p: any) => ({
      url: `${base}/projeler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || []),
    ...(data?.legalPages?.map((p: any) => ({
      url: `${base}/yasal/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })) || []),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
