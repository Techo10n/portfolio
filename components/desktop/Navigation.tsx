"use client";

import { PROGRAMS, WINDOW_KEYS, type WindowKey } from "./programs";
import type { WindowStatus } from "./state";

type NavProps = {
  status: Record<WindowKey, WindowStatus>;
  active: WindowKey | null;
  onOpen: (key: WindowKey) => void;
};

/**
 * Labeled app icons. Desktop: a column down the left edge. Phone: the home screen grid, visible
 * whenever no window is open.
 */
export function DesktopIcons({ onOpen }: Pick<NavProps, "onOpen">) {
  return (
    <nav aria-label="Apps" className="absolute inset-0 md:right-auto md:w-24 flex items-start justify-center md:justify-start pt-6 md:pt-2">
      <ul className="grid grid-cols-3 gap-x-6 gap-y-5 md:grid-cols-1 md:gap-y-3">
        {WINDOW_KEYS.map((key) => {
          const { icon: Icon, label, path } = PROGRAMS[key];
          return (
            <li key={key}>
              <a
                href={path}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onOpen(key);
                }}
                className="group flex flex-col items-center gap-1.5 w-20 rounded-xl p-1.5 hover:bg-foreground/8 transition-colors"
              >
                <span className="flex items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-2xl border border-foreground/20 bg-background/60 backdrop-blur-md shadow-sm group-hover:border-foreground/40 transition-colors">
                  <Icon aria-hidden="true" className="w-7 h-7 md:w-6 md:h-6 stroke-[1.25] text-foreground" />
                </span>
                <span className="font-mono text-xs text-foreground">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Desktop only: one button per open or minimized window, like a taskbar. */
export function TaskBar({ status, active, onOpen, onMinimize }: NavProps & { onMinimize: (key: WindowKey) => void }) {
  const running = WINDOW_KEYS.filter((k) => status[k] !== "closed");
  return (
    <nav aria-label="Open windows" className="relative z-30 max-md:hidden flex justify-center pb-3 pt-1">
      <ul className="flex items-center gap-1 min-h-11 rounded-2xl border border-foreground/15 bg-background/60 backdrop-blur-xl px-1.5 py-1 shadow-lg shadow-black/10">
        {running.length === 0 && (
          <li className="px-3 font-mono text-xs text-foreground/60">No open windows. Open an app from the desktop.</li>
        )}
        {running.map((key) => {
          const { icon: Icon, title } = PROGRAMS[key];
          const isActive = key === active;
          return (
            <li key={key}>
              <button
                type="button"
                data-status={status[key]}
                aria-pressed={isActive}
                title={isActive ? `Minimize ${title}` : status[key] === "minimized" ? `Restore ${title}` : `Show ${title}`}
                onClick={() => (isActive ? onMinimize(key) : onOpen(key))}
                className={`flex items-center gap-2 h-9 px-3 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                  isActive ? "bg-foreground/15 text-foreground" : "text-foreground/75 hover:bg-foreground/8"
                } ${status[key] === "minimized" ? "opacity-60" : ""}`}
              >
                <Icon aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                {title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Phone only: labeled tab bar for the main sections. */
export function TabBar({ active, onOpen }: Omit<NavProps, "status">) {
  return (
    <nav aria-label="Sections" className="md:hidden border-t border-foreground/10 bg-background/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {WINDOW_KEYS.filter((k) => PROGRAMS[k].inTabBar).map((key) => {
          const { icon: Icon, label } = PROGRAMS[key];
          const isActive = key === active;
          return (
            <li key={key}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onOpen(key)}
                className={`flex flex-col items-center justify-center gap-1 w-full h-14 text-[11px] font-medium cursor-pointer ${
                  isActive ? "text-foreground" : "text-foreground/55"
                }`}
              >
                <Icon aria-hidden="true" className={`w-5 h-5 ${isActive ? "stroke-2" : "stroke-[1.5]"}`} />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
