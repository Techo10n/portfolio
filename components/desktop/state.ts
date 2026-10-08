import { snapRect, type Size, type SnapZone } from "./geometry";
import { PROGRAMS, WINDOW_KEYS, type WindowKey } from "./programs";

/** Position and size in px, relative to the desktop stage. */
export type Rect = { x: number; y: number; w: number; h: number };

export type WindowStatus = "open" | "minimized" | "closed";

export type WindowState = {
  status: WindowStatus;
  /** Null until the window is moved, resized, or snapped: until then it sits at its home spot. */
  rect: Rect | null;
  maximized: boolean;
  /** Size before the window was snapped; pulling it out of the tile restores it. */
  restore: { w: number; h: number } | null;
  /** The tile the window is snapped to, if any. */
  snapped: SnapZone | null;
};

export type DesktopState = {
  windows: Record<WindowKey, WindowState>;
  /** Non-closed windows, back to front. The last open one is active. */
  zOrder: WindowKey[];
  /** The window the visitor just launched from closed; only it plays the open animation. */
  entering: WindowKey | null;
};

export type DesktopAction =
  /** `stage` (desktop only) lets a newly opened window snap into space left empty by tiled windows. */
  | { type: "launch"; key: WindowKey; rect?: Rect; stage?: Size }
  | { type: "focus"; key: WindowKey }
  | { type: "close"; key: WindowKey }
  | { type: "minimize"; key: WindowKey }
  /** Phones: back to the home screen. Every window stays mounted, so each keeps its state. */
  | { type: "home" }
  | { type: "toggleMaximize"; key: WindowKey }
  | { type: "setRect"; key: WindowKey; rect: Rect }
  /** Tile a window into `zone` ("maximize" maximizes it). `size` is its current size, remembered for later. */
  | { type: "snap"; key: WindowKey; zone: SnapZone; stage: Size; size: Size };

const closed: WindowState = { status: "closed", rect: null, maximized: false, restore: null, snapped: null };

/** About is always open on load, maximized; a deep link opens its window on top. */
export function initialDesktopState(initial: WindowKey = "about"): DesktopState {
  const windows = Object.fromEntries(WINDOW_KEYS.map((k) => [k, closed])) as Record<WindowKey, WindowState>;
  windows.about = { ...closed, status: "open", maximized: true };
  const zOrder: WindowKey[] = ["about"];
  if (initial !== "about") {
    windows[initial] = { ...closed, status: "open" };
    zOrder.push(initial);
  }
  return { windows, zOrder, entering: null };
}

const raise = (order: WindowKey[], key: WindowKey) => [...order.filter((k) => k !== key), key];

// The desktop as a 2x2 grid of cells, for working out which space tiled windows leave empty.
type Cell = "tl" | "tr" | "bl" | "br";
const CELLS: Record<SnapZone, Cell[]> = {
  left: ["tl", "bl"],
  right: ["tr", "br"],
  "top-left": ["tl"],
  "top-right": ["tr"],
  "bottom-left": ["bl"],
  "bottom-right": ["br"],
  maximize: ["tl", "tr", "bl", "br"],
};
const QUARTER: Record<Cell, SnapZone> = { tl: "top-left", tr: "top-right", bl: "bottom-left", br: "bottom-right" };

/**
 * The tile a newly opened window should take, if other windows are snapped and leave space: a free
 * half if there is one, otherwise the first free quarter. Null when nothing is snapped or nothing is free.
 */
export function emptyTile(state: DesktopState, except: WindowKey): SnapZone | null {
  const occupied = new Set<Cell>();
  for (const k of WINDOW_KEYS) {
    const w = state.windows[k];
    if (k === except || w.status !== "open") continue;
    const zone = w.maximized ? "maximize" : w.snapped;
    if (zone) CELLS[zone].forEach((c) => occupied.add(c));
  }
  if (occupied.size === 0 || occupied.size === 4) return null;
  const free = (c: Cell) => !occupied.has(c);
  if (free("tl") && free("bl")) return "left";
  if (free("tr") && free("br")) return "right";
  const cell = (["tl", "tr", "bl", "br"] as const).find(free)!;
  return QUARTER[cell];
}

export function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  if (action.type === "home") {
    const windows = Object.fromEntries(
      WINDOW_KEYS.map((k) => [k, state.windows[k].status === "open" ? { ...state.windows[k], status: "minimized" } : state.windows[k]]),
    ) as Record<WindowKey, WindowState>;
    return { ...state, windows, entering: null };
  }
  const { key } = action;
  const win = state.windows[key];
  const set = (patch: Partial<WindowState>) => ({ ...state.windows, [key]: { ...win, ...patch } });

  switch (action.type) {
    case "launch": {
      const wasClosed = win.status === "closed";
      // Opening (or restoring) a floating window next to tiled ones fills the space they leave.
      const tile = action.stage && win.status !== "open" && !win.snapped ? emptyTile(state, key) : null;
      const reset = wasClosed ? { rect: action.rect ?? null, maximized: false, restore: null, snapped: null } : {};
      const tiled = tile
        ? { rect: snapRect(tile, action.stage!), maximized: false, snapped: tile, restore: preferredSize(key, action.stage!) }
        : {};
      return {
        windows: set({ status: "open", ...reset, ...tiled }),
        zOrder: raise(state.zOrder, key),
        entering: wasClosed ? key : state.entering,
      };
    }

    case "focus":
      if (state.zOrder.at(-1) === key) return state;
      return { ...state, zOrder: raise(state.zOrder, key) };

    case "close":
      return {
        windows: set({ status: "closed", rect: null, maximized: false, restore: null, snapped: null }),
        zOrder: state.zOrder.filter((k) => k !== key),
        entering: state.entering === key ? null : state.entering,
      };

    case "minimize":
      return {
        windows: set({ status: "minimized" }),
        // Minimized windows drop behind everything, so the next window becomes active.
        zOrder: [key, ...state.zOrder.filter((k) => k !== key)],
        entering: state.entering === key ? null : state.entering,
      };

    case "toggleMaximize":
      return { ...state, windows: set({ maximized: !win.maximized }), zOrder: raise(state.zOrder, key) };

    case "setRect":
      return { ...state, windows: set({ rect: action.rect, maximized: false, restore: null, snapped: null }) };

    case "snap":
      return {
        windows: set(
          action.zone === "maximize"
            ? { status: "open", maximized: true }
            : {
                status: "open",
                rect: snapRect(action.zone, action.stage),
                maximized: false,
                restore: win.restore ?? action.size,
                snapped: action.zone,
              },
        ),
        zOrder: raise(state.zOrder, key),
        entering: state.entering,
      };
  }
}

const preferredSize = (key: WindowKey, stage: Size): Size => ({
  w: Math.min(PROGRAMS[key].size.w, stage.w),
  h: Math.min(PROGRAMS[key].size.h, stage.h),
});

/** The frontmost open window, if any. */
export const activeWindow = (state: DesktopState): WindowKey | null =>
  [...state.zOrder].reverse().find((k) => state.windows[k].status === "open") ?? null;
