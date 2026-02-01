"use client"

import React, { useState, useRef, useEffect } from "react";
import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";

type CommandOutput = string | string[];

const COMMANDS: Record<string, CommandOutput> = {
  help: [
    "Available commands:",
    "",
    "  help      Show this help message",
    "  about     Learn more about me",
    "  skills    View my technical skills",
    "  contact   Get contact information",
    "  socials   View social media links",
    "  projects  List my projects",
    "  education View my education",
    "  clear     Clear the terminal",
    "  whoami    Display current user",
    "  date      Show current date and time",
    "  echo      Echo back your message",
  ],
  about: [
    "Hey, I'm Zechariah Frierson!",
    "",
    "I'm a Sophomore at Georgia Institute of Technology studying Computer Science.",
    "I'm passionate about web development, video editing, and creating things that",
    "come to life on the screen.",
    "",
    "Type 'skills' to see what I work with, or 'contact' to get in touch!",
  ],
  skills: [
    "Technical Skills:",
    "",
    "  Languages:    TypeScript, JavaScript, Python, Java",
    "  Frontend:     React, Next.js, Tailwind CSS",
    "  Backend:      Express, Node.js, MongoDB",
    "  Tools:        Git, Figma, After Effects",
    "",
    "Type 'projects' to see what I've built!",
  ],
  contact: [
    "Contact Information:",
    "",
    "  Email:     zechariahfrierson@gmail.com",
    "  LinkedIn:  linkedin.com/in/zechariah-frierson",
    "  GitHub:    github.com/Techo10n",
    "",
    "Feel free to reach out!",
  ],
  socials: [
    "Social Media:",
    "",
    "  LinkedIn:   https://linkedin.com/in/zechariah-frierson",
    "  GitHub:     https://github.com/Techo10n",
    "  YouTube:    https://youtube.com/@techolon",
    "  Instagram:  https://instagram.com/techolon_",
  ],
  projects: [
    "Notable Projects:",
    "",
    "  EcoShelf        - Chrome extension for eco-friendly shopping",
    "  This Portfolio  - The website you're looking at right now",
    "  MusicBridge     - Cross-platform playlist sharing app",
    "  EmpAIthetic     - AI-powered journaling app (HackGT 11)",
    "",
    "Click on 'Projects' in the taskbar for more details!",
  ],
  education: [
    "Education:",
    "",
    "  Georgia Institute of Technology (2024 - 2027)",
    "    BS in Computer Science | GPA: 3.76",
    "    Clubs: BDBI, GT WebDev, VGDev, KUSA",
    "",
    "  Whitman College - High School Enrichment (2022 - 2024)",
    "    GPA: 4.0",
    "    Courses: Data Structures, Databases, Discrete Math",
  ],
  whoami: "guest@zechariah-portfolio",
  clear: [],
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Zechariah's Portfolio Terminal!",
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const command = parts[0];
    const args = parts.slice(1).join(" ");

    if (trimmedCmd === "") return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "date") {
      const now = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setHistory((h) => [...h, `guest@portfolio ~ % ${trimmedCmd}`, now, ""]);
      return;
    }

    if (command === "echo") {
      setHistory((h) => [...h, `guest@portfolio ~ % ${cmd.trim()}`, args || "", ""]);
      return;
    }

    const output = COMMANDS[command];
    if (output === undefined) {
      setHistory((h) => [
        ...h,
        `guest@portfolio ~ % ${trimmedCmd}`,
        `Command not found: ${command}`,
        "Type 'help' for available commands.",
        "",
      ]);
    } else if (Array.isArray(output)) {
      setHistory((h) => [...h, `guest@portfolio ~ % ${trimmedCmd}`, ...output, ""]);
    } else {
      setHistory((h) => [...h, `guest@portfolio ~ % ${trimmedCmd}`, output, ""]);
    }
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="flex flex-col border border-foreground/20 rounded-[20px] bg-foreground/8 backdrop-blur-lg w-full h-full cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-row items-start justify-between w-full flex-shrink-0">
        <p className="text-foreground text-xs pt-2.5 pl-3">Terminal</p>
        <div className="flex flex-col items-center justify-center pt-3 pr-3">
          <WindowControlButtons onClose={onClose} />
        </div>
      </div>
      <ScrollArea className="flex-1 w-full" ref={scrollRef}>
        <div className="flex flex-col justify-start items-start w-full px-6 py-4 font-mono text-sm">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`w-full text-foreground whitespace-pre-wrap ${
                line.startsWith("guest@portfolio") ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {line || "\u00A0"}
            </div>
          ))}
          <form
            className="flex flex-row items-center w-full text-foreground"
            onSubmit={handleInput}
          >
            <span className="flex-shrink-0">guest@portfolio ~ %</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none text-foreground placeholder:text-foreground/40 ml-2 flex-1 font-mono"
              placeholder="type a command..."
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
