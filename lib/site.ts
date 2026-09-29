export const site = {
  name: "Zechariah Frierson",
  tagline: "Full Stack Web Developer & Designer",
  description:
    "Portfolio of Zechariah Frierson, a Georgia Tech computer science student and full stack web developer. Projects, resume, and contact, presented as a desktop you can click around.",
};

/**
 * Absolute origin used for canonical URLs, Open Graph, the sitemap, and robots.txt.
 * SITE_URL wins; on Vercel the production domain is provided automatically.
 */
export const siteUrl = new URL(
  process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);
