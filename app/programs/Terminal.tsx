"use client"

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDesktop } from "@/components/desktop/context";
import { APP_KEYS, type AppKey } from "@/components/desktop/programs";

type CommandOutput = string | string[];

const COMMANDS: Record<string, CommandOutput> = {
  help: [
    "Available commands:",
    "",
    "  /help      Show this help message",
    "  /about     Learn more about me",
    "  /skills    View my technical skills",
    "  /contact   Get contact information",
    "  /socials   View social media links",
    "  /projects  List my projects",
    "  /education View my education",
    "  /clear     Clear the terminal",
    "  /whoami    Display current user",
    "  /date      Show current date and time",
    "  /echo      Echo back your message",
    "  /open      Open a window: /open projects, /open resume, ...",
  ],
  about: [
    "Hey, I'm Zechariah Frierson!",
    "",
    // One string per paragraph: the terminal wraps each line to the window width.
    "I'm a junior at Georgia Tech studying Computer Science with a minor in Korean. Most recently I was a software engineering intern at Capital One, building AI-powered support tools. I love web development, video editing, and creating things that come to life on the screen.",
    "",
    "Type /skills to see what I work with, or /contact to get in touch!",
  ],
  skills: [
    "Technical Skills:",
    "",
    "  Languages:    TypeScript, JavaScript, Python, Java, C++, SQL",
    "  Frontend:     React, Next.js, Tailwind CSS, Vite",
    "  Backend:      Supabase, MongoDB, AWS, Vercel",
    "  Tools:        Git, Figma, Claude Code, MCP",
    "",
    "Type /projects to see what I've built!",
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
    "  Museaic         - Cross-platform playlist sharing app",
    "  SongScraper     - Finds the songs in any Instagram reel",
    "  SimpliEarn      - AI earnings call analysis platform",
    "  BDBI Website    - Big Data Big Impact's club site",
    "  EmpAIthetic     - AI-powered journaling app (HackGT 11)",
    "",
    "Open Projects from the dock for more details!",
  ],
  education: [
    "Education:",
    "",
    "  Georgia Institute of Technology (2024 - 2028)",
    "    BS in Computer Science, Minor in Korean | GPA: 3.85",
    "    Big Data Big Impact: Digital Resources Manager",
    "",
    "  Whitman College - High School Enrichment (2022 - 2024)",
    "    GPA: 4.0",
    "    Courses: Data Structures, Databases, Discrete Math",
  ],
  whoami: "guest@zechariah-portfolio",
  clear: [],
};

/**
 * Where a wrapped line should continue: under the value column of an indented row
 * ("  Museaic   - Cross-platform…" → after "- "), else under its leading spaces.
 */
function hangingIndent(line: string): number {
  return /^\s+(?:\S.*?\s{2,}(?:- )?)?/.exec(line)?.[0].length ?? 0;
}

export default function Terminal() {
  const { open } = useDesktop();
  const [history, setHistory] = useState<string[]>([
    "Welcome to Zechariah's Portfolio Terminal!",
    "Type /help to see available commands.",
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
    const displayCmd = cmd.trim();
    const normalizedCmd = displayCmd.toLowerCase();
    const parts = normalizedCmd.split(/\s+/);
    const command = parts[0].slice(1);

    if (displayCmd === "") return;

    // Add to command history
    setCommandHistory((prev) => [...prev, displayCmd]);
    setHistoryIndex(-1);

    // Commands are slash-prefixed; a bare one gets pointed at its slash form.
    if (!parts[0].startsWith("/")) {
      const known = Object.hasOwn(COMMANDS, parts[0]) || ["open", "date", "echo"].includes(parts[0]);
      setHistory((h) => [
        ...h,
        `guest@portfolio ~ % ${displayCmd}`,
        known ? `Commands start with a slash. Try /${parts[0]}` : "Commands start with a slash. Type /help for available commands.",
        "",
      ]);
      return;
    }

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "open") {
      const target = parts[1] as AppKey | undefined;
      const known = APP_KEYS.filter((k) => k !== "terminal");
      if (target && (known as readonly string[]).includes(target)) {
        setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, `Opening ${target}...`, ""]);
        open(target);
      } else {
        setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, `Usage: /open <${known.join(" | ")}>`, ""]);
      }
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
      setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, now, ""]);
      return;
    }

    if (command === "echo") {
      setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, displayCmd.split(/\s+/).slice(1).join(" ") || "", ""]);
      return;
    }

    const output = Object.hasOwn(COMMANDS, command) ? COMMANDS[command] : undefined;
    if (output === undefined) {
      setHistory((h) => [
        ...h,
        `guest@portfolio ~ % ${displayCmd}`,
        `Command not found: /${command}`,
        "Type /help for available commands.",
        "",
      ]);
    } else if (Array.isArray(output)) {
      setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, ...output, ""]);
    } else {
      setHistory((h) => [...h, `guest@portfolio ~ % ${displayCmd}`, output, ""]);
    }
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
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
    <div className="flex min-h-0 flex-1 flex-col cursor-text" onClick={() => inputRef.current?.focus()}>
      <ScrollArea className="min-h-0 flex-1 w-full" viewportRef={scrollRef}>
        <div className="flex flex-col justify-start items-start w-full px-5 py-4 font-mono text-sm">
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{ paddingLeft: `${hangingIndent(line)}ch`, textIndent: `-${hangingIndent(line)}ch` }}
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
              aria-label="Terminal input"
              placeholder="type a command..."
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
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
