import type { MetadataRoute } from "next";
import { PROGRAMS, WINDOW_KEYS } from "@/components/desktop/programs";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return WINDOW_KEYS.map((key) => ({
    url: new URL(PROGRAMS[key].path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: key === "about" ? 1 : 0.7,
  }));
}
