import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kibewall.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://kibewall.com/explore",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: "https://kibewall.com/categories",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]
}
