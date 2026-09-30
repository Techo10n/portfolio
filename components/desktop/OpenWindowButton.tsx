"use client";

import type { ReactNode } from "react";
import { useDesktop } from "./context";
import { PROGRAMS, type WindowKey } from "./programs";

/**
 * A link to another window. It's a real <a href> (so it works without JS, can be opened in a
 * new tab, and is crawlable) that opens the window in place on a normal click.
 */
export default function OpenWindowButton({
  window: key,
  className,
  children,
}: {
  window: WindowKey;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useDesktop();
  return (
    <a
      href={PROGRAMS[key].path}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        open(key);
      }}
    >
      {children}
    </a>
  );
}
