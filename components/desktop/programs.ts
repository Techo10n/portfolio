import { BriefcaseBusiness, FileText, FolderOpen, Mail, Terminal, UserCircle, type LucideIcon } from "lucide-react";

export const WINDOW_KEYS = ["about", "projects", "experience", "resume", "contact", "terminal"] as const;

export type WindowKey = (typeof WINDOW_KEYS)[number];

type Program = {
  /** Window title bar text; also the window's accessible name. */
  title: string;
  /** Desktop icon, taskbar, and tab bar label. */
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

export const PROGRAMS: Record<WindowKey, Program> = {
  about: {
    title: "About Me",
    label: "About",
    icon: UserCircle,
    path: "/",
    scroll: true,
    size: { w: 780, h: 740 },
    home: { x: 0.22, y: 0.15 },
    inTabBar: true,
  },
  projects: {
    title: "Projects",
    label: "Projects",
    icon: FolderOpen,
    path: "/projects",
    scroll: true,
    size: { w: 860, h: 700 },
    home: { x: 1, y: 0 },
    inTabBar: true,
  },
  experience: {
    title: "Experience",
    label: "Experience",
    icon: BriefcaseBusiness,
    path: "/experience",
    scroll: true,
    size: { w: 740, h: 680 },
    home: { x: 0.6, y: 1 },
    inTabBar: true,
  },
  resume: {
    title: "Resume",
    label: "Resume",
    icon: FileText,
    path: "/resume",
    scroll: true,
    size: { w: 620, h: 800 },
    home: { x: 0.85, y: 0.5 },
    inTabBar: true,
  },
  contact: {
    title: "Contact",
    label: "Contact",
    icon: Mail,
    path: "/contact",
    scroll: true,
    size: { w: 540, h: 620 },
    home: { x: 0, y: 1 },
    inTabBar: true,
  },
  terminal: {
    title: "Terminal",
    label: "Terminal",
    icon: Terminal,
    path: "/terminal",
    scroll: false,
    size: { w: 620, h: 400 },
    home: { x: 0.45, y: 0.75 },
    inTabBar: false,
  },
};

export const keyForPath = (pathname: string): WindowKey | null => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return WINDOW_KEYS.find((k) => PROGRAMS[k].path === clean) ?? null;
};
