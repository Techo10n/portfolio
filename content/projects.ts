/**
 * Every project on the Projects window. Each one also gets a case-study window at
 * /projects/<slug>, whose body is `content/case-studies/<slug>.md`.
 */
export const PROJECT_SLUGS = [
  "museaic",
  "songscraper",
  "notion-voice-assistant",
  "portfolio",
  "ecoshelf",
  "simpliearn",
  "bdbi",
  "empaithetic",
  "vip-drone-detection",
  "blue-mountain-law",
  "cwjfon",
  "askin4baskin",
  "inland-octopus",
  "flickariah",
  "techolon",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectAction = {
  label: string;
  href: string;
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  description: string;
  /** Caveat shown under the description, e.g. why a live link is gone. */
  note?: string;
  /** Stack, from the resume or the project's vault page. */
  tags?: string[];
  period?: string;
  /** Shown large, above everything else. */
  featured?: boolean;
  actions?: ProjectAction[];
};

export type ProjectSection = {
  title: string;
  projects: Project[];
};

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        slug: "museaic",
        title: "Museaic",
        featured: true,
        period: "Jan 2025 – Present",
        tags: ["React Native", "Expo", "TypeScript", "Supabase"],
        description:
          "Cross-platform playlist sharing app that maps tracks between Spotify, Apple Music, and YouTube Music, with OAuth for each service and Supabase for auth and data. TestFlight beta with 20+ users. Previously, and still internally, called MusicBridge.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/musicbridge" }],
      },
      {
        slug: "songscraper",
        title: "SongScraper",
        tags: ["Expo", "TypeScript", "Supabase"],
        description:
          "iOS app that finds the songs in any Instagram reel, whether tagged in the audio, shown as on-screen text, or just audible. Spun out of Museaic's reel importer.",
      },
      {
        slug: "notion-voice-assistant",
        title: "Notion Voice Assistant",
        tags: ["Vercel", "Claude API", "Notion API", "iOS Shortcuts"],
        description:
          "Dictate an assignment to an iOS Shortcut and it lands in my Notion database. A serverless function has Claude pull out the name, label, and deadline, checks them, and works out the priority from the due date.",
      },
      {
        slug: "portfolio",
        title: "This Website",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        description:
          "A desktop-style portfolio with tiling, resizable windows, built with Next.js, TypeScript, and Tailwind CSS.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/portfolio" }],
      },
      {
        slug: "ecoshelf",
        title: "EcoShelf",
        tags: ["WXT", "React", "Express", "OpenAI"],
        description:
          "Chrome extension meant to estimate a product's shipping emissions while you shop and suggest greener alternatives at a similar price. The Amazon scraper, popup, and search-term API are built; the emissions math and alternatives search aren't yet.",
        note: "On hold: my friend who was the PM stepped away, and I haven't picked it back up solo yet.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/ecoshelf" }],
      },
    ],
  },
  {
    title: "Clubs & Hackathons",
    projects: [
      {
        slug: "simpliearn",
        title: "SimpliEarn",
        period: "Jan 2025 – May 2025",
        tags: ["Next.js", "React", "Python", "Chart.js"],
        description:
          "AI-powered earnings call analysis platform. Built its sentiment graph, a 48-hour stock chart around each call, and the Next.js dashboard tying together the AI summary engine and a RAG chatbot.",
        actions: [
          { label: "View Site", href: "https://simpli-earn-2.vercel.app" },
          { label: "Source Code", href: "https://github.com/gt-big-data/simpli-earn" },
        ],
      },
      {
        slug: "bdbi",
        title: "BDBI Website",
        period: "Aug 2025 – Present",
        tags: ["React", "Next.js", "TypeScript", "Vercel"],
        description:
          "Official site of Big Data Big Impact at Georgia Tech. As Digital Resources Manager, rebuilt it from Angular to React and Next.js and moved it to Vercel.",
        actions: [{ label: "View Site", href: "https://gtbigdatabigimpact.com" }],
      },
      {
        slug: "empaithetic",
        title: "EmpAIthetic",
        tags: ["HackGT 11"],
        description:
          "AI-powered journaling app for expressing emotions and receiving support. Built with a team of four at HackGT 11.",
        actions: [
          { label: "View Demo", href: "https://www.youtube.com/watch?v=G2bBY3_221M" },
          { label: "Source Code", href: "https://github.com/Techo10n/shaz" },
        ],
      },
      {
        slug: "vip-drone-detection",
        title: "VIP Drone Detection",
        tags: ["Python", "RT-DETR", "NVIDIA Jetson"],
        description:
          "Georgia Tech Vertically Integrated Projects team building drone-based detection. I set up the team repo and wrote the benchmark that measures our RT-DETR model's speed on an NVIDIA Jetson across four test sets.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/vip-team-2-drone-detection" }],
      },
    ],
  },
  {
    title: "Client Work",
    projects: [
      {
        slug: "blue-mountain-law",
        title: "Blue Mountain Law Office",
        tags: ["Framer"],
        description:
          "Mobile-first Framer site for a local law office, with service details and a consultation request form. Client inquiries rose over 400% in three months.",
        note: "The live site is offline: the attorney has since moved to a new firm. The archived copy is static, so its flip cards and FAQ accordion no longer work.",
        actions: [{ label: "View Archived Site", href: "https://web.archive.org/web/20250710234233/https://www.bluemountainlawoffice.com/" }],
      },
      {
        slug: "cwjfon",
        title: "CWJFON",
        tags: ["Squarespace"],
        description:
          "Squarespace redesign for Central Washington Justice for Our Neighbors, a regional nonprofit, increasing site visits by 150%.",
        note: "The live site has changed since I handed it off, so this links an archived copy of my redesign. Its hero video didn't survive archiving.",
        actions: [{ label: "View Archived Site", href: "https://web.archive.org/web/20251015132321/https://cwjfon.org/" }],
      },
      {
        slug: "askin4baskin",
        title: "Askin4Baskin",
        tags: ["WordPress"],
        description: "WordPress site for a lawyer, focused on UX and simple client contact.",
        actions: [{ label: "View Site", href: "https://askin4baskin.attorney" }],
      },
      {
        slug: "inland-octopus",
        title: "Inland Octopus",
        tags: ["Next.js"],
        description:
          "Illustrated marketing site for a toy and novelty store, built around a hand-composed scene with procedurally generated clouds.",
        note: "A prototype: it isn't deployed on Inland Octopus's own domain.",
        actions: [
          { label: "View Prototype", href: "https://inland-octopus.vercel.app" },
          { label: "Source Code", href: "https://github.com/Techo10n/inland-octopus" },
        ],
      },
    ],
  },
  {
    title: "Other Ventures",
    projects: [
      {
        slug: "flickariah",
        title: "Flickariah",
        tags: ["Photography"],
        description: "My photography account on Instagram.",
        actions: [{ label: "View Instagram", href: "https://www.instagram.com/flickariah/" }],
      },
      {
        slug: "techolon",
        title: "Techolon",
        tags: ["Video editing"],
        description: "My personal YouTube channel where I post video game montages and edits.",
        actions: [{ label: "View Channel", href: "https://www.youtube.com/@techolon" }],
      },
    ],
  },
];

export const PROJECTS = Object.fromEntries(
  PROJECT_SECTIONS.flatMap((section) => section.projects).map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;
