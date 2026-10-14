"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copy button. `labelClassName` lets the caller hide the visible label (e.g. icon-only when narrow). */
export default function CopyButton({
  value,
  label,
  className,
  labelClassName,
}: {
  value: string;
  label: string;
  className?: string;
  labelClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title={copied ? "Copied" : label}
      className={className}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check aria-hidden="true" className="w-4 h-4" /> : <Copy aria-hidden="true" className="w-4 h-4" />}
      <span aria-live="polite" className={labelClassName}>
        {copied ? "Copied" : label}
      </span>
    </button>
  );
}
