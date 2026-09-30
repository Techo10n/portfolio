"use client";

import { createContext, useContext } from "react";
import type { WindowKey } from "./programs";

type DesktopApi = {
  /** Open (or restore and raise) a window, adding a history entry for its URL. */
  open: (key: WindowKey) => void;
};

export const DesktopContext = createContext<DesktopApi | null>(null);

export function useDesktop(): DesktopApi {
  const api = useContext(DesktopContext);
  if (!api) throw new Error("useDesktop must be used inside <Desktop>");
  return api;
}
