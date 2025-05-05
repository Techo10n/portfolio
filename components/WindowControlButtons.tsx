"use client";

import { useState } from "react";

export default function WindowControlButtons({ onClose }: { onClose?: () => void }) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        className="w-3 h-3 border border-white rounded-full relative"
        onMouseEnter={() => setHoveredButton("minimize")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === "minimize" && (
          <span className="absolute inset-0 flex items-center justify-center text-xs">-</span>
        )}
      </button>
      <button
        className="w-3 h-3 border border-white rounded-full relative"
        onMouseEnter={() => setHoveredButton("maximize")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === "maximize" && (
          <span className="absolute inset-0 flex items-center justify-center text-xs">□</span>
        )}
      </button>
      <button
        className="w-3 h-3 border border-white rounded-full relative"
        onMouseEnter={() => setHoveredButton("close")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={onClose}
      >
        {hoveredButton === "close" && (
          <span className="absolute inset-0 flex items-center justify-center text-xs">×</span>
        )}
      </button>
    </div>
  );
}