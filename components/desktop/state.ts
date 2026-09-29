import { WINDOW_KEYS, type WindowKey } from "./programs";

export type WindowStatus = "open" | "minimized" | "closed";

export type DesktopState = {
  status: Record<WindowKey, WindowStatus>;
  /** Open windows, least to most recently focused. The last one is active. */
  focusOrder: WindowKey[];
  maximized: WindowKey | null;
  /** The window the visitor just launched from closed; only it plays the open animation. */
  entering: WindowKey | null;
};

export type DesktopAction =
  | { type: "launch"; key: WindowKey }
  | { type: "focus"; key: WindowKey }
  | { type: "close"; key: WindowKey }
  | { type: "minimize"; key: WindowKey }
  | { type: "toggleMaximize"; key: WindowKey };

export const initialDesktopState: DesktopState = {
  status: { about: "open", projects: "closed", resume: "closed", contact: "closed", terminal: "closed" },
  focusOrder: ["about"],
  maximized: null,
  entering: null,
};

const raise = (order: WindowKey[], key: WindowKey) => [...order.filter((k) => k !== key), key];

export function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  const { key } = action;

  switch (action.type) {
    case "launch":
      return {
        status: { ...state.status, [key]: "open" },
        focusOrder: raise(state.focusOrder, key),
        // Launching another program un-maximizes so the new window is actually visible.
        maximized: state.maximized === key ? key : null,
        entering: state.status[key] === "closed" ? key : state.entering,
      };

    case "focus":
      if (state.focusOrder.at(-1) === key) return state;
      return { ...state, focusOrder: raise(state.focusOrder, key) };

    case "close":
    case "minimize":
      return {
        status: { ...state.status, [key]: action.type === "close" ? "closed" : "minimized" },
        focusOrder: state.focusOrder.filter((k) => k !== key),
        maximized: state.maximized === key ? null : state.maximized,
        entering: state.entering === key ? null : state.entering,
      };

    case "toggleMaximize":
      return {
        ...state,
        focusOrder: raise(state.focusOrder, key),
        maximized: state.maximized === key ? null : key,
      };
  }
}

export const activeWindow = (state: DesktopState): WindowKey | null => state.focusOrder.at(-1) ?? null;

/** Open windows in their fixed on-screen order. */
export const openWindows = (state: DesktopState): WindowKey[] =>
  WINDOW_KEYS.filter((k) => state.status[k] === "open");
