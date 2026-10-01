import type { Rect } from "./state";

export const MIN_W = 360;
export const MIN_H = 260;
/** How much of a window must stay on the desktop so it can always be grabbed again. */
const KEEP_VISIBLE = 120;
const TITLE_BAR = 40;
/** Gap between tiled windows and around the desktop edge. */
const TILE_GAP = 8;
/** How close the pointer must get to an edge while dragging to offer a snap. */
const SNAP_EDGE = 16;
/** Corner snap zones extend this far along each edge. */
const SNAP_CORNER = 96;

export type Size = { w: number; h: number };
export type Point = { x: number; y: number };

/**
 * Default placement, as CSS: the window's preferred size, clamped to the desktop, at its home spot.
 * Being CSS, server-rendered windows and client-launched ones land in exactly the same place.
 */
export function homeRectStyle(preferred: Size, home: Point) {
  const w = `min(${preferred.w}px, 100%)`;
  const h = `min(${preferred.h}px, 100%)`;
  return {
    "--x": `calc((100% - ${w}) * ${home.x})`,
    "--y": `calc((100% - ${h}) * ${home.y})`,
    "--w": w,
    "--h": h,
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

export type SnapZone = "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "maximize";

/** Which snap zone, if any, the pointer is in while dragging. Corners win over edges. */
export function snapZoneAt(p: Point, stage: Size): SnapZone | null {
  const left = p.x <= SNAP_EDGE;
  const right = p.x >= stage.w - SNAP_EDGE;
  const top = p.y <= SNAP_EDGE;
  const nearTop = p.y <= SNAP_CORNER;
  const nearBottom = p.y >= stage.h - SNAP_CORNER;
  if (left || right) {
    const side = left ? "left" : "right";
    if (nearTop) return `top-${side}`;
    if (nearBottom) return `bottom-${side}`;
    return side;
  }
  if (top) return p.x <= SNAP_CORNER ? "top-left" : p.x >= stage.w - SNAP_CORNER ? "top-right" : "maximize";
  return null;
}

/** The rect a snap zone fills, with a small gap so tiled windows read as separate. */
export function snapRect(zone: SnapZone, stage: Size): Rect {
  const g = TILE_GAP;
  const halfW = (stage.w - 3 * g) / 2;
  const halfH = (stage.h - 3 * g) / 2;
  const leftX = g;
  const rightX = 2 * g + halfW;
  switch (zone) {
    case "maximize":
      return { x: 0, y: 0, w: stage.w, h: stage.h };
    case "left":
      return { x: leftX, y: g, w: halfW, h: stage.h - 2 * g };
    case "right":
      return { x: rightX, y: g, w: halfW, h: stage.h - 2 * g };
    case "top-left":
      return { x: leftX, y: g, w: halfW, h: halfH };
    case "top-right":
      return { x: rightX, y: g, w: halfW, h: halfH };
    case "bottom-left":
      return { x: leftX, y: 2 * g + halfH, w: halfW, h: halfH };
    case "bottom-right":
      return { x: rightX, y: 2 * g + halfH, w: halfW, h: halfH };
  }
}

/** The half opposite a side snap, which Snap Assist offers to fill. */
export const oppositeHalf = (zone: SnapZone): "left" | "right" | null =>
  zone === "left" ? "right" : zone === "right" ? "left" : null;

/**
 * Pulling a snapped or maximized window away restores its earlier size, keeping the same
 * proportional spot under the pointer, like a desktop OS.
 */
export function detachRect(size: Size, from: Rect, pointer: Point, stage: Size): Rect {
  const ratio = (pointer.x - from.x) / from.w;
  return clampPosition(
    { x: pointer.x - size.w * ratio, y: Math.max(0, pointer.y - TITLE_BAR / 2), w: size.w, h: size.h },
    stage,
  );
}
