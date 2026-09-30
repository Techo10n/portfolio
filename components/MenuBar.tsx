"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
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

  return (
    <header className="relative z-40 flex items-center justify-between h-9 px-3 md:px-4 font-mono text-xs border-b border-foreground/10 bg-background/50 backdrop-blur-xl">
      <OpenWindowButton window="about" className="font-bold text-foreground hover:opacity-80">
        {site.name}
      </OpenWindowButton>
      <div className="flex items-center gap-3 md:gap-4 text-foreground">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
