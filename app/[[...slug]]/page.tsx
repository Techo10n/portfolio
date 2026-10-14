import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Desktop from "@/components/desktop/Desktop";
import { PROGRAMS, WINDOW_KEYS, caseStudyKey, keyForPath, type WindowKey } from "@/components/desktop/programs";
import { PROJECT_SLUGS } from "@/content/projects";
import { site } from "@/lib/site";
import About from "../programs/About";
import Projects from "../programs/Projects";
import Experience from "../programs/Experience";
import Resume from "../programs/Resume";
import Contact from "../programs/Contact";
import Terminal from "../programs/Terminal";
import CaseStudy from "../programs/CaseStudy";

type Params = { params: Promise<{ slug?: string[] }> };

// One static page per window: /, /projects, /experience, ..., and /projects/<slug> for each case
// study. Anything else is a 404 via notFound(). (`dynamicParams = false` would also 404, but Next logs every such
// request as an internal NoFallbackError.)

export function generateStaticParams() {
  return WINDOW_KEYS.map((key) => ({ slug: PROGRAMS[key].path.split("/").filter(Boolean) }));
}

const windowFor = async ({ params }: Params): Promise<WindowKey> => {
  const slug = (await params).slug;
  const key = keyForPath(`/${slug?.join("/") ?? ""}`);
  if (!key) notFound();
  return key;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const key = await windowFor(props);
  if (key === "about") return {};
  const title = `${PROGRAMS[key].title} · ${site.name}`;
  return {
    title,
    alternates: { canonical: PROGRAMS[key].path },
    // A page's openGraph replaces the layout's wholesale, so the generated image must be restated.
    openGraph: {
      title,
      url: PROGRAMS[key].path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}, ${site.tagline}` }],
    },
  };
}

export default async function Page(props: Params) {
  const initial = await windowFor(props);
  return (
    <div className="relative flex flex-col h-dvh overflow-hidden">
      <a
        href="#desktop"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:rounded-lg focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <div className="absolute inset-0 -z-20 animate-gradient-radial" />
      <Desktop
        initial={initial}
        programs={{
          about: <About />,
          projects: <Projects />,
          experience: <Experience />,
          resume: <Resume />,
          contact: <Contact />,
          terminal: <Terminal />,
          ...Object.fromEntries(PROJECT_SLUGS.map((slug) => [caseStudyKey(slug), <CaseStudy key={slug} slug={slug} />])),
        } as Record<WindowKey, ReactNode>}
      />
    </div>
  );
}
