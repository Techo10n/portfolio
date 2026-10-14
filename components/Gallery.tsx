"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = { src: string; alt: string; w?: number; h?: number };

const control =
  "flex items-center justify-center w-9 h-9 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors cursor-pointer";

/**
 * Thumbnails that open full-size inside their own window: the viewer is portaled into the window's
 * non-scrolling scroll-area wrapper, so it covers the window's content (not the screen) and stays put
 * while the content scrolls. Arrows or ← → step through, Esc or a click beside the image closes it.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  // The window to show the viewer in is found when it's opened, from the clicked thumbnail.
  const [open, setOpen] = useState<{ index: number; host: Element; from: HTMLElement } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const portrait = images.every((i) => i.w && i.h && i.h > i.w);

  const step = (by: number) => setOpen((o) => o && { ...o, index: (o.index + by + images.length) % images.length });
  const close = () => {
    open?.from.focus();
    setOpen(null);
  };

  const isOpen = open !== null;
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  const current = open && images[open.index];

  return (
    <>
      <div className={`grid gap-3 mt-3 ${portrait ? "grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5" : "grid-cols-1 @xl:grid-cols-2"}`}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`View larger: ${image.alt}`}
            onClick={(e) => {
              const host = e.currentTarget.closest('[data-slot="scroll-area"]');
              if (host) setOpen({ index: i, host, from: e.currentTarget });
            }}
            style={image.w && image.h ? { aspectRatio: `${image.w} / ${image.h}` } : undefined}
            className={`relative overflow-hidden rounded-lg border border-foreground/15 cursor-zoom-in hover:border-foreground/40 transition-colors ${
              image.w && image.h ? "" : "aspect-[16/10]"
            }`}
          >
            <Image src={image.src} alt="" fill sizes={portrait ? "200px" : "(min-width: 768px) 380px, 100vw"} className="object-cover" />
          </button>
        ))}
      </div>

      {open &&
        current &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={(e) => e.target === e.currentTarget && close()}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
            className="absolute inset-0 z-20 bg-black/85 animate-in fade-in duration-150"
          >
            <div className="absolute inset-x-14 inset-y-10 pointer-events-none">
              <Image key={current.src} src={current.src} alt={current.alt} fill sizes="80vw" className="object-contain" />
            </div>
            <button ref={closeRef} type="button" aria-label="Close" onClick={close} className={`${control} absolute top-2 right-2`}>
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={`${control} absolute left-2 top-1/2 -translate-y-1/2`}>
                  <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                </button>
                <button type="button" aria-label="Next image" onClick={() => step(1)} className={`${control} absolute right-2 top-1/2 -translate-y-1/2`}>
                  <ChevronRight aria-hidden="true" className="w-5 h-5" />
                </button>
                <p className="absolute bottom-3 inset-x-0 text-center font-mono text-xs text-white/80">
                  {open.index + 1} / {images.length}
                </p>
              </>
            )}
          </div>,
          open.host,
        )}
    </>
  );
}
