import type { Rect } from "./state";

/** Each cascaded window sits this far down and right of the previous one. */
export const CASCADE = 32;
export const MIN_W = 360;
export const MIN_H = 260;
/** How much of a window must stay on the desktop so it can always be grabbed again. */
const KEEP_VISIBLE = 120;
const TITLE_BAR = 40;

export type Size = { w: number; h: number };

/**
 * Windows cascade from a shared anchor: where a standard-size window would sit centred. Centring
 * each window on its own size instead would put a wider window *left* of a narrower one opened
 * before it, which reads as a jumble rather than a cascade.
 */
const ANCHOR: Size = { w: 880, h: 820 };

/**
 * Default placement, as CSS: anchored, cascaded by slot, clamped to the desktop. Being CSS, the
 * server-rendered windows and client-launched ones land in exactly the same place.
 */
export function defaultRectStyle(preferred: Size, slot: number) {
  const offset = slot * CASCADE;
  const w = `min(${preferred.w}px, 100%)`;
  const y = `calc(max(0px, (100% - ${ANCHOR.h}px) / 2) + ${offset}px)`;
  return {
    "--x": `max(0px, min(max(0px, (100% - ${ANCHOR.w}px) / 2) + ${offset}px, 100% - ${w}))`,
    "--y": y,
    "--w": w,
    "--h": `min(${preferred.h}px, 100% - ${y})`,
  };
}

/** Keeps the title bar on the desktop so a dragged window can never be lost. */
export function clampPosition(rect: Rect, stage: Size): Rect {
  return {
    ...rect,
    x: Math.min(Math.max(rect.x, KEEP_VISIBLE - rect.w), stage.w - KEEP_VISIBLE),
    y: Math.min(Math.max(rect.y, 0), stage.h - TITLE_BAR),
  };
}

export type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/** Resizes from an edge or corner by a pointer delta, respecting minimum size and the desktop bounds. */
export function resizeRect(start: Rect, edge: Edge, dx: number, dy: number, stage: Size): Rect {
  let { x, y, w, h } = start;
  if (edge.includes("e")) w = Math.min(Math.max(start.w + dx, MIN_W), stage.w - start.x);
  if (edge.includes("s")) h = Math.min(Math.max(start.h + dy, MIN_H), stage.h - start.y);
  if (edge.includes("w")) {
    const nx = Math.min(Math.max(start.x + dx, 0), start.x + start.w - MIN_W);
    w = start.w + (start.x - nx);
    x = nx;
  }
  if (edge.includes("n")) {
    const ny = Math.min(Math.max(start.y + dy, 0), start.y + start.h - MIN_H);
    h = start.h + (start.y - ny);
    y = ny;
  }
  return { x, y, w, h };
}
