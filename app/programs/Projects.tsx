import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Carousel from "@/components/Carousel";
import OpenWindowButton from "@/components/desktop/OpenWindowButton";
import { caseStudyKey } from "@/components/desktop/programs";
import { mediaFor } from "@/content/media";
import { PROJECT_SECTIONS, type Project, type ProjectAction } from "@/content/projects";

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
          // Above the card's stretched case-study link, so these still go where they say.
          className="relative z-10 inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-foreground/25 bg-background text-sm hover:bg-foreground/10 transition-colors"
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
  const { slug, title, description, period, featured } = project;
  const media = mediaFor(slug);
  return (
    // The whole card opens the case study: the title link stretches over it.
    <article
      className={`group/card relative flex flex-col h-full overflow-hidden rounded-xl border bg-background transition-colors hover:border-foreground/45 ${
        featured ? "border-foreground/35 @3xl:flex-row" : "border-foreground/15"
      }`}
    >
      {media?.cover && (
        // The featured card puts its image beside the text once there's room, so it doesn't fill the window.
        <div
          className={`relative aspect-[16/9] shrink-0 border-b border-foreground/10 ${
            featured ? "@3xl:w-1/2 @3xl:border-b-0 @3xl:border-r" : ""
          }`}
        >
          {featured && media.strip && media.gallery?.length ? (
            <Carousel images={media.gallery} background={media.background} />
          ) : (
            <Image
              src={media.cover}
              alt={media.alt}
              fill
              sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"}
              className="object-cover"
            />
          )}
        </div>
      )}
      <div data-testid="card-body" className="flex flex-col flex-1 p-4 @xl:p-5">
        {featured && <p className={`${sectionLabel} mb-2`}>Featured</p>}
        <h3 className={`font-semibold leading-snug ${featured ? "text-xl" : "text-base"}`}>
          <OpenWindowButton
            window={caseStudyKey(slug)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-foreground"
          >
            {title}
          </OpenWindowButton>
        </h3>
        {period && <p className="font-mono text-xs text-foreground/65 mt-1">{period}</p>}
        <p className={`leading-relaxed text-foreground/85 mt-2 ${featured ? "text-[15px] max-w-[70ch]" : "text-sm"}`}>
          {description}
        </p>
        {project.note && <p className="text-xs leading-relaxed text-foreground/65 mt-2">{project.note}</p>}
        <Tags tags={project.tags} />
        <div className="mt-auto">
          <Actions actions={project.actions} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = PROJECT_SECTIONS.flatMap((s) => s.projects).filter((p) => p.featured);
  return (
    <div className="w-full px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">Projects</h1>

      {featured.map((project) => (
        <div key={project.title} className="mt-6">
          <ProjectCard project={project} />
        </div>
      ))}

      {PROJECT_SECTIONS.map((section) => {
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
