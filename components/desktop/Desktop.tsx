"use client";

import { useReducer, useRef, useState, type CSSProperties, type ReactNode } from "react";
import TaskBar from "@/components/TaskBar";
import Window from "./Window";
import Separator from "./Separator";
import { PROGRAMS, WINDOW_KEYS, type WindowKey } from "./programs";
import { activeWindow, desktopReducer, initialDesktopState, openWindows } from "./state";
import { computeLayout, equalSplits, resizeSplits, type SplitTarget, type Splits } from "./layout";

type DesktopProps = {
  /** Each program's content, rendered on the server and handed in as a slot. */
  programs: Record<WindowKey, ReactNode>;
};

const FULL = { x: 0, y: 0, w: 100, h: 100 };

/**
 * Owns window state and lays windows out as absolutely positioned, keyed children of one
 * stage. Windows are never re-parented, so opening, closing, or maximizing another window
 * never re-mounts one that's already open (the terminal keeps its history, the contact
 * form keeps its draft), and layout changes animate.
 */
export default function Desktop({ programs }: DesktopProps) {
  const [state, dispatch] = useReducer(desktopReducer, initialDesktopState);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const tiled = openWindows(state);
  const signature = tiled.join(",");
  // Custom splits apply only to the set of windows they were made for; any change resets them.
  const [saved, setSaved] = useState<{ signature: string; splits: Splits } | null>(null);
  const splits = saved?.signature === signature ? saved.splits : equalSplits(tiled.length);
  const { rects, separators } = computeLayout(tiled, splits);

  const active = activeWindow(state);
  const { maximized } = state;

  const resize = (target: SplitTarget, delta: { px: number } | { fraction: number }) => {
    let fraction: number;
    if ("fraction" in delta) {
      fraction = delta.fraction;
    } else {
      const stage = stageRef.current;
      if (!stage) return;
      fraction = delta.px / (target.kind === "row" ? stage.clientHeight : stage.clientWidth);
    }
    setSaved((prev) => {
      const current = prev?.signature === signature ? prev.splits : equalSplits(tiled.length);
      return { signature, splits: resizeSplits(current, target, fraction) };
    });
  };

  return (
    <>
      <main
        aria-label="Desktop"
        className="relative w-[calc(100%-16px)] sm:w-[calc(100%-32px)] md:w-[calc(100%-40px)] mx-2 sm:mx-4 md:mx-5 h-full min-h-0"
      >
        <div ref={stageRef} className={`absolute -inset-1.5 ${dragging ? "select-none" : ""}`}>
          {WINDOW_KEYS.filter((key) => state.status[key] !== "closed").map((key) => {
            const rect = maximized === key ? FULL : (rects[key] ?? FULL);
            const hiddenByMaximize = maximized !== null && maximized !== key;
            const style = {
              "--x": `${rect.x}%`,
              "--y": `${rect.y}%`,
              "--w": `${rect.w}%`,
              "--h": `${rect.h}%`,
            } as CSSProperties;

            return (
              <div
                key={key}
                style={style}
                className={[
                  "absolute p-1.5 inset-0 md:inset-auto md:left-(--x) md:top-(--y) md:w-(--w) md:h-(--h)",
                  dragging ? "" : "md:transition-[left,top,width,height,opacity] md:duration-300 md:ease-out",
                  state.status[key] === "minimized" ? "hidden" : "",
                  // Mobile shows one window at a time: the active one.
                  key === active ? "" : "max-md:hidden",
                  hiddenByMaximize ? "md:invisible md:opacity-0" : "",
                  maximized === key ? "z-10" : "",
                ].join(" ")}
              >
                <Window
                  id={key}
                  title={PROGRAMS[key].title}
                  scroll={PROGRAMS[key].scroll}
                  active={key === active && tiled.length > 1}
                  maximized={maximized === key}
                  entering={state.entering === key}
                  onFocus={() => dispatch({ type: "focus", key })}
                  onMinimize={() => dispatch({ type: "minimize", key })}
                  onToggleMaximize={() => dispatch({ type: "toggleMaximize", key })}
                  onClose={() => dispatch({ type: "close", key })}
                >
                  {programs[key]}
                </Window>
              </div>
            );
          })}

          {maximized === null &&
            separators.map((spec) => (
              <Separator
                key={spec.id}
                spec={spec}
                onResize={(delta) => resize(spec.target, delta)}
                onDragChange={setDragging}
                onReset={() => setSaved(null)}
              />
            ))}
        </div>
      </main>
      <div>
        <TaskBar status={state.status} onLaunch={(key) => dispatch({ type: "launch", key })} />
      </div>
    </>
  );
}
