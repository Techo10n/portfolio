import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center h-dvh px-4">
      <div className="absolute inset-0 -z-20 animate-gradient-radial" />
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-md overflow-hidden rounded-[16px] border border-foreground/30 bg-background shadow-2xl shadow-black/25"
      >
        <header className="flex items-center h-10 px-3 border-b border-foreground/15">
          <p className="font-mono text-xs">Error</p>
        </header>
        <div className="p-6">
          <h1 id="not-found-title" className="font-mono text-2xl font-extrabold tracking-tight">
            404
          </h1>
          <p className="text-[15px] leading-relaxed text-foreground/85 mt-2">
            There&apos;s no window at this address.
          </p>
          <Link
            href="/"
            className="inline-flex items-center h-9 px-4 mt-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85"
          >
            Back to the desktop
          </Link>
        </div>
      </section>
    </div>
  );
}
