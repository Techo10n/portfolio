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
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative flex items-center justify-center w-3 h-3 border border-foreground/50 rounded-full cursor-pointer before:absolute before:-inset-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 ${className}`}
    >
      <Icon
        aria-hidden="true"
        className="w-2 h-2 stroke-3 text-foreground opacity-0 group-hover/controls:opacity-100 group-focus-within/controls:opacity-100 transition-opacity"
      />
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
    <div className="group/controls flex items-center justify-center gap-2">
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
