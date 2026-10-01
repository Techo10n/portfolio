"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type CSSProperties, type ReactNode } from "react";
import MenuBar from "@/components/MenuBar";
import { site } from "@/lib/site";
import Window from "./Window";
import { DesktopContext } from "./context";
import { homeRectStyle, oppositeHalf, snapRect, type Size, type SnapZone } from "./geometry";
import SnapAssist from "./SnapAssist";
import { DesktopIcons, TabBar, TaskBar } from "./Navigation";
import { PROGRAMS, WINDOW_KEYS, keyForPath, type WindowKey } from "./programs";
import { activeWindow, desktopReducer, initialDesktopState, type Rect, type WindowStatus } from "./state";

type DesktopProps = {
  /** Each program's content, rendered on the server and handed in as a slot. */
  programs: Record<WindowKey, ReactNode>;
  /** The window this URL points at; opened on top of About. */
  initial: WindowKey;
};

const rectStyle = (r: Rect): CSSProperties => ({ left: r.x, top: r.y, width: r.w, height: r.h });

const documentTitle = (key: WindowKey | null) =>
  key && key !== "about" ? `${PROGRAMS[key].title} · ${site.name}` : `${site.name} | ${site.tagline}`;

/**
 * A floating-window desktop. Windows are keyed, absolutely positioned children of one stage and
 * are never re-parented, so they never re-mount: a half-typed message or terminal session survives
 * anything done to other windows. Each window has a URL; the frontmost window's URL is the page's.
 */
