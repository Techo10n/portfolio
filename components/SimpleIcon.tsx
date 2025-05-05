import { ElementType } from "react";

type SimpleIconProps = {
  icon?: { path: string }; // from simple-icons
  component?: ElementType; // from react-icons
  label: string;
  link: string;
};

export default function SimpleIcon({ icon, component: IconComponent, label, link }: SimpleIconProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="transform transition-transform duration-200 hover:scale-110 cursor-pointer flex items-center gap-2 px-3 py-1 border border-white rounded-[10px]"
    >
      {icon && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          className="w-5 h-5"
        >
          <title>{label}</title>
          <path d={icon.path} />
        </svg>
      )}
      {IconComponent && (
        <IconComponent className="text-white w-5 h-5" />
      )}
      <span className="text-white text-sm">{label}</span>
    </a>
  );
}