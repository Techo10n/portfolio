import { Maximize2, Minimize2, Minus, X, type LucideIcon } from "lucide-react";

type WindowControlButtonsProps = {
  maximized: boolean;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
};

function ControlButton({
  label,
  icon: Icon,
  onClick,
  className = "",
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}) {
  return (
    // 24px hit target (WCAG 2.2 target size) around a 14px visual circle.
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`group/button flex items-center justify-center w-6 h-6 rounded-full cursor-pointer ${className}`}
    >
      <span className="flex items-center justify-center w-3.5 h-3.5 border border-foreground/40 rounded-full transition-colors group-hover/button:bg-foreground/10 group-hover/button:border-foreground/70">
        {/* Glyphs are always visible, so minimize and close can be told apart without hovering. */}
        <Icon aria-hidden="true" className="w-2 h-2 stroke-3 text-foreground/60 group-hover/button:text-foreground" />
      </span>
    </button>
  );
}

export default function WindowControlButtons({
  maximized,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowControlButtonsProps) {
  return (
    <div className="flex items-center justify-center -mr-1.5">
      {/* Phones show windows full-screen: only close makes sense there. */}
      <ControlButton label="Minimize" icon={Minus} onClick={onMinimize} className="max-md:hidden" />
      <ControlButton
        label={maximized ? "Restore" : "Maximize"}
        icon={maximized ? Minimize2 : Maximize2}
        onClick={onToggleMaximize}
        className="max-md:hidden"
      />
      <ControlButton label="Close" icon={X} onClick={onClose} className="max-md:w-9 max-md:h-9" />
    </div>
  );
}
