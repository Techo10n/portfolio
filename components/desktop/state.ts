import { WINDOW_KEYS, type WindowKey } from "./programs";

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
};

export type DesktopState = {
  windows: Record<WindowKey, WindowState>;
  /** Non-closed windows, back to front. The last open one is active. */
  zOrder: WindowKey[];
  /** The window the visitor just launched from closed; only it plays the open animation. */
  entering: WindowKey | null;
};

export type DesktopAction =
  | { type: "launch"; key: WindowKey; rect?: Rect }
  | { type: "focus"; key: WindowKey }
  | { type: "close"; key: WindowKey }
  | { type: "minimize"; key: WindowKey }
  /** Phones: back to the home screen. Every window stays mounted, so each keeps its state. */
  | { type: "home" }
  | { type: "toggleMaximize"; key: WindowKey }
  | { type: "setRect"; key: WindowKey; rect: Rect }
  /** Tile a window. `rect: null` maximizes it. `size` is its current size, remembered for later. */
  | { type: "snap"; key: WindowKey; rect: Rect | null; size: { w: number; h: number } };

const closed: WindowState = { status: "closed", rect: null, maximized: false, restore: null };

/** About is always open on load; a deep link opens its window on top. */
export function initialDesktopState(initial: WindowKey = "about"): DesktopState {
  const windows = Object.fromEntries(WINDOW_KEYS.map((k) => [k, closed])) as Record<WindowKey, WindowState>;
  windows.about = { ...closed, status: "open" };
  const zOrder: WindowKey[] = ["about"];
  if (initial !== "about") {
    windows[initial] = { ...closed, status: "open" };
    zOrder.push(initial);
  }
  return { windows, zOrder, entering: null };
}

const raise = (order: WindowKey[], key: WindowKey) => [...order.filter((k) => k !== key), key];

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
      return {
        windows: set({ status: "open", ...(wasClosed ? { rect: action.rect ?? null, maximized: false, restore: null } : {}) }),
        zOrder: raise(state.zOrder, key),
        entering: wasClosed ? key : state.entering,
      };
    }

    case "focus":
      if (state.zOrder.at(-1) === key) return state;
      return { ...state, zOrder: raise(state.zOrder, key) };

    case "close":
      return {
        windows: set({ status: "closed", rect: null, maximized: false, restore: null }),
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
      return { ...state, windows: set({ rect: action.rect, maximized: false, restore: null }) };

    case "snap":
      return {
        windows: set(
          action.rect
            ? { status: "open", rect: action.rect, maximized: false, restore: win.restore ?? action.size }
            : { status: "open", maximized: true },
        ),
        zOrder: raise(state.zOrder, key),
        entering: state.entering,
      };
  }
}

/** The frontmost open window, if any. */
export const activeWindow = (state: DesktopState): WindowKey | null =>
  [...state.zOrder].reverse().find((k) => state.windows[k].status === "open") ?? null;
