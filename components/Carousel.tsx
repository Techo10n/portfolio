import type { CSSProperties } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string; w?: number; h?: number };

/**
 * Images scrolling past endlessly, edge to edge, on `background` (the colour the images were laid
 * on, so the seams disappear). The slides are rendered twice so the strip loops (see
 * `.animate-marquee`); with reduced motion it holds still. `group/card` hover pauses it.
 */
export default function Carousel({ images, background }: { images: Slide[]; background?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background }}>
      <ul
        className="animate-marquee group-hover/card:[animation-play-state:paused] flex h-full w-max"
        style={{ "--marquee-duration": `${images.length * 4}s` } as CSSProperties}
      >
        {[...images, ...images].map((image, i) => (
          <li
            key={i}
            aria-hidden={i >= images.length}
            // Overlap by a pixel: fractional slide widths otherwise leave hairline seams between images.
            className="relative h-full -mr-px"
            style={{ aspectRatio: image.w && image.h ? `${image.w} / ${image.h}` : "16 / 9" }}
          >
            <Image src={image.src} alt={i < images.length ? image.alt : ""} fill sizes="(min-width: 768px) 15vw, 40vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}
