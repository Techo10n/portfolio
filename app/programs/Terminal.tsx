import React, { useState } from "react";
import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";

const COMMANDS = {
  help: [
    "Available commands:",
    "help        Show this help message",
    "about       Learn more about this portfolio",
    "clear       Clear the terminal",
    "contact     Get contact information",
  ],
  about: [
    "This is a portfolio terminal. Type commands to interact.",
  ],
  contact: [
    "Email: your.email@example.com",
    "LinkedIn: https://linkedin.com/in/yourprofile",
  ],
  clear: [],
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleCommand = (cmd: string) => {
    const command = cmd.trim();
    if (command === "") return;
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const output = COMMANDS[command] || [`Command not found: ${command}`];
    setHistory((h) => [...h, `user@portfolio ~ % ${command}`, ...output]);
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <ScrollArea className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full">
      <main className="w-full h-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            Terminal
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-end items-start w-full h-full px-14 py-8">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`w-full text-white text-md whitespace-pre-line ${idx === 0 ? "pb-2" : "pb-0"}`}
            >
              {line}
            </div>
          ))}
          <hr className="w-full border-t border-white/20 my-2" />
          <form
            className="flex flex-row items-start justify-start w-full mt-2 text-md text-white"
            onSubmit={handleInput}
          >
            <p className="w-auto flex-shrink-0 text-md text-white">
              user@portfolio ~ %
            </p>
            <input
              className="bg-transparent border-none outline-none text-md text-white placeholder:text-gray ml-3 flex-1"
              placeholder="type help to get started"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </main>
    </ScrollArea>
  );
}