export default function Desktop({ programs, initial }: DesktopProps) {
  const [state, dispatch] = useReducer(desktopReducer, initial, initialDesktopState);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Partial<Record<WindowKey, HTMLDivElement | null>>>({});
  const [interacting, setInteracting] = useState<WindowKey | null>(null);
  /** Where the dragged window would tile if dropped now. */
  const [snapPreview, setSnapPreview] = useState<Rect | null>(null);
  /** After a half-screen snap: offer the other windows for the opposite half. */
  const [assist, setAssist] = useState<{ side: "left" | "right"; rect: Rect; exclude: WindowKey } | null>(null);

  const active = activeWindow(state);
  const status = useMemo(
    () => Object.fromEntries(WINDOW_KEYS.map((k) => [k, state.windows[k].status])) as Record<WindowKey, WindowStatus>,
    [state.windows],
  );

  const open = useCallback((key: WindowKey) => {
    dispatch({ type: "launch", key });
    if (window.location.pathname !== PROGRAMS[key].path) window.history.pushState(null, "", PROGRAMS[key].path);
  }, []);

  // The address bar and tab title follow the frontmost window.
  useEffect(() => {
    const path = active ? PROGRAMS[active].path : "/";
    if (window.location.pathname !== path) window.history.replaceState(null, "", path);
    document.title = documentTitle(active);
  }, [active]);

  // Back and forward reopen the window for that URL.
  useEffect(() => {
    const onPop = () => {
      const key = keyForPath(window.location.pathname);
      if (key) dispatch({ type: "launch", key });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const stageSize = (): Size => ({ w: stageRef.current!.clientWidth, h: stageRef.current!.clientHeight });

  const measure = (key: WindowKey) => () => {
    const el = slotRefs.current[key]!;
    const stage = stageRef.current!;
    const box = stage.getBoundingClientRect();
    const rect: Rect = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    return { rect, stage: stageSize(), origin: { x: box.left, y: box.top } };
  };

  /** A window's size as it would be restored: its own rect, or its preferred size if it hasn't moved. */
  const naturalSize = (key: WindowKey): Size => {
    const { rect } = state.windows[key];
    if (rect) return { w: rect.w, h: rect.h };
    const stage = stageSize();
    return { w: Math.min(PROGRAMS[key].size.w, stage.w), h: Math.min(PROGRAMS[key].size.h, stage.h) };
  };

  const snap = (key: WindowKey, zone: SnapZone) => {
    const size = state.windows[key].maximized || state.windows[key].restore ? naturalSize(key) : measure(key)().rect;
    dispatch({ type: "snap", key, rect: zone === "maximize" ? null : snapRect(zone, stageSize()), size });
    const side = oppositeHalf(zone);
    const others = WINDOW_KEYS.some((k) => k !== key && state.windows[k].status !== "closed");
    setAssist(side && others ? { side, rect: snapRect(side, stageSize()), exclude: key } : null);
  };

  // Windows sit on even z-indexes so the snap preview can slide in just under the one being dragged.
  const zIndex = (key: WindowKey) => 10 + 2 * state.zOrder.indexOf(key);
  const topZ = 10 + 2 * state.zOrder.length;

  return (
    <DesktopContext.Provider value={useMemo(() => ({ open }), [open])}>
      <MenuBar />
      <div className="relative flex flex-1 min-h-0 flex-col">
        <main id="desktop" tabIndex={-1} aria-label="Desktop" className="relative flex-1 min-h-0 mx-2 md:mx-4 mt-2 mb-2 outline-none">
          <DesktopIcons onOpen={open} />

          <div ref={stageRef} className={`absolute inset-0 md:left-28 pointer-events-none ${interacting ? "select-none" : ""}`}>
            {WINDOW_KEYS.filter((key) => state.windows[key].status !== "closed").map((key) => {
              const win = state.windows[key];
              const program = PROGRAMS[key];
              const style = {
                ...(win.rect
                  ? { "--x": `${win.rect.x}px`, "--y": `${win.rect.y}px`, "--w": `${win.rect.w}px`, "--h": `${win.rect.h}px` }
                  : homeRectStyle(program.size, program.home)),
                zIndex: zIndex(key),
              } as CSSProperties;

              return (
                <div
                  key={key}
                  ref={(el) => {
                    slotRefs.current[key] = el;
                  }}
                  style={style}
                  className={[
                    "absolute pointer-events-auto inset-0",
                    win.maximized ? "" : "md:inset-auto md:left-(--x) md:top-(--y) md:w-(--w) md:h-(--h)",
                    interacting === key ? "" : "md:transition-[left,top,width,height] md:duration-200 md:ease-out",
                    win.status === "minimized" ? "hidden" : "",
                    // Phones show one window at a time, full-screen: the frontmost.
                    key === active ? "" : "max-md:hidden",
                  ].join(" ")}
                >
                  <Window
                    id={key}
                    title={program.title}
                    scroll={program.scroll}
                    active={key === active}
                    maximized={win.maximized}
                    entering={state.entering === key}
                    measure={measure(key)}
                    detachSize={() => (win.maximized ? naturalSize(key) : win.restore)}
                    onRect={(rect) => dispatch({ type: "setRect", key, rect })}
                    onSnapPreview={(zone) => setSnapPreview(zone ? snapRect(zone, stageSize()) : null)}
                    onSnap={(zone) => snap(key, zone)}
                    onInteractingChange={(on) => setInteracting(on ? key : null)}
                    onFocus={() => dispatch({ type: "focus", key })}
                    onMinimize={() => dispatch({ type: "minimize", key })}
                    onToggleMaximize={() => dispatch({ type: "toggleMaximize", key })}
                    onClose={() =>
                      // Phones: closing an app returns to the home screen, like iOS; its state is kept.
                      dispatch(window.matchMedia("(min-width: 768px)").matches ? { type: "close", key } : { type: "home" })
                    }
                  >
                    {programs[key]}
                  </Window>
                </div>
              );
            })}

            {snapPreview && (
              <div
                aria-hidden="true"
                data-testid="snap-preview"
                style={{ ...rectStyle(snapPreview), zIndex: topZ - 3 }}
                className="absolute max-md:hidden rounded-[16px] border-2 border-foreground/40 bg-foreground/10 transition-all duration-150 ease-out"
              />
            )}

            {assist && (
              <SnapAssist
                style={{ ...rectStyle(assist.rect), zIndex: topZ }}
                windows={WINDOW_KEYS.filter((k) => k !== assist.exclude && state.windows[k].status !== "closed")}
                onPick={(key) => {
                  snap(key, assist.side);
                  setAssist(null);
                }}
                onDismiss={() => setAssist(null)}
              />
            )}
          </div>
        </main>

        <TaskBar status={status} active={active} onOpen={open} onMinimize={(key) => dispatch({ type: "minimize", key })} />
        <TabBar active={active} onOpen={open} />
      </div>
    </DesktopContext.Provider>
  );
}
