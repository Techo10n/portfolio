import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  "text-foreground text-xs px-2 py-1 rounded-2xl border border-foreground/50 hover:bg-white/10 transition-colors cursor-pointer";

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
  const hasActions = Boolean(project.actions?.length);
  const backgroundStyle = project.image
    ? {
        backgroundImage: `url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: project.imagePosition ?? "center",
      }
    : undefined;

  return (
    <article
      className="flex flex-col items-center justify-end w-full min-h-[220px] sm:min-h-[240px] md:min-h-[256px] border border-foreground/50 rounded-2xl overflow-hidden transition-colors group"
      style={backgroundStyle}
    >
      <div
        className={`flex flex-col items-start justify-start w-full min-h-[122px] px-6 pt-2 pb-3 transition-all duration-300 ${
          project.image ? "bg-black/85" : "bg-black/20"
        } ${hasActions ? "[@media(hover:hover)]:group-hover:min-h-[154px]" : ""}`}
      >
        <h3 className="text-foreground text-lg font-extrabold leading-tight">
          {project.title}
        </h3>
        <p className="text-foreground text-xs mt-1">
          {project.description}
        </p>
        {hasActions && (
          <div className="flex flex-row flex-wrap items-center justify-start mt-3 gap-3">
            {project.actions?.map((action) => (
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
        )}
      </div>
    </article>
  );
}

export default function Projects({ onClose }: { onClose: () => void }) {
  return (
    <ScrollArea className="flex flex-col items-start justify-start border border-foreground/20 rounded-[20px] bg-foreground/8 backdrop-blur-lg w-full h-full">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-foreground text-xs pt-2.5 pl-3">
            My Projects
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-4 sm:px-8 md:px-14 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-extrabold">
              Stuff I&apos;ve Been Working On
            </h1>

            {sections.map((section) => (
              <section key={section.title} className="w-full">
                <h2 className="text-foreground text-base sm:text-lg font-extrabold mt-4 sm:mt-6 md:mt-8">
                  {section.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full mt-4">
                  {section.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}
