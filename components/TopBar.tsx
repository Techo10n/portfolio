"use client";

import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
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
    update(); // initial set
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

  return (
    <div
      suppressHydrationWarning
      className={`grid grid-cols-5 items-center justify-center text-sm w-full px-5 transition-opacity duration-900 ease-in ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left buttons */}
      <div className="flex flex-row items-start col-span-1 col-start-1 gap-4">
        {isMounted && (
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:scale-110 transition-transform cursor-pointer">
            {theme === "dark" ? <Sun className="w-6 h-6 text-white stroke-1" /> : <Moon className="w-6 h-6 text-white stroke-1" />}
          </button>
        )}
        <button onClick={() => setIsMuted(!isMuted)} className="hover:scale-110 transition-transform cursor-pointer">
          {isMuted ? <VolumeX className="w-6 h-6 text-white stroke-1" /> : <Volume2 className="w-6 h-6 text-white stroke-1" />}
        </button>
      </div>

      {/* Center clock */}
      <div className="flex items-center justify-center col-span-3 col-start-2">
        <div className="border border-white rounded-full px-4 py-1 bg-white/8 backdrop-blur-full text-white text-xs">
          {currentDateTime ? formatDateTime(currentDateTime) : "\u00A0"}
        </div>
      </div>

      {/* Right social icons */}
      <div className="flex flex-row items-end col-span-1 col-start-5 justify-end gap-4">
        <a href="https://www.linkedin.com/in/zechariah-frierson/" className="icon-social-linkedin text-white text-xl hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer" />
        <a href="https://github.com/Techo10n" className="icon-social-github text-white text-xl hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer" />
        <a href="https://www.youtube.com/@techolon" className="icon-social-youtube text-white text-xl hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer" />
      </div>
    </div>
  );
}