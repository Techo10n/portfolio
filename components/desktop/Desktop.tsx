"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type CSSProperties, type ReactNode } from "react";
import MenuBar from "@/components/MenuBar";
import { site } from "@/lib/site";
import Window from "./Window";
import { DesktopContext } from "./context";
import { defaultRectStyle } from "./geometry";
import { DesktopIcons, TabBar, TaskBar } from "./Navigation";
import { PROGRAMS, WINDOW_KEYS, keyForPath, type WindowKey } from "./programs";
import { activeWindow, desktopReducer, initialDesktopState, type Rect, type WindowStatus } from "./state";

type DesktopProps = {
  /** Each program's content, rendered on the server and handed in as a slot. */
  programs: Record<WindowKey, ReactNode>;
  /** The window this URL points at; opened on top of About. */
  initial: WindowKey;
};

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

  const measure = (key: WindowKey) => () => {
    const el = slotRefs.current[key]!;
    const stage = stageRef.current!;
    const rect: Rect = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    return { rect, stage: { w: stage.clientWidth, h: stage.clientHeight } };
  };

  const zIndex = (key: WindowKey) => 10 + state.zOrder.indexOf(key);

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
                  : defaultRectStyle(program.size, win.slot)),
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
                    onRect={(rect) => dispatch({ type: "setRect", key, rect })}
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
          </div>
        </main>

        <TaskBar status={status} active={active} onOpen={open} onMinimize={(key) => dispatch({ type: "minimize", key })} />
        <TabBar active={active} onOpen={open} />
      </div>
    </DesktopContext.Provider>
  );
}
