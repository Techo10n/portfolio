"use client";

import { PROGRAMS, WINDOW_KEYS, type WindowKey } from "./programs";
import type { WindowStatus } from "./state";

type NavProps = {
  status: Record<WindowKey, WindowStatus>;
  active: WindowKey | null;
  onOpen: (key: WindowKey) => void;
};

/** Phone only: the home screen grid of apps, visible whenever no window is open. */
export function DesktopIcons({ onOpen }: Pick<NavProps, "onOpen">) {
  return (
    <nav aria-label="Apps" className="absolute inset-0 md:hidden flex items-start justify-center pt-6">
      <ul className="grid grid-cols-3 gap-x-6 gap-y-5">
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
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl border border-foreground/20 bg-background/60 backdrop-blur-md shadow-sm group-hover:border-foreground/40 transition-colors">
                  <Icon aria-hidden="true" className="w-7 h-7 stroke-[1.25] text-foreground" />
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

/**
 * Desktop only: every app, always. A dot marks the ones that are running. Clicking opens or
 * raises the app; clicking the frontmost one minimizes it.
 */
export function Dock({ status, active, onOpen, onMinimize }: NavProps & { onMinimize: (key: WindowKey) => void }) {
  return (
    <nav aria-label="Dock" className="relative z-30 max-md:hidden flex justify-center pb-3 pt-1">
      <ul className="flex items-center gap-1 rounded-2xl border border-foreground/15 bg-background/60 backdrop-blur-xl px-1.5 py-1 shadow-lg shadow-black/10">
        {WINDOW_KEYS.map((key) => {
          const { icon: Icon, label } = PROGRAMS[key];
          const isActive = key === active;
          return (
            <li key={key}>
              <button
                type="button"
                data-status={status[key]}
                aria-label={label}
                aria-pressed={isActive}
                onClick={() => (isActive ? onMinimize(key) : onOpen(key))}
                className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors cursor-pointer ${
                  isActive ? "bg-foreground/15 text-foreground" : "text-foreground/75 hover:bg-foreground/8 hover:text-foreground"
                }`}
              >
                <Icon aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
                {/* Name on hover or keyboard focus, like the macOS dock. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full mb-2.5 whitespace-nowrap rounded-md border border-foreground/15 bg-background px-2 py-1 font-mono text-xs text-foreground shadow-md opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {label}
                </span>
                {status[key] !== "closed" && (
                  <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/70" />
                )}
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
