import WindowControlButtons from "@/components/WindowControlButtons";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';

export default function Resume({ onClose }: { onClose: () => void }) {
  return (
    <ScrollArea className="flex flex-col items-start justify-start border rounded-[20px] bg-white/8 backdrop-blur-lg w-full h-full">
      <main className="w-full mb-8">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-white text-xs pt-2.5 pl-3">
            My Resume
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pr-3">
            <WindowControlButtons onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full px-14 py-8">
          <div className="flex flex-row items-start justify-start w-full">
            <h1 className="text-white text-3xl font-extrabold">
              My Resume
            </h1>
          </div>
        </div>
        <Tilt
          scale={1.0}
          transitionSpeed={2000}
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          className="w-[320px] h-[413px] rounded-xl justify-center items-center flex mx-auto my-8"
        >
          <Image height={413} width={320} src="/resume.png" alt="Resume" className="w-full h-full object-cover rounded-xl"/>
        </Tilt>
      </main>
    </ScrollArea>
  );
}