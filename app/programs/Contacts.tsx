import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactForm from "@/components/ContactForm";


export default function Contacts({ onClose }: { onClose: () => void }) {
  return (
    <ScrollArea className="flex flex-col items-start justify-start border border-foreground/20 rounded-[20px] bg-foreground/8 backdrop-blur-lg w-full h-full">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-foreground text-xs pt-2.5 pl-3">
            Contacts
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-row items-start justify-start w-full">
            <h1 className="text-foreground text-3xl font-extrabold">
              Contact Me!
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-6">
            <ContactForm/>
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}