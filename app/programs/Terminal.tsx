import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Terminal({ onClose }: { onClose: () => void }) {
  return (
    <ScrollArea className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            Terminal
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-row items-start justify-start w-full">
            <p className="w-auto flex-shrink-0">
              user@portfolio ~ %
            </p>
            <input
              className="bg-transparent border-none outline-none text-white placeholder:text-gray ml-3 flex-1"
              placeholder="type help to get started"
              autoFocus
            />
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}