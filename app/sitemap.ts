import type { MetadataRoute } from "next";
import { SEGMENTOS } from "@/lib/segmentos";

const SITE_URL = "https://agenciamajor.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/proposta`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SEGMENTOS.map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
