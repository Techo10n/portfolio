"use client";

import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function TopBar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="grid grid-cols-5 items-center justify-center text-sm w-full px-5">
        <div className="flex flex-row items-start col-span-1 col-start-1 gap-4">
          <button
            className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
            onClick={() => setIsDarkMode(!isDarkMode)}
            >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-white stroke-1" />
            ) : (
              <Moon className="w-6 h-6 text-white stroke-1" />
            )}
          </button>
          <button
            className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
            onClick={() => setIsMuted(!isMuted)}
            >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white stroke-1" />
            ) : (
              <Volume2 className="w-6 h-6 text-white stroke-1" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-center col-span-3 col-start-2">
          <div className="col-span-1 col-start-3 flex items-center justify-center border border-white rounded-full px-2 py-1 bg-white/8 backdrop-blur-full text-white text-xs px-4">
            <p>{formatDateTime(currentDateTime)}</p>
          </div>
        </div>
        <div className="flex flex-row items-end col-span-1 col-start-5 justify-end gap-4">
            <button className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center">
              <a href="https://www.linkedin.com/in/zechariah-frierson/" className="icon-social-linkedin text-white text-xl" target="_blank" rel="noopener noreferrer"></a>
            </button>
            <button className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center">
              <a href="https://github.com/Techo10n" className="icon-social-github text-white text-xl" target="_blank" rel="noopener noreferrer"></a>
            </button>
            <button className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center justify-center">
              <a href="https://www.youtube.com/@techolon" className="icon-social-youtube text-white text-xl" target="_blank" rel="noopener noreferrer"></a>
            </button>
        </div>
    </div>
  );
}