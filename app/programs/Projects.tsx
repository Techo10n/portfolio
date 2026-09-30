import Image from "next/image";
import { ArrowUpRight } from "lucide-react";


type ProjectAction = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  description: string;
  /** Stack, from the resume or the project's vault page. */
  tags?: string[];
  period?: string;
  /** Shown large, above everything else. */
  featured?: boolean;
  actions?: ProjectAction[];
  image?: string;
  imagePosition?: string;
};

type ProjectSection = {
  title: string;
  projects: Project[];
};

const sections: ProjectSection[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        title: "MusicBridge",
        featured: true,
        period: "Jan 2025 – Present",
        tags: ["React Native", "Expo", "TypeScript", "Supabase"],
        description:
          "Cross-platform playlist sharing app that maps tracks between Spotify, Apple Music, and YouTube Music, with OAuth for each service and Supabase for auth and data. TestFlight beta with 20+ users.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/musicbridge" }],
      },
      {
        title: "SongScraper",
        tags: ["Expo", "TypeScript", "Supabase"],
        description:
          "iOS app that finds the songs in any Instagram reel, whether tagged in the audio, shown as on-screen text, or just audible. Spun out of MusicBridge's reel importer.",
      },
      {
        title: "EcoShelf",
        tags: ["WXT", "React", "Express", "OpenAI"],
        description:
          "Chrome extension that estimates a product's shipping emissions while you shop and recommends more sustainable alternatives at a similar price.",
        actions: [{ label: "Source Code", href: "https://github.com/Techo10n/ecoshelf" }],
      },
      {
        title: "This Website",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
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
        period: "Aug 2025 – Dec 2025",
        tags: ["Next.js", "React", "Python", "Chart.js"],
        description:
          "AI-powered earnings call analysis platform. Built its sentiment graph, a 48-hour stock chart around each call, and the Next.js dashboard tying together the AI summary engine and a RAG chatbot.",
        actions: [{ label: "View Site", href: "https://simpli-earn-2.vercel.app" }],
      },
      {
        title: "BDBI Website",
        period: "Aug 2025 – Present",
        tags: ["React", "Next.js", "TypeScript", "Vercel"],
        description:
          "Official site of Big Data Big Impact at Georgia Tech. As Digital Resources Manager, rebuilt it from Angular to React and Next.js and moved it to Vercel.",
        actions: [{ label: "View Site", href: "https://gtbigdatabigimpact.com" }],
      },
      {
        title: "EmpAIthetic",
        tags: ["HackGT 11"],
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
        tags: ["Framer"],
        description:
          "Mobile-first Framer site for a local law office, with service details and online appointment booking. Client inquiries rose over 400% in three months.",
        image: "/bml-screenshot.jpg",
        imagePosition: "center",
        actions: [{ label: "View Site", href: "https://bluemountainlawoffice.com" }],
      },
      {
        title: "CWJFON",
        tags: ["Squarespace"],
        description:
          "Squarespace redesign for Central Washington Justice for Our Neighbors, a regional nonprofit, increasing site visits by 150%.",
        actions: [{ label: "View Site", href: "https://cwjfon.org" }],
      },
      {
        title: "Askin4Baskin",
        tags: ["WordPress"],
        description: "WordPress site for a lawyer, focused on UX and simple client contact.",
        actions: [{ label: "View Site", href: "https://askin4baskin.attorney" }],
      },
      {
        title: "Inland Octopus",
        tags: ["Next.js"],
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
        tags: ["Video editing"],
        description: "My personal YouTube channel where I post video game montages and edits.",
        image: "/yt-screenshot.jpg",
        imagePosition: "left",
        actions: [{ label: "View Channel", href: "https://www.youtube.com/@techolon" }],
      },
    ],
  },
];

const sectionLabel = "font-mono text-xs uppercase tracking-widest text-foreground/60";

function Actions({ actions }: { actions?: ProjectAction[] }) {
  if (!actions?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-foreground/25 text-sm hover:bg-foreground/10 transition-colors"
        >
          {action.label}
          <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
        </a>
      ))}
    </div>
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul aria-label="Built with" className="flex flex-wrap gap-1.5 mt-3">
      {tags.map((tag) => (
        <li key={tag} className="font-mono text-[11px] rounded-md bg-foreground/8 px-1.5 py-0.5 text-foreground/80">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, image, imagePosition, period, featured } = project;
  return (
    <article
      className={`flex flex-col h-full overflow-hidden rounded-xl border bg-background ${
        featured ? "border-foreground/35" : "border-foreground/15"
      }`}
    >
      {image && (
        <div className="relative aspect-[16/9] border-b border-foreground/10">
          <Image
            src={image}
            alt={`Screenshot of ${title}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition ?? "center" }}
          />
        </div>
      )}
      <div data-testid="card-body" className="flex flex-col flex-1 p-4 @xl:p-5">
        {featured && <p className={`${sectionLabel} mb-2`}>Featured</p>}
        <h3 className={`font-semibold leading-snug ${featured ? "text-xl" : "text-base"}`}>{title}</h3>
        {period && <p className="font-mono text-xs text-foreground/65 mt-1">{period}</p>}
        <p className={`leading-relaxed text-foreground/85 mt-2 ${featured ? "text-[15px] max-w-[70ch]" : "text-sm"}`}>
          {description}
        </p>
        <Tags tags={project.tags} />
        <div className="mt-auto">
          <Actions actions={project.actions} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = sections.flatMap((s) => s.projects).filter((p) => p.featured);
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Projects</h1>

      {featured.map((project) => (
        <div key={project.title} className="mt-6">
          <ProjectCard project={project} />
        </div>
      ))}

      {sections.map((section) => {
        const projects = section.projects.filter((p) => !p.featured);
        const id = `${section.title.toLowerCase().replace(/[^a-z]+/g, "-")}-heading`;
        return (
          <section key={section.title} aria-labelledby={id} className="mt-9">
            <h2 id={id} className={sectionLabel}>{section.title}</h2>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-3 mt-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
