import { UserCircle, FolderOpen, FileText, Mail, Terminal } from 'lucide-react';

export default function TaskBar() {
  const buttons = [
    { icon: UserCircle, label: 'About Me' },
    { icon: FolderOpen, label: 'Projects' },
    { icon: FileText, label: 'Resume' },
    { icon: Mail, label: 'Contact' },
    { icon: Terminal, label: 'Terminal' },
  ];

  return (
    <div className="grid grid-cols-5 items-center justify-center gap-15 border rounded-[100px] bg-white/8 backdrop-blur-lg px-4 py-3 text-sm">
      {buttons.map(({ icon: Icon, label }, index) => (
        <div key={index} className="relative group flex flex-col items-center">
          <button className="col-span-1 transform transition-transform duration-200 group-hover:scale-110 cursor-pointer flex items-center justify-center">
            <Icon className="w-6 h-6 text-white stroke-1" />
          </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/75 backdrop-blur-full text-white text-xs rounded-full px-2 py-1 border border-white whitespace-nowrap">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white"></div>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
