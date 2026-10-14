import media from "./project-media.json";
import type { ProjectSlug } from "./projects";

type Image = { src: string; alt: string };
type ProjectMedia = { cover?: string; alt: string; gallery?: Image[] };

/** A project's cover and gallery images, from `project-media.json`; undefined if it has none. */
export const mediaFor = (slug: ProjectSlug): ProjectMedia | undefined =>
  (media as Partial<Record<ProjectSlug, ProjectMedia>>)[slug];
