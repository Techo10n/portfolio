export const site = {
  name: "Zechariah Frierson",
  tagline: "Software Engineer",
  education: "Computer Science @ Georgia Tech · Class of 2028",
  description:
    "Zechariah Frierson is a software engineer and Georgia Tech computer science student (Class of 2028), most recently a software engineering intern at Capital One. Projects, experience, and resume, presented as a desktop you can click around.",
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
