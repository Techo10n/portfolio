import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectSlug } from "@/content/projects";
import Gallery from "@/components/Gallery";
import { mediaFor } from "@/content/media";

/** The case study's body, written in Markdown; null if it hasn't been written yet. */
function body(slug: ProjectSlug): string | null {
  try {
    return readFileSync(path.join(process.cwd(), "content/case-studies", `${slug}.md`), "utf8");
  } catch {
    return null;
  }
}

const sectionLabel = "font-mono text-xs uppercase tracking-widest text-foreground/60";

// No typography plugin: the few elements a case study uses get the site's own type styles.
const markdown: Components = {
  h2: ({ children }) => <h2 className={`${sectionLabel} mt-8 mb-3`}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-semibold mt-5 mb-2">{children}</h3>,
  p: ({ children }) => <p className="mt-3 first:mt-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mt-3 space-y-1.5 marker:text-foreground/40">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mt-3 space-y-1.5 marker:text-foreground/50">{children}</ol>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  code: ({ children }) => <code className="font-mono text-[0.85em] rounded bg-foreground/8 px-1 py-0.5">{children}</code>,
  pre: ({ children }) => <pre className="mt-3 overflow-x-auto rounded-lg bg-foreground/5 p-3 text-sm">{children}</pre>,
  blockquote: ({ children }) => <blockquote className="mt-3 border-l-2 border-foreground/25 pl-4 text-foreground/75">{children}</blockquote>,
  table: ({ children }) => (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-foreground/20 py-1.5 pr-4 text-left font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-foreground/10 py-1.5 pr-4 align-top">{children}</td>,
  // Images belong in the gallery, where they're sized and optimized.
  img: () => null,
};

export default function CaseStudy({ slug }: { slug: ProjectSlug }) {
  const project = PROJECTS[slug];
  const media = mediaFor(slug);
  const text = body(slug);

  return (
    <article className="w-full max-w-5xl mx-auto px-5 @xl:px-8 @3xl:px-12 py-6 @xl:py-8 pb-10">
      {media?.cover && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-foreground/15 mb-6">
          <Image src={media.cover} alt={media.alt} fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover" />
        </div>
      )}

      <h1 className="font-mono text-2xl @xl:text-3xl font-extrabold tracking-tight">{project.title}</h1>
      {project.period && <p className="font-mono text-xs text-foreground/65 mt-2">{project.period}</p>}
      {project.tags?.length ? (
        <ul aria-label="Built with" className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <li key={tag} className="font-mono text-[11px] rounded-md bg-foreground/8 px-1.5 py-0.5 text-foreground/80">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {project.note && <p className="text-sm text-foreground/70 mt-3">{project.note}</p>}
      {project.actions?.length ? (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.actions.map((action) => (
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
      ) : null}

      <div className="mt-7 max-w-[72ch] text-[15px] leading-relaxed text-foreground/90">
        {text ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdown}>
            {text}
          </ReactMarkdown>
        ) : (
          <p>{project.description}</p>
        )}
      </div>

      {media?.gallery?.length ? (
        <section aria-label="Gallery" className="mt-9">
          <h2 className={sectionLabel}>Gallery</h2>
          <Gallery images={media.gallery} />
        </section>
      ) : null}
    </article>
  );
}
