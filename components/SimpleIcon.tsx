import type { LucideIcon } from "lucide-react";

type SimpleIconProps = {
  icon: LucideIcon;
  label: string;
  link: string;
};

export default function SimpleIcon({ icon: Icon, label, link }: SimpleIconProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center gap-2 px-3 py-1 border border-foreground/50 rounded-[10px]"
    >
      <Icon className="text-foreground w-5 h-5 stroke-1.5" aria-hidden="true" />
      <span className="text-foreground text-sm">{label}</span>
    </a>
  );
}
