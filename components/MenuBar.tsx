"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import OpenWindowButton from "@/components/desktop/OpenWindowButton";
import { site } from "@/lib/site";

// A minute-resolution clock, like a real menu bar. The server snapshot is null so the first client
// render matches the prerendered HTML.
const subscribeToClock = (onTick: () => void) => {
  const interval = setInterval(onTick, 5_000);
  return () => clearInterval(interval);
};
const clockSnapshot = () => Math.floor(Date.now() / 60_000);
const serverClockSnapshot = () => null;

export default function MenuBar() {
  const minutes = useSyncExternalStore(subscribeToClock, clockSnapshot, serverClockSnapshot);
  const { resolvedTheme, setTheme } = useTheme();

  /** The new theme expands out of the toggle as a circle, via the View Transitions API. */
  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      // next-themes applies the class in an effect, after this callback returns; the transition
      // snapshots the new state right away, so apply it here too. next-themes then re-applies it.
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <header className="relative z-40 flex items-center justify-between h-9 px-3 md:px-4 font-mono text-xs border-b border-foreground/10 bg-background/50 backdrop-blur-xl">
      <OpenWindowButton window="about" className="font-bold text-foreground hover:opacity-80">
        {site.name}
      </OpenWindowButton>
      <div className="flex items-center gap-3 md:gap-4 text-foreground">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="flex items-center justify-center w-7 h-7 -my-1 rounded-md hover:bg-foreground/10 cursor-pointer"
        >
          {/* Chosen by the .dark class, so the right icon paints before hydration. */}
          <Sun className="hidden dark:block w-4 h-4 stroke-[1.5]" />
          <Moon className="dark:hidden w-4 h-4 stroke-[1.5]" />
        </button>
        <time className="tabular-nums min-w-[9ch] text-right">
          {minutes === null
            ? " "
            : new Date(minutes * 60_000).toLocaleString("en-US", {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
        </time>
      </div>
    </header>
  );
}
