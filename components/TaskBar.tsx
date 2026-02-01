"use client";

import { UserCircle, FolderOpen, FileText, Mail, Terminal } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface TaskBarProps {
  onAboutClick: () => void;
  onProjectsClick: () => void;
  onResumeClick: () => void;
  onContactsClick: () => void;
  onTerminalClick: () => void;
}

export default function TaskBar({
  onAboutClick,
  onProjectsClick,
  onResumeClick,
  onContactsClick,
  onTerminalClick,
}: TaskBarProps) {
  const buttons = [
    { icon: UserCircle, label: 'About Me', onClick: onAboutClick },
    { icon: FolderOpen, label: 'Projects', onClick: onProjectsClick },
    { icon: FileText, label: 'Resume', onClick: onResumeClick },
    { icon: Mail, label: 'Contact', onClick: onContactsClick },
    { icon: Terminal, label: 'Terminal', onClick: onTerminalClick },
  ];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`flex items-center justify-center gap-4 sm:gap-6 md:gap-8 border border-foreground/20 rounded-full bg-foreground/8 backdrop-blur-lg px-4 sm:px-6 py-2.5 sm:py-3 text-sm transition-opacity duration-900 ease-in ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {buttons.map(({ icon: Icon, label, onClick }, index) => (
        <div key={index} className="relative group flex flex-col items-center">
          <button
            className="transform transition-transform duration-200 group-hover:scale-110 cursor-pointer flex items-center justify-center p-1"
            onClick={onClick}
            aria-label={label}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground stroke-1" />
          </button>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-background/90 backdrop-blur-full text-foreground text-xs rounded-full px-2 py-1 border border-foreground/30 whitespace-nowrap z-50">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground/30"></div>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
