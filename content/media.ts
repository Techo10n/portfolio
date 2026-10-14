import media from "./project-media.json";
import type { ProjectSlug } from "./projects";

type Image = { src: string; alt: string; w?: number; h?: number };
type ProjectMedia = {
  cover?: string;
  alt: string;
  gallery?: Image[];
  /** Show the gallery as one scrolling strip (card and case-study header) instead of the cover. */
  strip?: boolean;
  /** The colour the strip images are laid on, so the strip reads as one surface. */
  background?: string;
};

/** A project's cover and gallery images, from `project-media.json`; undefined if it has none. */
export const mediaFor = (slug: ProjectSlug): ProjectMedia | undefined =>
  (media as Partial<Record<ProjectSlug, ProjectMedia>>)[slug];
