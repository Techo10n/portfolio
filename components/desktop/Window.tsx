"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clampPosition, detachRect, resizeRect, snapZoneAt, type Edge, type Point, type Size, type SnapZone } from "./geometry";
import type { Rect } from "./state";

type WindowProps = {
  id: string;
  title: string;
  scroll: boolean;
  active: boolean;
  maximized: boolean;
  /** Play the open animation. Only true for a window the visitor just launched. */
  entering: boolean;
  /** Current rect in px, measured from the DOM, plus the desktop's size and page offset. */
  measure: () => { rect: Rect; stage: Size; origin: Point };
  /** Size to restore when a snapped or maximized window is pulled out of place; null otherwise. */
  detachSize: () => Size | null;
  onRect: (rect: Rect) => void;
  /** The snap zone under the pointer while dragging, or null. */
  onSnapPreview: (zone: SnapZone | null) => void;
  onSnap: (zone: SnapZone) => void;
  onInteractingChange: (interacting: boolean) => void;
  onFocus: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  children: ReactNode;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Dragging and resizing are desktop-only; on phones windows are full-screen sheets. */
const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

// Resize zones straddle the window's edge (4px outside, 4px in), like a desktop OS. They sit outside
// the section because its rounded, clipped corners don't receive pointer events.
const EDGES: { edge: Edge; className: string }[] = [
  { edge: "n", className: "-top-1 left-4 right-4 h-2 cursor-ns-resize" },
  { edge: "s", className: "-bottom-1 left-4 right-4 h-2 cursor-ns-resize" },
  { edge: "e", className: "-right-1 top-4 bottom-4 w-2 cursor-ew-resize" },
  { edge: "w", className: "-left-1 top-4 bottom-4 w-2 cursor-ew-resize" },
  { edge: "ne", className: "-top-1 -right-1 w-5 h-5 cursor-nesw-resize" },
  { edge: "sw", className: "-bottom-1 -left-1 w-5 h-5 cursor-nesw-resize" },
  { edge: "nw", className: "-top-1 -left-1 w-5 h-5 cursor-nwse-resize" },
  { edge: "se", className: "-bottom-1 -right-1 w-5 h-5 cursor-nwse-resize" },
];

export default function Window({
  id,
  title,
  scroll,
  active,
  maximized,
  entering,
  measure,
  detachSize,
  onRect,
  onSnapPreview,
  onSnap,
  onInteractingChange,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onClose,
  children,
}: WindowProps) {
  // Close and minimize play an exit animation first, then report to the desktop.
  const [leaving, setLeaving] = useState<null | (() => void)>(null);
  const gesture = useRef<{
    kind: "move" | Edge;
    /** Pointer position the deltas are measured from. */
    x: number;
    y: number;
    rect: Rect;
    stage: Size;
    origin: Point;
    detach: Size | null;
    /** A move only starts after a few px, so clicks and double-clicks on the title bar don't detach. */
    started: boolean;
    zone: SnapZone | null;
  } | null>(null);

  const leave = (then: () => void) => {
    if (prefersReducedMotion()) then();
    else setLeaving(() => then);
  };

  const begin = (e: PointerEvent<HTMLElement>) => {
    const kind = e.currentTarget.dataset.gesture as "move" | Edge;
    if (e.button !== 0 || !isDesktop()) return;
    if (kind === "move" && (e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.current = {
      kind,
      x: e.clientX,
      y: e.clientY,
      ...measure(),
      detach: kind === "move" ? detachSize() : null,
      started: kind !== "move",
      zone: null,
    };
    if (kind !== "move") onInteractingChange(true);
  };

  const track = (e: PointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g) return;
    if (g.kind !== "move") {
      onRect(resizeRect(g.rect, g.kind, e.clientX - g.x, e.clientY - g.y, g.stage));
      return;
    }

    const pointer = { x: e.clientX - g.origin.x, y: e.clientY - g.origin.y };
    if (!g.started) {
      if (Math.hypot(e.clientX - g.x, e.clientY - g.y) < 4) return;
      g.started = true;
      onInteractingChange(true);
      if (g.detach) {
        g.rect = detachRect(g.detach, g.rect, pointer, g.stage);
        g.x = e.clientX;
        g.y = e.clientY;
      }
    }

    onRect(clampPosition({ ...g.rect, x: g.rect.x + e.clientX - g.x, y: g.rect.y + e.clientY - g.y }, g.stage));
    const zone = snapZoneAt(pointer, g.stage);
    if (zone !== g.zone) {
      g.zone = zone;
      onSnapPreview(zone);
    }
  };

  const end = () => {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    if (g.started) onInteractingChange(false);
    if (g.zone) {
      onSnapPreview(null);
      onSnap(g.zone);
    }
  };

  const gestureHandlers = {
    onPointerDown: begin,
    onPointerMove: track,
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
  };

  const titleId = `${id}-window-title`;

  return (
    <>
    <section
      id={`${id}-window`}
      aria-labelledby={titleId}
      onPointerDownCapture={onFocus}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget || !leaving) return;
        // Minimized windows stay mounted, so clear the exit state before handing off.
        setLeaving(null);
        leaving();
      }}
      className={`relative flex flex-col size-full overflow-hidden border md:rounded-[16px] max-md:rounded-[20px] bg-background transition-[border-color,box-shadow] ${
        active
          ? "border-foreground/35 shadow-2xl shadow-black/25"
          : "border-foreground/15 shadow-lg shadow-black/10"
      } ${
        leaving
          ? "animate-out fade-out zoom-out-90 fill-mode-forwards duration-200 pointer-events-none"
          : entering
            ? "animate-in fade-in zoom-in-95 duration-200 ease-out"
            : ""
      }`}
    >
      <header
        data-gesture="move"
        {...gestureHandlers}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button") && isDesktop()) onToggleMaximize();
        }}
        className={`flex flex-row items-center justify-between w-full shrink-0 h-10 px-3 border-b select-none touch-none ${
          active ? "border-foreground/15" : "border-foreground/10"
        } md:cursor-grab md:active:cursor-grabbing`}
      >
        <p id={titleId} className={`font-mono text-xs tracking-wide ${active ? "text-foreground" : "text-foreground/60"}`}>
          {title}
        </p>
        <WindowControlButtons
          maximized={maximized}
          onMinimize={() => leave(onMinimize)}
          onToggleMaximize={onToggleMaximize}
          onClose={() => leave(onClose)}
        />
      </header>
      {scroll ? (
        <ScrollArea className="@container min-h-0 flex-1">{children}</ScrollArea>
      ) : (
        <div className="@container flex min-h-0 flex-1 flex-col">{children}</div>
      )}
    </section>
    {/* Resizable even when maximized: doing so turns it back into a normal window. */}
    {EDGES.map(({ edge, className }) => (
      <div key={edge} aria-hidden="true" data-gesture={edge} {...gestureHandlers} className={`absolute z-10 touch-none max-md:hidden ${className}`} />
    ))}
    </>
  );
}
