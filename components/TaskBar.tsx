import { PROGRAMS, WINDOW_KEYS, type WindowKey } from "@/components/desktop/programs";
import type { WindowStatus } from "@/components/desktop/state";

type TaskBarProps = {
  status: Record<WindowKey, WindowStatus>;
  onLaunch: (key: WindowKey) => void;
};

export default function TaskBar({ status, onLaunch }: TaskBarProps) {
  return (
    <nav
      aria-label="Taskbar"
      className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 border border-foreground/20 rounded-full bg-foreground/8 backdrop-blur-lg px-4 sm:px-5 py-1.5 sm:py-2 text-sm animate-in fade-in duration-700"
    >
      {WINDOW_KEYS.map((key) => {
        const { icon: Icon, label } = PROGRAMS[key];
        return (
          <div key={key} className="relative group flex flex-col items-center">
            <button
              type="button"
              data-status={status[key]}
              className="transform transition-transform duration-200 [@media(hover:hover)]:group-hover:scale-110 cursor-pointer flex items-center justify-center p-1"
              onClick={() => onLaunch(key)}
              aria-label={label}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground stroke-1" />
            </button>
            {/* Running indicator: filled when open, hollow when minimized. */}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1 sm:-bottom-1.5 w-1 h-1 rounded-full border border-foreground/70 transition-opacity ${
                status[key] === "closed" ? "opacity-0" : "opacity-100"
              } ${status[key] === "open" ? "bg-foreground/70" : "bg-transparent"}`}
            />
            <div className="absolute bottom-full mb-2 hidden [@media(hover:hover)]:group-hover:block bg-background/90 backdrop-blur-full text-foreground text-xs rounded-full px-2 py-1 border border-foreground/30 whitespace-nowrap z-50">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground/30"></div>
              {label}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
