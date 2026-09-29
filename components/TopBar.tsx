"use client";

import { Github, Linkedin, Moon, Sun, Youtube } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

// The clock ticks once a second. The server snapshot is null so the first client render
// matches the prerendered HTML, then the real time takes over.
const subscribeToClock = (onTick: () => void) => {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
};
const clockSnapshot = () => Math.floor(Date.now() / 1000);
const serverClockSnapshot = () => null;

const formatDateTime = (date: Date) =>
  date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

const formatDateTimeShort = (date: Date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export default function TopBar() {
  const seconds = useSyncExternalStore(subscribeToClock, clockSnapshot, serverClockSnapshot);
  const currentDateTime = seconds === null ? null : new Date(seconds * 1000);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between text-sm w-full px-3 sm:px-5 animate-in fade-in duration-700">
      {/* Left buttons */}
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="hover:scale-110 transition-transform cursor-pointer p-1"
        >
          {/* Chosen by the .dark class, so the right icon paints before hydration. */}
          <Sun className="hidden dark:block w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
          <Moon className="dark:hidden w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
        </button>
      </div>

      {/* Center clock */}
      <div className="flex items-center justify-center">
        <div className="border border-foreground/30 rounded-full px-2 sm:px-4 py-1 bg-foreground/8 backdrop-blur-full text-foreground text-[10px] sm:text-xs">
          {currentDateTime ? (
            <>
              <span className="hidden sm:inline">{formatDateTime(currentDateTime)}</span>
              <span className="sm:hidden">{formatDateTimeShort(currentDateTime)}</span>
            </>
          ) : " "}
        </div>
      </div>

      {/* Right social icons */}
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        <a
          href="https://www.linkedin.com/in/zechariah-frierson/"
          className="text-foreground hover:scale-110 transition-transform"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </a>
        <a
          href="https://github.com/Techo10n"
          className="text-foreground hover:scale-110 transition-transform"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </a>
        <a
          href="https://www.youtube.com/@techolon"
          className="text-foreground hover:scale-110 transition-transform"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </a>
      </div>
    </div>
  );
}
