"use client";

import { Github, Linkedin, Moon, Sun, Volume2, VolumeX, Youtube } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function TopBar() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const update = () => setCurrentDateTime(new Date());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div
      suppressHydrationWarning
      className={`flex items-center justify-between text-sm w-full px-3 sm:px-5 transition-opacity duration-900 ease-in ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left buttons */}
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        {isMounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-110 transition-transform cursor-pointer p-1"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
            ) : (
              <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
            )}
          </button>
        )}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="hover:scale-110 transition-transform cursor-pointer p-1"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
          ) : (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
          )}
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
          ) : "\u00A0"}
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
