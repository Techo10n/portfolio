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
  /** Shown in the phone tab bar. Everything is always on the desktop / home screen. */
  inTabBar: boolean;
};

export const PROGRAMS: Record<WindowKey, Program> = {
  about: { title: "About Me", label: "About", icon: UserCircle, path: "/", scroll: true, size: { w: 880, h: 820 }, inTabBar: true },
  projects: { title: "Projects", label: "Projects", icon: FolderOpen, path: "/projects", scroll: true, size: { w: 980, h: 820 }, inTabBar: true },
  experience: { title: "Experience", label: "Experience", icon: BriefcaseBusiness, path: "/experience", scroll: true, size: { w: 820, h: 820 }, inTabBar: true },
  resume: { title: "Resume", label: "Resume", icon: FileText, path: "/resume", scroll: true, size: { w: 760, h: 900 }, inTabBar: true },
  contact: { title: "Contact", label: "Contact", icon: Mail, path: "/contact", scroll: true, size: { w: 640, h: 700 }, inTabBar: true },
  terminal: { title: "Terminal", label: "Terminal", icon: Terminal, path: "/terminal", scroll: false, size: { w: 700, h: 460 }, inTabBar: false },
};

export const keyForPath = (pathname: string): WindowKey | null => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return WINDOW_KEYS.find((k) => PROGRAMS[k].path === clean) ?? null;
};
