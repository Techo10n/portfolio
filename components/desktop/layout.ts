import type { WindowKey } from "./programs";

/** Position and size as percentages of the desktop. */
export type Rect = { x: number; y: number; w: number; h: number };

/** Row heights, and column widths per row, as fractions that each sum to 1. */
export type Splits = { rows: number[]; cols: number[][] };

export type SplitTarget = { kind: "row"; index: number } | { kind: "col"; row: number; index: number };

export type SeparatorSpec = {
  id: string;
  /** "vertical" divides side-by-side windows; "horizontal" divides stacked rows. */
  orientation: "vertical" | "horizontal";
  target: SplitTarget;
  /** Where the boundary sits, and the span it covers, in desktop percentages. */
  at: number;
  from: number;
  length: number;
  /** Windows on either side, for aria-controls. */
  controls: WindowKey[];
};

/** How many windows sit in each row, by window count. */
const ROWS: Record<number, number[]> = { 1: [1], 2: [2], 3: [2, 1], 4: [2, 2], 5: [3, 2] };

/** Neither neighbour can be dragged below this share of the desktop. */
export const MIN_SPLIT = 0.15;

export function equalSplits(count: number): Splits {
  const rows = ROWS[count] ?? [];
  return {
    rows: rows.map(() => 1 / rows.length),
    cols: rows.map((n) => Array.from({ length: n }, () => 1 / n)),
  };
}

export function computeLayout(keys: WindowKey[], splits: Splits) {
  const rects = {} as Record<WindowKey, Rect>;
  const separators: SeparatorSpec[] = [];
  const rows = ROWS[keys.length] ?? [];

  let i = 0;
  let y = 0;
  rows.forEach((count, r) => {
    const h = splits.rows[r] * 100;
    const rowKeys = keys.slice(i, i + count);
    let x = 0;
    rowKeys.forEach((key, c) => {
      const w = splits.cols[r][c] * 100;
      rects[key] = { x, y, w, h };
      x += w;
      if (c < count - 1) {
        separators.push({
          id: `col-${r}-${c}`,
          orientation: "vertical",
          target: { kind: "col", row: r, index: c },
          at: x,
          from: y,
          length: h,
          controls: [key, rowKeys[c + 1]],
        });
      }
    });
    i += count;
    y += h;
    if (r < rows.length - 1) {
      separators.push({
        id: `row-${r}`,
        orientation: "horizontal",
        target: { kind: "row", index: r },
        at: y,
        from: 0,
        length: 100,
        controls: keys.slice(0, i + rows[r + 1]),
      });
    }
  });

  return { rects, separators };
}

/** Moves a boundary by `delta` (a fraction of the desktop), keeping both neighbours above MIN_SPLIT. */
export function resizeSplits(splits: Splits, target: SplitTarget, delta: number): Splits {
  const resize = (sizes: number[], index: number) => {
    const [a, b] = [sizes[index], sizes[index + 1]];
    const d = Math.min(Math.max(delta, MIN_SPLIT - a), b - MIN_SPLIT);
    return sizes.map((s, j) => (j === index ? a + d : j === index + 1 ? b - d : s));
  };

  return target.kind === "row"
    ? { ...splits, rows: resize(splits.rows, target.index) }
    : { ...splits, cols: splits.cols.map((row, r) => (r === target.row ? resize(row, target.index) : row)) };
}
