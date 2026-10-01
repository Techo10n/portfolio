"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { PROGRAMS, type WindowKey } from "./programs";

type SnapAssistProps = {
  style: CSSProperties;
  windows: WindowKey[];
  onPick: (key: WindowKey) => void;
  onDismiss: () => void;
};

/**
 * Snap Assist, as on Windows and macOS: after a window snaps to one half, the other half offers the
 * remaining windows to fill it. Escape or clicking anywhere else dismisses it.
 */
export default function SnapAssist({ style, windows, onPick, onDismiss }: SnapAssistProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDismiss();
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onDismiss();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [onDismiss]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Choose a window for the other half"
      style={style}
      className="absolute pointer-events-auto max-md:hidden flex flex-col items-center justify-center gap-4 rounded-[16px] border border-foreground/25 bg-background p-6 shadow-2xl shadow-black/20 animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.target === e.currentTarget && onDismiss()}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-foreground/60">Fill this side with</p>
      <ul className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {windows.map((key) => {
          const { icon: Icon, title } = PROGRAMS[key];
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onPick(key)}
                className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border border-foreground/20 bg-background/80 hover:border-foreground/50 hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                <Icon aria-hidden="true" className="w-6 h-6 stroke-[1.5]" />
                <span className="font-mono text-xs">{title}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-foreground/55">Esc to dismiss</p>
    </div>
  );
}
