"use client";

import { useRef, type CSSProperties } from "react";
import type { SeparatorSpec } from "./layout";

type SeparatorProps = {
  spec: SeparatorSpec;
  /** Move the boundary by a delta in pixels (pointer) or as a fraction of the desktop (keyboard). */
  onResize: (delta: { px: number } | { fraction: number }) => void;
  onDragChange: (dragging: boolean) => void;
  onReset: () => void;
};

const KEYBOARD_STEP = 0.02;

export default function Separator({ spec, onResize, onDragChange, onReset }: SeparatorProps) {
  const last = useRef<number | null>(null);
  const vertical = spec.orientation === "vertical";

  // The hit area fills the 12px gap between windows, centred on the boundary.
  const style: CSSProperties = vertical
    ? { left: `calc(${spec.at}% - 6px)`, top: `${spec.from}%`, width: 12, height: `${spec.length}%` }
    : { top: `calc(${spec.at}% - 6px)`, left: `${spec.from}%`, height: 12, width: `${spec.length}%` };

  const stop = () => {
    if (last.current === null) return;
    last.current = null;
    onDragChange(false);
  };

  return (
    <div
      role="separator"
      aria-orientation={spec.orientation}
      aria-label="Resize windows"
      aria-controls={spec.controls.map((k) => `${k}-window`).join(" ")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(spec.at)}
      tabIndex={0}
      style={style}
      className={`group/sep absolute z-20 flex items-center justify-center touch-none outline-none max-md:hidden ${
        vertical ? "cursor-col-resize" : "cursor-row-resize"
      }`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        last.current = vertical ? e.clientX : e.clientY;
        onDragChange(true);
      }}
      onPointerMove={(e) => {
        if (last.current === null) return;
        const pos = vertical ? e.clientX : e.clientY;
        onResize({ px: pos - last.current });
        last.current = pos;
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onDoubleClick={onReset}
      onKeyDown={(e) => {
        const [back, forward] = vertical ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
        if (e.key === back || e.key === forward) {
          e.preventDefault();
          onResize({ fraction: e.key === forward ? KEYBOARD_STEP : -KEYBOARD_STEP });
        } else if (e.key === "Enter") {
          e.preventDefault();
          onReset();
        }
      }}
    >
      <span
        aria-hidden="true"
        className={`rounded-full bg-foreground/40 opacity-0 transition-opacity group-hover/sep:opacity-100 group-focus-visible/sep:opacity-100 group-active/sep:opacity-100 ${
          vertical ? "w-1 h-10 max-h-[50%]" : "h-1 w-10 max-w-[50%]"
        }`}
      />
    </div>
  );
}
