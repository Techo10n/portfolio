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
    // 24px hit target (WCAG 2.2 target size) around a 12px visual circle.
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`group/button flex items-center justify-center w-6 h-6 rounded-full cursor-pointer focus-visible:outline-none ${className}`}
    >
      <span className="flex items-center justify-center w-3 h-3 border border-foreground/50 rounded-full group-focus-visible/button:outline-2 group-focus-visible/button:outline-offset-2 group-focus-visible/button:outline-foreground/60">
        <Icon
          aria-hidden="true"
          className="w-2 h-2 stroke-3 text-foreground opacity-0 group-hover/controls:opacity-100 group-focus-within/controls:opacity-100 transition-opacity"
        />
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
    <div className="group/controls flex items-center justify-center -m-1.5">
      <ControlButton label="Minimize" icon={Minus} onClick={onMinimize} />
      <ControlButton
        label={maximized ? "Restore" : "Maximize"}
        icon={maximized ? Minimize2 : Maximize2}
        onClick={onToggleMaximize}
        className="max-md:hidden"
      />
      <ControlButton label="Close" icon={X} onClick={onClose} />
    </div>
  );
}
