import { BookOpen, BriefcaseBusiness, FileText, FolderOpen, Mail, Terminal, UserCircle, type LucideIcon } from "lucide-react";
import { PROJECT_SLUGS, PROJECTS, type ProjectSlug } from "@/content/projects";

/** The apps: always in the dock and on the phone home screen. */
export const APP_KEYS = ["about", "projects", "experience", "resume", "contact", "terminal"] as const;

export type AppKey = (typeof APP_KEYS)[number];

/** One case-study window per project, opened from its card. */
export type CaseStudyKey = `project/${ProjectSlug}`;

export type WindowKey = AppKey | CaseStudyKey;

export const caseStudyKey = (slug: ProjectSlug): CaseStudyKey => `project/${slug}`;

export const WINDOW_KEYS: readonly WindowKey[] = [...APP_KEYS, ...PROJECT_SLUGS.map(caseStudyKey)];

export const isApp = (key: WindowKey): key is AppKey => (APP_KEYS as readonly string[]).includes(key);

type Program = {
  /** Window title bar text; also the window's accessible name. */
  title: string;
  /** Dock, home screen, and tab bar label. */
  label: string;
  icon: LucideIcon;
  /** URL for this window. About is the home page. */
  path: string;
  /** Whether the window wraps its content in a scroll area. Terminal manages its own. */
  scroll: boolean;
  /** Preferred size on desktop, in px; clamped to the available space. */
  size: { w: number; h: number };
  /**
   * Where the window first opens, as a fraction of the free space on each axis (0 = left/top edge,
   * 1 = right/bottom edge). Each window has its own spot, so opening several spreads them across
   * the desktop instead of piling them up in the middle.
   */
  home: { x: number; y: number };
  /** Shown in the phone tab bar. Everything is always on the desktop / home screen. */
  inTabBar: boolean;
};

const APPS: Record<AppKey, Program> = {
  about: {
    title: "About Me",
    label: "About",
    icon: UserCircle,
    path: "/",
    scroll: true,
    size: { w: 820, h: 600 },
    home: { x: 0.06, y: 0.12 },
    inTabBar: true,
  },
  projects: {
    title: "Projects",
    label: "Projects",
    icon: FolderOpen,
    path: "/projects",
    scroll: true,
    size: { w: 880, h: 580 },
    home: { x: 1, y: 0 },
    inTabBar: true,
  },
  experience: {
    title: "Experience",
    label: "Experience",
    icon: BriefcaseBusiness,
    path: "/experience",
    scroll: true,
    size: { w: 640, h: 500 },
    home: { x: 0.6, y: 1 },
    inTabBar: true,
  },
  resume: {
    title: "Resume",
    label: "Resume",
    icon: FileText,
    path: "/resume",
    scroll: true,
    size: { w: 540, h: 700 },
    home: { x: 0.36, y: 0.5 },
    inTabBar: true,
  },
  contact: {
    title: "Contact",
    label: "Contact",
    icon: Mail,
    path: "/contact",
    scroll: true,
    size: { w: 540, h: 520 },
    home: { x: 0, y: 1 },
    inTabBar: true,
  },
  terminal: {
    title: "Terminal",
    label: "Terminal",
    icon: Terminal,
    path: "/terminal",
    scroll: false,
    size: { w: 540, h: 320 },
    home: { x: 0.97, y: 0.9 },
    inTabBar: false,
  },
};

export const PROGRAMS = {
  ...APPS,
  ...Object.fromEntries(
    PROJECT_SLUGS.map((slug, i): [CaseStudyKey, Program] => [
      caseStudyKey(slug),
      {
        title: PROJECTS[slug].title,
        label: PROJECTS[slug].title,
        icon: BookOpen,
        path: `/projects/${slug}`,
        scroll: true,
        size: { w: 760, h: 620 },
        // Cascade, so opening a few case studies doesn't stack them exactly on top of each other.
        home: { x: 0.3 + (i % 5) * 0.1, y: 0.1 + (i % 5) * 0.15 },
        inTabBar: false,
      },
    ]),
  ),
} as Record<WindowKey, Program>;

export const keyForPath = (pathname: string): WindowKey | null => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return WINDOW_KEYS.find((k) => PROGRAMS[k].path === clean) ?? null;
};
