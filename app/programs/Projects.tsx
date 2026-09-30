import Image from "next/image";


type ProjectAction = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  description: string;
  actions?: ProjectAction[];
  image?: string;
  imagePosition?: string;
};

type ProjectSection = {
  title: string;
  projects: Project[];
};

const actionClass =
  "text-foreground text-xs px-2 py-1 rounded-2xl border border-foreground/50 hover:bg-foreground/10 transition-colors cursor-pointer";

// Every description here is sourced from Zech's resume, the knowledge vault, or his own earlier
// copy. Projects without a verified description are left out rather than described by guesswork.
const sections: ProjectSection[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        title: "MusicBridge",
        description:
          "Cross-platform playlist sharing app that maps tracks between Spotify, Apple Music, and YouTube Music, with OAuth for each service and Supabase for auth and data. TestFlight beta with 20+ users.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/musicbridge" }],
      },
      {
        title: "SongScraper",
        description:
          "iOS app that finds the songs in any Instagram reel, whether tagged in the audio, shown as on-screen text, or just audible. Spun out of MusicBridge's reel importer.",
      },
      {
        title: "EcoShelf",
        description:
          "Chrome extension that estimates a product's shipping emissions while you shop and recommends more sustainable alternatives at a similar price.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/ecoshelf" }],
      },
      {
        title: "This Website",
        description:
          "A desktop-style portfolio with tiling, resizable windows, built with Next.js, TypeScript, and Tailwind CSS.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/portfolio" }],
      },
    ],
  },
  {
    title: "Clubs & Hackathons",
    projects: [
      {
        title: "SimpliEarn",
        description:
          "AI-powered earnings call analysis platform. Built its sentiment graph, a 48-hour stock chart around each call, and the Next.js dashboard tying together the AI summary engine and a RAG chatbot.",
        actions: [{ label: "View Site", href: "https://simpli-earn-2.vercel.app" }],
      },
      {
        title: "BDBI Website",
        description:
          "Official site of Big Data Big Impact at Georgia Tech. As Digital Resources Manager, rebuilt it from Angular to React and Next.js and moved it to Vercel.",
        actions: [{ label: "View Site", href: "https://gtbigdatabigimpact.com" }],
      },
      {
        title: "EmpAIthetic",
        description:
          "AI-powered journaling app for expressing emotions and receiving support. Built for HackGT 11.",
        image: "/empaithetic-screenshot.jpg",
        imagePosition: "left",
        actions: [
          { label: "View Demo", href: "https://www.youtube.com/watch?v=G2bBY3_221M" },
          { label: "Source Code", href: "https://github.com/Techo10n/shaz" },
        ],
      },
    ],
  },
  {
    title: "Client Work",
    projects: [
      {
        title: "Blue Mountain Law Office",
        description:
          "Mobile-first Framer site for a local law office, with service details and online appointment booking. Client inquiries rose over 400% in three months.",
        image: "/bml-screenshot.jpg",
        imagePosition: "center",
        actions: [{ label: "View Site", href: "https://bluemountainlawoffice.com" }],
      },
      {
        title: "CWJFON",
        description:
          "Squarespace redesign for Central Washington Justice for Our Neighbors, a regional nonprofit, increasing site visits by 150%.",
        actions: [{ label: "View Site", href: "https://cwjfon.org" }],
      },
      {
        title: "Askin4Baskin",
        description: "WordPress site for a lawyer, focused on UX and simple client contact.",
        actions: [{ label: "View Site", href: "https://askin4baskin.attorney" }],
      },
      {
        title: "Inland Octopus",
        description:
          "Illustrated marketing site for a toy and novelty store, built around a hand-composed scene with procedurally generated clouds.",
        actions: [
          { label: "View Site", href: "https://inland-octopus.vercel.app" },
          { label: "Source Code", href: "https://github.com/Techo10n/inland-octopus" },
        ],
      },
    ],
  },
  {
    title: "Other Ventures",
    projects: [
      {
        title: "Techolon",
        description: "My personal YouTube channel where I post video game montages and edits.",
        image: "/yt-screenshot.jpg",
        imagePosition: "left",
        actions: [{ label: "View Channel", href: "https://www.youtube.com/@techolon" }],
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <div
      data-testid="card-body"
      className={`relative flex flex-col items-start w-full px-6 pt-3 pb-4 bg-background/85 ${project.image ? "" : "flex-1"}`}
    >
      <h3 className="text-foreground text-lg font-extrabold leading-tight">
        {project.title}
      </h3>
      <p className="text-foreground text-xs mt-1">
        {project.description}
      </p>
      {project.actions?.length ? (
        <div className="flex flex-row flex-wrap items-center justify-start mt-3 gap-3">
          {project.actions.map((action) => (
            <a
              key={action.label}
              className={actionClass}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {action.label} <span className="ml-1">-&gt;</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <article
      className={`relative flex flex-col justify-end w-full border border-foreground/50 rounded-2xl overflow-hidden ${
        project.image ? "min-h-[220px] @xl:min-h-[240px] @3xl:min-h-[256px]" : ""
      }`}
    >
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: project.imagePosition ?? "center" }}
        />
      )}
      {body}
    </article>
  );
}

export default function Projects() {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-col justify-start items-start w-full h-full px-4 @xl:px-8 @3xl:px-14 py-4 @xl:py-6 @3xl:py-8">
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="text-foreground text-xl @xl:text-2xl @3xl:text-3xl font-extrabold">
            Stuff I&apos;ve Been Working On
          </h1>

          {sections.map((section) => (
            <section key={section.title} className="w-full">
              <h2 className="text-foreground text-base @xl:text-lg font-extrabold mt-4 @xl:mt-6 @3xl:mt-8">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-4 @xl:gap-6 @3xl:gap-8 w-full mt-4">
                {section.projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
