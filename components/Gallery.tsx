"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string };

const control =
  "flex items-center justify-center w-10 h-10 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors cursor-pointer";

/**
 * Thumbnails that open full-size in a modal <dialog>: arrows (or ← →) step through them, Esc or a
 * click outside the image closes it. The dialog sits in the top layer, above every window.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const step = (by: number) => setIndex((i) => (i === null ? i : (i + by + images.length) % images.length));

  useEffect(() => {
    const dialog = dialogRef.current!;
    if (index !== null && !dialog.open) dialog.showModal();
  }, [index]);

  const current = index === null ? null : images[index];

  return (
    <>
      <div className="grid grid-cols-1 @xl:grid-cols-2 gap-3 mt-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`View larger: ${image.alt}`}
            onClick={() => setIndex(i)}
            className="relative aspect-[16/10] overflow-hidden rounded-lg border border-foreground/15 cursor-zoom-in hover:border-foreground/40 transition-colors"
          >
            <Image src={image.src} alt="" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={current?.alt ?? "Image"}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current!.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-w-none max-h-none w-screen h-dvh bg-transparent p-4 md:p-10 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="relative w-full h-full" onClick={(e) => e.target === e.currentTarget && dialogRef.current!.close()}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            <button type="button" aria-label="Close" onClick={() => dialogRef.current!.close()} className={`${control} absolute top-0 right-0`}>
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={`${control} absolute left-0 top-1/2 -translate-y-1/2`}>
                  <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                </button>
                <button type="button" aria-label="Next image" onClick={() => step(1)} className={`${control} absolute right-0 top-1/2 -translate-y-1/2`}>
                  <ChevronRight aria-hidden="true" className="w-5 h-5" />
                </button>
                <p className="absolute bottom-0 inset-x-0 text-center font-mono text-xs text-white/80">
                  {index! + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
