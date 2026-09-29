import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg. iOS ignores SVG icons, so the touch icon is a PNG.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "radial-gradient(circle at 30% 25%, #ff62e8, #9d3bd2 55%, #1a0b24)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32">
          <path
            d="M9 11l5 5-5 5M16 21h7"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
