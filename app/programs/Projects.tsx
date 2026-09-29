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

const sections: ProjectSection[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        title: "EcoShelf",
        description:
          "Chrome extension concept for surfacing more environmentally friendly product alternatives while people shop online.",
      },
      {
        title: "This Website",
        description:
          "A windowed desktop-style portfolio built with Next.js, TypeScript, Tailwind CSS, and resizable panels.",
        actions: [
          { label: "View Site", href: "/" },
          { label: "Source Code", href: "https://github.com/Techo10n/portfolio" },
        ],
      },
      {
        title: "MusicBridge",
        description:
          "Playlist sharing app concept designed to make cross-service music recommendations easier without requiring a destination-service account.",
      },
    ],
  },
  {
    title: "Clubs & Hackathons",
    projects: [
      {
        title: "SimpliEarn",
        description:
          "Hackathon project focused on making personal finance and rewards tracking easier to understand at a glance.",
      },
      {
        title: "JourneyJar",
        description:
          "Collaborative travel planning prototype for saving trip ideas, comparing plans, and organizing shared itineraries.",
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
      {
        title: "GameLogs",
        description:
          "Game-tracking project for logging play sessions, notes, and progress across games in one organized place.",
      },
    ],
  },
  {
    title: "Client Work",
    projects: [
      {
        title: "Blue Mountain Law Office Website",
        description:
          "A modern website for a local law office, built in Framer, featuring service details and online appointment booking.",
        image: "/bml-screenshot.png",
        imagePosition: "center",
        actions: [{ label: "View Site", href: "https://www.bluemountainlawoffice.com" }],
      },
      {
        title: "ILJCW Website Design",
        description:
          "Website redesign work for a legal nonprofit, focused on clearer program information, staff visibility, and partner outreach.",
      },
      {
        title: "Inland Octopus Website Development",
        description:
          "Website development work for a local business, emphasizing clearer content structure and a more maintainable web presence.",
      },
      {
        title: "Welcome Home Properties Database Software",
        description:
          "Custom database software concept for helping a property team organize records, lookups, and internal workflows.",
      },
    ],
  },
  {
    title: "Other Ventures",
    projects: [
      {
        title: "GT VGDev Trailers",
        description:
          "Video editing work for Georgia Tech VGDev projects, creating short trailers that present student-made games clearly and energetically.",
      },
      {
        title: "Techolon",
        description:
          "My personal YouTube channel where I post video game montages and edits.",
        image: "/yt-screenshot.png",
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
