import { FileText, FolderOpen, Mail, Terminal, UserCircle, type LucideIcon } from "lucide-react";

export const WINDOW_KEYS = ["about", "projects", "resume", "contact", "terminal"] as const;

export type WindowKey = (typeof WINDOW_KEYS)[number];

type Program = {
  /** Window title bar text; also the window's accessible name. */
  title: string;
  /** Taskbar tooltip and accessible name. */
  label: string;
  icon: LucideIcon;
  /** Whether the window wraps its content in a scroll area. Terminal manages its own. */
  scroll: boolean;
};

export const PROGRAMS: Record<WindowKey, Program> = {
  about: { title: "About Me", label: "About Me", icon: UserCircle, scroll: true },
  projects: { title: "My Projects", label: "Projects", icon: FolderOpen, scroll: true },
  resume: { title: "My Resume", label: "Resume", icon: FileText, scroll: true },
  contact: { title: "Contact", label: "Contact", icon: Mail, scroll: true },
  terminal: { title: "Terminal", label: "Terminal", icon: Terminal, scroll: false },
};
