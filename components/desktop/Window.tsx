"use client";

import { useState, type ReactNode } from "react";
import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";

type WindowProps = {
  id: string;
  title: string;
  scroll: boolean;
  active: boolean;
  maximized: boolean;
  /** Play the open animation. Only true for a window the visitor just launched. */
  entering: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  children: ReactNode;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Window({
  id,
  title,
  scroll,
  active,
  maximized,
  entering,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onClose,
  children,
}: WindowProps) {
  // Close and minimize play an exit animation first, then report to the desktop.
  const [leaving, setLeaving] = useState<null | (() => void)>(null);

  const leave = (then: () => void) => {
    if (prefersReducedMotion()) then();
    else setLeaving(() => then);
  };

  const titleId = `${id}-window-title`;

  return (
    <section
      id={`${id}-window`}
      aria-labelledby={titleId}
      onPointerDown={onFocus}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget || !leaving) return;
        // Minimized windows stay mounted, so clear the exit state before handing off.
        setLeaving(null);
        leaving();
      }}
      className={`flex flex-col size-full overflow-hidden border rounded-[20px] bg-foreground/8 backdrop-blur-lg transition-colors ${
        active ? "border-foreground/30" : "border-foreground/20"
      } ${
        leaving
          ? "animate-out fade-out zoom-out-75 fill-mode-forwards duration-300 pointer-events-none"
          : entering
            ? "animate-in fade-in zoom-in-75 duration-300 ease-out"
            : ""
      }`}
    >
      <header className="flex flex-row items-start justify-between w-full shrink-0">
        <p id={titleId} className="text-foreground text-xs pt-2.5 pl-3">
          {title}
        </p>
        <div className="pt-3 pr-3">
          <WindowControlButtons
            maximized={maximized}
            onMinimize={() => leave(onMinimize)}
            onToggleMaximize={onToggleMaximize}
            onClose={() => leave(onClose)}
          />
        </div>
      </header>
      {scroll ? (
        <ScrollArea className="min-h-0 flex-1">{children}</ScrollArea>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      )}
    </section>
  );
}
